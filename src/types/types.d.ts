declare interface UserType {
    id: number;
    email: string;
    username: string;
    password: string;
    last_name: string;
    first_name: string;
    created_at: string;
    updated_at: string;
    last_login: null | string;
    role: "guaridan" | "resource";
};

declare interface AddressType {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    description: string;
};

declare interface SubscriptionType {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

declare interface AddressResourceType {
    id: number;
    user: UserType;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    address: AddressType;
};

declare interface ResourceSettingsType {
    id: number;
    user: UserType;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};

declare interface GuaridanSettingsType {
    id: number;
    user: UserType;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};
