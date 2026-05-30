import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { useRoute } from "../../../../vendor/tightenco/ziggy";

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
        <div className="bg-gray-900 text-gray-200 min-h-screen flex justify-center items-center" dir="rtl">
            <Head title="نسيت كلمة المرور" />
            
            <div className="bg-gray-800 rounded-lg shadow-md w-full max-w-md p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">نسيت كلمة المرور</h2>
                
                {flash?.success && (
                    <div className="bg-green-500 text-white p-4 rounded mb-4 shadow">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-gray-300 mb-2">البريد الإلكتروني</label>
                        <input 
                            type="email" 
                            id="identifier" 
                            name="identifier"
                            value={data.identifier}
                            onChange={(e) => setData('identifier', e.target.value)}
                            autoComplete="email" 
                            autoFocus 
                            required
                            className={`w-full p-3 rounded bg-gray-700 text-gray-100 border focus:outline-none focus:ring-2 ${
                                errors.identifier 
                                    ? 'border-red-500 focus:ring-red-500' 
                                    : 'border-gray-600 focus:ring-blue-500'
                            }`}
                        />
                        {errors.identifier && (
                            <div className="text-red-500 text-sm mt-1">{errors.identifier}</div>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        إرسال رابط إعادة تعيين كلمة المرور
                    </button>
                </form>
            </div>
        </div>
    );
}
