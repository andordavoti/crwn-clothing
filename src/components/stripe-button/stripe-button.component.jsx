import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_F5TFdEKeaDnFkSpCB1DIl40b00TYdprZ9q'

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image={require('../../assets/crown.svg')}
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey} />
}

export default StripeButton