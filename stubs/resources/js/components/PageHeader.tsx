import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    className?: string;
}

export default function PageHeader({
    title,
    description,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
                className,
            )}
        >
            <div className="space-y-1">
                <h1 className="text-xl font-semibold text-text-primary">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm text-text-muted">{description}</p>
                )}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
    );
}
