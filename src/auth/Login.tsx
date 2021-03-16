import React, {useState} from 'react';

interface LoginProps {
    setLoggedin(params: boolean): void;
    setUserID(id: string): void;
}

const Login: React.FC<LoginProps> = props => {
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
        //axios post
        props.setUserID('ADMIN');
        props.setLoggedin(true);
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
