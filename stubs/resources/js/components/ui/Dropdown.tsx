import { useState, useRef, useEffect, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface DropdownItem {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    danger?: boolean;
}

interface DropdownProps {
    trigger: ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
    className?: string;
}

export function Dropdown({
    trigger,
    items,
    align = 'right',
    className,
}: DropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} className={cn('relative inline-block', className)}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center"
                aria-haspopup="true"
                aria-expanded={open}
            >
                {trigger}
            </button>

            {open && (
                <div
                    className={cn(
                        'absolute z-40 mt-1 min-w-[160px] overflow-hidden rounded-lg border border-border-default bg-bg-surface py-1 shadow-2xl',
                        align === 'left' ? 'left-0' : 'right-0',
                    )}
                >
                    {items.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                item.onClick();
                                setOpen(false);
                            }}
                            className={cn(
                                'flex w-full items-center gap-2 px-3 py-2 text-right text-sm transition',
                                item.danger
                                    ? 'text-danger hover:bg-danger-muted/20'
                                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary',
                            )}
                        >
                            {item.icon && (
                                <span className="h-4 w-4">{item.icon}</span>
                            )}
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
