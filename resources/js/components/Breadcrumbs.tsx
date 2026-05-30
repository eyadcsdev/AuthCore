import { Link } from '@inertiajs/react';
import { cn } from '../lib/cn';
import { FaChevronLeft } from 'react-icons/fa';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-sm', className)}>
            {items.map((item, i) => {
                const isLast = i === items.length - 1;
                return (
                    <span key={i} className="flex items-center gap-1.5">
                        {i > 0 && (
                            <FaChevronLeft className="h-3 w-3 text-text-muted" />
                        )}
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="text-text-muted transition hover:text-text-secondary"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={
                                    isLast
                                        ? 'text-text-primary'
                                        : 'text-text-muted'
                                }
                            >
                                {item.label}
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}
