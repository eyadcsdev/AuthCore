<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {

        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $socialuser = Socialite::driver($provider)->user();
        $user = User::firstOrCreate([
            'email' => $socialuser->email,
        ], [
            'name' => $socialuser->name,
            'password' => Hash::make(Str::random(8)),
            'email_verified_at' => now(),
        ]);
        Auth::login($user);

        return redirect()->intended('/profile')->with('success', 'تم تسجيل الدخول بنجاح');
    }
}
