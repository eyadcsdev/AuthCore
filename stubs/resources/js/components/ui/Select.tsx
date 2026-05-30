import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, id, ...props }, ref) => {
        const selectId = id || label?.replace(/\s+/g, '-').toLowerCase();

        return (
            <div className="space-y-1.5">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-medium text-text-secondary"
                    >
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    className={cn(
                        'h-10 w-full rounded-lg border bg-bg-surface px-3 text-sm text-text-primary transition',
                        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0',
                        error
                            ? 'border-danger'
                            : 'border-border-default hover:border-bg-hover',
                        className,
                    )}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="text-xs text-danger" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);
Select.displayName = 'Select';

export { Select };
