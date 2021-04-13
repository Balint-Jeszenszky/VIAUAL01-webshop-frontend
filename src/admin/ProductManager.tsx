import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';

interface IProductManager {
    addNewProduct(): void;
}

const ProductManager: React.FC<IProductManager> = props => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(true)
    }, []);

    return (
        <div className='col-12 col-lg-6 mt-3'>
            <h1>Manage products</h1>
            {!loaded && <Loading />}
            {loaded && <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
                <div className="w-100">
                    <div className='w-100 mb-2'>
                        <select className='form-control w-50' onChange={() => {}}>
                            <option value="choose">Choose...</option>
                            {/* {orders.current.map(e => (<option value={e.id} key={e.id}>{(new Date(e.date)).toLocaleDateString()} - {e.id}</option>))} */}
                        </select>
                        <button className='btn btn-primary ml-2' type='button' onClick={() => {}}>Edit</button>
                    </div>
                    <div>
                        <button className={'btn btn-primary'} type='button' onClick={props.addNewProduct}>Add new product</button>
                    </div>
                </div>
            </form>}
        </div>
    );
}

export default ProductManager;
