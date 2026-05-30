<?php

namespace App\Services;

use App\Enums\PermissionEnum;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Facades\Gate;

class PermissionService
{
    public static function registerGates(): void
    {
        foreach (PermissionEnum::cases() as $permission) {
            Gate::define($permission->value, function ($user) use ($permission) {
                return $user->hasPermission($permission->value);
            });
        }
    }

    public static function syncPermissions(): void
    {
        $synced = [];

        foreach (PermissionEnum::cases() as $permission) {
            $synced[] = Permission::updateOrCreate(
                ['slug' => $permission->value],
                [
                    'name' => $permission->label(),
                    'group_name' => $permission->group(),
                    'description' => null,
                ]
            );
        }

        Permission::whereNotIn('slug', array_map(fn ($p) => $p->value, PermissionEnum::cases()))
            ->delete();
    }

    public static function ensureSuperAdminRole(): Role
    {
        $role = Role::firstOrCreate(
            ['slug' => 'super-admin'],
            ['name' => 'Super Admin', 'description' => 'Full system access']
        );

        $permissionIds = Permission::pluck('id')->toArray();
        $role->permissions()->sync($permissionIds);

        return $role;
    }

    public static function ensureDefaultRoles(): void
    {
        $roles = [
            ['slug' => 'student', 'name' => 'Student', 'description' => 'Standard student account'],
            ['slug' => 'teacher', 'name' => 'Teacher', 'description' => 'Standard teacher account'],
            ['slug' => 'department-head', 'name' => 'Department Head', 'description' => 'Department management'],
        ];

        foreach ($roles as $roleData) {
            Role::firstOrCreate(
                ['slug' => $roleData['slug']],
                $roleData
            );
        }
    }
}
