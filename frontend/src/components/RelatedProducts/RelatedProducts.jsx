import React, { useRef } from 'react';
import data_product from "../Assests/data";
import Item from "../Item/Item";

const RelatedProducts = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
          <p className="mt-2 text-gray-600">Products you might also like</p>
        </div>
        
        {/* Navigation Buttons */}
        <div className="hidden md:flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg 
              className="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg 
              className="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Products Scroll Container */}
      <div 
        ref={scrollRef}
        className="relative -mx-4 px-4"
      >
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex space-x-6 py-4">
            {data_product.map((item, i) => (
              <div key={i} className="flex-shrink-0 w-64">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  {/* Product Image */}
                  <div className="relative pb-[100%] overflow-hidden rounded-t-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                    {/* New Price Tag */}
                    {item.old_price && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                        Sale
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${item.new_price}
                      </span>
                      {item.old_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${item.old_price}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                      <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="mt-4 flex justify-center space-x-2 md:hidden">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default RelatedProducts;