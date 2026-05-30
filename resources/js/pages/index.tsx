import { Head, Link } from '@inertiajs/react';
import React from 'react';
import {useRoute} from  "../../../../vendor/tightenco/ziggy";
export default function Welcome() {
    const route = useRoute();

    return (
        <>
            <Head title="الرئيسية" />

            <div className="bg-gray-900 text-white flex flex-col items-center justify-center min-h-screen" dir="rtl">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-4">مرحباً بك في تطبيق لارافيل</h1>
                    
                    <p className="text-lg mb-8">
                        هذه صفحة هبوط بسيطة مبنية باستخدام Laravel و Tailwind CSS.
                    </p>
                    
                    <Link 
                        href={route('login')} 
                        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                        تسجيل الدخول
                    </Link>
                    
                    <Link 
                        href={route('register')} 
                        className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition mr-4"
                    >
                        إنشاء حساب
                    </Link>
                </div>
            </div>
        </>
    );
}
