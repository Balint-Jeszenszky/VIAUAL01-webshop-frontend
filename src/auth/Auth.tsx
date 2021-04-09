import React from 'react';
import { IUserContext } from '../common/UserContext';
import Login from './Login';
import Register from './Register';

interface IAuth {
    updateUserCtx(id: IUserContext): void;
}

const Auth: React.FC<IAuth> = props => {
    return (
        <div className="container">
            <div className="row justify-content-around mt-0 mt-lg-5">
                <Login updateUserCtx={props.updateUserCtx} />
                <Register />
            </div>
        </div>
    );
};

export default Auth;
