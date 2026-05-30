import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';
import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimesCircle,
} from 'react-icons/fa';
import type { ReactNode } from 'react';

const alertVariants = cva(
    'flex items-start gap-3 rounded-lg border p-4 text-sm',
    {
        variants: {
            variant: {
                success: 'border-success-muted bg-success-muted/20 text-success',
                warning: 'border-warning-muted bg-warning-muted/20 text-warning',
                danger: 'border-danger-muted bg-danger-muted/20 text-danger',
                info: 'border-accent-muted bg-accent-muted/20 text-accent-hover',
            },
        },
        defaultVariants: {
            variant: 'info',
        },
    },
);

const icons = {
    success: FaCheckCircle,
    warning: FaExclamationTriangle,
    danger: FaTimesCircle,
    info: FaInfoCircle,
};

interface AlertProps
    extends VariantProps<typeof alertVariants> {
    children: ReactNode;
    className?: string;
    title?: string;
}

export function Alert({ variant, children, className, title }: AlertProps) {
    const Icon = icons[variant || 'info'];

    return (
        <div className={cn(alertVariants({ variant, className }))} role="alert">
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="space-y-1">
                {title && <p className="font-semibold">{title}</p>}
                <div>{children}</div>
            </div>
        </div>
    );
}
