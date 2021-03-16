import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './auth/Auth';
import Navbar from './common/Navbar';
import Recommended from './products/Recommended';
import ProductPage from './products/ProductPage';
import Products from './products/Products';
import SearchResult from './products/SearchResult';
import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';
import Order from './order/Order';
import Cart from './cart/Cart';
import Admin from './admin/Admin';
import Footer from './common/Footer';
import { UserContext } from './common/UserContext';
import { CurrencyContext } from './common/CurrencyContext';
import './App.css';

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userID, setUserID] = useState<string>('');
    const [currency, setCurrency] = useState<string>('HUF');

    return (
        <UserContext.Provider value={userID}>
            <CurrencyContext.Provider value={currency}>
                <Navbar loggedIn={loggedIn} />
                <Switch>
                    <Route exact path='/'>
                        <Recommended />
                    </Route>
                    <Route exact path='/admin'>
                        {(loggedIn && userID === 'ADMIN') ? <Admin /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/auth'>
                        {loggedIn ? <Redirect to='/' /> : <Auth setLoggedin={setLoggedIn} setUserID={setUserID} />}
                    </Route>
                    <Route exact path='/cart'>
                        {loggedIn ? <Cart /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/category/:id/page/:page'>
                        <Products />
                    </Route>
                    <Route exact path='/order/:id'>
                        {loggedIn ? <Order /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/product/:id'>
                        <ProductPage />
                    </Route>
                    <Route exact path='/profile'>
                        {loggedIn ? <Profile /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/profile/edit'>
                        {loggedIn ? <EditProfile /> : <Redirect to='/' />}
                    </Route>
                    <Route exact path='/search/:query/page/:page'>
                        <SearchResult />
                    </Route>
                    <Route path='/'>
                        <Redirect to='/' />
                    </Route>
                </Switch>
                <Footer setCurrency={setCurrency} />
            </CurrencyContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
