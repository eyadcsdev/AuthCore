import { forwardRef, useEffect, useRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    indeterminate?: boolean;
    hint?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, id, indeterminate, hint, ...props }, ref) => {
        const checkboxId = id || label?.replace(/\s+/g, '-').toLowerCase();
        const innerRef = useRef<HTMLInputElement>(null);
        const resolvedRef = (ref || innerRef) as React.RefObject<HTMLInputElement>;

        useEffect(() => {
            if (resolvedRef?.current) {
                resolvedRef.current.indeterminate = indeterminate ?? false;
            }
        }, [indeterminate, resolvedRef]);

        return (
            <label
                htmlFor={checkboxId}
                className="flex cursor-pointer items-center gap-2"
            >
                <input
                    ref={resolvedRef}
                    type="checkbox"
                    id={checkboxId}
                    className={cn(
                        'h-4 w-4 rounded border-border-default bg-bg-surface text-accent',
                        'focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-bg-base',
                        className,
                    )}
                    {...props}
                />
                {label && (
                    <span className="text-sm text-text-secondary">{label}</span>
                )}
                {hint && (
                    <span className="text-xs text-text-muted">{hint}</span>
                )}
            </label>
        );
    },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
