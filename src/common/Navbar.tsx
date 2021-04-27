import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { CategoryModel } from '../common/Models';
import { UserContext } from './UserContext';
import webshopAPI, { actions } from './webshopAPI';

interface INavbar {
    loggedIn: boolean;
    categories: CategoryModel[];
    setCategories(categories: CategoryModel[]): void
};

const Navbar: React.FC<INavbar> = props => {

    const [loaded, setLoaded] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const categories = props.categories;
    const userCtx = useContext(UserContext);

    const admin = { name: 'Admin', path: '/admin', active: useRouteMatch('/admin') !== null };
    const cart = { name: 'Cart', path: '/cart', active: useRouteMatch('/cart') !== null };

    const loggedInPagenames = [
        { name: 'Categories', path: '', active: useRouteMatch('/category') !== null },
        userCtx.role === 'ADMIN' ? admin : cart,
        { name: 'Profile', path: '/profile', active: useRouteMatch('/profile') !== null },
        { name: 'Logout', path: '/logout', active: false }
    ];

    const loggedOutPagenames = [
        { name: 'Categories', path: '', active: useRouteMatch('/category') !== null },
        { name: 'Login', path: '/auth', active: false }
    ];

    const closeNavbar = () => { if (window.innerWidth < 992) (document.querySelector(".navbar-toggler") as HTMLElement).click() }

    const pages = (props.loggedIn ? loggedInPagenames : loggedOutPagenames).map((page, i) => {
        const active = page.active ? ' active' : '';
        const classname = `nav-item${active}`;
        if (page.name === 'Categories') {
            return (
                <li className="nav-item dropdown" key='catDropdown'>
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {page.name}
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {loaded && categories.map(e => (
                            <Link className="dropdown-item" to={`/category/${e.name}/page/1`} key={`cat${e.id}`}
                                onClick={closeNavbar}>
                                {e.name}
                            </Link>))
                        }
                    <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to='/' onClick={closeNavbar}>
                            Recommended
                        </Link>
                    </div>
                </li>
            );
        }
        return (
            <li className={classname} key={`nav${i}`}>
                <Link to={page.path} className="nav-link" onClick={closeNavbar}>
                    {page.name}
                </Link>
            </li>
        );
    });

    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        webshopAPI(actions.GET, '/categories')
        .then(res => {
            props.setCategories(res.data);
            setLoaded(true);
        });
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark boxrow header">
            <div className="container">
                <Link className="navbar-brand" to="/">Webshop</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <div className="flex-grow-1 d-flex">
                    <form className="form-inline my-2 my-lg-0 flex-grow-1 flex-lg-grow-0 flex-nowrap mx-0 mx-lg-auto" 
                        onSubmit={e => {e.preventDefault(); document.getElementById('searchBtn')?.click(); return false;}}>
                        <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" onChange={onQueryChange} value={query} />
                        <Link to={`/search/${query.trim().replace(/\s\s+/g, ' ').replaceAll(' ', '+')}/page/1`} onClick={closeNavbar}>
                            <button className="btn btn-outline-light my-2 my-sm-0" type="button" id="searchBtn">
                                Search
                            </button>
                        </Link>
                    </form>
                </div>
                    <ul className="navbar-nav ml-auto">
                        {pages}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
