<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class FacebookAuthController extends Controller
{
    public function redirect()
    {

        return Socialite::driver('facebook')->redirect();
    }

    public function callback()
    {
        $facebookuser = Socialite::driver('facebook')->user();
        $user = User::firstOrCreate([
            'email' => $facebookuser->email,
        ], [
            'name' => $facebookuser->name,
            'password' => Hash::make(Str::random(8)),
            'email_verified_at' => now(),
        ]);
        Auth::login($user);

        return redirect()->intended('/profile')->with('success', 'تم تسجيل الدخول بنجاح');

    }
}
