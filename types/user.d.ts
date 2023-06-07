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

export type T_BID_ITEM = { bidPrice: number };