import React, { useEffect, lazy, Suspense } from 'react';

import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalStyle } from './global.styles';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

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
            <GlobalStyle />
            <Header />
            <ErrorBoundary>
                <Switch>
                    <Suspense fallback={<Spinner />}>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/shop" component={ShopPage} />
                        <Route exact path="/checkout" component={CheckoutPage} />
                        <Route
                            exact
                            path="/signin"
                            render={() => (currentUser ? <Redirect to="/" /> : <SignInAndSignUp />)}
                        />
                    </Suspense>
                </Switch>
            </ErrorBoundary>
        </div>
    );
};

export default App;
