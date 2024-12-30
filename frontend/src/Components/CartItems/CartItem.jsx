import React, { useContext } from 'react';
import './CartItem.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/removecart.jpeg';

const CartItem = () => {
    const {getTotalCartAmount, all_products, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <div className="cartitem">
            <div className="cartitem-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_products.map((product) => {
                const quantity = cartItems[product.id];
                if (quantity > 0) {
                    return (
                        <div key={product.id}>
                            <div className="cartitem-format cartitem-format-main">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="carticon-product-icon"
                                />
                                <p>{product.name}</p>
                                <p>₹{product.new_price}</p>
                                <button className="cartitem-quantity">{quantity}</button>
                                <p>₹{product.new_price * quantity}</p>
                                <img className='cartitem-remove-icon'
                                    src={remove_icon}
                                    onClick={() => removeFromCart(product.id)}
                                    alt="Remove"
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null; // Skip rendering if quantity is 0
            })}
            <div className="cartitem-down">
                <div className="cartitem-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitem-total-item">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitem-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitem-total-item">
                            <h3>Total</h3>
                            <h3>₹{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitem-promocode">
                    <p>If you have a promocode, Enter it here.</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
