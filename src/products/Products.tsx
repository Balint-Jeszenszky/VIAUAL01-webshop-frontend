import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import Product from './Product';
import { useRouteMatch } from 'react-router-dom';
import { ProductModel } from '../common/Models';
import Pager from '../common/Pager';
import { CategoriesContext } from '../common/CategoriesContext';

const Products: React.FC = () => {
    let products = useRef<ProductModel[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const match = useRouteMatch();
    const params = match.params as {id: string, page: string};
    const pages = useContext(CategoriesContext).filter(e => e.id === params.id)[0]?.productNumber;

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
            {!loaded && <div className='container'><div className='loader'></div></div>}
            {loaded && <div className='container'>
                <div className='mt-3 p-3'>
                    <div className='row'>
                        {products.current.map((e, i) => <Product product={e} key={`product${i}`} />)}
                    </div>
                    <Pager url={match.path.replace(':id', params.id)} currentPage={parseInt(params.page)} allPages={pages}></Pager>
                </div>
            </div>}
        </>
    );
}

export default Products;
