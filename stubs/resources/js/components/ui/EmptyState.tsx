import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FaInbox } from 'react-icons/fa';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({
    icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center rounded-xl border border-dashed border-border-default px-6 py-16 text-center',
                className,
            )}
        >
            <div className="mb-4 text-text-muted">
                {icon || <FaInbox className="h-12 w-12" />}
            </div>
            <h3 className="text-lg font-medium text-text-primary">{title}</h3>
            {description && (
                <p className="mt-1 max-w-sm text-sm text-text-muted">
                    {description}
                </p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
