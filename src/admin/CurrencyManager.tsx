import react, { useEffect, useState } from 'react';
import Loading from '../common/Loading';

const CurrencyManager: React.FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [added, setAdded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(true)
    }, []);

    const onAdd = () => {

    }

    return (
        <div className='col-12 col-lg-6 mt-3'>
            <h1>Manage currencies</h1>
            {!loaded && <Loading />}
            {loaded && <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
                <div className="w-100">
                    <select className='form-control w-25' onChange={() => {}}>
                        <option>Choose...</option>
                        {/* {orders.current.map(e => (<option value={e.id} key={e.id}>{(new Date(e.date)).toLocaleDateString()} - {e.id}</option>))} */}
                    </select>
                    <input className="form-control w-50 ml-2" placeholder='Charge' />
                </div>
                <div className="w-100">
                    <button className={`btn ${added ? 'btn-success' : 'btn-primary'} my-2`} type='button' onClick={onAdd}>Add</button><br />
                </div>

                <div className="w-100">
                    <select className='form-control w-25' onChange={() => {}}>
                        <option>Choose...</option>
                        {/* {orders.current.map(e => (<option value={e.id} key={e.id}>{(new Date(e.date)).toLocaleDateString()} - {e.id}</option>))} */}
                    </select>
                    <input className="form-control w-50 ml-2" placeholder='Charge' />
                </div>
                <div className="w-100">
                    <button className={`btn ${added ? 'btn-success' : 'btn-primary'} mt-2`} type='button' onClick={onAdd}>Save</button>
                </div>
            </form>}
        </div>
    );
}

export default CurrencyManager;
