import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '../common/Models';
import { UserContext } from '../common/UserContext';
import formatPrice from '../common/formatPrice';
import webshopAPI, { actions } from '../common/webshopAPI';

const Cart: React.FC = () => {
    const [cart, setCart] = useState<ListItem[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [btntype, setBtntype] = useState<string>('btn-primary');
    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, `/cart/${userCtx.userId}`, userCtx)
        .then(res => {
            setCart(res.data);
            setLoaded(true);
        });
    }, []);

    const updateCart = () => {
        const data = cart.map(e => {
            return {id: e.product.id, amount: e.amount};
        });
        webshopAPI(actions.PUT, `/cart/${userCtx.userId}`, userCtx, data)
        .then(res => {
            setBtntype('btn-success');
            setCart(cart.filter(e => e.amount > 0));
            setTimeout(() => setBtntype('btn-primary'), 3000);
        });
    }

    const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const c = Object.assign([], cart) as ListItem[];
        c[i].amount = (Number.parseInt(e.target.value));
        setCart(c);
    }

    return (
        <>
            {!loaded && <div className='container'><div className='loader'></div></div>}
            {loaded && <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Unit price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Item price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loaded && cart.map((e, i) => (
                            <tr key={`orderRow${e.product.id}`}>
                                <td><Link to={`/product/${e.product.id}`}>{e.product.name}</Link></td>
                                <td>{e.product.price[userCtx.currency!]} {userCtx.currency}</td>
                                <td className='w-25'><input type="number" className="form-control" value={e.amount} onChange={e => onAmountChange(e, i)} /></td>
                                <td>{formatPrice(e.amount * e.product.price[userCtx.currency!])} {userCtx.currency}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2}><button className={`btn ${btntype}`} onClick={updateCart}>Update</button></td>
                            <td  className='text-right'>Total:</td>
                            <td>{formatPrice(cart.map(e => e.amount * e.product.price[userCtx.currency!]).reduce((acc, cur) => acc + cur, 0))} {userCtx.currency}</td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </>
    );
}

export default Cart;
