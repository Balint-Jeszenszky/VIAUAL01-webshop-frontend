import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Product from './Product';
import { useParams } from 'react-router-dom';
import { ProductModel } from '../common/Models';

const Products: React.FC = () => {
    let products = useRef<ProductModel[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const params: {id: string, page: string} = useParams();

    useEffect(() => {
        setLoaded(false);
        products.current = [];
        axios.get(`http://192.168.0.2:3000/api/products/${params.id}/page/${params.page}`)
        .then(res => {
            products.current = res.data;
            setLoaded(true);
        });
    }, [params]);

    return (
        <>
            {!loaded && <div className='loader'></div>}
            {loaded && <div className='container'>
                <div className='mt-3 p-3'>
                    <div className='row'>
                        {products.current.map((e, i) => <Product product={e} key={`product${i}`} />)}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Products;
