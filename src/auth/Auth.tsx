import React from 'react';
import Login from './Login';
import Register from './Register';

interface IAuth {
    setLoggedin(params: boolean): void;
    setUserID(id: string): void;
}

const Auth: React.FC<IAuth> = props => {
    return (
        <div className="container">
            <div className="row justify-content-around mt-0 mt-lg-5">
                <Login setLoggedin={props.setLoggedin} setUserID={props.setUserID} />
                <Register />
            </div>
        </div>
    );
};

export default Auth;
