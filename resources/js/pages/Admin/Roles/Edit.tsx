import { Head, Link, useForm } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import AdminLayout from '../../../components/AdminLayout';
import PageHeader from '../../../components/PageHeader';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Alert } from '../../../components/ui/Alert';

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
    permissionIds: number[];
}

export default function RolesEdit({
    role,
    permissionGroups,
}: {
    role: RoleData;
    permissionGroups: Record<string, Permission[]>;
}) {
    const route = useRoute();
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        slug: role.slug,
        description: role.description ?? '',
        permissions: role.permissionIds,
    });

    const togglePermission = (id: number) => {
        const current = data.permissions;
        if (current.includes(id)) {
            setData({ ...data, permissions: current.filter((p) => p !== id) });
        } else {
            setData({ ...data, permissions: [...current, id] });
        }
    };

    const toggleGroup = (groupPermissions: Permission[], checked: boolean) => {
        const groupIds = groupPermissions.map((p) => p.id);
        if (checked) {
            const merged = [...new Set([...data.permissions, ...groupIds])];
            setData({ ...data, permissions: merged });
        } else {
            setData({ ...data, permissions: data.permissions.filter((p) => !groupIds.includes(p)) });
        }
    };

    const groupCheckedState = (groupPermissions: Permission[]) => {
        const groupIds = groupPermissions.map((p) => p.id);
        const selected = groupIds.filter((id) => data.permissions.includes(id)).length;
        if (selected === 0) return 'none';
        if (selected === groupIds.length) return 'all';
        return 'partial';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.roles.update', role.id));
    };

    return (
        <AdminLayout title={`تعديل الدور: ${role.name}`}>
            <Head title={`تعديل الدور: ${role.name}`} />

            <div className="space-y-6">
                <PageHeader
                    title={role.name}
                    description="تعديل بيانات الدور والصلاحيات"
                    actions={
                        <Link href={route('admin.roles.index')}>
                            <Button variant="secondary">العودة</Button>
                        </Link>
                    }
                />

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    <Card title="معلومات الدور">
                        <div className="space-y-4">
                            <Input
                                label="الاسم"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                error={errors.name}
                            />
                            <Input
                                label="المعرف المختصر"
                                value={data.slug}
                                onChange={(e) => setData({ ...data, slug: e.target.value })}
                                error={errors.slug}
                            />
                            <Textarea
                                label="الوصف"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                rows={2}
                            />
                        </div>
                    </Card>

                    {role.slug !== 'super-admin' ? (
                        <Card title="الصلاحيات">
                            {Object.entries(permissionGroups).map(([group, permissions]) => {
                                const state = groupCheckedState(permissions);
                                return (
                                    <div key={group} className="mb-4 last:mb-0">
                                        <Checkbox
                                            label={group}
                                            checked={state === 'all'}
                                            indeterminate={state === 'partial'}
                                            onChange={(e) => toggleGroup(permissions, e.target.checked)}
                                            hint={
                                                state === 'partial'
                                                    ? `${permissions.filter((p) => data.permissions.includes(p.id)).length} من ${permissions.length}`
                                                    : undefined
                                            }
                                        />
                                        <div className="mr-7 mt-2 space-y-1">
                                            {permissions.map((permission) => (
                                                <Checkbox
                                                    key={permission.id}
                                                    label={permission.name}
                                                    checked={data.permissions.includes(permission.id)}
                                                    onChange={() => togglePermission(permission.id)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                            {errors.permissions && (
                                <p className="mt-2 text-sm text-danger">{errors.permissions}</p>
                            )}
                        </Card>
                    ) : (
                        <Alert variant="info" title="دور المشرف العام">
                            دور المشرف العام يمتلك جميع الصلاحيات ولا يمكن تعديل صلاحياته.
                        </Alert>
                    )}

                    <div className="flex justify-end gap-3">
                        <Link href={route('admin.roles.index')}>
                            <Button variant="secondary">إلغاء</Button>
                        </Link>
                        <Button type="submit" variant="primary" disabled={processing}>
                            {processing ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
