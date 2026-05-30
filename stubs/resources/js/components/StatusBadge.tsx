interface StatusBadgeProps {
    status: string;
}

const statusConfig: Record<string, { label: string; class: string }> = {
    pending: { label: 'قيد الانتظار', class: 'bg-yellow-500/20 text-yellow-400' },
    active: { label: 'نشط', class: 'bg-green-500/20 text-green-400' },
    rejected: { label: 'مرفوض', class: 'bg-red-500/20 text-red-400' },
    suspended: { label: 'موقوف', class: 'bg-gray-500/20 text-gray-400' },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const config = statusConfig[status] ?? { label: status, class: 'bg-gray-500/20 text-gray-400' };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.class}`}
        >
            {config.label}
        </span>
    );
};

export default StatusBadge;
