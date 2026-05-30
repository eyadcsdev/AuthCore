import { Head, Link } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import AdminLayout from '../../components/AdminLayout';
import PageHeader from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { cn } from '../../lib/cn';

const stats = [
    { label: 'أعضاء هيئة التدريس', value: '٢٤', change: '٢+ هذا العام', accent: 'accent' },
    { label: 'الطلاب المسجلين', value: '٤٨٦', change: '٧.٢٪+', accent: 'success' },
    { label: 'البرامج النشطة', value: '٨', change: '', accent: 'purple' },
    { label: 'الأبحاث المنشورة', value: '٤٣', change: '١٢+ هذا العام', accent: 'warning' },
];

const programs = [
    { name: 'علوم الحاسب', students: 142, faculty: 8, graduation: '٩٢٪' },
    { name: 'الهندسة الكهربائية', students: 98, faculty: 5, graduation: '٨٨٪' },
    { name: 'الهندسة الميكانيكية', students: 76, faculty: 4, graduation: '٨٥٪' },
    { name: 'إدارة الأعمال', students: 112, faculty: 5, graduation: '٩٠٪' },
    { name: 'الهندسة المعمارية', students: 58, faculty: 3, graduation: '٨٧٪' },
];

const faculty = [
    { name: 'د. إبراهيم حسن', title: 'أستاذ', department: 'علوم الحاسب', students: 45 },
    { name: 'د. نادية يوسف', title: 'أستاذ مشارك', department: 'الهندسة الكهربائية', students: 38 },
    { name: 'د. سمير لطفي', title: 'أستاذ', department: 'الهندسة الميكانيكية', students: 32 },
    { name: 'د. هالة محمود', title: 'أستاذ مساعد', department: 'إدارة الأعمال', students: 40 },
    { name: 'د. تامر عادل', title: 'محاضر', department: 'الهندسة المعمارية', students: 28 },
];

const accentMap: Record<string, string> = {
    accent: 'bg-accent',
    success: 'bg-success',
    purple: 'bg-purple',
    warning: 'bg-warning',
};

export default function DepartmentDashboard() {
    const route = useRoute();

    return (
        <AdminLayout title="لوحة القسم">
            <Head title="لوحة القسم" />

            <div className="space-y-6">
                <PageHeader
                    title="لوحة القسم"
                    description="مرحباً بعودتك! إليك ملخص البرامج وأعضاء هيئة التدريس"
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

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <h2 className="mb-4 text-base font-semibold text-text-primary">البرامج الأكاديمية</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>البرنامج</TableHeaderCell>
                                    <TableHeaderCell>الطلاب</TableHeaderCell>
                                    <TableHeaderCell>أعضاء التدريس</TableHeaderCell>
                                    <TableHeaderCell>نسبة التخرج</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {programs.map((p) => (
                                    <TableRow key={p.name}>
                                        <TableCell className="font-medium text-text-primary">{p.name}</TableCell>
                                        <TableCell>{p.students}</TableCell>
                                        <TableCell>{p.faculty}</TableCell>
                                        <TableCell className="text-success">{p.graduation}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                    <Card>
                        <h2 className="mb-4 text-base font-semibold text-text-primary">أعضاء هيئة التدريس</h2>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>الاسم</TableHeaderCell>
                                    <TableHeaderCell>اللقب</TableHeaderCell>
                                    <TableHeaderCell>القسم</TableHeaderCell>
                                    <TableHeaderCell>الطلاب</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {faculty.map((f) => (
                                    <TableRow key={f.name}>
                                        <TableCell className="font-medium text-text-primary">{f.name}</TableCell>
                                        <TableCell className="text-text-muted">{f.title}</TableCell>
                                        <TableCell>{f.department}</TableCell>
                                        <TableCell>{f.students}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
