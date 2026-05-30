<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgetPasswordRequest;
use App\Mail\RestEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ForgetPasswordController extends Controller
{
    public function __invoke(ForgetPasswordRequest $request)
    {
        $token = Str::random(60);
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->identifier],
            ['token' => $token, 'created_at' => now()]
        );
        Mail::to($request->identifier)->send(new RestEmail($token, $request->identifier));

        return redirect()->route('forget-password')->with('success', 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    }
}
