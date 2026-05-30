<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\OtpRequest;
use App\Mail\OtpEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class VerifyAcountController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function sendOtp(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string|max:255',
            'method' => 'required|in:email,phone',
        ]);

        $type = filter_var($request->input('identifier'), FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        $user = User::where($type, '=', $request->identifier, 'and')->first();

        if (! $user) {
            return response()->json(['error' => 'المستخدم غير موجود'], 404);
        }

        if ($request->method === 'email') {
            Mail::to($user->email)->send(new OtpEmail($user->otp, $user->email));

            return back()->with('success', 'تم إرسال رمز التحقق إلى بريدك الإلكتروني');
        }
        if ($request->method === 'phone') {
            dd('إرسال OTP عبر SMS غير مدعوم في الوقت الحالي');
        }

    }

    public function verify(OtpRequest $request)
    {
        $otp = implode('', $request->otp);
        $type = filter_var($request->input('identifier'), FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        $user = User::where($type, '=', $request->identifier, 'and')->first();

        if ($user->otp == $otp) {
            $user->otp = null;
            $user->email_verified_at = now();
            $user->save();

            return redirect()->route('login')->with('success', 'تم التحقق من البريد الإلكتروني بنجاح');
        }

        return back()->with('error', 'الرمز غير صحيح');
    }
}
