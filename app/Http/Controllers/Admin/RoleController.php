<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoleRequest;
use App\Http\Requests\Admin\UpdateRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = Role::withCount('users', 'permissions')
            ->when($request->search, fn ($q, $search) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy('name')
            ->paginate(10)
            ->through(fn ($role) => [
                'id' => $role->id,
                'name' => $role->name,
                'slug' => $role->slug,
                'description' => $role->description,
                'users_count' => $role->users_count,
                'permissions_count' => $role->permissions_count,
            ]);

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $permissions = Permission::all()->groupBy('group_name');

        return Inertia::render('Admin/Roles/Create', [
            'permissionGroups' => $permissions,
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        $role = Role::create($request->validated());

        if ($request->filled('permissions')) {
            $role->permissions()->sync($request->permissions);
        }

        return redirect()->route('admin.roles.index')
            ->with('success', 'تم إنشاء الدور بنجاح');
    }

    public function show(Role $role)
    {
        $role->load('permissions');

        $permissionGroups = Permission::all()->groupBy('group_name');

        return Inertia::render('Admin/Roles/Show', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'slug' => $role->slug,
                'description' => $role->description,
                'permissions' => $role->permissions,
            ],
            'permissionGroups' => $permissionGroups,
        ]);
    }

    public function edit(Role $role)
    {
        $role->load('permissions');

        $permissions = Permission::all()->groupBy('group_name');

        return Inertia::render('Admin/Roles/Edit', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
                'slug' => $role->slug,
                'description' => $role->description,
                'permissionIds' => $role->permissions->pluck('id'),
            ],
            'permissionGroups' => $permissions,
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        if ($role->slug === 'super-admin' && $request->slug !== 'super-admin') {
            return back()->with('error', 'لا يمكن تغيير المعرف المختصر لدور المشرف العام');
        }

        $role->update($request->validated());

        if ($request->has('permissions') && $role->slug !== 'super-admin') {
            $role->permissions()->sync($request->permissions);
        }

        return redirect()->route('admin.roles.index')
            ->with('success', 'تم تحديث الدور بنجاح');
    }

    public function destroy(Role $role)
    {
        if ($role->slug === 'super-admin') {
            return back()->with('error', 'لا يمكن حذف دور المشرف العام');
        }

        if ($role->users()->count() > 0) {
            return back()->with('error', 'لا يمكن حذف دور مرتبط بمستخدمين');
        }

        $role->permissions()->detach();
        $role->delete();

        return redirect()->route('admin.roles.index')
            ->with('success', 'تم حذف الدور بنجاح');
    }
}
