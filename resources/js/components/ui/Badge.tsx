import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    {
        variants: {
            variant: {
                default: 'bg-bg-elevated text-text-secondary',
                success: 'bg-success-muted text-success',
                warning: 'bg-warning-muted text-warning',
                danger: 'bg-danger-muted text-danger',
                info: 'bg-info-muted text-info',
                accent: 'bg-accent-muted text-accent-hover',
                purple: 'bg-purple-muted text-purple-hover',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span
            className={cn(badgeVariants({ variant, className }))}
            {...props}
        />
    );
}
