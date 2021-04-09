import React, { useState, useEffect, useRef } from 'react';
import Product from './Product';
import { useRouteMatch } from 'react-router-dom';
import { ProductModel } from '../common/Models';
import Pager from '../common/Pager';
import webshopAPI, { actions } from '../common/webshopAPI';

const Products: React.FC = () => {
    let products = useRef<ProductModel[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const match = useRouteMatch();
    const params = match.params as {query: string, page: string};

    useEffect(() => {
        webshopAPI(actions.GET, `/products/search/${params.query}/page/${params.page}`)
        .then(res => {
            setLoaded(false);
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
                </div>
                <Pager url={match.path.replace(':query', params.query)} currentPage={parseInt(params.page)} allPages={1}></Pager>
            </div>}
        </>
    );
}

export default Products;
