import { Head, Link, router } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import PageHeader from '../../../components/PageHeader';
import { Card } from '../../../components/ui/Card';
import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from '../../../components/ui/Table';
import { Pagination } from '../../../components/ui/Pagination';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Badge } from '../../../components/ui/Badge';

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    users_count: number;
    permissions_count: number;
}

interface PaginatedData {
    data: Role[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export default function RolesIndex({
    roles,
    filters,
}: {
    roles: PaginatedData;
    filters: { search?: string };
}) {
    const route = useRoute();
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.roles.index'), { search });
    };

    const handleDelete = (role: Role) => {
        if (!confirm(`هل أنت متأكد من حذف الدور "${role.name}"؟`)) return;
        router.delete(route('admin.roles.destroy', role.id));
    };

    return (
        <AdminLayout title="إدارة الأدوار">
            <Head title="إدارة الأدوار" />

            <div className="space-y-6">
                <PageHeader
                    title="إدارة الأدوار"
                    description="إدارة أدوار المستخدمين والصلاحيات"
                    actions={
                        <Link href={route('admin.roles.create')}>
                            <Button variant="primary">إنشاء دور جديد</Button>
                        </Link>
                    }
                />

                <form onSubmit={handleSearch}>
                    <div className="flex max-w-md gap-3">
                        <Input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="بحث عن دور..."
                        />
                        <Button type="submit" variant="secondary">بحث</Button>
                    </div>
                </form>

                <Card>
                    {roles.data.length === 0 ? (
                        <EmptyState
                            title="لا توجد أدوار"
                            description="لم يتم إنشاء أي أدوار بعد."
                        />
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>الاسم</TableHeaderCell>
                                    <TableHeaderCell>الوصف</TableHeaderCell>
                                    <TableHeaderCell>المستخدمين</TableHeaderCell>
                                    <TableHeaderCell>الصلاحيات</TableHeaderCell>
                                    <TableHeaderCell>الإجراءات</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roles.data.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>
                                            <Link
                                                href={route('admin.roles.show', role.id)}
                                                className="font-medium text-accent hover:text-accent-hover"
                                            >
                                                {role.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-text-muted">
                                            {role.description || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="info">{role.users_count}</Badge>
                                        </TableCell>
                                        <TableCell>{role.permissions_count}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Link href={route('admin.roles.edit', role.id)}>
                                                    <Button variant="secondary" size="sm">تعديل</Button>
                                                </Link>
                                                {role.slug !== 'super-admin' && (
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(role)}
                                                    >
                                                        حذف
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                    {roles.last_page > 1 && (
                        <div className="border-t border-border-default px-5 py-4">
                            <Pagination links={roles.links} />
                        </div>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}
