import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import { OrderModel } from '../common/Models';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const OrderManager: React.FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderModel>();
    const [status, setStatus] = useState<string>('...');
    const userCtx = useContext(UserContext);
    const orders = useRef<OrderModel[]>([]);

    useEffect(() => {
        webshopAPI(actions.GET, '/orders', userCtx)
        .then(res => {
            orders.current = res.data;
            setLoaded(true);
        });
    }, []);

    const onOrderChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'choose') {
            setOrder(undefined);
            setStatus('...');
            return;
        }
        const o = orders.current.find(o => o.id === e.target.value)
        setOrder(o);
        setStatus(o?.mapsAPI ? 'delivery' : 'processing');
    }

    const onStatusChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    }

    const onSave = () => {
        if (!order) return;
        const updated = order;
        updated.mapsAPI = status === 'delivery' ? {coords: { lat: 47.5336329, lng: 19.1484013 }} : undefined;
        setOrder(updated);
        webshopAPI(actions.PUT, `/order/${order?.id}`, userCtx, order)
        .then(res => {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        });
    }

    return(
        <div  className='col-12 col-lg-6 mt-3'>
            <h1>Manage orders</h1>
            {!loaded && <Loading />}
            {loaded && <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
                <select className='form-control w-100' onChange={onOrderChange}>
                    <option value='choose'>Choose...</option>
                    {orders.current.map(e => (<option value={e.id} key={e.id}>{(new Date(e.date)).toLocaleDateString()} - {e.id}</option>))}
                </select>
                <select className='form-control w-100 my-2' onChange={onStatusChange}>
                    <option selected={status === '...'}>...</option>
                    <option selected={status === 'processing'} value='processing'>Processing</option>
                    <option selected={status === 'delivery'} value='delivery'>Delivery</option>
                </select>
                <button className={`btn ${saved ? 'btn-success' : 'btn-primary'}`} type='button' onClick={onSave} disabled={order === undefined}>Save</button>
                <Link to={`/order/${order?.id}`}><button className='btn btn-primary ml-2' type='button' disabled={order === undefined}>Details</button></Link>
            </form>}
        </div>
    );
}

export default OrderManager;