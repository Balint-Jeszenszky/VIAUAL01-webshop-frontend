import React, { useContext, useEffect, useState, useRef } from 'react';
import Loading from '../common/Loading';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const CurrencyManager: React.FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [added, setAdded] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [addCharge, setAddCharge] = useState<number>(0);
    const [editCharge, setEditCharge] = useState<number>(0);
    const [selectedAddCurrency, setSelectedAddCurrency] = useState<string>('choose');
    const [selectedEditCurrency, setSelectedEditCurrency] = useState<string>('choose');
    const allCurrencies = useRef<{[key: string]: number}>();
    const allowedCurrencies = useRef<{id?: string, name: string, charge:number}[]>();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, '/currencies/all', userCtx)
        .then(res => {
            const allowed = res.data;
            webshopAPI(actions.GET, '/currencies/allowed', userCtx)
            .then(res => {
                allowedCurrencies.current = res.data;
                allowedCurrencies.current?.forEach(e => delete allowed[e.name]);
                allCurrencies.current = allowed;
                setLoaded(true);
            });
        });
    }, []);

    const onAdd = () => {
        webshopAPI(actions.POST, '/currencies', userCtx, {name: selectedAddCurrency, charge: addCharge})
        .then(res => {
            setAdded(true);
            setTimeout(() => setAdded(false), 3000);
        });
    }

    const onSave = () => {
        const id = allowedCurrencies.current?.find(e => e.name === selectedEditCurrency)?.id;
        if (id) {
            webshopAPI(actions.PUT, `/currencies/${id}`, userCtx, {name: selectedEditCurrency, charge: editCharge})
            .then(res => {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            });
        }
    }

    const onDelete = () => {
        const toDelete = allowedCurrencies.current?.find(e => e.name === selectedEditCurrency);
        if (toDelete && toDelete.id) {
            webshopAPI(actions.DELETE, `/currencies/${toDelete.id}`, userCtx)
            .then(res => {
                
            });
        }
    }

    const changeEdited = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setSelectedEditCurrency(selected);
        const currency = allowedCurrencies.current?.find(e => e.name === selected);
        if (currency) {
            setEditCharge(currency.charge);
        }
    }

    return (
        <div className='col-12 col-lg-6 mt-3'>
            <h1>Manage currencies</h1>
            {!loaded && <Loading />}
            {loaded && <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
                <div className="w-100">
                    <select className='form-control w-25' onChange={e => setSelectedAddCurrency(e.target.value)}>
                        <option value='choose'>Choose...</option>
                        {Object.keys(allCurrencies?.current!).map(e => (<option value={e} key={e}>{e}</option>))}
                    </select>
                    <input type="number" step="0.01" className="form-control w-50 ml-2" placeholder='Charge' value={addCharge} onChange={e => setAddCharge(parseFloat(e.target.value))} />
                </div>
                <div className="w-100">
                    <button className={`btn ${added ? 'btn-success' : 'btn-primary'} my-2`} type='button' onClick={onAdd} disabled={selectedAddCurrency === 'choose'}>Add</button><br />
                </div>

                <div className="w-100">
                    <select className='form-control w-25' onChange={changeEdited}>
                        <option value="choose">Choose...</option>
                        {allowedCurrencies.current?.map(e => (<option value={e.name} key={e.id || 'huf'}>{e.name}</option>))}
                    </select>
                    <input type="number" step="0.01" className="form-control w-50 ml-2" placeholder='Charge' value={editCharge} onChange={e => setEditCharge(parseFloat(e.target.value))} />
                </div>
                <div className="w-100">
                    <button className={`btn ${saved ? 'btn-success' : 'btn-primary'} mt-2`} type='button' onClick={onSave} disabled={selectedEditCurrency === 'choose'}>Save</button>
                    <button className="btn btn-danger mt-2 ml-2" type='button' onClick={onDelete} disabled={selectedEditCurrency === 'choose'}>Delete</button>
                </div>
            </form>}
        </div>
    );
}

export default CurrencyManager;
