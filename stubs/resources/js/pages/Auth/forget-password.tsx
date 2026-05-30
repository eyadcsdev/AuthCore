import { Head, Link } from '@inertiajs/react';
import { useForm, usePage } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

export default function ForgotPassword() {
    const route = useRoute();
    const { flash } = usePage().props as any;

    const { data, setData, post, processing, errors } = useForm({
        identifier: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-base p-4" dir="rtl">
            <Head title="نسيت كلمة المرور" />

            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl font-bold text-white">
                        أ
                    </div>
                    <h1 className="text-2xl font-semibold text-text-primary">نسيت كلمة المرور</h1>
                    <p className="mt-1 text-sm text-text-muted">أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين</p>
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
                            error={errors.identifier}
                            autoComplete="email"
                            autoFocus
                        />

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'جارٍ الإرسال...' : 'إرسال رابط إعادة التعيين'}
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
