import React from 'react';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { CollectionContainer, CollectionTitle, CollectionItems } from './collection.styles';

const CollectionPage = ({ collection: { title, items } }) => (
    <CollectionContainer>
        <CollectionTitle>{title}</CollectionTitle>
        <CollectionItems>
            {items.map((item) => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </CollectionItems>
    </CollectionContainer>
);

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
