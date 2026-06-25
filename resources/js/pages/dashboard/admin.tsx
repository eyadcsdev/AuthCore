import { Head, Link, usePage } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import AdminLayout from '../../components/AdminLayout';
import PageHeader from '../../components/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { cn } from '../../lib/cn';

const stats = [
    { label: 'إجمالي المستخدمين', value: '٢,٨٤٧', change: '١٢٪+', accent: 'accent' },
    { label: 'المعلمين', value: '١٢٨', change: '٤٪+', accent: 'success' },
    { label: 'الطلاب', value: '٢,٣٤٠', change: '١٥٪+', accent: 'purple' },
    { label: 'الأقسام', value: '١٢', change: '٠٪', accent: 'warning' },
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

const accentMap: Record<string, string> = {
    accent: 'bg-accent',
    success: 'bg-success',
    purple: 'bg-purple',
    warning: 'bg-warning',
};

const AdminDashboard = () => {
    const route = useRoute();
    const { pending_count } = usePage().props as any;

    return (
        <AdminLayout title="لوحة تحكم المشرف">
            <Head title="لوحة التحكم - المشرف" />

            <div className="space-y-6">
                <PageHeader
                    title="لوحة تحكم المشرف"
                    description="مرحباً بعودتك، المشرف. إليك ما يحدث اليوم."
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.label}>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-text-muted">{stat.label}</p>
                                <div className={cn('h-2.5 w-2.5 rounded-full', accentMap[stat.accent])} />
                            </div>
                            <p className="mt-2 text-3xl font-bold text-text-primary">{stat.value}</p>
                            <p className="mt-1 text-sm text-success">{stat.change}</p>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <h2 className="mb-4 text-base font-semibold text-text-primary">التسجيلات الشهرية</h2>
                        <div className="flex items-end gap-2" style={{ height: 160 }}>
                            {monthlyRegistrations.map((r) => (
                                <div
                                    key={r.month}
                                    className="group relative flex flex-1 flex-col items-center"
                                >
                                    <div
                                        className="w-full rounded-t bg-accent transition-all hover:bg-accent-hover"
                                        style={{ height: `${(r.users / maxReg) * 140}px` }}
                                    />
                                    <span className="mt-1 text-xs text-text-muted">{r.month}</span>
                                    <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-bg-elevated px-2 py-1 text-xs text-text-primary group-hover:block">
                                        {r.users} مستخدم
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <h2 className="mb-4 text-base font-semibold text-text-primary">طلبات التسجيل</h2>
                            <div className="flex flex-col items-center gap-3 py-4 text-center">
                                <div className={cn(
                                    'flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white',
                                    pending_count > 0 ? 'bg-danger' : 'bg-success',
                                )}>
                                    {pending_count}
                                </div>
                                <p className="text-sm text-text-muted">
                                    {pending_count > 0
                                        ? `يوجد ${pending_count} طلب ${pending_count === 1 ? 'بانتظار' : 'بانتظار'} الموافقة`
                                        : 'لا توجد طلبات معلقة'}
                                </p>
                                {pending_count > 0 && (
                                    <Link href={route('admin.pending-users.index')}>
                                        <Button variant="primary" size="sm">
                                            عرض الطلبات
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Card>

                        <Card>
                            <h2 className="mb-4 text-base font-semibold text-text-primary">نظرة سريعة</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">التخزين</span>
                                        <span className="text-text-primary">٦٤٪</span>
                                    </div>
                                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-bg-elevated">
                                        <div className="h-full rounded-full bg-accent" style={{ width: '64%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">حمل الخادم</span>
                                        <span className="text-text-primary">٤٢٪</span>
                                    </div>
                                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-bg-elevated">
                                        <div className="h-full rounded-full bg-success" style={{ width: '42%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">الجلسات النشطة</span>
                                        <span className="text-text-primary">١,٢٨٤</span>
                                    </div>
                                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-bg-elevated">
                                        <div className="h-full rounded-full bg-purple" style={{ width: '78%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-muted">وقت تشغيل النظام</span>
                                        <span className="text-text-primary">٩٩.٩٪</span>
                                    </div>
                                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-bg-elevated">
                                        <div className="h-full rounded-full bg-warning" style={{ width: '99%' }} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <Card>
                    <h2 className="mb-4 text-base font-semibold text-text-primary">أحدث التسجيلات</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>الاسم</TableHeaderCell>
                                <TableHeaderCell>البريد</TableHeaderCell>
                                <TableHeaderCell>الدور</TableHeaderCell>
                                <TableHeaderCell>تاريخ الانضمام</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentUsers.map((user) => (
                                <TableRow key={user.email}>
                                    <TableCell className="font-medium text-text-primary">{user.name}</TableCell>
                                    <TableCell className="text-text-muted">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'معلم' ? 'success' : 'info'}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-text-muted">{user.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
