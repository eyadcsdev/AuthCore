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

interface UserRole {
    id: number;
    name: string;
    slug: string;
}

interface UserData {
    id: number;
    name: string;
    email: string;
    status: string;
    roles: UserRole[];
    created_at: string;
}

interface PaginatedData {
    data: UserData[];
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

const statusConfig: Record<string, { label: string; variant: 'warning' | 'success' | 'danger' | 'default' }> = {
    pending: { label: 'قيد الانتظار', variant: 'warning' },
    active: { label: 'نشط', variant: 'success' },
    rejected: { label: 'مرفوض', variant: 'danger' },
    suspended: { label: 'موقوف', variant: 'default' },
};

export default function UsersIndex({
    users,
    roles,
    filters,
}: {
    users: PaginatedData;
    roles: RoleOption[];
    filters: { search?: string; status?: string; role?: string };
}) {
    const route = useRoute();
    const [search, setSearch] = useState(filters.search ?? '');
    const [statusFilter, setStatusFilter] = useState(filters.status ?? '');
    const [roleFilter, setRoleFilter] = useState(filters.role ?? '');

    const applyFilters = () => {
        router.get(route('admin.users.index'), {
            search,
            status: statusFilter,
            role: roleFilter,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    return (
        <AdminLayout title="إدارة المستخدمين">
            <Head title="إدارة المستخدمين" />

            <div className="space-y-6">
                <PageHeader
                    title="إدارة المستخدمين"
                    description="عرض وإدارة المستخدمين والأدوار"
                    actions={
                        <Link href={route('admin.pending-users.index')}>
                            <Button variant="warning">طلبات التسجيل</Button>
                        </Link>
                    }
                />

                <form onSubmit={handleSearch}>
                    <div className="flex flex-wrap gap-3">
                        <Input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="بحث بالاسم أو البريد..."
                            className="min-w-[200px] flex-1"
                        />
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            options={[
                                { value: '', label: 'كل الحالات' },
                                { value: 'pending', label: 'قيد الانتظار' },
                                { value: 'active', label: 'نشط' },
                                { value: 'rejected', label: 'مرفوض' },
                                { value: 'suspended', label: 'موقوف' },
                            ]}
                        />
                        <Select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            options={[
                                { value: '', label: 'كل الأدوار' },
                                ...roles.map((role) => ({ value: role.slug, label: role.name })),
                            ]}
                        />
                        <Button type="submit" variant="secondary">بحث</Button>
                    </div>
                </form>

                <Card>
                    {users.data.length === 0 ? (
                        <EmptyState
                            title="لا يوجد مستخدمين"
                            description="لم يتم العثور على مستخدمين مطابقين."
                        />
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>الاسم</TableHeaderCell>
                                    <TableHeaderCell>البريد</TableHeaderCell>
                                    <TableHeaderCell>الحالة</TableHeaderCell>
                                    <TableHeaderCell>الأدوار</TableHeaderCell>
                                    <TableHeaderCell>تاريخ التسجيل</TableHeaderCell>
                                    <TableHeaderCell>الإجراءات</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.data.map((user) => {
                                    const statusInfo = statusConfig[user.status] ?? { label: user.status, variant: 'default' as const };
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium text-text-primary">{user.name}</TableCell>
                                            <TableCell className="text-text-muted">{user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {user.roles.map((role) => (
                                                        <Badge key={role.id} variant="info">{role.name}</Badge>
                                                    ))}
                                                    {user.roles.length === 0 && (
                                                        <span className="text-xs text-text-muted">-</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-text-muted">{user.created_at}</TableCell>
                                            <TableCell>
                                                <Link href={route('admin.users.show', user.id)}>
                                                    <Button variant="secondary" size="sm">عرض</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
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
