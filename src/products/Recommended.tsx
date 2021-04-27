import React, { useState, useEffect, useRef, useContext } from 'react';
import Product from './Product';
import { Link } from 'react-router-dom';
import { ProductModel } from '../common/Models';
import formatPrice from '../common/formatPrice';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const Recommended: React.FC = () => {
    let products = useRef<ProductModel[]>([]);
    let specialOffer = useRef<ProductModel>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const link = `/product/${specialOffer.current?.id}`;
    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, '/products', userCtx)
        .then(res => {
            specialOffer.current = res.data[Math.floor(Math.random() * res.data.length)];
            products.current = res.data.filter((e: ProductModel) => e !== specialOffer.current);
            setLoaded(true);
        });
    }, []);

    return (
        <>
            {!loaded && <div className='container'><div className='loader'></div></div>}
            {loaded && <div className='container'>
                {specialOffer.current && <header className='mt-3 col-12'>
                    <div className='card product-card d-none d-md-block'>
                        <div className='text-center card-header'>
                            Special offer
                        </div>
                        <div className='card-body row'>
                            <div className='col-8'>
                                <h5 className='card-title'><Link to={link} className='text-dark'>{specialOffer.current?.name}</Link></h5>
                                <p className='card-text'>{specialOffer.current?.description}</p>
                            </div>
                            <div className="col-4 card-img-wrapper">
                                <Link to={link}><img src={`/images/${specialOffer.current?.imageURL}`} className='img-fluid' alt={specialOffer.current?.name} /></Link>
                            </div>
                        </div>
                        <div className='card-footer d-flex justify-content-between'>
                            <Link to={link} className='card-link smaller'><span className='dark-link'>Details</span></Link>
                            <span>{formatPrice(specialOffer.current!.price[userCtx.currency!])} {userCtx.currency}</span>
                        </div>
                    </div>

                    <div className='card product-card d-block d-md-none'>
                        <div className='card-header'>
                            Special offer
                        </div>
                        <div className="card-img-wrapper">
                            <Link to={link}><img src={`/images/${specialOffer.current?.imageURL}`} className='card-img-top img-fluid' alt={specialOffer.current?.name} /></Link>
                        </div>
                        
                        <div className='card-body'>
                            <h5 className='card-title'><Link to={link} className='text-dark'>{specialOffer.current?.name}</Link></h5>
                            <p className='card-text'>{specialOffer.current?.description}</p>
                        </div>
                        <div className='card-footer d-flex justify-content-between'>
                            <Link to={link} className='card-link smaller'><span className='dark-link'>Details</span></Link>
                            <span>{formatPrice(specialOffer.current!.price[userCtx.currency!])} {userCtx.currency}</span>
                        </div>
                    </div>
                </header>}

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
