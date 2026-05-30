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
        $role =[
            'admin' => '/admin',
            'student' => '/student',
            'teacher' => '/teacher',
            'department_head' => '/department',
        ];
        return redirect()->intended($role[$user->role] ?? '/profile')->with('success', 'تم تسجيل الدخول بنجاح');
    }
}
