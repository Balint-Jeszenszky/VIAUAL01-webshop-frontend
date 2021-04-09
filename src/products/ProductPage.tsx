import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductModel } from '../common/Models';
import formatPrice from '../common/formatPrice';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const Product: React.FC = () => {
    const params: {id: string} = useParams();
    const [quantity, setQuantity] = useState<number>(1);
    let product = useRef<ProductModel>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [added, setAdded] = useState<boolean>(false);
    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, `/product/${params.id}`, userCtx)
        .then(res => {
            product.current = res.data;
            setLoaded(true);
        });
    }, []);

    const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number.parseInt(e.target.value));
    }

    const addToCart = () => {
        webshopAPI(actions.POST, `/cart/${userCtx.userId}`, userCtx, {productId: product.current?.id, amount: quantity})
        .then(res => {setAdded(true)});
    }

    return (
        <>
            {!loaded && <div className='container'><div className='loader'></div></div> }
            {loaded && <div className='container mt-3'>
                <p><Link to='/'>Home</Link> {' > '} <Link to={`/category/${product.current?.categoryID}/page/1`}>{product.current?.categoryID}</Link></p>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <img className='img-thumbnail' src={`/images/${product.current?.imageURL}`} alt={product.current?.name} />
                    </div>
                    <div className='col-12 col-md-6 d-flex align-items-start flex-column'>
                        <h1 className='mb-auto'>{product.current?.name}</h1>
                        <h2>{formatPrice(product.current!.price[userCtx.currency!])} {userCtx.currency}</h2>
                        <p>Stock: {product.current?.stock} pieces</p>
                        <form>
                            <div className='input-group input-group-sm'>
                                <label htmlFor="order-quantity">Quantity:</label>
                                <input className={`form-control mx-1${added ? ' is-valid' : ''}`} type="number" name="order-quantity" id="order-quantity" onChange={onQuantityChange} value={quantity} />
                                <button className='btn btn-sm btn-primary' type="button" onClick={addToCart}><i className="fas fa-shopping-cart"></i></button>
                            </div>
                        </form>
                    </div>
                    <div className='col-12 mt-3'>
                        <h3>Description:</h3>
                        {product.current?.description}
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Product;
