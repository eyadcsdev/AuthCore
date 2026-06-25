import { usePage, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { useRoute } from 'ziggy-js';
import AdminLayout from '../../components/AdminLayout';
import PageHeader from '../../components/PageHeader';
import { Card, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';

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

    const tabs = [
        { key: 'profile', label: 'الملف الشخصي' },
        { key: 'password', label: 'تغيير كلمة المرور' },
        { key: 'sessions', label: 'جلسات المتصفح' },
    ];

    return (
        <AdminLayout title="الملف الشخصي">
            <div className="mx-auto max-w-3xl space-y-6">
                <PageHeader title="الملف الشخصي" description="إدارة معلومات حسابك وإعدادات الأمان" />

                {flash?.success && <Alert variant="success">{flash.success}</Alert>}
                {flash?.error && <Alert variant="danger">{flash.error}</Alert>}

                <Card noPadding>
                    <CardHeader>
                        <div className="flex gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                        activeTab === tab.key
                                            ? 'bg-accent-muted text-accent-hover'
                                            : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </CardHeader>

                    <div className="p-6">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-4 text-lg font-medium text-text-primary">
                                        تحديث الملف الشخصي
                                    </h3>
                                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                                        <Input
                                            label="الاسم"
                                            id="name"
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData('name', e.target.value)}
                                            error={profileErrors.name}
                                        />

                                        <Input
                                            label="البريد الإلكتروني"
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => setProfileData('email', e.target.value)}
                                            error={profileErrors.email}
                                        />

                                        <Input
                                            label="رقم الهاتف"
                                            id="phone"
                                            type="tel"
                                            value={profileData.phone}
                                            onChange={(e) => {
                                                let clean = e.target.value.replace(/[^0-9+]/g, '');
                                                if (clean.indexOf('+') > 0) {
                                                    clean = clean.charAt(0) + clean.slice(1).replace(/\+/g, '');
                                                }
                                                setProfileData('phone', clean);
                                            }}
                                            error={profileErrors.phone}
                                        />

                                        <label className="flex cursor-pointer items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={profileData.logout_from_other_devices}
                                                onChange={(e) =>
                                                    setProfileData('logout_from_other_devices', e.target.checked)
                                                }
                                                className="h-4 w-4 rounded border-border-default bg-bg-surface text-accent focus:ring-2 focus:ring-accent"
                                            />
                                            <span className="text-sm text-text-secondary">
                                                تسجيل الخروج من الأجهزة الأخرى عند تسجيل الدخول
                                            </span>
                                        </label>

                                        <Button type="submit" disabled={profileProcessing}>
                                            {profileProcessing ? 'جاري الحفظ...' : 'تحديث الملف الشخصي'}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {activeTab === 'password' && (
                            <div>
                                <h3 className="mb-4 text-lg font-medium text-text-primary">
                                    تغيير كلمة المرور
                                </h3>
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    <Input
                                        label="كلمة المرور الحالية"
                                        id="current_password"
                                        type="password"
                                        value={passwordData.current_password}
                                        onChange={(e) => setPasswordData('current_password', e.target.value)}
                                        error={passwordErrors.current_password}
                                    />

                                    <Input
                                        label="كلمة المرور الجديدة"
                                        id="password"
                                        type="password"
                                        value={passwordData.password}
                                        onChange={(e) => setPasswordData('password', e.target.value)}
                                        error={passwordErrors.password}
                                    />

                                    <Input
                                        label="تأكيد كلمة المرور الجديدة"
                                        id="password_confirmation"
                                        type="password"
                                        value={passwordData.password_confirmation}
                                        onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                        error={passwordErrors.password_confirmation}
                                    />

                                    <Button type="submit" disabled={passwordProcessing} variant="success">
                                        {passwordProcessing ? 'جاري الحفظ...' : 'تغيير كلمة المرور'}
                                    </Button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'sessions' && (
                            <div>
                                <h3 className="mb-4 text-lg font-medium text-text-primary">
                                    جلسات المتصفح
                                </h3>
                                <div className="space-y-2">
                                    {sessions?.map((session: Session) => (
                                        <div
                                            key={session.id}
                                            className="flex items-center justify-between rounded-lg border border-border-default bg-bg-surface p-4"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-text-primary">
                                                        {session.platform} - {session.browser}
                                                    </span>
                                                    {session.is_this_device && (
                                                        <Badge variant="success">هذا الجهاز</Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-text-muted">
                                                    {session.ip_address} · {session.last_activity_humans}
                                                </p>
                                            </div>
                                            {!session.is_this_device && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleLogoutDevice(session.id)}
                                                >
                                                    إنهاء الجلسة
                                                </Button>
                                            )}
                                        </div>
                                    ))}

                                    {(!sessions || sessions.length === 0) && (
                                        <p className="py-8 text-center text-sm text-text-muted">
                                            لا توجد جلسات نشطة
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
