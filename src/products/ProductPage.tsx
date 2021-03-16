import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductModel } from '../common/Models';
import axios from 'axios';
import { UserContext } from '../common/UserContext';
import { CurrencyContext } from '../common/CurrencyContext';

const Product: React.FC = () => {
    const params: {id: string} = useParams();
    const [quantity, setQuantity] = useState<number>(1);
    let product = useRef<ProductModel>();
    const [loaded, setLoaded] = useState<boolean>(false);
    const currency = useContext(CurrencyContext);

    useEffect(() => {
        axios.get(`http://192.168.0.2:3000/api/product/${params.id}`)
        .then(res => {
            product.current = res.data;
            setLoaded(true);
        });
    }, []);

    const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number.parseInt(e.target.value));
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
                        <h2>{product.current?.price[currency]} {currency}</h2>
                        <p>Stock: {product.current?.stock} pieces</p>
                        <form>
                            <div className='input-group input-group-sm'>
                                <label htmlFor="order-quantity">Quantity:</label>
                                <input className='form-control mx-1' type="number" name="order-quantity" id="order-quantity" onChange={onQuantityChange} value={quantity} />
                                <button className='btn btn-sm btn-primary' type="button"><i className="fas fa-shopping-cart"></i></button>
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
