import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { OrderModel } from '../common/Models';
import formatPrice from '../common/formatPrice';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const Order: React.FC = () => {
    let order = useRef<OrderModel>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const params: { id: string } = useParams();
    const userCtx = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        webshopAPI(actions.GET, `/order/${params.id}`, userCtx)
        .then(res => {
            order.current = res.data;
            setLoaded(true);
        })
        .catch(err => {
            history.push('/profile');
        });
    }, [params]);

    useEffect(() => {
        if (loaded && order.current?.mapsAPI) {
            const initMap = () => {
                const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: order.current?.mapsAPI?.coords,
                    zoom: 18,
                });
                new google.maps.Marker({
                    position: order.current?.mapsAPI?.coords,
                    map,
                    icon: 'http://maps.google.com/mapfiles/kml/shapes/truck.png'
                });
            };

            let scriptNode = document.querySelector('#mapsScript') as HTMLScriptElement;
            if (scriptNode === null) {
                scriptNode = document.createElement('script');
                scriptNode.src = `https://maps.googleapis.com/maps/api/js?key=${order.current.mapsAPI.APIKey}`;
                scriptNode.onload = initMap;
                scriptNode.async = true;
                scriptNode.defer = true;
                scriptNode.id = 'mapsScript';
                document.body.appendChild(scriptNode);
            } else {
                initMap();
            }
        }
    }, [loaded]);

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
                        {loaded && order.current?.products.map(e => (
                            <tr key={`orderRow${e.product.id}`}>
                                <td><Link to={`/product/${e.product.id}`}>{e.product.name}</Link></td>
                                <td>{formatPrice(e.product.price[userCtx.currency!])} {userCtx.currency}</td>
                                <td className='w-25'>{e.amount}</td>
                                <td>{formatPrice(e.amount * e.product.price[userCtx.currency!])} {userCtx.currency}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3} className='text-right'>Total:</td>
                            <td>{formatPrice(order.current!.products.map(e => e.amount * e.product.price[userCtx.currency!]).reduce((acc, cur) => acc + cur))} {userCtx.currency}</td>
                        </tr>
                        <tr>
                            <td colSpan={5}><b>Order status: {order.current?.mapsAPI ? 'Delivery' : 'Processing'}</b></td>
                        </tr>
                    </tbody>
                </table>
                {order.current?.mapsAPI && <div className='col-12'>
                    <div id='map'></div>
                </div>}
            </div>}
        </>
    );
}

export default Order;
