import React, { useContext, useEffect } from 'react';
import { IUserContext, UserContext } from '../common/UserContext';
import { Redirect } from 'react-router-dom';
import webshopAPI, { actions } from '../common/webshopAPI';

interface ILogout {
    updateUserCtx(id: IUserContext): void;
}

const Logout: React.FC<ILogout> = props => {
    const userCtx = useContext(UserContext);

    useEffect(() => {
        sessionStorage.clear();
        webshopAPI(actions.DELETE, '/auth/logout', userCtx)
        .then(res => {
            props.updateUserCtx({
                accessToken: undefined,
                refreshToken: undefined,
                userId: undefined,
                tokenExpire: undefined,
                role: undefined
            });
        });
    }, []);

    return (
        <Redirect to="/" />
    )
}

export default Logout;
