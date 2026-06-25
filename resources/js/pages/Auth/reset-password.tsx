import { Head } from '@inertiajs/react';
import { useForm, usePage } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface ResetPasswordProps {
    token: string;
    email?: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const route = useRoute();
    const { flash } = usePage().props as any;

    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.update'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-base p-4" dir="rtl">
            <Head title="إعادة تعيين كلمة المرور" />

            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl font-bold text-white">
                        أ
                    </div>
                    <h1 className="text-2xl font-semibold text-text-primary">إعادة تعيين كلمة المرور</h1>
                    <p className="mt-1 text-sm text-text-muted">أدخل كلمة مرور جديدة لحسابك</p>
                </div>

                <div className="rounded-xl border border-border-default bg-bg-surface p-6">
                    {flash?.error && (
                        <div className="mb-4">
                            <Alert variant="danger">{flash.error}</Alert>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="البريد الإلكتروني"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            autoComplete="email"
                            autoFocus
                        />

                        <Input
                            label="كلمة المرور الجديدة"
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            autoComplete="new-password"
                        />

                        <Input
                            label="تأكيد كلمة المرور الجديدة"
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            autoComplete="new-password"
                        />

                        <Button type="submit" disabled={processing} className="w-full" variant="success">
                            {processing ? 'جاري الحفظ...' : 'إعادة تعيين كلمة المرور'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
