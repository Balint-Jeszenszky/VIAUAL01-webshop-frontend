import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

interface NavbarProps {
    loggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = props => {

    const loggedInPagenames = [
        { name: 'Categories', path: '', active: useRouteMatch('/category') !== null },
        { name: 'Profile', path: '/profile', active: useRouteMatch('/profile') !== null },
        { name: 'Logout', path: '/logout', active: false }
    ];

    const loggedOutPagenames = [
        { name: 'Categories', path: '', active: useRouteMatch('/category') !== null },
        { name: 'Login', path: '/auth', active: false }
    ];

    const pages = (props.loggedIn ? loggedInPagenames : loggedOutPagenames).map((page, i) => {
        const active = page.active ? ' active' : '';
        const classname = `nav-item${active}`;
        return (
            <li className={classname} key={`nav${i}`}>
                <Link to={page.path} className="nav-link" onClick={() => { if (window.innerWidth < 992) (document.querySelector(".navbar-toggler") as HTMLElement).click() }}>
                    {page.name}
                </Link>
            </li>
        );
    });

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
                    <form className="form-inline my-2 my-lg-0 flex-grow-1 flex-lg-grow-0 flex-nowrap mx-0 mx-lg-auto">
                        <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light my-2 my-sm-0" type="button">Search</button>
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
