import { Head, Link, router } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import PageHeader from '../../../components/PageHeader';
import { Card } from '../../../components/ui/Card';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '../../../components/ui/Table';
import { Pagination } from '../../../components/ui/Pagination';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Badge } from '../../../components/ui/Badge';

interface PendingUser {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    requested_role: string | null;
    created_at: string;
}

interface PaginatedData {
    data: PendingUser[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface RoleOption {
    id: number;
    name: string;
    slug: string;
}

export default function PendingUsers({
    users,
    roles,
    filters,
}: {
    users: PaginatedData;
    roles: RoleOption[];
    filters: { search?: string };
}) {
    const route = useRoute();
    const [search, setSearch] = useState(filters.search ?? '');
    const [approveRoles, setApproveRoles] = useState<Record<number, number>>({});

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.pending-users.index'), { search });
    };

    const handleApprove = (user: PendingUser) => {
        const roleId = approveRoles[user.id];
        router.post(route('admin.pending-users.approve', user.id), {
            role_id: roleId || undefined,
        });
    };

    const handleReject = (user: PendingUser) => {
        if (!confirm('هل أنت متأكد من رفض هذا المستخدم؟')) return;
        router.post(route('admin.pending-users.reject', user.id));
    };

    return (
        <AdminLayout title="طلبات التسجيل">
            <Head title="طلبات التسجيل" />

            <div className="space-y-6">
                <PageHeader
                    title="طلبات التسجيل"
                    description="مراجعة واعتماد طلبات التسجيل الجديدة"
                    actions={
                        <Link href={route('admin.users.index')}>
                            <Button variant="secondary">إدارة المستخدمين</Button>
                        </Link>
                    }
                />

                <form onSubmit={handleSearch}>
                    <div className="flex max-w-md gap-3">
                        <Input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="بحث بالاسم أو البريد..."
                        />
                        <Button type="submit" variant="secondary">بحث</Button>
                    </div>
                </form>

                <Card>
                    {users.data.length === 0 ? (
                        <EmptyState
                            title="لا توجد طلبات معلقة"
                            description="جميع طلبات التسجيل تمت معالجتها."
                        />
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>الاسم</TableHeaderCell>
                                    <TableHeaderCell>البريد</TableHeaderCell>
                                    <TableHeaderCell>الدور المطلوب</TableHeaderCell>
                                    <TableHeaderCell>تاريخ الطلب</TableHeaderCell>
                                    <TableHeaderCell>الدور الممنوح</TableHeaderCell>
                                    <TableHeaderCell>الإجراءات</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium text-text-primary">{user.name}</TableCell>
                                        <TableCell className="text-text-muted">{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="warning">
                                                {user.requested_role || 'غير محدد'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-text-muted">{user.created_at}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={approveRoles[user.id]?.toString() ?? ''}
                                                onChange={(e) =>
                                                    setApproveRoles({
                                                        ...approveRoles,
                                                        [user.id]: Number(e.target.value),
                                                    })
                                                }
                                                options={[
                                                    { value: '', label: 'اختيار الدور' },
                                                    ...roles.map((role) => ({ value: role.id.toString(), label: role.name })),
                                                ]}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleApprove(user)}
                                                >
                                                    قبول
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleReject(user)}
                                                >
                                                    رفض
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    {users.last_page > 1 && (
                        <div className="border-t border-border-default px-5 py-4">
                            <Pagination links={users.links} />
                        </div>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}
