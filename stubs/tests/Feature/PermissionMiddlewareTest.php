<?php

use App\Models\User;
use App\Services\PermissionService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    PermissionService::syncPermissions();
    PermissionService::ensureSuperAdminRole();
});

it('allows access with correct permission', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $this->get(route('admin.roles.index'))->assertOk();
});

it('denies access without permission', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $this->get(route('admin.roles.index'))->assertStatus(403);
});

it('redirects unauthenticated users', function () {
    $this->get(route('admin.roles.index'))->assertRedirect('/login');
});

it('allows super admin to access all dashboards', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $this->get('/admin')->assertOk();
    $this->get('/student')->assertOk();
    $this->get('/teacher')->assertOk();
    $this->get('/department')->assertOk();
});
