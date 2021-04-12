import { createContext } from 'react';

export interface IUserContext {
    accessToken?: string;
    refreshToken?: string;
    tokenExpire?: number;
    userId?: string;
    currency?: string;
    role?: 'ADMIN' | 'USER';
}

export const UserContext = createContext<IUserContext>({});
