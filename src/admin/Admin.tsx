import React from 'react';
import OrderManager from './OrderManager';
import CurrencyManager from './CurrencyManager';
import CategoryManager from './CategoryManager';
import ProductManager from './ProductManager';
import DeliveryManager from './DeliveryManager';
import { CategoryModel } from '../common/Models';

interface IAdmin {
    setCategories(categories: CategoryModel[]): void;
}
const Admin: React.FC<IAdmin> = props => {

    return (
        <div className="container">
            <div className='row'>
                <OrderManager />
                <CurrencyManager />
                <CategoryManager setCategories={props.setCategories} />
                <ProductManager />
                <DeliveryManager />
            </div>
        </div>
    );
}

export default Admin;
