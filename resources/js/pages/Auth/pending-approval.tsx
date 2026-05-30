import { Head, Link } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { FaClock } from 'react-icons/fa';
import { Button } from '../../components/ui/Button';

interface PendingApprovalProps {
    name: string;
}

export default function PendingApproval({ name }: PendingApprovalProps) {
    const route = useRoute();

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-bg-base p-4"
            dir="rtl"
        >
            <Head title="قيد المراجعة" />

            <div className="w-full max-w-md space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warning-muted">
                    <FaClock className="h-8 w-8 text-warning" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-text-primary">
                        شكراً لك {name}!
                    </h1>
                    <p className="text-text-secondary">
                        تم استلام طلب التسجيل بنجاح. حسابك قيد المراجعة من قبل
                        الإدارة.
                    </p>
                    <p className="text-sm text-text-muted">
                        سيتم إشعارك عند الموافقة على طلبك. يمكنك العودة لاحقاً
                        لتسجيل الدخول.
                    </p>
                </div>

                <Link href={route('login')}>
                    <Button variant="primary">العودة إلى تسجيل الدخول</Button>
                </Link>
            </div>
        </div>
    );
}
