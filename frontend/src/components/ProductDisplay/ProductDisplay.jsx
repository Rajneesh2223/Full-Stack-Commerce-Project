import React, { useContext, useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const thumbnails = Array(4).fill(product.image);

  const renderStars = (rating = 4) => {
    return Array(5).fill(null).map((_, index) => (
      <Star 
        key={index}
        size={20}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
      />
    ));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Side - Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            {thumbnails.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`overflow-hidden rounded-lg border-2 transition-all hover:opacity-80
                  ${selectedImage === index ? 'border-blue-500' : 'border-transparent'}`}
              >
                <img 
                  src={img} 
                  alt={`Product thumbnail ${index + 1}`}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden rounded-lg bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            {renderStars()}
            <span className="text-sm text-gray-500">(4.0)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.new_price}
            </span>
            {product.old_price && (
              <span className="text-xl text-gray-500 line-through">
                ${product.old_price}
              </span>
            )}
          </div>

          <p className="text-gray-600">
            A lightweight, usually knitted, pullover shirt, close-fitting and with 
            a round neckline and short sleeves, worn as an undershirt or outer garment.
          </p>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Select Size</h2>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-10 w-10 rounded-full border text-center leading-10 transition-colors
                    ${selectedSize === size 
                      ? 'border-blue-500 bg-blue-500 text-white' 
                      : 'border-gray-300 hover:border-blue-500'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product.id)}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          <div className="space-y-2 border-t pt-6">
            <p className="flex gap-2 text-sm text-gray-600">
              <span className="font-semibold">Category:</span>
              Women, T-shirt crop top
            </p>
            <p className="flex gap-2 text-sm text-gray-600">
              <span className="font-semibold">Tags:</span>
              Modern, Latest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;