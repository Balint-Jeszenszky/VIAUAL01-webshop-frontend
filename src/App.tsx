import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './auth/Auth';
import Navbar from './common/Navbar';
import Recommended from './products/Recommended';
import ProductPage from './products/ProductPage';
import Products from './products/Products';
import SearchResult from './products/SearchResult';
import Profile from './profile/Profile';
import './App.css';

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userID, setUserID] = useState<string>('0');

    return (
        <>
            <Navbar loggedIn={loggedIn} />
            <Switch>
                <Route exact path='/'>
                    <Recommended />
                </Route>
                <Route exact path='/auth'>
                    {loggedIn ? <Redirect to='/' /> : <Auth setLoggedin={setLoggedIn} setUserID={setUserID} />}
                </Route>
                <Route exact path='/basket'>
                    {loggedIn ? <>Basket...</> : <Redirect to='/' />}
                </Route>
                <Route exact path='/category/:id/page/:page'>
                    <Products />
                </Route>
                <Route exact path='/orders'>
                    {loggedIn ? <>Orders...</> : <Redirect to='/' />}
                </Route>
                <Route exact path='/orders/:id'>
                    {loggedIn ? <>Order...</> : <Redirect to='/' />}
                </Route>
                <Route exact path='/product/:id'>
                    <ProductPage />
                </Route>
                <Route exact path='/profile'>
                    {loggedIn ? <Profile userID={userID} /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/profile/edit'>
                    {loggedIn ? <>Edit profile...</> : <Redirect to='/' />}
                </Route>
                <Route exact path='/search/:query/page/:page'>
                    <SearchResult />
                </Route>
                <Route path='/'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </>
    );
}

export default App;
