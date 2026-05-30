<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Services\PermissionService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        PermissionService::ensureSuperAdminRole();

        PermissionService::ensureDefaultRoles();

        $this->migrateExistingUsers();
    }

    protected function migrateExistingUsers(): void
    {
        $roleMap = [
            'admin' => 'super-admin',
            'student' => 'student',
            'teacher' => 'teacher',
            'department_head' => 'department-head',
        ];

        /* @see database/migrations/2026_05_30_000002_replace_role_with_status_in_users_table.php */
        if (! Schema::hasColumn('users', 'role')) {
            return;
        }

        User::whereNotNull('role')->chunk(100, function ($users) use ($roleMap) {
            foreach ($users as $user) {
                $roleSlug = $roleMap[$user->role] ?? null;

                if ($roleSlug) {
                    $role = Role::where('slug', $roleSlug)->first();

                    if ($role) {
                        $user->roles()->syncWithoutDetaching([$role->id]);
                    }
                }
            }
        });
    }
}
