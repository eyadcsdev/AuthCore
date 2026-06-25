import { Head, router } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

interface RoleOption {
    value: string;
    label: string;
    description: string;
    icon: typeof FaGraduationCap;
}

const roles: RoleOption[] = [
    {
        value: 'student',
        label: 'طالب',
        description: 'متابعة المقررات والواجبات والدرجات',
        icon: FaGraduationCap,
    },
    {
        value: 'teacher',
        label: 'معلم',
        description: 'إدارة المقررات والطلاب والتسليمات',
        icon: FaChalkboardTeacher,
    },
];

export default function ChooseRole() {
    const route = useRoute();
    const loading = false;

    const selectRole = (role: string) => {
        router.post(route('auth.choose-role.store'), { role });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-base p-4" dir="rtl">
            <Head title="اختيار الدور" />

            <div className="w-full max-w-lg space-y-8">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white">
                        أ
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary">
                        مرحباً بك!
                    </h1>
                    <p className="mt-2 text-text-secondary">
                        اختر دورك لبدء استخدام النظام
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                            <Card key={role.value}>
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => selectRole(role.value)}
                                    className="flex w-full flex-col items-center gap-3 py-6 text-center"
                                >
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-muted">
                                        <Icon className="h-8 w-8 text-accent-hover" />
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-text-primary">
                                            {role.label}
                                        </p>
                                        <p className="mt-1 text-sm text-text-muted">
                                            {role.description}
                                        </p>
                                    </div>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        disabled={loading}
                                        className="mt-2"
                                    >
                                        {role.label === 'طالب' ? 'دخول كطالب' : 'دخول كمعلم'}
                                    </Button>
                                </button>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
