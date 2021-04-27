import React, { useContext, useRef, useState } from 'react';
import { CategoriesContext } from '../common/CategoriesContext';
import { CategoryModel } from '../common/Models';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

interface ICategoryManager {
    setCategories(categories: CategoryModel[]): void
}

const CategoryManager: React.FC<ICategoryManager> = props => {
    const [added, setAdded] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [editCategoryName, setEditCategoryName] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('choose');
    const categories = useContext(CategoriesContext);

    const userCtx = useContext(UserContext);

    const onAdd = () => {
        webshopAPI(actions.POST, '/category', userCtx, {name: newCategoryName})
        .then(res => {
            setAdded(true);
            setTimeout(() => setAdded(false), 3000);
            props.setCategories([...categories, res.data]);
            setNewCategoryName('');
        });
    }

    const selectCategory = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(e.target.value);
    }

    const cancelEdit = () => {
        setEditCategoryName('');
        setEditing(false);
    }

    const onDelete = () => {
        if (selectedCategoryId !== 'choose') {
            webshopAPI(actions.DELETE, `/category/${selectedCategoryId}`, userCtx)
            .then(res => {
                props.setCategories([...categories.filter(c => c.id !== selectedCategoryId)]);
            });
        }
    }

    const edit = () => {
        if (selectedCategoryId !== 'choose') {
            setEditCategoryName(categories.find(e => e.id === selectedCategoryId)!.name);
            setEditing(true);
        }
    }

    const save = () => {
        webshopAPI(actions.PUT, `/category/${selectedCategoryId}`, userCtx, 
            Object.assign(categories.find(e => e.id === selectedCategoryId), {name: editCategoryName}))
        .then(res => {
            setEditing(false);
            categories[categories.findIndex(c => c.id === selectedCategoryId)].name = editCategoryName;
            props.setCategories([...categories]);
        })
    }

    return (
        <div className='col-12 col-lg-6 mt-3'>
            <h1>Manage categories</h1>
            <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
                <div className="w-100 mb-2">
                    <input className="form-control w-50" placeholder='Name' value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
                    <button className={`btn ${added ? 'btn-success' : 'btn-primary'} ml-2`} type='button' onClick={onAdd} disabled={newCategoryName === ''}>Add</button><br />
                </div>

                <div className="w-100">
                    {!editing && <select className='form-control w-50' onChange={selectCategory}>
                        <option value={'choose'}>Choose...</option>
                        {categories.map(e => (<option value={e.id} key={e.id}>{e.name}</option>))}
                    </select>}
                    {!editing && <button className='btn btn-primary ml-2' type='button' onClick={edit} disabled={selectedCategoryId === 'choose'}>Edit</button>}
                    {!editing && <button className='btn btn-danger ml-2' type='button' onClick={onDelete} disabled={selectedCategoryId === 'choose'}>Delete</button>}

                    {editing && <input className="form-control w-50" placeholder='Name' value={editCategoryName} onChange={e => setEditCategoryName(e.target.value)} />}
                    {editing && <button className='btn btn-primary ml-2' type='button' onClick={save}>Save</button>}
                    {editing && <button className='btn btn-secondary ml-2' type='button' onClick={cancelEdit}>Cancel</button>}
                </div>
            </form>
        </div>
    );
}

export default CategoryManager;
