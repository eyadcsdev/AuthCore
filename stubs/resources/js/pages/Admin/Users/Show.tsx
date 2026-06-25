import { Head, Link, router, useForm } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import AdminLayout from '../../../components/AdminLayout';
import PageHeader from '../../../components/PageHeader';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Button } from '../../../components/ui/Button';

interface RoleSimple {
    id: number;
    name: string;
    slug: string;
}

interface PermSimple {
    id: number;
    slug: string;
    group_name: string;
}

interface UserRole extends RoleSimple {
    permissions: PermSimple[];
}

interface UserData {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    status: string;
    requested_role: string | null;
    email_verified_at: string | null;
    created_at: string;
    roles: UserRole[];
    all_permissions: PermSimple[];
}

const statusVariant: Record<string, 'warning' | 'success' | 'danger' | 'default'> = {
    pending: 'warning',
    active: 'success',
    rejected: 'danger',
    suspended: 'default',
};

export default function UsersShow({
    user,
    allRoles,
}: {
    user: UserData;
    allRoles: RoleSimple[];
}) {
    const route = useRoute();
    const { data, setData, post, processing } = useForm({
        roles: user.roles.map((r) => r.id),
    });

    const toggleRole = (roleId: number) => {
        const current = data.roles;
        if (current.includes(roleId)) {
            setData({ ...data, roles: current.filter((r) => r !== roleId) });
        } else {
            setData({ ...data, roles: [...current, roleId] });
        }
    };

    const saveRoles = () => {
        post(route('admin.users.roles.assign', user.id));
    };

    const handleUserAction = (action: string) => {
        const actionRoutes: Record<string, string> = {
            activate: 'admin.users.activate',
            suspend: 'admin.users.suspend',
        };
        router.post(route(actionRoutes[action], user.id));
    };

    const groupedPermissions: Record<string, PermSimple[]> = {};
    user.all_permissions.forEach((p) => {
        const group = p.group_name || 'أخرى';
        if (!groupedPermissions[group]) groupedPermissions[group] = [];
        groupedPermissions[group].push(p);
    });

    return (
        <AdminLayout title={`المستخدم: ${user.name}`}>
            <Head title={`المستخدم: ${user.name}`} />

            <div className="space-y-6">
                <PageHeader
                    title={user.name}
                    description={user.email}
                    actions={
                        <Link href={route('admin.users.index')}>
                            <Button variant="secondary">العودة</Button>
                        </Link>
                    }
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-1">
                        <Card title="معلومات المستخدم">
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs text-text-muted">الاسم</span>
                                    <p className="text-sm text-text-primary">{user.name}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-text-muted">البريد</span>
                                    <p className="text-sm text-text-primary">{user.email}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-text-muted">الهاتف</span>
                                    <p className="text-sm text-text-primary">{user.phone || '-'}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-text-muted">الحالة</span>
                                    <div className="mt-1">
                                        <Badge variant={statusVariant[user.status] ?? 'default'}>
                                            {user.status === 'pending' ? 'قيد الانتظار' :
                                             user.status === 'active' ? 'نشط' :
                                             user.status === 'rejected' ? 'مرفوض' :
                                             user.status === 'suspended' ? 'موقوف' : user.status}
                                        </Badge>
                                    </div>
                                </div>
                                {user.requested_role && (
                                    <div>
                                        <span className="text-xs text-text-muted">الدور المطلوب</span>
                                        <p className="text-sm text-text-primary">{user.requested_role}</p>
                                    </div>
                                )}
                                <div>
                                    <span className="text-xs text-text-muted">تاريخ التسجيل</span>
                                    <p className="text-sm text-text-primary">{user.created_at}</p>
                                </div>
                            </div>
                        </Card>

                        {user.status === 'active' && (
                            <Button
                                variant="danger"
                                className="w-full"
                                onClick={() => handleUserAction('suspend')}
                            >
                                تعليق الحساب
                            </Button>
                        )}
                        {user.status === 'suspended' && (
                            <Button
                                variant="primary"
                                className="w-full"
                                onClick={() => handleUserAction('activate')}
                            >
                                إعادة تنشيط الحساب
                            </Button>
                        )}
                    </div>

                    <div className="space-y-6 lg:col-span-2">
                        <Card title="الأدوار">
                            <div className="space-y-2">
                                {allRoles.map((role) => (
                                    <Checkbox
                                        key={role.id}
                                        label={`${role.name} (${role.slug})`}
                                        checked={data.roles.includes(role.id)}
                                        onChange={() => toggleRole(role.id)}
                                    />
                                ))}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button
                                    variant="primary"
                                    onClick={saveRoles}
                                    disabled={processing}
                                >
                                    {processing ? 'جاري الحفظ...' : 'حفظ الأدوار'}
                                </Button>
                            </div>
                        </Card>

                        <Card title={`الصلاحيات الممنوحة (${user.all_permissions.length})`}>
                            {user.all_permissions.length === 0 ? (
                                <p className="text-sm text-text-muted">
                                    لا توجد صلاحيات ممنوحة - المستخدم بحاجة إلى دور
                                </p>
                            ) : (
                                Object.entries(groupedPermissions).map(([group, perms]) => (
                                    <div key={group} className="mb-4 last:mb-0">
                                        <h3 className="mb-2 text-sm font-semibold text-text-secondary">
                                            {group}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {perms.map((perm) => (
                                                <Badge key={perm.id} variant="success">{perm.slug}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
