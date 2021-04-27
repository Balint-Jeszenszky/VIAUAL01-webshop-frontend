import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserData } from '../common/Models';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const ConfirmOrder: React.FC = () => {
    const user = useRef<UserData>();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phoneNumber, setPhone] = useState<string>('');

    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, `/user/${userCtx.userId}`, userCtx)
        .then(res => {
            user.current = res.data;
            setName(res.data.name);
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

        webshopAPI(actions.PUT, `/user/${userCtx.userId}`, userCtx, data)
        .then(() => {
            webshopAPI(actions.POST, `/order/new/${userCtx.userId}`, userCtx, {...data, currency: userCtx.currency})
            .then(res => {
                window.location.href = res.data.gatewayUrl;
            });
        })
        .catch(err => {});
    }

    return (
        <div className="container">
            <div className='col-12 py-3'>
                <form>
                    <div className="form-group">
                        <label htmlFor="nameInput">Name</label>
                        <input type="text" className="form-control" id="nameInput" onChange={e => setName(e.target.value)} value={name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailInput">Email</label>
                        <input type="email" className="form-control" id="emailInput" onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adressInput">Address</label>
                        <input type="text" className="form-control" id="adressInput" aria-describedby="addressHelp" onChange={e => setAddress(e.target.value)} value={address} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneInput">Phone number</label>
                        <input type="tel" className="form-control" id="phoneInput" onChange={e => setPhone(e.target.value)} value={phoneNumber} />
                    </div>
                    <button type="button" className="btn btn-primary float-right" onClick={save}>Proceed to payment</button>
                </form>
            </div>
        </div>
    );
}

export default ConfirmOrder;
