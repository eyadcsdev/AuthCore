import { Head, Link } from '@inertiajs/react';
import { useForm, usePage } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface PageProps {
    flash: { success?: string; error?: string };
    errors: { identifier?: string };
    [key: string]: any;
}

export default function PasswordlessLogin() {
    const route = useRoute();
    const { flash, errors } = usePage<PageProps>().props;

    const { data, setData, post, processing } = useForm({
        identifier: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('passwordless.login.post'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-base p-4" dir="rtl">
            <Head title="تسجيل الدخول بدون كلمة مرور" />

            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl font-bold text-white">
                        أ
                    </div>
                    <h1 className="text-2xl font-semibold text-text-primary">تسجيل الدخول بدون كلمة مرور</h1>
                    <p className="mt-1 text-sm text-text-muted">سنرسل لك رابطاً سحرياً للدخول</p>
                </div>

                <div className="rounded-xl border border-border-default bg-bg-surface p-6">
                    {flash?.success && (
                        <div className="mb-4">
                            <Alert variant="success">{flash.success}</Alert>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="البريد الإلكتروني"
                            id="identifier"
                            type="email"
                            value={data.identifier}
                            onChange={(e) => setData('identifier', e.target.value)}
                            error={errors.identifier as string}
                            autoComplete="email"
                            autoFocus
                        />

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'جارٍ الإرسال...' : 'إرسال رابط تسجيل الدخول'}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-text-muted">
                    <Link href={route('login')} className="text-accent-hover hover:underline font-medium">
                        العودة إلى تسجيل الدخول
                    </Link>
                </p>
            </div>
        </div>
    );
}
