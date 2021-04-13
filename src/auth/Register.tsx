import React, {useState} from 'react';
import webshopAPI, { actions } from '../common/webshopAPI';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [alredyRegisteredUsername, setAlredyRegisteredUsername] = useState<boolean>(false);
    const [alredyRegisteredEmail, setAlredyRegisteredEmail] = useState<boolean>(false);
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
    const [weakPassword, setWeakPassword] = useState<boolean>(false);

    const passCheck = () => password.length < 8;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailCheck = () => !re.test(email.toLowerCase());

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const invalidReg = () => (email === '' || name === '' || username === '' || password === '' || passCheck() || emailCheck());

    const register = () => {
        if (invalidReg()) {
            setInvalidEmail(emailCheck());
            setWeakPassword(passCheck());
            return;
        }
        
        webshopAPI(actions.POST, '/auth/register', {}, {name, username, email, password})
        .then(res => {
            setEmail('');
            setName('');
            setUsername('');
            setPassword('');
            setSuccess(true);
        })
        .catch(err => {
            const errors = (err.response.data.errors || []) as string[];
            if (errors) {
                setAlredyRegisteredEmail(!!errors.find(e => e === 'email_reg'));
                setAlredyRegisteredUsername(!!errors.find(e => e === 'username'));
                setInvalidEmail(!!errors.find(e => e === 'email_invalid'));
            }
        });
    } 

    return (
        <div className="col-12 col-lg-4 border border-dark rounded mt-2 mt-lg-5">
            <h1 className="text-center">Register</h1>
            {success && <p className="text-success text-center">Successful registration</p>}
            
            <form>
                <div className="form-group">
                    {alredyRegisteredEmail && <p className="text-danger text-center">This email is registered</p>}
                    {invalidEmail && <p className="text-danger text-center">Invalid email </p>}
                    <input type="email" className="form-control" placeholder="Email" onChange={onEmailChange} value={email} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" onChange={onNameChange} value={name} />
                </div>
                <div className="form-group">
                    {alredyRegisteredUsername && <p className="text-danger text-center">This username is registered</p>}
                    <input type="text" className="form-control" placeholder="Username" onChange={onUsernameChange} value={username} />
                </div>
                <div className="form-group">
                    {weakPassword && <p className="text-danger text-center">The password should be at least 8 character</p>}
                    <input type="password" className="form-control" placeholder="Password" onChange={onPassChange} value={password} />
                </div>
                <div className="text-center form-group">
                    <button type="button" className="btn btn-primary" onClick={register}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
