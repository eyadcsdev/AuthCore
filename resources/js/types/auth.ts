export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    status: string;
    requested_role: string | null;
    roles: string[];
    permissions: string[];
    is_super_admin: boolean;
    [key: string]: unknown;
};

export type Auth = {
    user: User;
};
