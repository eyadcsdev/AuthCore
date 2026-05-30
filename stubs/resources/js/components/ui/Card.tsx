import { cn } from '../../lib/cn';
import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    noPadding?: boolean;
}

export function Card({ className, noPadding, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl border border-border-default bg-bg-surface',
                !noPadding && 'p-5',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                '-m-5 mb-0 border-b border-border-default px-5 py-4',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardBody({
    className,
    children,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('p-5', className)} {...props}>
            {children}
        </div>
    );
}
