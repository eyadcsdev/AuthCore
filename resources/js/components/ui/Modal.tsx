import { useEffect, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FaTimes } from 'react-icons/fa';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

export function Modal({
    open,
    onClose,
    title,
    children,
    className,
}: ModalProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (open) window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
        >
            <div
                className={cn(
                    'w-full max-w-md rounded-xl border border-border-default bg-bg-surface shadow-2xl',
                    className,
                )}
            >
                {title && (
                    <div className="flex items-center justify-between border-b border-border-default px-5 py-4">
                        <h2 className="text-lg font-semibold text-text-primary">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-1.5 text-text-muted transition hover:bg-bg-elevated hover:text-text-primary"
                            aria-label="Close"
                        >
                            <FaTimes className="h-4 w-4" />
                        </button>
                    </div>
                )}
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
}
