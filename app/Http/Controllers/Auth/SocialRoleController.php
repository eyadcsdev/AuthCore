<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SocialRoleController extends Controller
{
    public function choose()
    {
        if (! session()->has('social_user')) {
            return redirect()->route('login');
        }

        return inertia('Auth/choose-role');
    }

    public function store(Request $request)
    {
        $data = session('social_user');

        if (! $data) {
            return redirect()->route('login');
        }

        $request->validate([
            'role' => 'required|in:student,teacher',
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make(Str::random(16)),
            'email_verified_at' => now(),
            'status' => 'pending',
            'requested_role' => $request->role,
            'provider' => $data['provider'],
            'provider_id' => $data['provider_id'],
            'avatar' => $data['avatar'],
        ]);

        $name = $data['name'];

        session()->forget('social_user');
        session()->flash('pending_user_name', $name);

        return redirect()->route('auth.pending-approval');
    }
}
