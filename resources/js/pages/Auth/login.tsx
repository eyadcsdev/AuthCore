import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface SocialProvider {
    url: string;
    color: 'red' | 'gray' | 'blue';
    icon: 'fa-brands fa-google' | 'fa-brands fa-github' | 'fab fa-facebook-f';
    name: string;
}

export default function Login({
    socialProviders,
}: {
    socialProviders: SocialProvider[];
}) {
    const route = useRoute();

    const iconMap: Record<string, typeof FaGoogle> = {
        'fa-brands fa-google': FaGoogle,
        'fa-brands fa-github': FaGithub,
        'fab fa-facebook-f': FaFacebook,
    };

    const colorMap: Record<string, string> = {
        red: 'bg-danger hover:bg-danger-hover',
        gray: 'bg-bg-elevated hover:bg-bg-hover text-text-secondary hover:text-text-primary',
        blue: 'bg-accent hover:bg-accent-hover',
    };

    const { data, setData, post, processing, errors } = useForm({
        identifier: '',
        password: '',
        remember: false,
    });

    const { flash } = usePage().props as any;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-base p-4" dir="rtl">
            <Head title="تسجيل الدخول" />

            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl font-bold text-white">
                        أ
                    </div>
                    <h1 className="text-2xl font-semibold text-text-primary">تسجيل الدخول</h1>
                    <p className="mt-1 text-sm text-text-muted">مرحباً بعودتك! أدخل بياناتك للمتابعة</p>
                </div>

                <div className="rounded-xl border border-border-default bg-bg-surface p-6">
                    {flash?.error && (
                        <div className="mb-4">
                            <Alert variant="danger">{flash.error}</Alert>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="البريد الإلكتروني / رقم الهاتف"
                            id="identifier"
                            type="text"
                            value={data.identifier}
                            onChange={(e) => setData('identifier', e.target.value)}
                            error={errors.identifier}
                            autoComplete="username"
                            autoFocus
                        />

                        <Input
                            label="كلمة المرور"
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            autoComplete="current-password"
                        />

                        <Checkbox
                            label="تذكرني"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                        </Button>
                    </form>
                </div>

                <div className="rounded-xl border border-border-default bg-bg-surface p-6">
                    <p className="mb-3 text-center text-sm text-text-muted">أو سجل دخول باستخدام</p>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(socialProviders).map(([key, provider]) => {
                            const IconComponent = iconMap[provider.icon];
                            const themeClasses = colorMap[provider.color];

                            return (
                                <a
                                    key={key}
                                    href={provider.url}
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition ${themeClasses}`}
                                >
                                    {IconComponent && <IconComponent className="text-base" />}
                                    {provider.name}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center text-sm text-text-muted">
                    <Link href={route('passwordless.login')} className="text-accent-hover hover:underline">
                        تسجيل الدخول عن طريق رابط سحري
                    </Link>
                    <span className="mx-2">·</span>
                    <Link href={route('forget-password')} className="text-accent-hover hover:underline">
                        نسيت كلمة المرور؟
                    </Link>
                </div>

                <p className="text-center text-sm text-text-muted">
                    ليس لديك حساب؟{' '}
                    <Link href={route('register')} className="text-accent-hover hover:underline font-medium">
                        سجل الآن
                    </Link>
                </p>
            </div>
        </div>
    );
}
