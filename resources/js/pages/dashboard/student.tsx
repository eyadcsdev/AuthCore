import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';

const stats = [
    { label: 'المقررات المسجلة', value: '٥', change: '', color: 'blue' },
    { label: 'إجمالي الساعات', value: '٧٢', change: '+١٥ هذا الفصل', color: 'green' },
    { label: 'المعدل التراكمي', value: '٣.٦', change: '٠.٢+', color: 'purple' },
    { label: 'نسبة الحضور', value: '٩٦٪', change: 'هذا الشهر', color: 'amber' },
];

const courses = [
    {
        code: 'MATH١٠١',
        name: 'التفاضل والتكامل',
        instructor: 'د. أحمد',
        grade: 91,
        letter: 'أ',
        color: 'blue',
    },
    {
        code: 'PHYS٢٠١',
        name: 'الفيزياء',
        instructor: 'د. سارة',
        grade: 78,
        letter: 'ب',
        color: 'green',
    },
    {
        code: 'CS٣٠١',
        name: 'هياكل البيانات',
        instructor: 'د. خالد',
        grade: 95,
        letter: 'أ+',
        color: 'purple',
    },
    {
        code: 'ENG١٠١',
        name: 'التعبير الإنجليزي',
        instructor: 'أ. ليلى',
        grade: 82,
        letter: 'ب+',
        color: 'amber',
    },
    {
        code: 'CHEM١٠١',
        name: 'الكيمياء العامة',
        instructor: 'د. نور',
        grade: 74,
        letter: 'ج+',
        color: 'red',
    },
];

const assignments = [
    { course: 'هياكل البيانات', title: 'واجب الأشجار الثنائية', due: 'غداً', urgent: true },
    { course: 'التفاضل والتكامل', title: 'مسائل التكامل', due: 'بعد ٣ أيام', urgent: false },
    { course: 'الفيزياء', title: 'تقرير معمل: البصريات', due: 'بعد ٥ أيام', urgent: false },
    { course: 'التعبير الإنجليزي', title: 'مسودة مقال', due: 'الأسبوع القادم', urgent: false },
];

const colorBar: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
};

const StudentDashboard = () => {
    const route = useRoute();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100" dir="rtl">
            <Head title="لوحة التحكم - الطالب" />

            <div className="border-b border-gray-700 bg-gray-800/80 px-6 py-4 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">لوحة تحكم الطالب</h1>
                        <p className="text-sm text-gray-400">
                            تابع مقرراتك ودرجاتك وواجباتك القادمة.
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
                            <p className="mt-1 text-sm text-gray-400">{stat.change}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 lg:col-span-2">
                        <h2 className="mb-4 text-lg font-semibold">درجاتي</h2>
                        <div className="space-y-4">
                            {courses.map((course) => (
                                <div key={course.code}>
                                    <div className="flex items-center justify-between text-sm">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${colorBar[course.color]}`}
                                                />
                                                <span className="font-medium">
                                                    {course.name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {course.code}
                                                </span>
                                            </div>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                {course.instructor}
                                            </p>
                                        </div>
                                        <div className="text-left">
                                            <span
                                                className={`text-lg font-bold ${
                                                    course.grade >= 90
                                                        ? 'text-green-400'
                                                        : course.grade >= 80
                                                          ? 'text-blue-400'
                                                          : course.grade >= 70
                                                            ? 'text-yellow-400'
                                                            : 'text-red-400'
                                                }`}
                                            >
                                                {course.letter}
                                            </span>
                                        </div>
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
                            الواجبات القادمة
                        </h2>
                        <div className="space-y-3">
                            {assignments.map((a, i) => (
                                <div
                                    key={i}
                                    className={`rounded-lg border p-3 ${
                                        a.urgent
                                            ? 'border-red-500/30 bg-red-500/10'
                                            : 'border-gray-700 bg-gray-750'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <p className="text-sm font-medium">
                                            {a.title}
                                        </p>
                                        {a.urgent && (
                                            <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-xs font-medium text-red-400">
                                                عاجل
                                            </span>
                                        )}
                                    </div>
                                    <p
                                        className={`mt-1 text-xs ${
                                            a.urgent
                                                ? 'text-red-400'
                                                : 'text-gray-400'
                                        }`}
                                    >
                                        {a.course} · التسليم: {a.due}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
                    <h2 className="mb-4 text-lg font-semibold">
                        الحضور الأسبوعي
                    </h2>
                    <div className="flex items-end gap-3" style={{ height: 100 }}>
                        {['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'].map(
                            (day, i) => {
                                const pcts = [100, 100, 100, 80, 100, 0];
                                const pct = pcts[i];
                                return (
                                    <div
                                        key={day}
                                        className="flex flex-1 flex-col items-center"
                                    >
                                        <div
                                            className={`w-full rounded-t ${
                                                pct >= 100
                                                    ? 'bg-green-500'
                                                    : pct >= 50
                                                      ? 'bg-yellow-500'
                                                      : 'bg-gray-600'
                                            }`}
                                            style={{
                                                height: `${pct * 0.8}px`,
                                            }}
                                        />
                                        <span className="mt-1 text-xs text-gray-500">
                                            {day}
                                        </span>
                                    </div>
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
