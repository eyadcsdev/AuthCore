<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('user.view');
    }

    public function view(User $user, User $targetUser): bool
    {
        return $user->hasPermission('user.view');
    }

    public function assignRole(User $user, User $targetUser): bool
    {
        if ($targetUser->isSuperAdmin() && ! $user->isSuperAdmin()) {
            return false;
        }

        return $user->hasPermission('user.edit');
    }
}
