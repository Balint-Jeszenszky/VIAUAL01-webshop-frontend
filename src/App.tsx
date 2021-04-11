import React, { useEffect, useState } from 'react';
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
import Logout from './auth/Logout';
import { IUserContext, UserContext } from './common/UserContext';
import { CategoriesContext } from './common/CategoriesContext';
import { CategoryModel } from './common/Models';
import './App.css';
import { refreshLogin } from './common/webshopAPI';

const App: React.FC = () => {
    const [userCtx, setUserCtx] = useState<IUserContext>({currency: 'HUF'});
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    const updateUserCtx = (newCtx: IUserContext) => {
        const currentCtx = Object.assign({}, userCtx);
        setUserCtx(Object.assign(currentCtx, newCtx));
    }

    useEffect(() => {
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (refreshToken) {
            userCtx.refreshToken = refreshToken;
            refreshLogin(userCtx).then(() => {
                if (userCtx.accessToken) {
                    const userId = JSON.parse(atob(userCtx.accessToken.split('.')[1])).userId;
                    updateUserCtx({userId});
                }
            }).catch(() => {
                sessionStorage.clear();
            });
        }
    }, []);

    return (
        <UserContext.Provider value={userCtx}>
            <Navbar loggedIn={!!userCtx.userId} setCategories={setCategories} />
            <Switch>
                <Route exact path='/'>
                    <Recommended />
                </Route>
                <Route exact path='/admin'>
                    {userCtx.userId === 'ADMIN' ? <Admin /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/auth'>
                    {userCtx.userId ? <Redirect to='/' /> : <Auth updateUserCtx={updateUserCtx} />}
                </Route>
                <Route exact path='/cart'>
                    {userCtx.userId ? <Cart /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/category/:id/page/:page'>
                    <CategoriesContext.Provider value={categories}>
                        <Products />
                    </CategoriesContext.Provider>
                </Route>
                <Route exact path='/order/:id'>
                    {userCtx.userId ? <Order /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/product/:id'>
                    <ProductPage />
                </Route>
                <Route exact path='/profile'>
                    {userCtx.userId ? <Profile /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/profile/edit'>
                    {userCtx.userId ? <EditProfile /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/search/:query/page/:page'>
                    <SearchResult />
                </Route>
                <Route exact path='/logout'>
                    <Logout updateUserCtx={updateUserCtx} />
                </Route>
                <Route path='/'>
                    <Redirect to="/" />
                </Route>
            </Switch>
            <Footer updateUserCtx={updateUserCtx} />
        </UserContext.Provider>
    );
}

export default App;
