import React from 'react'

import './checkout-item.styles.scss'

import { removeItem } from '../../redux/cart/cart.action'
import { connect } from 'react-redux'

const CheckoutItem = ({ cartItem, removeItem }) => {
    const { name, imageUrl, price, quantity } = cartItem
    return <div className='checkout-item'>
        <div className='image-container'>
            <img alt='item' src={imageUrl} />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>{quantity}</span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={() => removeItem(cartItem)}>&#10005;</div>
    </div>
}

export default connect(null, { removeItem })(CheckoutItem)