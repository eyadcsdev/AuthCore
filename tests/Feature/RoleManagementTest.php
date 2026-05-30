<?php

use App\Models\Permission;
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

it('can create a role', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $response = $this->post(route('admin.roles.store'), [
        'name' => 'Editor',
        'slug' => 'editor',
        'description' => 'Content editor',
    ]);

    $response->assertSessionHas('success');
    $this->assertDatabaseHas('roles', ['slug' => 'editor']);
});

it('can update a role', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $role = Role::factory()->create(['name' => 'Old Name', 'slug' => 'old-name']);

    $this->put(route('admin.roles.update', $role), [
        'name' => 'New Name',
        'slug' => 'new-name',
        'description' => 'Updated',
    ]);

    $this->assertDatabaseHas('roles', ['slug' => 'new-name', 'name' => 'New Name']);
});

it('cannot delete super admin role', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $superAdmin = Role::where('slug', 'super-admin')->first();

    $this->delete(route('admin.roles.destroy', $superAdmin));

    $this->assertDatabaseHas('roles', ['slug' => 'super-admin']);
});

it('can delete a role without users', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $role = Role::create(['name' => 'Temp', 'slug' => 'temp']);

    $this->delete(route('admin.roles.destroy', $role));

    $this->assertDatabaseMissing('roles', ['slug' => 'temp']);
});

it('cannot delete a role with assigned users', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $role = Role::create(['name' => 'Temp', 'slug' => 'temp']);
    $user = User::factory()->create();
    $user->assignRole($role);

    $this->delete(route('admin.roles.destroy', $role));

    $this->assertDatabaseHas('roles', ['slug' => 'temp']);
});

it('can sync permissions to a role', function () {
    $admin = User::factory()->create();
    $admin->assignRole('super-admin');
    $this->actingAs($admin);

    $role = Role::create(['name' => 'Custom', 'slug' => 'custom']);
    $permission = Permission::where('slug', 'user.view')->first();

    $this->put(route('admin.roles.update', $role), [
        'name' => 'Custom',
        'slug' => 'custom',
        'permissions' => [$permission->id],
    ]);

    $this->assertTrue($role->fresh()->hasPermission('user.view'));
});
