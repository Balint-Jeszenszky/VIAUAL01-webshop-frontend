import React, { useEffect, useRef, useState } from 'react';
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
import webshopAPI, { actions, refreshLogin } from './common/webshopAPI';
import Loading from './common/Loading';
import ConfirmOrder from './order/ConfirmOrder';
import ProductDetails from './admin/ProductDetails';

const App: React.FC = () => {
    const [userCtx, setUserCtx] = useState<IUserContext>({});
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const currencies = useRef<string[]>([]);

    const updateUserCtx = (newCtx: IUserContext) => {
        if (newCtx.currency) {
            localStorage.setItem('currency', newCtx.currency);
        }
        const currentCtx = Object.assign({}, userCtx);
        setUserCtx(Object.assign(currentCtx, newCtx));
    }

    useEffect(() => {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const currency = localStorage.getItem('currency') || 'HUF';
        let ready = false;
        webshopAPI(actions.GET, '/currencies')
        .then(res => {
            currencies.current = res.data;
            if (!currencies.current.find(e => e === currency)) {
                updateUserCtx({currency: currencies.current[0]});
            }
            if (ready) {
                setLoaded(true);
            } else {
                ready = true;
            }
        });
        if (refreshToken) {
            userCtx.refreshToken = refreshToken;
            refreshLogin(userCtx).then(() => {
                if (userCtx.accessToken) {
                    const user = JSON.parse(atob(userCtx.accessToken.split('.')[1]));
                    updateUserCtx({userId: user.userId, role: user.role, currency});
                }
            }).catch(() => {
                sessionStorage.clear();
            })
            .finally(() => {
                if (ready) {
                    setLoaded(true);
                } else {
                    ready = true;
                }
            });
        } else {
            updateUserCtx({currency});
            if (ready) {
                setLoaded(true);
            } else {
                ready = true;
            }
        }
    }, []);

    return (
        <UserContext.Provider value={userCtx}>
            <Navbar loggedIn={!!userCtx.userId} setCategories={setCategories} />
            {!loaded && <Loading /> }
            {loaded && <Switch>
                <Route exact path='/'>
                    <Recommended />
                </Route>
                <Route exact path='/admin'>
                    {userCtx.role === 'ADMIN' ? 
                        <CategoriesContext.Provider value={categories}>
                            <Admin />
                        </CategoriesContext.Provider>
                        : <Redirect to='/' />}
                </Route>
                <Route exact path='/admin/product/:id'>
                    {userCtx.role === 'ADMIN' ? 
                        <CategoriesContext.Provider value={categories}>
                            <ProductDetails />
                        </CategoriesContext.Provider>
                        : <Redirect to='/' />}
                </Route>
                <Route exact path='/auth'>
                    {userCtx.userId ? <Redirect to='/' /> : <Auth updateUserCtx={updateUserCtx} />}
                </Route>
                <Route exact path='/cart'>
                    {userCtx.userId ? <Cart /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/confirmorder'>
                    {userCtx.userId ? <ConfirmOrder /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/category/:id/page/:page'>
                    <CategoriesContext.Provider value={categories}>
                        {categories.length && <Products />}
                    </CategoriesContext.Provider>
                </Route>
                <Route exact path='/order/:id'>
                    {userCtx.userId ? <Order /> : <Redirect to='/' />}
                </Route>
                <Route exact path='/product/:id'>
                    <CategoriesContext.Provider value={categories}>
                        {categories.length && <ProductPage />}
                    </CategoriesContext.Provider>
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
            </Switch>}
            <Footer updateUserCtx={updateUserCtx} currencies={currencies.current} />
        </UserContext.Provider>
    );
}

export default App;
