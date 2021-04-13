import React from 'react';

interface IProductDetails {
    hide(): void;
}

const ProductDetails: React.FC<IProductDetails> = props => {

    return (
        <div className='col-12 col-lg-6 mt-3'>
            <h1>Add new products</h1>
            <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
                <div className="w-100">
                    <div className='w-100 mb-2'>
                        {/* <select className='form-control w-50' onChange={() => {}}>
                            <option value="choose">Choose...</option>
                            {/* {orders.current.map(e => (<option value={e.id} key={e.id}>{(new Date(e.date)).toLocaleDateString()} - {e.id}</option>))} /}
                        </select> */}
                        <input className="form-control w-100 mb-2" placeholder='Name' />
                        <input className="form-control w-100 mb-2" placeholder='Description' />
                        <input className="form-control w-100 mb-2" placeholder='Image' />
                        <input className="form-control w-100 mb-2" placeholder='Category' />
                        <input className="form-control w-100 mb-2" placeholder='Price' />
                        <input className="form-control w-100 mb-2" placeholder='Stock' />
                        <button className='btn btn-primary' type='button' onClick={() => {}}>Save</button>
                        <button className='btn btn-secondary ml-2' type='button' onClick={props.hide}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProductDetails;
