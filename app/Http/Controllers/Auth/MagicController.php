<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\MagicLinkRequest;
use App\Mail\SendMagicLinkMail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

use function Illuminate\Support\now;

class MagicController extends Controller
{
    public function sendMagicLink(MagicLinkRequest $request)
    {
        $user = User::where('email', '=', $request->identifier, 'and')->first();

        $url = URL::temporarySignedRoute('passwordless.login.handler', now()->addMinute(), [$user->id]);
        Mail::to($user->email)->send(new SendMagicLinkMail($url));

        return redirect()->back()->with('success', 'تم إرسال رابط تسجيل الدخول إلى بريدك الإلكتروني');
    }

    public function loginHandler(User $user)
    {

        Auth::login($user);

        return redirect()->intended('/profile')->with('success', 'تم تسجيل الدخول بنجاح');
    }
}
