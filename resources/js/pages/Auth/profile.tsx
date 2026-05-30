import { Head, usePage, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';

interface Session {
    id: string;
    ip_address: string;
    platform: string;
    browser: string;
    is_desktop: boolean;
    is_this_device: boolean;
    last_activity_humans: string;
}

export default function Profile() {
    const { auth, flash, sessions } = usePage().props as any;
    const route = useRoute();

    const [activeTab, setActiveTab] = useState('profile');

    const { post: postLogout } = useForm();
    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        postLogout(route('logout'));
    };

    const {
        data: profileData,
        setData: setProfileData,
        put: putProfile,
        errors: profileErrors,
        processing: profileProcessing,
    } = useForm({
        name: auth.user.name,
        phone: auth.user.phone,
        email: auth.user.email,
        logout_from_other_devices: auth.user.logout_from_other_devices || false,
    });

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        putProfile(route('profile.update'));
    };

    const {
        data: passwordData,
        setData: setPasswordData,
        post: postPassword,
        errors: passwordErrors,
        processing: passwordProcessing,
        reset: resetPassword,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
        logout_from_other_devices: false,
    });

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        postPassword(route('profile.password.update'), {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    const handleLogoutDevice = (sessionId: string) => {
        router.post(route('logout.device', sessionId));
    };

    return (
        <div className="min-h-screen bg-gray-900 pb-10 text-gray-200" dir="rtl">
            <Head title="تعديل الملف الشخصي" />

            <div className="container mx-auto mt-10 max-w-4xl px-4">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">تعديل الملف الشخصي</h1>
                    <form onSubmit={handleLogout}>
                        <button
                            type="submit"
                            className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                        >
                            تسجيل الخروج
                        </button>
                    </form>
                </div>

                {flash?.success && (
                    <div className="mb-4 rounded bg-green-500 p-4 text-white shadow">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 rounded bg-red-500 p-4 text-white shadow">
                        {flash.error}
                    </div>
                )}

                <div className="mb-4 rounded-lg bg-gray-800 shadow-md">
                    <div className="border-gray-700 text-center text-sm font-medium text-gray-500">
                        <ul className="-mb-px flex flex-wrap">
                            <li className="ms-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`inline-block rounded-t-lg border-b-2 p-4 transition ${
                                        activeTab === 'profile'
                                            ? 'border-blue-500 bg-gray-700/50 text-blue-500'
                                            : 'border-transparent hover:border-gray-600 hover:text-gray-300'
                                    }`}
                                >
                                    الملف الشخصي
                                </button>
                            </li>
                            <li className="ms-2">
                                <button
                                    onClick={() => setActiveTab('password')}
                                    className={`inline-block rounded-t-lg border-b-2 p-4 transition ${
                                        activeTab === 'password'
                                            ? 'border-blue-500 bg-gray-700/50 text-blue-500'
                                            : 'border-transparent hover:border-gray-600 hover:text-gray-300'
                                    }`}
                                >
                                    تغيير كلمة المرور
                                </button>
                            </li>
                            <li className="ms-2">
                                <button
                                    onClick={() => setActiveTab('sessions')}
                                    className={`inline-block rounded-t-lg border-b-2 p-4 transition ${
                                        activeTab === 'sessions'
                                            ? 'border-blue-500 bg-gray-700/50 text-blue-500'
                                            : 'border-transparent hover:border-gray-600 hover:text-gray-300'
                                    }`}
                                >
                                    جلسات المتصفح
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="rounded-lg bg-gray-800 p-6 shadow-md">
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-white">
                                تحديث الملف الشخصي
                            </h2>
                            <form
                                onSubmit={handleProfileUpdate}
                                className="mb-6"
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-gray-300"
                                    >
                                        الاسم
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={profileData.name}
                                        onChange={(e) =>
                                            setProfileData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded border bg-gray-700 p-3 text-gray-100 focus:ring-2 focus:outline-none ${
                                            profileErrors.name
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    />
                                    {profileErrors.name && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {profileErrors.name}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-gray-300"
                                    >
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={profileData.email}
                                        onChange={(e) =>
                                            setProfileData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded border bg-gray-700 p-3 text-gray-100 focus:ring-2 focus:outline-none ${
                                            profileErrors.email
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    />
                                    {profileErrors.email && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {profileErrors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-gray-300"
                                    >
                                        رقم الهاتف
                                    </label>
                                    <input
                                        type="phone"
                                        id="phone"
                                        value={profileData.phone}
                                        onChange={(e) => {
                                            let cleanValue =
                                                e.target.value.replace(
                                                    /[^0-9+]/g,
                                                    '',
                                                );
                                            if (cleanValue.indexOf('+') > 0) {
                                                cleanValue =
                                                    cleanValue.charAt(0) +
                                                    cleanValue
                                                        .slice(1)
                                                        .replace(/\+/g, '');
                                            }
                                            setProfileData('phone', cleanValue);
                                        }}
                                        className={`w-full rounded border bg-gray-700 p-3 text-gray-100 focus:ring-2 focus:outline-none ${
                                            profileErrors.phone
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    />
                                    {profileErrors.phone && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {profileErrors.phone}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="logout_other_devices"
                                        name="logout_other_devices"
                                        checked={
                                            profileData.logout_from_other_devices
                                        }
                                        onChange={(e) =>
                                            setProfileData(
                                                'logout_from_other_devices',
                                                e.target.checked,
                                            )
                                        }
                                    />

                                    <label
                                        htmlFor="logout_other_devices"
                                        className="me-1 block text-gray-300"
                                    >
                                        تسجيل الخروج من الأجهزة الأخرى عند تسجيل الدخول
                                    </label>

                                    {profileErrors.logout_from_other_devices && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {
                                                profileErrors.logout_from_other_devices
                                            }
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={profileProcessing}
                                    className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                                >
                                    تحديث الملف الشخصي
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-white">
                                تغيير كلمة المرور
                            </h2>
                            <form onSubmit={handlePasswordUpdate}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="current_password"
                                        className="mb-2 block text-gray-300"
                                    >
                                        كلمة المرور الحالية
                                    </label>
                                    <input
                                        type="password"
                                        id="current_password"
                                        value={passwordData.current_password}
                                        onChange={(e) =>
                                            setPasswordData(
                                                'current_password',
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded border bg-gray-700 p-3 text-gray-100 focus:ring-2 focus:outline-none ${
                                            passwordErrors.current_password
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    />
                                    {passwordErrors.current_password && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {passwordErrors.current_password}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-gray-300"
                                    >
                                        كلمة المرور الجديدة
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={passwordData.password}
                                        onChange={(e) =>
                                            setPasswordData(
                                                'password',
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full rounded border bg-gray-700 p-3 text-gray-100 focus:ring-2 focus:outline-none ${
                                            passwordErrors.password
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-gray-600 focus:ring-blue-500'
                                        }`}
                                    />
                                    {passwordErrors.password && (
                                        <div className="mt-1 text-sm text-red-500">
                                            {passwordErrors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="mb-2 block text-gray-300"
                                    >
                                        تأكيد كلمة المرور الجديدة
                                    </label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        value={
                                            passwordData.password_confirmation
                                        }
                                        onChange={(e) =>
                                            setPasswordData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border border-gray-600 bg-gray-700 p-3 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={passwordProcessing}
                                    className="rounded bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 disabled:opacity-50"
                                >
                                    تغيير كلمة المرور
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'sessions' && (
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-white">
                                جلسات المتصفح
                            </h2>
                            {sessions?.map((session: Session) => (
                                <div
                                    key={session.id}
                                    className="mb-3 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-3"
                                >
                                    <div className="flex items-center">
                                        <svg
                                            className={`ms-3 h-6 w-6 text-gray-200 ${session.is_desktop ? '' : 'hidden'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <svg
                                            className={`ms-3 h-6 w-6 text-gray-200 ${session.is_desktop ? 'hidden' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <div>
                                            <div className="font-semibold text-white">
                                                {session.platform} - {session.browser}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {session.ip_address}
                                                {session.is_this_device && (
                                                    <span className="me-2 text-green-500">
                                                        هذا الجهاز
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                آخر نشاط: {session.last_activity_humans}
                                            </div>
                                        </div>
                                    </div>
                                    {!session.is_this_device && (
                                        <button
                                            onClick={() =>
                                                handleLogoutDevice(session.id)
                                            }
                                            className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                        >
                                            تسجيل الخروج
                                        </button>
                                    )}
                                </div>
                            ))}
                            {(!sessions || sessions.length === 0) && (
                                <p className="text-gray-400">
                                    لم يتم العثور على جلسات متصفح أخرى.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
