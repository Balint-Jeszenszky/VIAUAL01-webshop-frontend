import React from 'react';
import OrderManager from './OrderManager';
import CurrencyManager from './CurrencyManager';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';

const Admin: React.FC = () => {

    return (
        <div className="container">
            <div className='row'>
                <OrderManager />
                <CurrencyManager />
                <CategoryManager />
                <ProductManager />
            </div>
        </div>
    );
}

export default Admin;
