import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';

const stats = [
    { label: 'أعضاء هيئة التدريس', value: '٢٤', change: '٢+ هذا العام', color: 'blue' },
    { label: 'الطلاب المسجلين', value: '٤٨٦', change: '٧.٢٪+', color: 'green' },
    { label: 'البرامج النشطة', value: '٨', change: '', color: 'purple' },
    { label: 'الأبحاث المنشورة', value: '٤٣', change: '١٢+ هذا العام', color: 'amber' },
];

const programs = [
    { name: 'علوم الحاسب', students: 142, faculty: 8, graduation: '٩٢٪', color: 'blue' },
    { name: 'الهندسة الكهربائية', students: 98, faculty: 5, graduation: '٨٨٪', color: 'green' },
    { name: 'الهندسة الميكانيكية', students: 76, faculty: 4, graduation: '٨٥٪', color: 'purple' },
    { name: 'إدارة الأعمال', students: 112, faculty: 5, graduation: '٩٠٪', color: 'amber' },
    { name: 'الهندسة المعمارية', students: 58, faculty: 3, graduation: '٨٧٪', color: 'red' },
];

const faculty = [
    { name: 'د. إبراهيم حسن', title: 'أستاذ', department: 'علوم الحاسب', students: 45 },
    { name: 'د. نادية يوسف', title: 'أستاذ مشارك', department: 'الهندسة الكهربائية', students: 38 },
    { name: 'د. سمير لطفي', title: 'أستاذ', department: 'الهندسة الميكانيكية', students: 32 },
    { name: 'د. هالة محمود', title: 'أستاذ مساعد', department: 'إدارة الأعمال', students: 40 },
    { name: 'د. تامر عادل', title: 'محاضر', department: 'الهندسة المعمارية', students: 28 },
];

const colorBar: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
};

const DepartmentDashboard = () => {
    const route = useRoute();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100" dir="rtl">
            <Head title="لوحة التحكم - القسم" />

            <div className="border-b border-gray-700 bg-gray-800/80 px-6 py-4 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">لوحة تحكم القسم</h1>
                        <p className="text-sm text-gray-400">
                            نظرة عامة على أعضاء هيئة التدريس والبرامج ومؤشرات القسم.
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
                                    className={`h-2.5 w-2.5 rounded-full ${colorBar[stat.color]}`}
                                />
                            </div>
                            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                            <p className="mt-1 text-sm text-green-400">
                                {stat.change}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 lg:col-span-2">
                        <h2 className="mb-4 text-lg font-semibold">
                            التسجيل في البرامج
                        </h2>
                        <div className="space-y-4">
                            {programs.map((p) => (
                                <div key={p.name}>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${colorBar[p.color]}`}
                                            />
                                            <span className="font-medium">
                                                {p.name}
                                            </span>
                                        </div>
                                        <span className="text-gray-400">
                                            {p.students} طالب
                                        </span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-3">
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                                            <div
                                                className={`h-full rounded-full ${colorBar[p.color]}`}
                                                style={{
                                                    width: `${(p.students / 142) * 100}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="w-14 text-right text-xs text-gray-400">
                                            {p.faculty} عضو هيئة
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
                        <h2 className="mb-4 text-lg font-semibold">
                            مؤشرات سريعة
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        نسبة الطلاب لأعضاء التدريس
                                    </span>
                                    <span>٢٠:١</span>
                                </div>
                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-blue-500"
                                        style={{ width: '65%' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        نسبة التخرج
                                    </span>
                                    <span>٨٨٪</span>
                                </div>
                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-green-500"
                                        style={{ width: '88%' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        استخدام الميزانية
                                    </span>
                                    <span>٧٤٪</span>
                                </div>
                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-purple-500"
                                        style={{ width: '74%' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        الإنتاج البحثي
                                    </span>
                                    <span>٤٣ ورقة</span>
                                </div>
                                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-amber-500"
                                        style={{ width: '60%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-700 bg-gray-800">
                    <div className="border-b border-gray-700 px-5 py-4">
                        <h2 className="text-lg font-semibold">أعضاء هيئة التدريس</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-sm">
                            <thead>
                                <tr className="border-b border-gray-700 text-gray-400">
                                    <th className="px-5 py-3 font-medium">الاسم</th>
                                    <th className="px-5 py-3 font-medium">اللقب</th>
                                    <th className="px-5 py-3 font-medium">
                                        القسم
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        الطلاب
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {faculty.map((f) => (
                                    <tr
                                        key={f.name}
                                        className="border-b border-gray-700/50 last:border-0 hover:bg-gray-700/30"
                                    >
                                        <td className="px-5 py-3 font-medium">
                                            {f.name}
                                        </td>
                                        <td className="px-5 py-3 text-gray-400">
                                            {f.title}
                                        </td>
                                        <td className="px-5 py-3 text-gray-400">
                                            {f.department}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                                                {f.students}
                                            </span>
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

export default DepartmentDashboard;
