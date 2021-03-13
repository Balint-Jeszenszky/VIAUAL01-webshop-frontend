import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductModel } from '../common/Models';
import axios from 'axios';

const Product: React.FC = () => {
    const params: {id: string} = useParams();

    let product = useRef<ProductModel>();
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/product/${params.id}`)
        .then(res => {
            product.current = res.data;
            setLoaded(true);
        });
    }, []);

    return (
        <div className='container'>
            
        </div>
    );
}

export default Product;
