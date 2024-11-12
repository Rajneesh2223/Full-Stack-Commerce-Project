import React, { useContext, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { Trash2, Minus, Plus, Tag } from 'lucide-react';

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const [promoCode, setPromoCode] = useState('');

  // Guard against undefined or null all_product
  if (!all_product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Ensure all_product is an array
  const productArray = Array.isArray(all_product) ? all_product : Object.values(all_product);

  const CartHeader = () => (
    <div className="hidden grid-cols-6 gap-4 border-b border-gray-200 px-6 py-4 text-sm font-semibold text-gray-600 md:grid">
      <div className="col-span-2">Product</div>
      <div>Price</div>
      <div>Quantity</div>
      <div>Total</div>
      <div className="text-center">Remove</div>
    </div>
  );

  const CartItem = ({ item, quantity }) => (
    <div className="grid grid-cols-1 gap-4 border-b border-gray-200 p-6 md:grid-cols-6">
      {/* Product info */}
      <div className="col-span-2 flex gap-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-24 w-24 rounded-lg object-cover"
        />
        <div className="flex flex-col justify-center">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-500">SKU: {item.id}</p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center text-gray-900">
        ${item.new_price}
      </div>

      {/* Quantity */}
      <div className="flex items-center">
        <div className="flex items-center rounded-lg border border-gray-200">
          <button 
            className="p-2 text-gray-600 hover:text-gray-900"
            onClick={() => removeFromCart(item.id)}
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center font-medium text-gray-900">
        ${(item.new_price * quantity).toFixed(2)}
      </div>

      {/* Remove button */}
      <div className="flex items-center justify-center">
        <button 
          onClick={() => removeFromCart(item.id)}
          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );

  const OrderSummary = () => (
    <div className="rounded-lg bg-gray-50 p-6">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium text-gray-900">${getTotalCartAmount()?.toFixed(2) || '0.00'}</p>
        </div>
        
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Shipping</p>
          <p className="font-medium text-green-600">Free</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <p className="text-base font-medium text-gray-900">Order Total</p>
            <p className="text-base font-medium text-gray-900">${getTotalCartAmount()?.toFixed(2) || '0.00'}</p>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700">
        Proceed to Checkout
      </button>
    </div>
  );

  const PromoCode = () => (
    <div className="rounded-lg bg-gray-50 p-6">
      <div className="flex items-center gap-2">
        <Tag size={20} className="text-gray-400" />
        <p className="text-sm text-gray-600">Have a promo code?</p>
      </div>
      
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter code"
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
          Apply
        </button>
      </div>
    </div>
  );

  const hasItems = productArray.some(item => cartItems[item.id] > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
      
      {!hasItems ? (
        <p className="mt-4 text-gray-600">Your cart is empty</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="rounded-lg border border-gray-200 bg-white">
              <CartHeader />
              {productArray.map((item) => {
                if (cartItems[item.id] > 0) {
                  return (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      quantity={cartItems[item.id]} 
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-4">
            <OrderSummary />
            <PromoCode />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;