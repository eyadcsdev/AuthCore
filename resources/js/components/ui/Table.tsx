import type { ReactNode, TableHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    children: ReactNode;
}

export function Table({ className, children, ...props }: TableProps) {
    return (
        <div className="w-full overflow-x-auto">
            <table
                className={cn('w-full text-right text-sm', className)}
                {...props}
            >
                {children}
            </table>
        </div>
    );
}

export function TableHead({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <thead className={cn('border-b border-border-default', className)} {...props}>
            {children}
        </thead>
    );
}

export function TableHeaderCell({
    className,
    children,
    ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
    return (
        <th
            className={cn(
                'px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted',
                className,
            )}
            {...props}
        >
            {children}
        </th>
    );
}

export function TableBody({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tbody
            className={cn('divide-y divide-border-default', className)}
            {...props}
        >
            {children}
        </tbody>
    );
}

export function TableRow({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr
            className={cn(
                'transition hover:bg-bg-elevated/50',
                className,
            )}
            {...props}
        >
            {children}
        </tr>
    );
}

export function TableCell({
    className,
    children,
    ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
    return (
        <td className={cn('px-5 py-4 text-text-secondary', className)} {...props}>
            {children}
        </td>
    );
}
