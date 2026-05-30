<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class VerifyEmailPageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = User::where('email', '=', $request->email, 'and')->first();
        if ($user->email_verified_at) {
            return redirect()->route('login')->with('success', 'تم التحقق من البريد الإلكتروني بنجاح');
        }

        return inertia('Auth/verify-acount', [
            'email' => $request->email,
        ]);
    }
}
