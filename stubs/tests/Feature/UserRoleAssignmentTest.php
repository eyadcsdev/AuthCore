<?php

use App\Models\Role;
use App\Models\User;
use App\Services\PermissionService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    PermissionService::syncPermissions();
    PermissionService::ensureSuperAdminRole();
    PermissionService::ensureDefaultRoles();
});

it('admin can assign roles to user', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $user = User::factory()->create();
    $studentRole = Role::where('slug', 'student')->first();

    $this->post(route('admin.users.roles.assign', $user), [
        'roles' => [$studentRole->id],
    ]);

    expect($user->fresh()->hasRole('student'))->toBeTrue();
});

it('admin can sync multiple roles', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $user = User::factory()->create();
    $studentRole = Role::where('slug', 'student')->first();
    $teacherRole = Role::where('slug', 'teacher')->first();

    $this->post(route('admin.users.roles.assign', $user), [
        'roles' => [$studentRole->id, $teacherRole->id],
    ]);

    expect($user->fresh()->hasAllRoles(['student', 'teacher']))->toBeTrue();
});

it('prevents removing last super admin', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $studentRole = Role::where('slug', 'student')->first();
    $superAdminRole = Role::where('slug', 'super-admin')->first();

    $response = $this->post(route('admin.users.roles.assign', $admin), [
        'roles' => [$studentRole->id],
    ]);

    $response->assertSessionHas('error');
    expect($admin->fresh()->isSuperAdmin())->toBeTrue();
});

it('non-admin cannot assign roles', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $target = User::factory()->create();
    $role = Role::where('slug', 'student')->first();

    $this->post(route('admin.users.roles.assign', $target), [
        'roles' => [$role->id],
    ])->assertStatus(403);
});
