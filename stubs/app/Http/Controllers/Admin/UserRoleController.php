<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignRoleRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRoleController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('roles')
            ->when($request->search, fn ($q, $search) => $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%"))
            ->when($request->status, fn ($q, $status) => $q->where('status', $status))
            ->when($request->role, fn ($q, $role) => $q->whereHas('roles', fn ($q) => $q->where('slug', $role)))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'status' => $user->status,
                'roles' => $user->roles->map(fn ($r) => [
                    'id' => $r->id,
                    'name' => $r->name,
                    'slug' => $r->slug,
                ]),
                'created_at' => $user->created_at,
            ]);

        $roles = Role::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'filters' => $request->only(['search', 'status', 'role']),
        ]);
    }

    public function show(User $user)
    {
        $user->load('roles.permissions');

        $allRoles = Role::orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'status' => $user->status,
                'requested_role' => $user->requested_role,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'roles' => $user->roles->map(fn ($r) => [
                    'id' => $r->id,
                    'name' => $r->name,
                    'slug' => $r->slug,
                    'permissions' => $r->permissions->map(fn ($p) => [
                        'id' => $p->id,
                        'slug' => $p->slug,
                        'group_name' => $p->group_name,
                    ]),
                ]),
                'all_permissions' => $user->getAllPermissions()->values()->map(fn ($p) => [
                    'id' => $p->id,
                    'slug' => $p->slug,
                    'group_name' => $p->group_name,
                ]),
            ],
            'allRoles' => $allRoles,
        ]);
    }

    public function assign(AssignRoleRequest $request, User $user)
    {
        if ($user->isSuperAdmin() && ! request()->user()->isSuperAdmin()) {
            return back()->with('error', 'لا يمكن تعديل أدوار المشرف العام');
        }

        if ($user->isSuperAdmin() && ! in_array(
            Role::where('slug', 'super-admin')->value('id'),
            $request->roles
        )) {
            $superAdminCount = User::whereHas('roles', fn ($q) => $q->where('slug', 'super-admin'))->count();

            if ($superAdminCount <= 1) {
                return back()->with('error', 'يجب أن يبقى مشرف عام واحد على الأقل');
            }
        }

        $user->roles()->sync($request->roles);

        return back()->with('success', 'تم تحديث أدوار المستخدم بنجاح');
    }
}
