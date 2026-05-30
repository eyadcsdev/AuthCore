<?php

use App\Http\Controllers\Auth\ForgetPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\LogoutDeviceController;
use App\Http\Controllers\Auth\MagicController;
use App\Http\Controllers\Auth\ProfilePageController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\Auth\UpdatePasswordController;
use App\Http\Controllers\Auth\UpdateProfileController;
use App\Http\Controllers\Auth\VerifyAcountController;
use App\Http\Controllers\Auth\VerifyEmailPageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'index')->name('home');
Route::inertia('/register', 'Auth/register')->name('register');
Route::get('/login', function () {
    return Inertia::render('Auth/login', [
        'socialProviders' => config('social.providers'),
    ]);
})->name('login');
Route::post('/register', RegisterController::class)->name('register');
Route::post('/login', LoginController::class)->name('login');
Route::inertia('/forget-password', 'Auth/forget-password')->name('forget-password');
Route::get('/reset-password/{token}', function (Request $request, $token) {
    return inertia('Auth/reset-password', [
        'token' => $token,
        'email' => $request->email,
    ]);
})->name('password.reset');
Route::get('/verify-email/{email}', VerifyEmailPageController::class)->name('email.verify');
Route::post('/verify-email', [VerifyAcountController::class, 'verify'])->name('email.verify.post');
Route::post('/reset-password', ResetPasswordController::class)->name('password.update');
Route::post('/forget-password', ForgetPasswordController::class)->name('password.email');
Route::middleware(['auth', 'auth.session'])->group(function () {
    Route::get('/profile', ProfilePageController::class)->name('profile');
    Route::post('/logout', LogoutController::class)->name('logout');
    Route::put('/profile', UpdateProfileController::class)->name('profile.update');
    Route::post('/profile/password', UpdatePasswordController::class)->name('profile.password.update');
    Route::post('/logout-device/{session}', LogoutDeviceController::class)->name('logout.device');
    Route::inertia('/admin', 'dashboard/admin')->name('admin.dashboard')->middleware('role:admin');
    Route::inertia('/student', 'dashboard/student')->name('student.dashboard')->middleware('role:student');
    Route::inertia('/teacher', 'dashboard/teacher')->name('teacher.dashboard')->middleware('role:teacher');
    Route::inertia('/department', 'dashboard/department')->name('department.dashboard')->middleware('role:department_head');
});
Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'callback'])->name('social.callback');
Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])->name('social.redirect');
Route::inertia('/login/magic', 'Auth/passwordless-login')->name('passwordless.login');
Route::post('/login/magic', [MagicController::class, 'sendMagicLink'])->name('passwordless.login.post');
Route::get('/magic-login/{user}', [MagicController::class, 'loginHandler'])->name('passwordless.login.handler')->middleware('signed');
Route::post('/send-verification-otp', [VerifyAcountController::class, 'sendOtp'])->name('send.verification.otp');
