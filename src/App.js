import React, { useEffect } from 'react';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot((snapShot) => {
                    dispatch(
                        setCurrentUser({
                            id: snapShot.id,
                            ...snapShot.data(),
                        })
                    );
                });
            }
            dispatch(setCurrentUser(userAuth));
        });

        return () => unsubscribeFromAuth();
    }, [dispatch]);

    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route exact path="/checkout" component={CheckoutPage} />
                <Route exact path="/signin" render={() => (currentUser ? <Redirect to="/" /> : <SignInAndSignUp />)} />
            </Switch>
        </div>
    );
};

export default App;
