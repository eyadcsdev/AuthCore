<?php

namespace App\Models;

use App\Enums\UserStatusEnum;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'phone', 'password', 'otp', 'email_verified_at', 'logout_from_other_devices', 'status', 'requested_role', 'provider', 'provider_id', 'avatar'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'logout_from_other_devices' => 'boolean',
        ];
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class, 'user_id');
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole(string|array $role): bool
    {
        $slugs = is_array($role) ? $role : [$role];

        return $this->roles()->whereIn('slug', $slugs)->exists();
    }

    public function hasAnyRole(array $roles): bool
    {
        return $this->roles()->whereIn('slug', $roles)->exists();
    }

    public function hasAllRoles(array $roles): bool
    {
        $userRoleSlugs = $this->roles()->pluck('slug')->toArray();

        return empty(array_diff($roles, $userRoleSlugs));
    }

    public function assignRole(string|Role $role): void
    {
        $role = $role instanceof Role ? $role : Role::where('slug', $role)->firstOrFail();
        $this->roles()->syncWithoutDetaching([$role->id]);
    }

    public function removeRole(string|Role $role): void
    {
        $role = $role instanceof Role ? $role : Role::where('slug', $role)->firstOrFail();
        $this->roles()->detach($role->id);
    }

    public function syncRoles(array $roles): void
    {
        $roleIds = collect($roles)->map(function ($role) {
            return $role instanceof Role ? $role->id : Role::where('slug', $role)->value('id');
        })->filter()->toArray();

        $this->roles()->sync($roleIds);
    }

    public function hasPermission(string $permission): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        return $this->getAllPermissions()->contains('slug', $permission);
    }

    public function hasAnyPermission(array $permissions): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        $userPermissions = $this->getAllPermissions()->pluck('slug')->toArray();

        return ! empty(array_intersect($permissions, $userPermissions));
    }

    public function getAllPermissions()
    {
        return $this->roles()->with('permissions')->get()
            ->flatMap(fn ($role) => $role->permissions)
            ->unique('id');
    }

    public function isSuperAdmin(): bool
    {
        return $this->roles()->where('slug', 'super-admin')->exists();
    }

    public function scopePending($query)
    {
        return $query->where('status', UserStatusEnum::PENDING->value);
    }

    public function scopeActive($query)
    {
        return $query->where('status', UserStatusEnum::ACTIVE->value);
    }
}
