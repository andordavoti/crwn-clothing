import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';
import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverview = lazy(() => import('../../components/collections-overview/collections-overview.component'));
const CollectionPage = lazy(() => import('../collection/collection.component'));

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = withSpinner(CollectionPage);

const ShopPage = ({ match }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const collectionRef = firestore.collection('collections');
        const unsubscribeFromSnapshot = collectionRef.onSnapshot((snapshot) => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(updateCollections(collectionsMap));
            setLoading(false);
        });
        return () => unsubscribeFromSnapshot();
    }, [dispatch]);

    return (
        <div className="shop-page">
            <Suspense fallback={<Spinner />}>
                <Route
                    exact
                    path={`${match.path}`}
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props} />}
                />
            </Suspense>
        </div>
    );
};

export default ShopPage;
