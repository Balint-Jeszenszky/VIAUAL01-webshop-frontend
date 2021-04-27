import axios from 'axios';
import { IUserContext } from './UserContext';

export enum actions { GET, POST, PUT, PATCH, DELETE }

const baseUrl = 'http://192.168.0.2:3000/api';

function headers(accessToken?: string) {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
}

export async function refreshLogin(userCtx: IUserContext) {
    const res = await axios.post(`${baseUrl}/auth/refreshToken`, {refreshToken: userCtx.refreshToken});
    if (res.status >= 400) throw new Error();
    sessionStorage.setItem('accessToken', res.data.accessToken);
    sessionStorage.setItem('refreshToken', res.data.refreshToken);
    userCtx.accessToken = res.data.accessToken;
    userCtx.refreshToken = res.data.refreshToken;
    userCtx.tokenExpire = JSON.parse(atob(res.data.accessToken.split('.')[1])).exp;
}

export default async function webshopAPI(method: actions, endpoint: string, userCtx?: IUserContext, data?: any) {
    if (userCtx?.tokenExpire && userCtx.tokenExpire < Date.now() / 1000 + 5) {
        await refreshLogin(userCtx);
    }

    switch (method) {
        case actions.GET:
            return axios.get(`${baseUrl}${endpoint}`, headers(userCtx?.accessToken));
        case actions.POST:
            return axios.post(`${baseUrl}${endpoint}`, data, headers(userCtx?.accessToken));
        case actions.PUT:
            return axios.put(`${baseUrl}${endpoint}`, data, headers(userCtx?.accessToken));
        case actions.PATCH:
            return axios.patch(`${baseUrl}${endpoint}`, data, headers(userCtx?.accessToken));
        case actions.DELETE:
            return axios.delete(`${baseUrl}${endpoint}`, headers(userCtx?.accessToken));
    }
}