import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
interface PageProps {
    flash: {
        success?: string;
        error?: string;
    };
    errors: {
        identifier?: string;
    };
    [key: string]: any;
}
export default function Login() {
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
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200" dir="rtl">
            <div className="bg-gray-800 rounded-lg shadow-md w-full max-w-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">تسجيل الدخول بدون كلمة مرور</h2>
                
                { flash?.success && (
                    <div className="bg-green-500 text-white p-4 rounded mb-4">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-gray-300 mb-1">
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            name="identifier"
                            id="identifier"
                            autoComplete="email"
                            autoFocus
                            value={data.identifier}
                            onChange={(e) => setData('identifier', e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {errors.identifier && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.identifier}
                            </div>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'جارٍ الإرسال...' : 'إرسال رابط تسجيل الدخول'}
                    </button>
                </form>
            </div>
        </div>
    );
}
