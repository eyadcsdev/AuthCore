import { router } from '@inertiajs/react';
import { cn } from '../../lib/cn';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    onNavigate?: (url: string) => void;
    className?: string;
}

export function Pagination({
    links,
    onNavigate,
    className,
}: PaginationProps) {
    const navigate = onNavigate || ((url: string) => router.visit(url));
    if (links.length <= 3) return null;

    return (
        <div
            className={cn('flex items-center justify-center gap-1', className)}
        >
            {links.map((link, i) => {
                const isPrevious = i === 0;
                const isNext = i === links.length - 1;

                if (isPrevious) {
                    return (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && navigate(link.url!)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-text-muted transition hover:bg-bg-elevated hover:text-text-primary disabled:pointer-events-none disabled:opacity-30"
                            aria-label="Previous page"
                        >
                            <FaChevronRight className="h-3 w-3" />
                        </button>
                    );
                }

                if (isNext) {
                    return (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && navigate(link.url!)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-text-muted transition hover:bg-bg-elevated hover:text-text-primary disabled:pointer-events-none disabled:opacity-30"
                            aria-label="Next page"
                        >
                            <FaChevronLeft className="h-3 w-3" />
                        </button>
                    );
                }

                const label = link.label
                    .replace(/&laquo;/g, '')
                    .replace(/&raquo;/g, '')
                    .trim();

                return (
                    <button
                        key={i}
                        disabled={!link.url}
                        onClick={() => link.url && navigate(link.url!)}
                        className={cn(
                            'flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-2 text-sm font-medium transition',
                            link.active
                                ? 'bg-accent text-white'
                                : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary',
                        )}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}
