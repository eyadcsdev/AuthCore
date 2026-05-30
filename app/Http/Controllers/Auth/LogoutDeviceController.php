<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;

class LogoutDeviceController extends Controller
{
    public function __invoke(Request $request, Session $session)
    {
        if ($session->user_id !== $request->user()->id) {
            return back()->with('error', 'غير مصرح لك بإجراء هذه العملية');
        }

        if ($session->id === $request->session()->getId()) {
            return back()->with('error', 'لا يمكن تسجيل الخروج من الجهاز الحالي');
        }

        $session->delete();

        return back()->with('success', 'تم تسجيل الخروج من الجهاز بنجاح');
    }
}
