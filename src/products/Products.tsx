import React, { useState, useEffect, useRef, useContext } from 'react';
import Product from './Product';
import { useRouteMatch } from 'react-router-dom';
import { ProductModel } from '../common/Models';
import Pager from '../common/Pager';
import { CategoriesContext } from '../common/CategoriesContext';
import webshopAPI, { actions } from '../common/webshopAPI';
import { UserContext } from '../common/UserContext';

const Products: React.FC = () => {
    let products = useRef<ProductModel[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const match = useRouteMatch();
    const params = match.params as {id: string, page: string};
    const pages = Math.ceil(useContext(CategoriesContext).filter(e => e.id === params.id)[0]?.productNumber / 18);
    const userCtx = useContext(UserContext);

    useEffect(() => {
        setLoaded(false);
        products.current = [];
        webshopAPI(actions.GET, `/products/${params.id}/page/${params.page}`, userCtx)
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
                        {(products.current.length === 0) && <h1>No results</h1>}
                    </div>
                    {(pages > 1) && <Pager url={match.path.replace(':id', params.id)} currentPage={parseInt(params.page)} allPages={pages}></Pager>}
                </div>
            </div>}
        </>
    );
}

export default Products;
