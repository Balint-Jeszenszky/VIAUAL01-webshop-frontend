import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { CategoriesContext } from '../common/CategoriesContext';
import { ProductModel } from '../common/Models';
import { UserContext } from '../common/UserContext';
import webshopAPI, { actions } from '../common/webshopAPI';

const ProductDetails: React.FC = () => {
    const userCtx = useContext(UserContext);
    const categories = useContext(CategoriesContext);

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');
    const [imageFile, setImageFile] = useState<File>();
    const [categoryId, setCategoryId] = useState<string>(categories[0]?.id);
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [recommended, setRecommended] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const productId = useRef<string>((useParams() as { id: string }).id);
    const editing = productId.current !== 'new';

    useEffect(() => {
        editing && webshopAPI(actions.GET, `/product/${productId.current}`, userCtx)
        .then(res => {
            const product: ProductModel = res.data;
            setName(product.name);
            setDescription(product.description);
            setImageURL(product.imageURL);
            setCategoryId(product.categoryID);
            setPrice(product.price[Object.keys(product.price)[0]]);
            setStock(product.stock);
            setRecommended(product.recommended);
        });
    }, []);

    const save = () => {
        const method = editing ? actions.PUT : actions.POST;
        const formData = new FormData();
        if (imageFile) {
            formData.append('productImage', imageFile);
        }

        formData.append('name', name);
        formData.append('description', description);
        formData.append('categoryID', categoryId);
        formData.append('price', price.toString());
        formData.append('stock', stock.toString());
        formData.append('recommended', recommended ? 'true' : 'false');

        if (editing) {
            formData.append('id', productId.current);
        }

        webshopAPI(method, `/product${editing ? `/${productId.current}` : ''}`, userCtx, formData)
        .then(res => {
            if (!editing) {
                productId.current = res.data.id;
            }
            setSaved(true);
        });
    }

    const deleteProduct = () => {
        webshopAPI(actions.DELETE, `/product/${productId.current}`, userCtx)
        .then(res => {
            setDeleted(true);
        });
    }

    if (saved) {
        return(<Redirect to={`/product/${productId.current}`} />);
    }

    if (deleted) {
        return(<Redirect to='/admin' />);
    }

    return (
        <div className='container'>
            <h1>Add new product</h1>
            <form onSubmit={e => {e.preventDefault(); return false;}}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input className="form-control w-100" id='name' value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea className="form-control w-100" id='description' value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <div className="custom-file">
                        <input type='file' className="custom-file-input w-100" id='image' onChange={e => e.target.files && setImageFile(e.target.files[0]) } />
                        <label className='custom-file-label' htmlFor='customFile'>{imageFile?.name || imageURL || 'Choose file'}</label>
                    </div>
                    <small>(max. 1 MB)</small>
                </div>
                
                <div className="form-group">
                    <label>Category:</label>
                    <select className='form-control w-100' onChange={e => setCategoryId(e.target.value)}>
                        {categories.map(e => (<option selected={e.id === categoryId} value={e.id} key={e.id}>{e.name}</option>))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type='number' className="form-control w-100" id='price' value={price} onChange={e => setPrice(parseFloat(e.target.value))} />
                    <small>In the webshop's default currency</small>
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input type='number' className="form-control w-100" id='stock' value={stock} onChange={e => setStock(parseFloat(e.target.value))} />
                </div>

                <div className="w-100" >
                    <input type='radio' value='true' checked={recommended} onChange={e => setRecommended(e.target.value === 'true')} /> Recommended <br />
                    <input type='radio' value='false' checked={!recommended} onChange={e => setRecommended(e.target.value === 'true')} /> Not recommended
                </div>

                <button className='btn btn-primary' type='button' onClick={save}>Save</button>
                <Link to='/admin'><button className='btn btn-secondary ml-2' type='button'>Cancel</button></Link>
                <button className='btn btn-danger ml-2' type='button' onClick={deleteProduct}>Delete</button>
            </form>
        </div>
    );
}

export default ProductDetails;
