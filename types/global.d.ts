export type T_AUTH = {
    email: string;
    password: string;
};

export type T_SESSION = {
    email: string;
    id: number;
};

export type T_DEPOSIT = { deposit: number };

export type T_ITEM = { 
    name: string;
    description: string;
    origPrice: number;
    bidEndDate: string; 
};

export type T_BID_ITEM = { bidPrice: number, user: { email: string } };

export type T_FULL_ITEM = T_ITEM & { 
    id: number,
    createdAt: string,
    deletedAt: null | string,
    updatedAt: string
    Bid: T_BID_ITEM[]
};

export type T_ITEM_COUNT = { ongoing: number, completed: number };