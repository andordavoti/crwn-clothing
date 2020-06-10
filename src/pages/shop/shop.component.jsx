import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import withSpinner from '../../components/with-spinner/with-spinner.component';

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
            <Route
                exact
                path={`${match.path}`}
                render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}
            />
            <Route
                path={`${match.path}/:collectionId`}
                render={(props) => <CollectionsPageWithSpinner isLoading={loading} {...props} />}
            />
        </div>
    );
};

export default ShopPage;
