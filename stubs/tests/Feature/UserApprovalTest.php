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

it('pending user cannot log in', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
        'status' => 'pending',
    ]);

    $this->post(route('login'), [
        'identifier' => $user->email,
        'password' => 'password',
    ]);

    expect(auth()->check())->toBeFalse();
});

it('rejected user cannot log in', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
        'status' => 'rejected',
    ]);

    $this->post(route('login'), [
        'identifier' => $user->email,
        'password' => 'password',
    ]);

    expect(auth()->check())->toBeFalse();
});

it('suspended user cannot log in', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
        'status' => 'suspended',
    ]);

    $this->post(route('login'), [
        'identifier' => $user->email,
        'password' => 'password',
    ]);

    expect(auth()->check())->toBeFalse();
});

it('admin can approve pending user', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $user = User::factory()->pending()->create();
    $studentRole = Role::where('slug', 'teacher')->first();

    $this->post(route('admin.pending-users.approve', $user), [
        'role_id' => $studentRole->id,
    ]);

    expect($user->fresh()->status)->toBe('active');
    expect($user->fresh()->hasRole('teacher'))->toBeTrue();
});

it('admin can reject pending user', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $user = User::factory()->pending()->create();

    $this->post(route('admin.pending-users.reject', $user));

    expect($user->fresh()->status)->toBe('rejected');
});

it('admin can suspend active user', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $user = User::factory()->create();

    $this->post(route('admin.users.suspend', $user));

    expect($user->fresh()->status)->toBe('suspended');
});
