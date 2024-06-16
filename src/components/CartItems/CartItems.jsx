import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import remove_icon from '../Assests/cart_cross_icon.png';

const CartItems = () => {
    const { all_product, cartItems,removeFromCart,getTotalCartAmount } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main ">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) { // Mapping through the cartItems array and checking if quantity is greater than 0
                    return (
                        <div>
                            <div className="cartitems-format cartitems-format-main" key={e.id}>
                                <img src={e.image} alt="" className="carticon-product-icon" />
                               <p>{e.name}</p>
                                <p>{e.new_price}</p>
                                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                <p>{e.new_price * cartItems[e.id]}</p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className='cartitems-down'>
                <div className='cartitems-total'>
                    <h1>Cart total</h1>
                    <div>
                    <div className='cartitems-total-item'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className='cartitems-total-item'>
                        <p>Shipping fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className='cartitems-total-item'>
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Proceed To checkout</button>
            </div>
            <div className='cartitems-promocode'>
                <p>if you have a promo code, enter it here</p>
                <div className='cartitems-promobox'>
                    <input type='text' />
                    <button>submit</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default CartItems;