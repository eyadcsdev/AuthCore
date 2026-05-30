<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilePageController extends Controller
{
    public function __invoke(Request $request)
    {
        $sessions = $request->user()->sessions()
            ->orderBy('last_activity', 'desc')
            ->get()
            ->toArray();

        return Inertia::render('Auth/profile', [
            'sessions' => $sessions,
        ]);
    }
}
