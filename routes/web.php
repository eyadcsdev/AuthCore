<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserApprovalController;
use App\Http\Controllers\Admin\UserRoleController;
use App\Http\Controllers\Auth\ForgetPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\LogoutDeviceController;
use App\Http\Controllers\Auth\MagicController;
use App\Http\Controllers\Auth\ProfilePageController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\Auth\SocialRoleController;
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
Route::post('/register', RegisterController::class)->name('register')->middleware('throttle:5,1');
Route::post('/login', LoginController::class)->name('login')->middleware('throttle:5,1');
Route::inertia('/forget-password', 'Auth/forget-password')->name('forget-password');
Route::get('/reset-password/{token}', function (Request $request, $token) {
    return inertia('Auth/reset-password', [
        'token' => $token,
        'email' => $request->email,
    ]);
})->name('password.reset');
Route::get('/verify-email/{email}', VerifyEmailPageController::class)->name('email.verify');
Route::post('/verify-email', [VerifyAcountController::class, 'verify'])->name('email.verify.post');
Route::post('/reset-password', ResetPasswordController::class)->name('password.update')->middleware('throttle:5,1');
Route::post('/forget-password', ForgetPasswordController::class)->name('password.email')->middleware('throttle:5,1');
Route::middleware(['auth', 'auth.session'])->group(function () {
    Route::get('/profile', ProfilePageController::class)->name('profile');
    Route::post('/logout', LogoutController::class)->name('logout');
    Route::put('/profile', UpdateProfileController::class)->name('profile.update');
    Route::post('/profile/password', UpdatePasswordController::class)->name('profile.password.update');
    Route::post('/logout-device/{session}', LogoutDeviceController::class)->name('logout.device');
    Route::inertia('/admin', 'dashboard/admin')->name('admin.dashboard')->middleware('permission:dashboard.admin');
    Route::inertia('/student', 'dashboard/student')->name('student.dashboard')->middleware('permission:dashboard.student');
    Route::inertia('/teacher', 'dashboard/teacher')->name('teacher.dashboard')->middleware('permission:dashboard.teacher');
    Route::inertia('/department', 'dashboard/department')->name('department.dashboard')->middleware('permission:dashboard.department');

    // Admin management routes
    Route::prefix('admin')->name('admin.')->middleware('permission:role.view')->group(function () {
        Route::resource('roles', RoleController::class)->except(['show']);
        Route::get('roles/{role}', [RoleController::class, 'show'])->name('roles.show');
    });

    Route::prefix('admin')->name('admin.')->middleware('permission:user.view')->group(function () {
        Route::get('users', [UserRoleController::class, 'index'])->name('users.index');
        Route::get('users/{user}', [UserRoleController::class, 'show'])->name('users.show');
        Route::post('users/{user}/roles', [UserRoleController::class, 'assign'])->name('users.roles.assign');
    });

    Route::prefix('admin')->name('admin.')->middleware('permission:user.approve')->group(function () {
        Route::get('pending-users', [UserApprovalController::class, 'index'])->name('pending-users.index');
        Route::post('pending-users/{user}/approve', [UserApprovalController::class, 'approve'])->name('pending-users.approve');
        Route::post('pending-users/{user}/reject', [UserApprovalController::class, 'reject'])->name('pending-users.reject');
        Route::post('users/{user}/suspend', [UserApprovalController::class, 'suspend'])->name('users.suspend');
        Route::post('users/{user}/activate', [UserApprovalController::class, 'activate'])->name('users.activate');
    });
});
Route::get('/auth/pending-approval', function (Request $request) {
    $name = session('pending_user_name');
    if (! $name) {
        return redirect('/login');
    }

    return Inertia::render('Auth/pending-approval', ['name' => $name]);
})->name('auth.pending-approval');
Route::get('/auth/choose-role', [SocialRoleController::class, 'choose'])->name('auth.choose-role');
Route::post('/auth/choose-role', [SocialRoleController::class, 'store'])->name('auth.choose-role.store');
Route::get('/auth/{provider}/callback', [SocialAuthController::class, 'callback'])->name('social.callback');
Route::get('/auth/{provider}/redirect', [SocialAuthController::class, 'redirect'])->name('social.redirect');
Route::inertia('/login/magic', 'Auth/passwordless-login')->name('passwordless.login');
Route::post('/login/magic', [MagicController::class, 'sendMagicLink'])->name('passwordless.login.post')->middleware('throttle:5,1');
Route::get('/magic-login/{user}', [MagicController::class, 'loginHandler'])->name('passwordless.login.handler')->middleware('signed');
Route::post('/send-verification-otp', [VerifyAcountController::class, 'sendOtp'])->name('send.verification.otp')->middleware('throttle:5,1');
