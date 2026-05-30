<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ApproveUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserApprovalController extends Controller
{
    public function index(Request $request)
    {
        $users = User::with('roles')
            ->pending()
            ->when($request->search, fn ($q, $search) => $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%"))
            ->orderBy('created_at', 'asc')
            ->paginate(10)
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'requested_role' => $user->requested_role,
                'created_at' => $user->created_at,
            ]);

        $roles = Role::whereNotIn('slug', ['super-admin'])->orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Users/Pending', [
            'users' => $users,
            'roles' => $roles,
            'filters' => $request->only(['search']),
        ]);
    }

    public function approve(ApproveUserRequest $request, User $user)
    {
        if ($user->status !== 'pending') {
            return back()->with('error', 'المستخدم ليس في حالة انتظار');
        }

        $roleId = $request->role_id ?? Role::where('slug', $user->requested_role ?? 'student')->value('id');

        if (! $roleId) {
            return back()->with('error', 'يرجى تحديد دور للمستخدم');
        }

        $user->roles()->sync([$roleId]);
        $user->update([
            'status' => 'active',
            'requested_role' => null,
        ]);

        return back()->with('success', 'تم قبول المستخدم بنجاح');
    }

    public function reject(Request $request, User $user)
    {
        if ($user->status !== 'pending') {
            return back()->with('error', 'المستخدم ليس في حالة انتظار');
        }

        $user->update([
            'status' => 'rejected',
            'requested_role' => null,
        ]);

        return back()->with('success', 'تم رفض المستخدم');
    }

    public function suspend(Request $request, User $user)
    {
        if ($user->isSuperAdmin()) {
            return back()->with('error', 'لا يمكن تعليق حساب المشرف العام');
        }

        $user->update(['status' => 'suspended']);

        return back()->with('success', 'تم تعليق حساب المستخدم');
    }

    public function activate(Request $request, User $user)
    {
        $user->update(['status' => 'active']);

        return back()->with('success', 'تم تنشيط حساب المستخدم');
    }
}
