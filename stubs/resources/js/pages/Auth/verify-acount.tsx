import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useEffect, useState } from 'react';
import { useRoute } from '../../../../vendor/tightenco/ziggy/src/js';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

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
        if (/[^0-9]/.test(value)) return;

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

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-base p-4" dir="rtl">
            <Head title="تأكيد البريد الإلكتروني" />

            <div className="w-full max-w-sm space-y-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl font-bold text-white">
                        أ
                    </div>
                    <h1 className="text-2xl font-semibold text-text-primary">تأكيد البريد الإلكتروني</h1>
                    <p className="mt-1 text-sm text-text-muted">أدخل رمز التحقق المكون من ٦ أرقام المرسل إلى بريدك</p>
                </div>

                <div className="rounded-xl border border-border-default bg-bg-surface p-6">
                    {flash?.error && (
                        <div className="mb-4 text-center text-sm text-danger">{flash.error}</div>
                    )}

                    {errors.otp && (
                        <div className="mb-4 text-center text-sm text-danger">
                            {Array.isArray(errors.otp) ? errors.otp[0] : errors.otp}
                        </div>
                    )}

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
                                className="h-12 w-12 rounded-lg border border-border-default bg-bg-surface text-center text-xl font-semibold text-text-primary transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
                                required
                            />
                        ))}
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowModal(true)}
                        className="w-full"
                    >
                        أو تريد التحقق بطريقة أخرى؟
                    </Button>
                </div>
            </div>

            <Modal open={showModal} onClose={() => setShowModal(false)} title="اختر طريقة التحقق">
                <div className="flex flex-col gap-3">
                    <Button onClick={() => sendOtp('email')} className="w-full">
                        التحقق عبر البريد الإلكتروني
                    </Button>
                    <Button onClick={() => sendOtp('phone')} variant="secondary" className="w-full">
                        التحقق عبر رقم الهاتف
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
