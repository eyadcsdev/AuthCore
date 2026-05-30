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

it('super admin has all permissions', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');

    expect($admin->hasPermission('student.view'))->toBeTrue();
    expect($admin->hasPermission('course.create'))->toBeTrue();
    expect($admin->hasPermission('user.delete'))->toBeTrue();
    expect($admin->hasPermission('nonexistent'))->toBeTrue();
});

it('super admin bypasses permission checks', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');

    expect($admin->hasAnyPermission(['student.view', 'nonexistent']))->toBeTrue();
    expect($admin->isSuperAdmin())->toBeTrue();
});

it('user without role has no permissions', function () {
    $user = User::factory()->create();

    expect($user->hasPermission('student.view'))->toBeFalse();
    expect($user->isSuperAdmin())->toBeFalse();
});

it('user with student role has only student dashboard access', function () {
    $user = User::factory()->create();
    $studentRole = Role::where('slug', 'student')->first();
    $this->assertNotNull($studentRole);
    $user->assignRole($studentRole);

    expect($user->hasPermission('dashboard.student'))->toBeFalse();
    expect($user->hasPermission('dashboard.admin'))->toBeFalse();
    expect($user->hasPermission('dashboard.teacher'))->toBeFalse();
});

it('can check multiple roles', function () {
    $user = User::factory()->create();
    $user->assignRole('student');

    expect($user->hasRole('student'))->toBeTrue();
    expect($user->hasRole('teacher'))->toBeFalse();
    expect($user->hasAnyRole(['student', 'teacher']))->toBeTrue();
    expect($user->hasAllRoles(['student']))->toBeTrue();
});

it('can assign and remove roles', function () {
    $user = User::factory()->create();

    $user->assignRole('student');
    expect($user->hasRole('student'))->toBeTrue();

    $user->removeRole('student');
    expect($user->hasRole('student'))->toBeFalse();
});

it('can sync roles', function () {
    $user = User::factory()->create();
    $user->assignRole('student');

    $user->syncRoles(['teacher']);
    expect($user->hasRole('teacher'))->toBeTrue();
    expect($user->hasRole('student'))->toBeFalse();
});
