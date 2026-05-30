import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppLayoutProps {
    children: ReactNode;
    title?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

export default function AppLayout({ children, title, breadcrumbs }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen bg-bg-base text-text-primary" dir="rtl">
            <Head title={title ? `${title} - لوحة التحكم` : 'لوحة التحكم'} />

            <Sidebar />

            <main className="flex-1 md:mr-64">
                <Topbar breadcrumbs={breadcrumbs} />
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
