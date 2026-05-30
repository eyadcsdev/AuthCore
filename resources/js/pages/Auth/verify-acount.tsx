import { Head, useForm, usePage, router } from '@inertiajs/react';
import React, { useRef, useEffect, useState } from 'react';
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js";

interface VerifyEmailProps {
    email: string;
}

export default function VerifyEmail({ email }: VerifyEmailProps) {
    const route = useRoute();
    
    const { flash } = usePage().props as any;

    const { data, setData, post, processing, errors } = useForm({
        identifier: email || '',
        otp: ['', '', '', '', '', ''],
    });

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [showModal, setShowModal] = useState(false);

    const sendOtp = (method: 'email' | 'phone') => {
        router.post(route('send.verification.otp'), {
            identifier: email,
            method,
        });
    };

    useEffect(() => {
        if (data.otp.every((digit) => digit !== '') && data.otp.length === 6) {
            post(route('email.verify.post'));
        }   
    }, [data.otp]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (/[^0-9]/.test(value)) {
            return;
        }

        const newOtp = [...data.otp];
        newOtp[index] = value;
        setData('otp', newOtp);

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && data.otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');

        if (pasteData) {
            const newOtp = [...data.otp];
            
            for (let i = 0; i < pasteData.length; i++) {
                newOtp[i] = pasteData[i];
            }
            
            setData('otp', newOtp);
          
            
            if (pasteData.length < 6) {
                inputRefs.current[pasteData.length]?.focus();
            } else {
                inputRefs.current[5]?.focus();
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('email.verify.post'));
    };

    return (
        <div className="bg-gray-900 text-gray-200 flex justify-center items-center min-h-screen" dir="rtl">
            <Head title="تأكيد البريد الإلكتروني" />
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">تأكيد البريد الإلكتروني</h2>
                <p className="text-center text-gray-400 mb-4">أدخل رمز التحقق المكون من ٦ أرقام المرسل إلى بريدك الإلكتروني</p>
                
                {flash?.error && (
                    <p className="text-center text-red-400 mb-4 bg-red-900/30 p-2 rounded">{flash.error}</p>
                )}

                {errors.identifier && (
                    <p className="text-center text-red-400 mb-4">{errors.identifier }</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 mb-6">
                        {data.otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                autoFocus={index === 0}
                                ref={(el) => { 
                                    inputRefs.current[index] = el; 
                                }}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-center text-2xl font-semibold rounded border bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500 transition"
                                required
                            />
                        ))}
                    </div>
                    <button type="submit" className="hidden" disabled={processing}>تأكيد</button>
                </form>
                
                {errors.otp && (
                    <p className="text-red-500 text-center mt-2">{errors.otp}</p>
                )}

                <p
                    onClick={() => setShowModal(true)}
                    className="text-center text-gray-400 hover:underline cursor-pointer mt-6"
                >
                    أو تريد التحقق بطريقة أخرى؟
                </p>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-11/12 max-w-sm">
                        <h3 className="text-xl font-semibold mb-6 text-center">اختر طريقة التحقق</h3>
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => sendOtp('email')}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                            >
                                <i className="fab fa-google text-lg"></i>
                                <span>التحقق عبر البريد الإلكتروني</span>
                            </button>
                            <button
                                onClick={() => sendOtp('phone')}
                                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                            >
                                <i className="fab fa-whatsapp text-lg"></i>
                                <span>التحقق عبر رقم الهاتف</span>
                            </button>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded block mx-auto"
                        >
                            إغلاق
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
