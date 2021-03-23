import React from 'react';

const Admin: React.FC = () => {

    return (
        <div className="container">
            <div className='row'>
                <div className='col-12 col-lg-6 mt-3'>
                    <h1>Manage orders</h1>
                    <form className='form-inline'>
                        <select className='form-control w-50'>
                            <option >Choose...</option>
                            {/* <option value="">{}</option> */}
                        </select>
                        <button className='btn btn-primary'>Edit</button>
                    </form>
                </div>
                <div className='col-12 col-lg-6 mt-3'>
                    <h1>Manage currencies</h1>
                    <h3>Add new</h3>
                    <form className='form-inline'>
                        <select className='form-control w-50'>
                            <option >Choose...</option>
                            {/* <option value="">{}</option> */}
                        </select>
                        <button className='btn btn-primary'>Add</button>
                    </form>
                    <h3>Remove</h3>
                    <form className='form-inline'>
                        <select className='form-control w-50'>
                            <option >Choose...</option>
                            {/* <option value="">{}</option> */}
                        </select>
                        <button className='btn btn-danger'>Remove</button>
                    </form>
                </div>
                <div className='col-12 col-lg-6 mt-3'>
                    <h1>Manage categories</h1>
                    <h3>Add new</h3>
                    <form className='form-inline'>
                        <select className='form-control w-50'>
                            <option >Choose...</option>
                            {/* <option value="">{}</option> */}
                        </select>
                        <button className='btn btn-primary'>Add</button>
                    </form>
                    <h3>Remove</h3>
                    <form className='form-inline'>
                        <select className='form-control w-50'>
                            <option >Choose...</option>
                            {/* <option value="">{}</option> */}
                        </select>
                        <button className='btn btn-danger'>Remove</button>
                    </form>
                </div>
                <div className='col-12 col-lg-6 mt-3'>
                    <h1>Manage products</h1>
                    <h3>Add new</h3>
                    <form className='form-inline'>
                        <select className='form-control w-50'>
                            <option >Choose...</option>
                            {/* <option value="">{}</option> */}
                        </select>
                        <button className='btn btn-primary'>Add</button>
                    </form>
                    <h3>Remove</h3>
                    <form className='form-inline'>
                        <select className='form-control w-50'>
                            <option >Choose...</option>
                            {/* <option value="">{}</option> */}
                        </select>
                        <button className='btn btn-danger'>Remove</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Admin;
