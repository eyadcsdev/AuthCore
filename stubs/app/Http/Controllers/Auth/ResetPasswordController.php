<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ResetPasswordRequest $request)
    {
        $result = DB::table('password_reset_tokens')->where('email', $request->email)->first();
        if (! $result || ! Hash::check($request->token, $result->token)) {
            return back()->with('error', 'حدث خطا تاكد من كتابة الايميل بشكل صحيح');

        }
        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return redirect()->route('login')->with('success', 'تم اعادة تعيين كلمة المرور بنجاح');

    }
}
