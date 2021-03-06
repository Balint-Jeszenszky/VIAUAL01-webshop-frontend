import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserModel, UserData } from '../common/Models';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const EditProfile: React.FC = () => {
    const user = useRef<UserModel>();
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phoneNumber, setPhone] = useState<string>('');
    const [oldPass, setOldPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [saved, setSaved] = useState<boolean>(false);

    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, `/user/${userCtx.userId}`, userCtx)
        .then(res => {
            user.current = res.data;
            setName(res.data.name);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setAddress(res.data.address);
            setPhone(res.data.phoneNumber);
        });
    }, []);

    const save = () => {
        const data: UserData = {
            userId: userCtx.userId!,
            name,
            email,
            address,
            phoneNumber
        };

        if (oldPass) {
            data.oldPassword = oldPass;
            data.newPassword = newPass;
            data.confirmPassword = confirmPass;
        }

        webshopAPI(actions.PUT, `/user/${userCtx.userId}`, userCtx, data)
        .then(() => setSaved(true))
        .catch(res => {});
    }

    return (
        <>
            {saved && <Redirect to='/profile' />}
            {!saved && <div className="container">
                <div className='col-12 py-3'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nameInput">Name</label>
                            <input type="text" className="form-control" id="nameInput" onChange={e => setName(e.target.value)} value={name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usernameInput">Username</label>
                            <input type="text" className="form-control" id="usernameInput" aria-describedby="usernameHelp" value={username} disabled />
                            <small id="usernameHelp" className="form-text text-muted">You can't change your username.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailInput">Email</label>
                            <input type="email" className="form-control" id="emailInput" onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="adressInput">Address</label>
                            <input type="text" className="form-control" id="adressInput" aria-describedby="addressHelp" onChange={e => setAddress(e.target.value)} value={address} />
                            <small id="addressHelp" className="form-text text-muted">This will be your default shipping address.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneInput">Phone number</label>
                            <input type="tel" className="form-control" id="phoneInput" onChange={e => setPhone(e.target.value)} value={phoneNumber} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="oldPassInput">Old assword</label>
                            <input type="password" className="form-control" id="oldPassInput" aria-describedby="oldPassHelp" onChange={e => setOldPass(e.target.value)} value={oldPass} />
                            <small id="oldPassHelp" className="form-text text-muted">Leave this empty if you don't want to change your password.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassInput">New password</label>
                            <input type="password" className="form-control" id="newPassInput" aria-describedby="newPassHelp" onChange={e => setNewPass(e.target.value)} value={newPass} />
                            <small id="newPassHelp" className="form-text text-muted">Leave this empty if you don't want to change your password.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassConfirmInput">Confirm new password</label>
                            <input type="password" className="form-control" id="newPassConfirmInput" aria-describedby="confirmNewPassHelp" onChange={e => setConfirmPass(e.target.value)} value={confirmPass} />
                            <small id="confirmNewPassHelp" className="form-text text-muted">Leave this empty if you don't want to change your password.</small>
                        </div>
                        <button type="button" className="btn btn-primary mr-2" onClick={save} >Save</button>
                        <Link to='/profile'><button type="button" className="btn btn-secondary">Cancel</button></Link>
                    </form>
                </div>
            </div>}
        </>
    );
}

export default EditProfile;
