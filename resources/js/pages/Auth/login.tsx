import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
// تعريف شكل البيانات القادمة من لارافيل
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
    const iconMap = {
        'fa-brands fa-google': FaGoogle,
        'fa-brands fa-github': FaGithub,
        'fab fa-facebook-f': FaFacebook,
    };

    // خريطة للألوان لتوافق Tailwind (لأن Tailwind لا يدعم الكلاسات الديناميكية المتغيرة تماماً)
    const colorMap = {
        red: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
        gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-600',
        blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-600',
    };
    const { data, setData, post, processing, errors } = useForm({
        identifier: '',
        password: '',
        remember: false,
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    const { flash } = usePage().props as any;

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gray-900 text-white"
            dir="rtl"
        >
            <Head title="Login" />

            <div className="w-full max-w-md space-y-6 rounded-lg bg-gray-800 p-8 shadow-lg">
                <h2 className="text-center text-3xl font-bold">تسجيل الدخول</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="identifier"
                            className="mb-2 block text-sm font-medium"
                        >
                            البريد الالكتروني / رقم الهاتف
                        </label>
                        <input
                            type="identifier"
                            id="identifier"
                            name="identifier"
                            value={data.identifier}
                            onChange={(e) =>
                                setData('identifier', e.target.value)
                            }
                            className={`w-full rounded border border-gray-600 bg-gray-700 p-3 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.identifier ? 'border-red-500' : ''}`}
                        />
                        {errors.identifier && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.identifier}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium"
                        >
                            كلمة المرور
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className={`w-full rounded border border-gray-600 bg-gray-700 p-3 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    {flash.error && (
                        <div className="mb-4 rounded p-2 text-red-500">
                            {flash.error}
                        </div>
                    )}

                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="h-4 w-4"
                        />

                        <label
                            htmlFor="remember"
                            className="mr-1 block text-gray-300"
                        >
                            تذكرني
                        </label>

                        {errors.remember && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.remember}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        تسجيل الدخول
                    </button>

                    <p className="mt-4 text-center text-sm">
                        التسجيل من دون كلمة مرور{' '}
                        <Link
                            href={route('passwordless.login')}
                            className="text-blue-400 hover:underline"
                        >
                            التسجيل عن طريق رابط سحري
                        </Link>
                    </p>
                    <div className="mt-4 flex flex-wrap justify-between gap-2">
                        {Object.entries(socialProviders).map(
                            ([key, provider]) => {
                                const IconComponent = iconMap[provider.icon];
                                const themeClasses = colorMap[provider.color];

                                return (
                                    <a
                                        key={key}
                                        href={provider.url}
                                        className={`flex min-w-[120px] flex-1 items-center justify-center rounded-lg py-3 font-semibold text-white transition focus:ring-2 focus:outline-none ${themeClasses}`}
                                    >
                                        {IconComponent && (
                                            <IconComponent className="mr-2 text-xl" />
                                        )}
                                        {provider.name}
                                    </a>
                                );
                            },
                        )}
                    </div>
                    <p className="mt-4 text-center text-sm">
                        هل نسيت كلمة المرور؟{' '}
                        <Link
                            href={route('forget-password')}
                            className="text-blue-400 hover:underline"
                        >
                            إعادة تعيين كلمة المرور
                        </Link>
                    </p>

                    <p className="mt-4 text-center text-sm">
                        ليس لديك حساب؟{' '}
                        <Link
                            href={route('register')}
                            className="text-blue-400 hover:underline"
                        >
                            سجل حساب جديد
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
