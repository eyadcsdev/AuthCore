import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';

const stats = [
    { label: 'إجمالي الطلاب', value: '١٥٦', change: '٨٪+', color: 'blue' },
    { label: 'المقررات النشطة', value: '٦', change: '٢+', color: 'green' },
    { label: 'متوسط الدرجات', value: '٨٧.٤٪', change: '٣.٢٪+', color: 'purple' },
    { label: 'نسبة الحضور', value: '٩٤٪', change: '١٪+', color: 'amber' },
];

const courses = [
    { name: 'الرياضيات ١٠١', students: 32, grade: 88, color: 'blue' },
    { name: 'الفيزياء ٢٠١', students: 28, grade: 82, color: 'green' },
    { name: 'علوم الحاسب', students: 45, grade: 91, color: 'purple' },
    { name: 'الأدب الإنجليزي', students: 24, grade: 79, color: 'amber' },
    { name: 'الكيمياء ١٠١', students: 27, grade: 85, color: 'red' },
];

const submissions = [
    { student: 'عمر يوسف', course: 'الرياضيات ١٠١', status: 'مصحح', grade: 92 },
    { student: 'نورا أحمد', course: 'الفيزياء ٢٠١', status: 'قيد الانتظار', grade: null },
    { student: 'علي حسن', course: 'علوم الحاسب', status: 'مصحح', grade: 88 },
    { student: 'منى إبراهيم', course: 'الأدب الإنجليزي', status: 'قيد الانتظار', grade: null },
    { student: 'يوسف كمال', course: 'الكيمياء ١٠١', status: 'مصحح', grade: 76 },
];

const upcomingClasses = [
    { day: 'اليوم', time: '١٠:٠٠ ص', course: 'الرياضيات ١٠١', room: 'القاعة أ' },
    { day: 'اليوم', time: '١:٠٠ م', course: 'الفيزياء ٢٠١', room: 'المختبر ٣' },
    { day: 'غداً', time: '٩:٠٠ ص', course: 'علوم الحاسب', room: 'القاعة ٧' },
    { day: 'غداً', time: '١١:٠٠ ص', course: 'الأدب الإنجليزي', room: 'القاعة ب' },
];

const colorBar: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
};

const TeacherDashboard = () => {
    const route = useRoute();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100" dir="rtl">
            <Head title="لوحة التحكم - المعلم" />

            <div className="border-b border-gray-700 bg-gray-800/80 px-6 py-4 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">لوحة تحكم المعلم</h1>
                        <p className="text-sm text-gray-400">
                            مرحباً بعودتك. قم بإدارة مقرراتك وطلابك.
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
                            <p className="mt-1 text-sm text-green-400">{stat.change}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 lg:col-span-2">
                        <h2 className="mb-4 text-lg font-semibold">
                            أداء المقررات
                        </h2>
                        <div className="space-y-4">
                            {courses.map((course) => (
                                <div key={course.name}>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`h-2.5 w-2.5 rounded-full ${colorBar[course.color]}`}
                                            />
                                            <span className="font-medium">
                                                {course.name}
                                            </span>
                                        </div>
                                        <span className="text-gray-400">
                                            {course.students} طالب
                                        </span>
                                    </div>
                                    <div className="mt-1 flex items-center gap-3">
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                                            <div
                                                className={`h-full rounded-full ${colorBar[course.color]}`}
                                                style={{ width: `${course.grade}%` }}
                                            />
                                        </div>
                                        <span className="w-10 text-right text-sm font-medium">
                                            {course.grade}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
                        <h2 className="mb-4 text-lg font-semibold">
                            جدول اليوم
                        </h2>
                        <div className="space-y-3">
                            {upcomingClasses.map((cls, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-gray-700 bg-gray-750 p-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-xs font-medium ${
                                                cls.day === 'اليوم'
                                                    ? 'text-blue-400'
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            {cls.day}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {cls.time}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm font-medium">
                                        {cls.course}
                                    </p>
                                    <p className="text-xs text-gray-400">{cls.room}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-700 bg-gray-800">
                    <div className="border-b border-gray-700 px-5 py-4">
                        <h2 className="text-lg font-semibold">
                            أحدث التسليمات
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-sm">
                            <thead>
                                <tr className="border-b border-gray-700 text-gray-400">
                                    <th className="px-5 py-3 font-medium">الطالب</th>
                                    <th className="px-5 py-3 font-medium">المقرر</th>
                                    <th className="px-5 py-3 font-medium">الحالة</th>
                                    <th className="px-5 py-3 font-medium">الدرجة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((s, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-gray-700/50 last:border-0 hover:bg-gray-700/30"
                                    >
                                        <td className="px-5 py-3 font-medium">
                                            {s.student}
                                        </td>
                                        <td className="px-5 py-3 text-gray-400">
                                            {s.course}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    s.status === 'مصحح'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-yellow-500/20 text-yellow-400'
                                                }`}
                                            >
                                                {s.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-gray-400">
                                            {s.grade ?? '—'}
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

export default TeacherDashboard;
