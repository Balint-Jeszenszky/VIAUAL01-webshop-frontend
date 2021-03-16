import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OrderProductModel } from '../common/Models';
import axios from 'axios';
import { CurrencyContext } from '../common/CurrencyContext';

const Cart: React.FC = () => {
    let cart = useRef<OrderProductModel[]>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const params: {id: string} = useParams();
    const currency = useContext(CurrencyContext);

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/cart/${params.id}`)
        .then(res => {
            cart.current = res.data;
            setLoaded(true);
        });
    }, [params]);


    return (
        <div className="container">
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
                            <td>{(e.amount * e.product.price[currency]).toFixed(3)} {currency}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}><button className='btn btn-primary'>Update</button></td>
                        <td  className='text-right'>Total:</td>
                        <td>{cart.current?.map(e => e.amount * e.product.price[currency]).reduce((acc, cur) => acc + cur).toFixed(3)} {currency}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Cart;
