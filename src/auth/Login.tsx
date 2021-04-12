import React, {useState} from 'react';
import { IUserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

interface ILogin {
    updateUserCtx(newCtx: IUserContext): void;
}

const Login: React.FC<ILogin> = props => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [wronCredentials, setWronCredentials] = useState<boolean>(false);

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const login = () => {
        webshopAPI(actions.POST, '/auth/login', {}, { username, password })
        .then(res => {
            const data = JSON.parse(atob(res.data.accessToken.split('.')[1]));
            props.updateUserCtx({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
                userId: data.userId,
                tokenExpire: data.exp,
                role: res.data.role
            });
            sessionStorage.setItem('refreshToken', res.data.refreshToken);
            sessionStorage.setItem('accessToken', res.data.accessToken);
            const event = new Event('login');
            window.dispatchEvent(event);
        })
        .catch(res => {
            setWronCredentials(true);
        });
    } 

    return (
        <div className="col-12 col-lg-4 border border-dark rounded mt-2 mt-lg-5">
            <h1 className="text-center">Login</h1>
            {wronCredentials && <p className="text-danger text-center">Wrong credentials</p>}
            <form>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" onChange={onUsernameChange} value={username} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" onChange={onPassChange} value={password} />
                </div>
                <div className="text-center form-group">
                    <button type="button" className="btn btn-link">Forgot password</button>
                </div>
                <div className="text-center form-group">
                    <input className="form-check-input" type="checkbox" value="" id="stayloggedin" />
                    <label className="form-check-label" htmlFor="stayloggedin">
                        Stay logged in
                    </label>
                </div>
                <div className="text-center form-group">
                    <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
