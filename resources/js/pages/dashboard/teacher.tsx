import { Head, Link } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import AdminLayout from '../../components/AdminLayout';
import PageHeader from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { cn } from '../../lib/cn';

const stats = [
    { label: 'إجمالي الطلاب', value: '١٥٦', change: '٨٪+', accent: 'accent' },
    { label: 'المقررات النشطة', value: '٦', change: '٢+', accent: 'success' },
    { label: 'متوسط الدرجات', value: '٨٧.٤٪', change: '٣.٢٪+', accent: 'purple' },
    { label: 'نسبة الحضور', value: '٩٤٪', change: '١٪+', accent: 'warning' },
];

const courses = [
    { name: 'الرياضيات ١٠١', students: 32, grade: 88 },
    { name: 'الفيزياء ٢٠١', students: 28, grade: 82 },
    { name: 'علوم الحاسب', students: 45, grade: 91 },
    { name: 'الأدب الإنجليزي', students: 24, grade: 79 },
    { name: 'الكيمياء ١٠١', students: 27, grade: 85 },
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

const accentMap: Record<string, string> = {
    accent: 'bg-accent',
    success: 'bg-success',
    purple: 'bg-purple',
    warning: 'bg-warning',
};

const gradeColor = (grade: number) => {
    if (grade >= 90) return 'text-success';
    if (grade >= 80) return 'text-accent-hover';
    if (grade >= 70) return 'text-warning';
    return 'text-danger';
};

export default function TeacherDashboard() {
    const route = useRoute();

    return (
        <AdminLayout title="لوحة المعلم">
            <Head title="لوحة المعلم" />

            <div className="space-y-6">
                <PageHeader
                    title="لوحة المعلم"
                    description="مرحباً بعودتك! إليك ملخص المقررات والطلاب"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.label}>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-text-muted">{stat.label}</p>
                                <div className={cn('h-2 w-2 rounded-full', accentMap[stat.accent])} />
                            </div>
                            <p className="mt-3 text-2xl font-bold text-text-primary">{stat.value}</p>
                            {stat.change && (
                                <p className="mt-1 text-xs text-success">{stat.change}</p>
                            )}
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <h2 className="mb-4 text-base font-semibold text-text-primary">المقررات الدراسية</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>المقرر</TableHeaderCell>
                                    <TableHeaderCell>الطلاب</TableHeaderCell>
                                    <TableHeaderCell>متوسط الدرجات</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((c) => (
                                    <TableRow key={c.name}>
                                        <TableCell className="font-medium text-text-primary">{c.name}</TableCell>
                                        <TableCell>{c.students}</TableCell>
                                        <TableCell>
                                            <span className={cn('font-semibold', gradeColor(c.grade))}>
                                                {c.grade}٪
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                    <Card>
                        <h2 className="mb-4 text-base font-semibold text-text-primary">المحاضرات القادمة</h2>
                        <div className="space-y-2">
                            {upcomingClasses.map((c, i) => (
                                <div key={i} className="rounded-lg border border-border-default bg-bg-base p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-text-primary">{c.course}</span>
                                        <Badge variant="info">{c.day}</Badge>
                                    </div>
                                    <p className="mt-1 text-xs text-text-muted">{c.time} · {c.room}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <Card>
                    <h2 className="mb-4 text-base font-semibold text-text-primary">آخر التسليمات</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>الطالب</TableHeaderCell>
                                <TableHeaderCell>المقرر</TableHeaderCell>
                                <TableHeaderCell>الحالة</TableHeaderCell>
                                <TableHeaderCell>الدرجة</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submissions.map((s, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium text-text-primary">{s.student}</TableCell>
                                    <TableCell>{s.course}</TableCell>
                                    <TableCell>
                                        <Badge variant={s.status === 'مصحح' ? 'success' : 'warning'}>
                                            {s.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {s.grade ? (
                                            <span className={cn('font-semibold', gradeColor(s.grade))}>{s.grade}</span>
                                        ) : (
                                            <span className="text-text-muted">-</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AdminLayout>
    );
}
