import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OrderModel } from '../common/Models';
import axios from 'axios';

const Order: React.FC = () => {
    let order = useRef<OrderModel>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const params: { id: string } = useParams();

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/order/${params.id}`)
            .then(res => {
                order.current = res.data;
                setLoaded(true);
            });
    }, [params]);

    useEffect(() => {
        if (loaded) {
            const initMap = () => {
                const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: order.current?.mapsAPI?.coords,
                    zoom: 18,
                });
                const marker = new google.maps.Marker({
                    position: order.current?.mapsAPI?.coords,
                    map,
                    icon: 'http://maps.google.com/mapfiles/kml/shapes/truck.png'
                });
            };

            let scriptNode = document.querySelector('#mapsScript') as HTMLScriptElement;
            if (scriptNode === null) {
                scriptNode = document.createElement('script');
                scriptNode.src = `https://maps.googleapis.com/maps/api/js?key=${order.current?.mapsAPI?.APIKey}`;
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
                    {loaded && order.current?.products.map(e => (
                        <tr key={`orderRow${e.product.id}`}>
                            <td><Link to={`/product/${e.product.id}`}>{e.product.name}</Link></td>
                            <td>{e.product.price}</td>
                            <td className='w-25'>{e.amount}</td>
                            <td>{e.amount * e.product.price}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3} className='text-right'>Total:</td>
                        <td>{order.current?.products.map(e => e.amount * e.product.price).reduce((acc, cur) => acc + cur)}</td>
                    </tr>
                </tbody>
            </table>
            <div className='col-12'>
                <div id='map'></div>
            </div>
        </div>
    );
}

export default Order;
