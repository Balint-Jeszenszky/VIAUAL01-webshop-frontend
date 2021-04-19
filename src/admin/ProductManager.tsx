import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const ProductManager: React.FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>('choose');
    const products = useRef<[{id: string, name: string}]>();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, '/products/all', userCtx)
        .then(res => {
            products.current = res.data;
            setLoaded(true)
        });
    }, []);

    const onSelect = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    }

    return (
        <div className='col-12 col-lg-6 mt-3'>
            <h1>Manage products</h1>
            {!loaded && <Loading />}
            {loaded && <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
                <div className="w-100">
                    <div className='w-100 mb-2'>
                        <select className='form-control w-50' onChange={onSelect}>
                            <option value="choose">Choose...</option>
                            {products.current?.map(e => (<option value={e.id} key={e.id}>{e.name}</option>))}
                        </select>
                        <Link to={`/admin/product/${selected}`}><button className='btn btn-primary ml-2' type='button' onClick={() => {}} disabled={selected === 'choose'}>Edit</button></Link>
                    </div>
                    <div>
                        <Link to='/admin/product/new'><button className={'btn btn-primary'} type='button'>Add new product</button></Link>
                    </div>
                </div>
            </form>}
        </div>
    );
}

export default ProductManager;
