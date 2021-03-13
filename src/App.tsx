import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './auth/Auth';
import Navbar from './common/Navbar';
import Recommended from './products/Recommended';
import ProductPage from './products/ProductPage';
import './App.css';

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userID, setUserID] = useState<number>(0);

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
                <Route exact path='/category/:id/page/:number'>
                    Category...
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
                    {loggedIn ? <>Profile...</> : <Redirect to='/' />}
                </Route>
                <Route exact path='/profile/edit'>
                    {loggedIn ? <>Edit profile...</> : <Redirect to='/' />}
                </Route>
                <Route exact path='/search/:query/page/:number'>
                    Search...
                </Route>
                <Route path='/'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </>
    );
}

export default App;
