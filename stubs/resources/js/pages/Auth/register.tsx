import { Head, Link, useForm } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';

export default function Register() {
    const route = useRoute();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role: 'student',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    };

    const handlePhoneChange = (value: string) => {
        let clean = value.replace(/[^0-9+]/g, '');
        if (clean.indexOf('+') > 0) {
            clean = clean.charAt(0) + clean.slice(1).replace(/\+/g, '');
        }
        setData('phone', clean);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-base p-4" dir="rtl">
            <Head title="تسجيل حساب جديد" />

            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl font-bold text-white">
                        أ
                    </div>
                    <h1 className="text-2xl font-semibold text-text-primary">إنشاء حساب جديد</h1>
                    <p className="mt-1 text-sm text-text-muted">أدخل بياناتك لإنشاء حساب</p>
                </div>

                <div className="rounded-xl border border-border-default bg-bg-surface p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="الاسم"
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            autoComplete="name"
                            autoFocus
                        />

                        <Input
                            label="البريد الإلكتروني"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            autoComplete="email"
                        />

                        <Input
                            label="رقم الهاتف"
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            error={errors.phone}
                            autoComplete="tel"
                        />

                        <Select
                            label="الدور"
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            error={errors.role}
                            options={[
                                { value: 'student', label: 'طالب' },
                                { value: 'teacher', label: 'معلم' },
                            ]}
                        />

                        <Input
                            label="كلمة المرور"
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            autoComplete="new-password"
                        />

                        <Input
                            label="تأكيد كلمة المرور"
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            autoComplete="new-password"
                        />

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-text-muted">
                    لديك حساب بالفعل؟{' '}
                    <Link href={route('login')} className="text-accent-hover hover:underline font-medium">
                        تسجيل الدخول
                    </Link>
                </p>
            </div>
        </div>
    );
}
