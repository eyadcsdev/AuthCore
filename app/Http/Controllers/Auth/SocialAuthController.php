<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $socialuser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'فشل تسجيل الدخول عبر '.$provider);
        }

        $user = User::where('provider', $provider)
            ->where('provider_id', $socialuser->getId())
            ->first();

        if ($user) {
            if ($user->status === 'suspended') {
                return redirect()->route('login')->with('error', 'تم تعليق حسابك');
            }

            Auth::login($user);

            $redirectRoute = app(LoginController::class)->getDashboardRoute($user);

            return redirect()->intended($redirectRoute)->with('success', 'تم تسجيل الدخول بنجاح');
        }

        session(['social_user' => [
            'name' => $socialuser->getName(),
            'email' => $socialuser->getEmail(),
            'provider' => $provider,
            'provider_id' => $socialuser->getId(),
            'avatar' => $socialuser->getAvatar(),
        ]]);

        return redirect()->route('auth.choose-role');
    }
}
