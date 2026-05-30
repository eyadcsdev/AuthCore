import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const textareaId = id || label?.replace(/\s+/g, '-').toLowerCase();

        return (
            <div className="space-y-1.5">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="block text-sm font-medium text-text-secondary"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={cn(
                        'w-full rounded-lg border bg-bg-surface px-3 py-2 text-sm text-text-primary transition',
                        'placeholder:text-text-muted',
                        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0',
                        'min-h-[80px] resize-y',
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
            </div>
        );
    },
);
Textarea.displayName = 'Textarea';

export { Textarea };
