export const addItemToCart = (cartItems, cartItemToadd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToadd.id
    )

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToadd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }
    else {
        return [...cartItems, { ...cartItemToadd, quantity: 1 }]
    }
}