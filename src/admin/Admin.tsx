import React, { useState } from 'react';
import OrderManager from './OrderManager';
import CurrencyManager from './CurrencyManager';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import DeliveryManager from './DeliveryManager';

const Admin: React.FC = () => {

    return (
        <div className="container">
            <div className='row'>
                <OrderManager />
                <CurrencyManager />
                <CategoryManager />
                <ProductManager />
                <DeliveryManager />
            </div>
        </div>
    );
}

export default Admin;
