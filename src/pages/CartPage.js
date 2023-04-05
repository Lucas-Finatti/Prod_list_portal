import React from "react";
import Navigation from '../navigation/navigation'
import ShoppingCart from "../components/cart_component";

const Cart = () => {
    return (
        <>
            <Navigation></Navigation>
            <h1>Cart</h1>
            <ShoppingCart/>
        </>
    )
}

export default Cart