import { Link, usePage } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';
import {
    FaTachometerAlt, FaUsers, FaUserShield, FaClipboardList,
    FaBars, FaTimes, FaGraduationCap, FaChalkboardTeacher, FaUniversity,
} from 'react-icons/fa';
import { cn } from '../lib/cn';
import { useState, useMemo } from 'react';

interface NavItem {
    label: string;
    routeName: string;
    icon: typeof FaTachometerAlt;
    permission?: string;
}

export default function Sidebar() {
    const route = useRoute();
    const { auth, pending_count } = usePage().props as any;
    const [collapsed, setCollapsed] = useState(false);

    const permissions: string[] = auth?.user?.permissions ?? [];
    const isSuperAdmin = auth?.user?.is_super_admin ?? false;

    const hasPermission = (slug?: string) => {
        if (!slug || isSuperAdmin) return true;
        return permissions.includes(slug);
    };

    const navItems: NavItem[] = useMemo(() => [
        { label: 'لوحة المشرف', routeName: 'admin.dashboard', icon: FaTachometerAlt, permission: 'dashboard.admin' },
        { label: 'لوحة الطالب', routeName: 'student.dashboard', icon: FaGraduationCap, permission: 'dashboard.student' },
        { label: 'لوحة المعلم', routeName: 'teacher.dashboard', icon: FaChalkboardTeacher, permission: 'dashboard.teacher' },
        { label: 'لوحة القسم', routeName: 'department.dashboard', icon: FaUniversity, permission: 'dashboard.department' },
        { label: 'الأدوار', routeName: 'admin.roles.*', icon: FaUserShield, permission: 'role.view' },
        { label: 'المستخدمين', routeName: 'admin.users.*', icon: FaUsers, permission: 'user.view' },
        { label: 'طلبات التسجيل', routeName: 'admin.pending-users.*', icon: FaClipboardList, permission: 'user.approve' },
    ], []);

    const visibleItems = useMemo(
        () => navItems.filter((item) => hasPermission(item.permission)),
        [navItems, permissions, isSuperAdmin],
    );

    const isActive = (pattern: string) => {
        const current = route().current();
        if (!current) return false;
        if (pattern.endsWith('.*')) {
            return current.startsWith(pattern.slice(0, -2));
        }
        return current === pattern;
    };

    return (
        <>
            {!collapsed && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 md:hidden"
                    onClick={() => setCollapsed(true)}
                />
            )}

            <aside
                className={cn(
                    'fixed right-0 top-0 z-30 flex h-full flex-col border-l border-border-default bg-bg-surface transition-all duration-300',
                    collapsed ? 'w-0 overflow-hidden md:w-16 md:overflow-visible' : 'w-64',
                )}
            >
                <div className="flex h-14 items-center justify-between border-b border-border-default px-4">
                    <div className={cn('flex items-center gap-3', collapsed && 'md:hidden')}>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                            أ
                        </div>
                        <span className="text-base font-semibold text-text-primary">نظام الإدارة</span>
                    </div>
                    {collapsed && (
                        <div className="hidden md:flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                            أ
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="rounded-lg p-1.5 text-text-muted transition hover:bg-bg-elevated hover:text-text-primary"
                        aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
                    >
                        {collapsed ? <FaBars className="h-4 w-4" /> : <FaTimes className="h-4 w-4" />}
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                    {visibleItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.routeName);

                        return (
                            <Link
                                key={item.routeName}
                                href={route(item.routeName.replace('.*', '.index') as any)}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                                    active
                                        ? 'bg-accent-muted text-accent-hover'
                                        : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary',
                                    collapsed && 'md:justify-center md:px-2',
                                )}
                            >
                                <Icon className="h-5 w-5 shrink-0" />
                                <span className={collapsed ? 'md:hidden' : ''}>
                                    {item.label}
                                </span>
                                {item.routeName === 'admin.pending-users.*' && pending_count > 0 && (
                                    <span className={cn(
                                        'mr-auto flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-danger px-1.5 text-[11px] font-bold text-white',
                                        collapsed && 'md:hidden',
                                    )}>
                                        {pending_count > 99 ? '99+' : pending_count}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className={cn('border-t border-border-default p-3', collapsed && 'md:p-2')}>
                    <div className={cn('px-3 py-2', collapsed && 'md:px-0 md:text-center')}>
                        <p className={cn('text-sm font-medium text-text-primary', collapsed && 'md:hidden')}>
                            {auth?.user?.name}
                        </p>
                        <p className={cn('truncate text-xs text-text-muted', collapsed && 'md:hidden')}>
                            {auth?.user?.email}
                        </p>
                    </div>
                    <Link
                        href={route('profile')}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-bg-elevated hover:text-text-primary',
                            collapsed && 'md:justify-center md:px-2',
                        )}
                    >
                        <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className={collapsed ? 'md:hidden' : ''}>الملف الشخصي</span>
                    </Link>
                </div>
            </aside>

            <button
                onClick={() => setCollapsed(false)}
                className={cn(
                    'fixed right-4 top-3 z-30 rounded-lg bg-bg-surface p-2 shadow-lg md:hidden',
                    !collapsed && 'hidden',
                )}
                aria-label="Open sidebar"
            >
                <FaBars className="h-5 w-5 text-text-primary" />
            </button>
        </>
    );
}
