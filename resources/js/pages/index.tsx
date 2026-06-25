import { Head, Link } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import { Button } from '../components/ui/Button';

export default function Welcome() {
    const route = useRoute();

    return (
        <>
            <Head title="الرئيسية" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base text-text-primary" dir="rtl">
                <div className="text-center">
                    <h1 className="mb-4 text-5xl font-bold">مرحباً بك في تطبيق لارافيل</h1>
                    <p className="mb-8 text-lg text-text-secondary">
                        هذه صفحة هبوط بسيطة مبنية باستخدام Laravel و Tailwind CSS.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href={route('login')}>
                            <Button variant="primary" size="lg">تسجيل الدخول</Button>
                        </Link>
                        <Link href={route('register')}>
                            <Button variant="success" size="lg">إنشاء حساب</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
