import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';

const stats = [
    { label: 'إجمالي المستخدمين', value: '٢,٨٤٧', change: '١٢٪+', color: 'blue' },
    { label: 'المعلمين', value: '١٢٨', change: '٤٪+', color: 'green' },
    { label: 'الطلاب', value: '٢,٣٤٠', change: '١٥٪+', color: 'purple' },
    { label: 'الأقسام', value: '١٢', change: '٠٪', color: 'amber' },
];

const monthlyRegistrations = [
    { month: 'يناير', users: 180 },
    { month: 'فبراير', users: 220 },
    { month: 'مارس', users: 190 },
    { month: 'إبريل', users: 310 },
    { month: 'مايو', users: 280 },
    { month: 'يونيو', users: 350 },
    { month: 'يوليو', users: 290 },
    { month: 'أغسطس', users: 410 },
    { month: 'سبتمبر', users: 380 },
    { month: 'أكتوبر', users: 430 },
    { month: 'نوفمبر', users: 360 },
    { month: 'ديسمبر', users: 390 },
];

const maxReg = Math.max(...monthlyRegistrations.map((r) => r.users));

const recentUsers = [
    { name: 'أحمد علي', email: 'ahmed@example.com', role: 'طالب', date: 'منذ ساعتين' },
    { name: 'سارة حسن', email: 'sara@example.com', role: 'معلم', date: 'منذ ٥ ساعات' },
    { name: 'محمد نور', email: 'mohamed@example.com', role: 'طالب', date: 'منذ يوم' },
    { name: 'ليلى عمر', email: 'layla@example.com', role: 'طالب', date: 'منذ يومين' },
    { name: 'خالد سعيد', email: 'khaled@example.com', role: 'معلم', date: 'منذ ٣ أيام' },
];

const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
};

const AdminDashboard = () => {
    const route = useRoute();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100" dir="rtl">
            <Head title="لوحة التحكم - المشرف" />

            <div className="border-b border-gray-700 bg-gray-800/80 px-6 py-4 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">لوحة تحكم المشرف</h1>
                        <p className="text-sm text-gray-400">
                            مرحباً بعودتك، المشرف. إليك ما يحدث اليوم.
                        </p>
                    </div>
                    <Link
                        href={route('profile')}
                        className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-600"
                    >
                        الملف الشخصي
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-7xl space-y-6 p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-gray-700 bg-gray-800 p-5"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-400">{stat.label}</p>
                                <span
                                    className={`h-2.5 w-2.5 rounded-full ${colorClasses[stat.color]}`}
                                />
                            </div>
                            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                            <p className="mt-1 text-sm text-green-400">{stat.change}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 lg:col-span-2">
                        <h2 className="mb-4 text-lg font-semibold">
                            التسجيلات الشهرية
                        </h2>
                        <div className="flex items-end gap-2" style={{ height: 160 }}>
                            {monthlyRegistrations.map((r) => (
                                <div
                                    key={r.month}
                                    className="group relative flex flex-1 flex-col items-center"
                                >
                                    <div
                                        className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-400"
                                        style={{
                                            height: `${(r.users / maxReg) * 140}px`,
                                        }}
                                    />
                                    <span className="mt-1 text-xs text-gray-500">
                                        {r.month}
                                    </span>
                                    <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs group-hover:block">
                                        {r.users} مستخدم
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
                        <h2 className="mb-4 text-lg font-semibold">نظرة سريعة</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">التخزين</span>
                                    <span>٦٤٪</span>
                                </div>
                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-blue-500"
                                        style={{ width: '64%' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">حمل الخادم</span>
                                    <span>٤٢٪</span>
                                </div>
                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-green-500"
                                        style={{ width: '42%' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">الجلسات النشطة</span>
                                    <span>١,٢٨٤</span>
                                </div>
                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-purple-500"
                                        style={{ width: '78%' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">وقت تشغيل النظام</span>
                                    <span>٩٩.٩٪</span>
                                </div>
                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-amber-500"
                                        style={{ width: '99%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-700 bg-gray-800">
                    <div className="border-b border-gray-700 px-5 py-4">
                        <h2 className="text-lg font-semibold">أحدث التسجيلات</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-sm">
                            <thead>
                                <tr className="border-b border-gray-700 text-gray-400">
                                    <th className="px-5 py-3 font-medium">الاسم</th>
                                    <th className="px-5 py-3 font-medium">البريد</th>
                                    <th className="px-5 py-3 font-medium">الدور</th>
                                    <th className="px-5 py-3 font-medium">تاريخ الانضمام</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((user) => (
                                    <tr
                                        key={user.email}
                                        className="border-b border-gray-700/50 last:border-0 hover:bg-gray-700/30"
                                    >
                                        <td className="px-5 py-3 font-medium">
                                            {user.name}
                                        </td>
                                        <td className="px-5 py-3 text-gray-400">
                                            {user.email}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    user.role === 'معلم'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-blue-500/20 text-blue-400'
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-400">
                                            {user.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
