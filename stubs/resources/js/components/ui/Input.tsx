import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, helperText, error, id, ...props }, ref) => {
        const inputId = id || label?.replace(/\s+/g, '-').toLowerCase();

        return (
            <div className="space-y-1.5">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-text-secondary"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'h-10 w-full rounded-lg border bg-bg-surface px-3 text-sm text-text-primary transition',
                        'placeholder:text-text-muted',
                        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0',
                        error
                            ? 'border-danger'
                            : 'border-border-default hover:border-bg-hover',
                        className,
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-danger" role="alert">
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p className="text-xs text-text-muted">{helperText}</p>
                )}
            </div>
        );
    },
);
Input.displayName = 'Input';

export { Input };
