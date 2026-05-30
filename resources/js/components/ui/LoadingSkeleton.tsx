import { cn } from '../../lib/cn';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-lg bg-bg-elevated',
                className,
            )}
        />
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-xl border border-border-default bg-bg-surface p-5">
            <Skeleton className="mb-3 h-5 w-1/3" />
            <Skeleton className="mb-2 h-8 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    );
}
