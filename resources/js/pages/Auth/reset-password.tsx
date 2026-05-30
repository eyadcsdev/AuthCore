import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { useRoute } from "../../../../vendor/tightenco/ziggy";

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
        <div className="bg-gray-900 text-gray-200 min-h-screen flex justify-center items-center" dir="rtl">
            <Head title="إعادة تعيين كلمة المرور" />
            
            <div className="bg-gray-800 rounded-lg shadow-md w-full max-w-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">إعادة تعيين كلمة المرور</h2>
                
                {flash?.error && (
                    <div className="bg-red-500 text-white p-4 rounded mb-4 shadow">
                        {flash.error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300 mb-2">البريد الإلكتروني</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="email" 
                            autoFocus 
                            className={`w-full p-3 rounded bg-gray-700 text-gray-100 border focus:outline-none focus:ring-2 ${
                                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                            }`}
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300 mb-2">كلمة المرور الجديدة</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`w-full p-3 rounded bg-gray-700 text-gray-100 border focus:outline-none focus:ring-2 ${
                                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                            }`}
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="block text-gray-300 mb-2">تأكيد كلمة المرور الجديدة</label>
                        <input 
                            type="password" 
                            id="password_confirmation" 
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-50"
                    >
                        إعادة تعيين كلمة المرور
                    </button>
                </form>
            </div>
        </div>
    );
}
