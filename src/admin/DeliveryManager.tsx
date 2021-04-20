import React, { useContext, useEffect, useRef, useState } from 'react';
import Loading from '../common/Loading';
import { CompanyModel } from '../common/Models';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const DeliveryManager: React.FC = () => {
    const [newCompanyName, setNewCompanyName] = useState<string>('');
    const [loaded, setLoaded] = useState<boolean>(false);
    const [added, setAdded] = useState<boolean>(false);
    const companies = useRef<CompanyModel[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CompanyModel>();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, '/delivery', userCtx)
        .then(res => {
            companies.current = res.data;
            setLoaded(true);
        });
    }, []);

    const onAdd = () => {
        webshopAPI(actions.POST, '/delivery', userCtx, {name: newCompanyName})
        .then(res => {
            setAdded(true);
            setTimeout(() => setAdded(false), 3000);
        });
    }

    const createNewToken = () => {
        webshopAPI(actions.PATCH, `/delivery/${selectedCompany?.id}`, userCtx)
        .then(res => {
            const newData = Object.assign({}, selectedCompany);
            Object.assign(newData, {accessToken: res.data.accessToken})
            setSelectedCompany(newData);
        });
    }


    const onDelete = () => {
        console.log(selectedCompany?.id)
        webshopAPI(actions.DELETE, `/delivery/${selectedCompany?.id}`, userCtx)
        .then(res => {

        })
    }

    const selectCompany = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== 'choose') {
            setSelectedCompany(companies.current.find(c => c.id === e.target.value));
        } else {
            setSelectedCompany(undefined);
        }
    }
    const copy = () => {
        navigator.clipboard.writeText(selectedCompany?.accessToken || '');
    }

    return (
        <div className='col-12 col-lg-6 mt-3'>
            <h1>Manage delivery companies</h1>
            {!loaded && <Loading />}
            {loaded && <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
                <div className="w-100 mb-2">
                    <input className="form-control w-50" placeholder='Name' value={newCompanyName} onChange={e => setNewCompanyName(e.target.value)} />
                    <button className={`btn ${added ? 'btn-success' : 'btn-primary'} ml-2`} type='button' onClick={onAdd}>Add</button><br />
                </div>

                <div className="w-100 mb-2">
                    <select className='form-control w-50' onChange={selectCompany}>
                        <option value={'choose'}>Choose...</option>
                        {companies.current.map(e => (<option value={e.id} key={e.id}>{e.name}</option>))}
                    </select>
                    <button className='btn btn-primary ml-2' type='button' onClick={createNewToken}>New token</button>
                    <button className='btn btn-danger ml-2' type='button' onClick={onDelete}>Delete</button>
                </div>
                <input className="form-control w-50" value={selectedCompany?.accessToken || ''} />
                <button className='btn btn-primary ml-2' type='button' onClick={copy}><i className="fas fa-copy"></i></button>
            </form>}
        </div>
    );
}

export default DeliveryManager;
