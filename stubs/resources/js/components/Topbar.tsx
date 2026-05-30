import { usePage, Link, router } from '@inertiajs/react';
import { useRoute } from '../../../vendor/tightenco/ziggy';
import { FaBell, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Dropdown } from './ui/Dropdown';

interface TopbarProps {
    breadcrumbs?: { label: string; href?: string }[];
}

export default function Topbar({ breadcrumbs }: TopbarProps) {
    const route = useRoute();
    const { auth } = usePage().props as any;

    const userMenuItems = [
        {
            label: 'الملف الشخصي',
            onClick: () => router.visit(route('profile')),
            icon: <FaUser className="h-4 w-4" />,
        },
        {
            label: 'تسجيل الخروج',
            onClick: () => router.post(route('logout')),
            icon: <FaSignOutAlt className="h-4 w-4" />,
            danger: true,
        },
    ];

    return (
        <header className="flex h-14 items-center justify-between border-b border-border-default bg-bg-surface px-6">
            <div>
                {breadcrumbs && breadcrumbs.length > 0 ? (
                    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
                        {breadcrumbs.map((item, i) => {
                            const isLast = i === breadcrumbs.length - 1;
                            return (
                                <span key={i} className="flex items-center gap-1.5">
                                    {i > 0 && (
                                        <svg className="h-3 w-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    )}
                                    {item.href && !isLast ? (
                                        <Link
                                            href={item.href}
                                            className="text-text-muted transition hover:text-text-secondary"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className={isLast ? 'text-text-primary' : 'text-text-muted'}>
                                            {item.label}
                                        </span>
                                    )}
                                </span>
                            );
                        })}
                    </nav>
                ) : (
                    <span className="text-sm text-text-muted">لوحة التحكم</span>
                )}
            </div>

            <div className="flex items-center gap-3">
                <button
                    className="rounded-lg p-2 text-text-muted transition hover:bg-bg-elevated hover:text-text-primary"
                    aria-label="Notifications"
                >
                    <FaBell className="h-4 w-4" />
                </button>

                <Dropdown
                    align="left"
                    trigger={
                        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-bg-elevated">
                            {auth?.user?.avatar ? (
                                <img
                                    src={auth.user.avatar}
                                    alt=""
                                    className="h-7 w-7 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-medium text-white">
                                    {auth?.user?.name?.charAt(0) || 'U'}
                                </div>
                            )}
                            <span className="hidden text-sm font-medium text-text-primary sm:block">
                                {auth?.user?.name}
                            </span>
                        </div>
                    }
                    items={userMenuItems}
                />
            </div>
        </header>
    );
}
