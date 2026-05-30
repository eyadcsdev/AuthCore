<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\OtpEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        $type = filter_var($request->input('identifier'), FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        $user = User::where($type, '=', $request->identifier, 'and')->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return back()->with('error', 'خطأ في كلمة المرور او في البريد الالكتروني');
        }

        if ($user->status === 'pending') {
            return back()->with('error', 'حسابك قيد المراجعة من قبل الإدارة');
        }

        if ($user->status === 'rejected') {
            return back()->with('error', 'تم رفض طلب التسجيل الخاص بك');
        }

        if ($user->status === 'suspended') {
            return back()->with('error', 'تم تعليق حسابك');
        }

        if (! $user->email_verified_at) {
            $otp = rand(100000, 999999);
            $user->otp = $otp;
            $user->save();
            Mail::to($user->email)->send(new OtpEmail($user->otp, $user->email, $user->name, 'OTP Verification'));

            return redirect()->route('email.verify', $user->email);
        }
        $remember = $request->has('remember') ? true : false;
        Auth::login($user, $remember);

        if (! $user->logout_from_other_devices) {
            Auth::logoutOtherDevices($request->password);
        }

        $redirectRoute = $this->getDashboardRoute($user);

        return redirect()->intended($redirectRoute)->with('success', 'تم تسجيل الدخول بنجاح');
    }

    public function getDashboardRoute(User $user): string
    {
        if ($user->isSuperAdmin()) {
            return '/admin';
        }

        if ($user->hasRole('teacher')) {
            return '/teacher';
        }

        if ($user->hasRole('student')) {
            return '/student';
        }

        if ($user->hasRole('department-head')) {
            return '/department';
        }

        return '/profile';
    }
}
