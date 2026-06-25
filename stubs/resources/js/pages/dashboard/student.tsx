import { Head, Link } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import AdminLayout from '../../components/AdminLayout';
import PageHeader from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { cn } from '../../lib/cn';

const stats = [
    { label: 'المقررات المسجلة', value: '٥', change: '', accent: 'accent' },
    { label: 'إجمالي الساعات', value: '٧٢', change: '+١٥ هذا الفصل', accent: 'success' },
    { label: 'المعدل التراكمي', value: '٣.٦', change: '٠.٢+', accent: 'purple' },
    { label: 'نسبة الحضور', value: '٩٦٪', change: 'هذا الشهر', accent: 'warning' },
];

const courses = [
    { code: 'MATH١٠١', name: 'التفاضل والتكامل', instructor: 'د. أحمد', grade: 91, letter: 'أ' },
    { code: 'PHYS٢٠١', name: 'الفيزياء', instructor: 'د. سارة', grade: 78, letter: 'ب' },
    { code: 'CS٣٠١', name: 'هياكل البيانات', instructor: 'د. خالد', grade: 95, letter: 'أ+' },
    { code: 'ENG١٠١', name: 'التعبير الإنجليزي', instructor: 'أ. ليلى', grade: 88, letter: 'ب+' },
    { code: 'ARB٢٠١', name: 'النحو والصرف', instructor: 'د. محمود', grade: 82, letter: 'ب' },
];

const assignments = [
    { name: 'الواجب الثالث: المشتقات', course: 'التفاضل والتكامل', due: 'بعد ٣ أيام', status: 'معلق' },
    { name: 'تقرير المختبر', course: 'الفيزياء', due: 'بعد أسبوع', status: 'قيد التنفيذ' },
    { name: 'مشروع هياكل البيانات', course: 'هياكل البيانات', due: 'بعد أسبوعين', status: 'قيد التنفيذ' },
    { name: 'مقال أدبي', course: 'التعبير الإنجليزي', due: 'غداً!', status: 'متأخر' },
];

const accentMap: Record<string, string> = {
    accent: 'bg-accent',
    success: 'bg-success',
    purple: 'bg-purple',
    warning: 'bg-warning',
};

const statusVariant: Record<string, 'warning' | 'info' | 'danger'> = {
    'معلق': 'warning',
    'قيد التنفيذ': 'info',
    'متأخر': 'danger',
};

const gradeColor = (grade: number) => {
    if (grade >= 90) return 'text-success';
    if (grade >= 80) return 'text-accent-hover';
    if (grade >= 70) return 'text-warning';
    return 'text-danger';
};

export default function StudentDashboard() {
    const route = useRoute();

    return (
        <AdminLayout title="لوحة الطالب">
            <Head title="لوحة الطالب" />

            <div className="space-y-6">
                <PageHeader
                    title="لوحة الطالب"
                    description="مرحباً بعودتك! إليك ملخص المقررات والواجبات"
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
                                    <TableHeaderCell>الكود</TableHeaderCell>
                                    <TableHeaderCell>المدرس</TableHeaderCell>
                                    <TableHeaderCell>الدرجة</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((c) => (
                                    <TableRow key={c.code}>
                                        <TableCell className="font-medium text-text-primary">{c.name}</TableCell>
                                        <TableCell className="text-text-muted">{c.code}</TableCell>
                                        <TableCell>{c.instructor}</TableCell>
                                        <TableCell>
                                            <span className={cn('font-semibold', gradeColor(c.grade))}>
                                                {c.letter} ({c.grade})
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                    <Card>
                        <h2 className="mb-4 text-base font-semibold text-text-primary">الواجبات القادمة</h2>
                        <div className="space-y-3">
                            {assignments.map((a, i) => (
                                <div key={i} className="rounded-lg border border-border-default bg-bg-base p-3">
                                    <div className="mb-1 flex items-start justify-between gap-2">
                                        <span className="text-sm font-medium text-text-primary">{a.name}</span>
                                        <Badge variant={statusVariant[a.status]}>{a.status}</Badge>
                                    </div>
                                    <p className="text-xs text-text-muted">{a.course}</p>
                                    <p className="mt-1 text-xs text-text-muted">تاريخ التسليم: {a.due}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
