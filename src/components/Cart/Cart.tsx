import { Wrapper } from "./Cart.styles"; 

import CartItem from "../CartItem/CartItem";


import {CartItemType} from "../../utils/Types";


type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart}) => {

    const calculateTotal = (items : CartItemType[]) => (
        items.reduce((sum: number, item) => sum + (item.quantity * item.price), 0)
    )

    return(
        <Wrapper>
            <h2>Your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null }
            {cartItems.map((cartItem) => (
                <CartItem 
                key={cartItem.id}
                item={cartItem}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                />
            ) )}
            <h2>Total : ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart;