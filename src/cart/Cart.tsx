import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '../common/Models';
import axios from 'axios';
import { CurrencyContext } from '../common/CurrencyContext';
import { UserContext } from '../common/UserContext';
import formatPrice from '../common/formatPrice';

const Cart: React.FC = () => {
    let cart = useRef<ListItem[]>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const currency = useContext(CurrencyContext);
    const userId = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/cart/${userId}`)
        .then(res => {
            cart.current = res.data;
            setLoaded(true);
        });
    }, []);


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
                        {loaded && cart.current?.map(e => (
                            <tr key={`orderRow${e.product.id}`}>
                                <td><Link to={`/product/${e.product.id}`}>{e.product.name}</Link></td>
                                <td>{e.product.price[currency]} {currency}</td>
                                <td className='w-25'><input type="number" className="form-control" value={e.amount} /></td>
                                <td>{formatPrice(e.amount * e.product.price[currency])} {currency}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2}><button className='btn btn-primary'>Update</button></td>
                            <td  className='text-right'>Total:</td>
                            <td>{formatPrice(cart.current!.map(e => e.amount * e.product.price[currency]).reduce((acc, cur) => acc + cur))} {currency}</td>
                        </tr>
                    </tbody>
                </table>
            </div>}
        </>
    );
}

export default Cart;
