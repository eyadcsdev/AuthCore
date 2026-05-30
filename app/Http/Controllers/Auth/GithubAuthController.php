<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GithubAuthController extends Controller
{
    public function redirect()
    {

        return Socialite::driver('github')->redirect();
    }

    public function callback()
    {
        $githubuser = Socialite::driver('github')->user();
        $user = User::firstOrCreate([
            'email' => $githubuser->email,
        ], [
            'name' => $githubuser->name,
            'password' => Hash::make(Str::random(8)),
            'email_verified_at' => now(),
        ]);
        Auth::login($user);

        return redirect()->intended('/profile')->with('success', 'تم تسجيل الدخول بنجاح');

    }
}
