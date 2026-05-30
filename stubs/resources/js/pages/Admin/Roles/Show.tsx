import { Head, Link } from '@inertiajs/react';
import { useRoute } from '../../../../../vendor/tightenco/ziggy';
import AdminLayout from '../../../components/AdminLayout';
import PageHeader from '../../../components/PageHeader';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface Permission {
    id: number;
    slug: string;
    name: string;
    group_name: string;
}

interface RoleData {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    permissions: Permission[];
}

export default function RolesShow({
    role,
    permissionGroups,
}: {
    role: RoleData;
    permissionGroups: Record<string, Permission[]>;
}) {
    const route = useRoute();
    const rolePermissionIds = role.permissions.map((p) => p.id);

    return (
        <AdminLayout title={`الدور: ${role.name}`}>
            <Head title={`الدور: ${role.name}`} />

            <div className="space-y-6">
                <PageHeader
                    title={role.name}
                    description={role.description || 'لا يوجد وصف'}
                    actions={
                        <div className="flex gap-3">
                            <Link href={route('admin.roles.edit', role.id)}>
                                <Button variant="primary">تعديل</Button>
                            </Link>
                            <Link href={route('admin.roles.index')}>
                                <Button variant="secondary">العودة</Button>
                            </Link>
                        </div>
                    }
                />

                <Card>
                    <div>
                        <span className="text-sm text-text-muted">المعرف المختصر:</span>
                        <Badge variant="info" className="mr-2">{role.slug}</Badge>
                    </div>
                </Card>

                <Card title={`الصلاحيات (${role.permissions.length})`}>
                    {role.permissions.length === 0 ? (
                        <p className="text-sm text-text-muted">لا توجد صلاحيات ممنوحة لهذا الدور</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {Object.entries(permissionGroups).map(([group, permissions]) => {
                                const groupPermissions = permissions.filter((p) =>
                                    rolePermissionIds.includes(p.id)
                                );
                                if (groupPermissions.length === 0) return null;

                                return (
                                    <div key={group} className="rounded-lg border border-border-default bg-bg-base p-4">
                                        <h3 className="mb-2 text-sm font-semibold text-text-primary">
                                            {group}
                                        </h3>
                                        <div className="space-y-1">
                                            {groupPermissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center gap-2 text-sm text-text-secondary">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                                    {permission.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
}
