import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Product from './Product';
import { ProductModel } from '../common/Models';

const Recommended: React.FC = () => {
    let products = useRef<ProductModel[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        axios.get('http://192.168.0.2:3000/api/products')
        .then(res => {
            products.current = res.data;
            setLoaded(true);
        });
    }, []);

    return (
        <>
        {!loaded && 'Loading...'}
        {loaded && <div className='container'>
            <header className='text-center mt-3 col-12'>
                <div className='card text-center product-card'>
                    <div className='card-header'>
                        Featured
                    </div>
                    <div className='card-body'>
                        <h5 className='card-title'>Special title treatment</h5>
                        <p className='card-text'>With supporting text below as a natural lead-in to additional content.</p>
                        <a href='#' className='btn btn-primary'>Go somewhere</a>
                    </div>
                    <div className='card-footer text-muted'>
                        2 days ago
                    </div>
                </div>
            </header>

            <div className='mt-3 p-3'>
                <div className='row'>
                    {products.current.map((e, i) => <Product product={e} key={`product${i}`} />)}
                </div>
            </div>
        </div>}
        </>
    );
}

export default Recommended;
