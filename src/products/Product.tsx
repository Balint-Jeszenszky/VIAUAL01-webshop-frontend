import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyContext } from '../common/CurrencyContext';
import { ProductModel } from '../common/Models';

interface ProductProps {
    product: ProductModel;
};

const Product: React.FC<ProductProps> = props => {
    const link = `/product/${props.product.id}`;
    const currency = useContext(CurrencyContext);

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div className="card product-card">
                <div className="card-img-wrapper">
                    <Link to={link}><img src={`/images/${props.product.imageURL}`} className="card-img-top img-fluid" alt={props.product.name} /></Link>
                </div>
                <div className="card-body">
                    <h5 className="card-title"><Link to={link} className="text-dark">{props.product.name}</Link></h5>
                    <p className="card-text">{props.product.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <Link to={link} className="card-link smaller"><span className="dark-link">Details</span></Link>
                    <span>{props.product.price[currency]} {currency}</span>
                </div>
            </div>
        </div>
    );
}

export default Product;
