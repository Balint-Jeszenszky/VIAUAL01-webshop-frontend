import React, { useState } from 'react';
import OrderManager from './OrderManager';
import CurrencyManager from './CurrencyManager';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import ProductDetails from './ProductDetails';

const Admin: React.FC = () => {
    const [addProduct, setAddProduct] = useState<boolean>(false);

    return (
        <div className="container">
            <div className='row'>
                <OrderManager />
                <CurrencyManager />
                <CategoryManager />
                <ProductManager addNewProduct={() => setAddProduct(true)} />
                {addProduct && <hr className="col-12" />}
                {addProduct && <ProductDetails hide={() => setAddProduct(false)} />}
            </div>
        </div>
    );
}

export default Admin;
