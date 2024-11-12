import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Item/Item';

const ShopCategory = ({ banner, category }) => {
  const { all_product } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const productsPerPage = 12;
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);
  // Guard against undefined or null all_product
  if (!all_product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Ensure all_product is an array
  const productArray = Array.isArray(all_product) ? all_product : Object.values(all_product);

  // Filter products by category
  const filteredProducts = productArray.filter(item => 
    item && item.category && item.category.toLowerCase() === category.toLowerCase()
  );

  const sortProducts = () => {
    let sortedProducts = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name':
        return sortedProducts.sort((a, b) => 
          (a.name || '').localeCompare(b.name || '')
        );
      default:
        return sortedProducts;
    }
  };



  const sortedProducts = sortProducts();

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Reset to first page when category changes

  if (filteredProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
          <img 
            src={banner} 
            alt="Category Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner Section */}
      <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
        <img 
          src={banner} 
          alt="Category Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
        </div>
      </div>

      {/* Filters and Sorting Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <p className="text-gray-600">
          Showing <span className="font-medium">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)}</span> out of {sortedProducts.length} products
        </p>

        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
          >
            <span>Sort by</span>
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
              onBlur={() => setIsDropdownOpen(false)}
            >
              <div className="py-1">
                {[
                  { value: 'default', label: 'Default' },
                  { value: 'price-low', label: 'Price: Low to High' },
                  { value: 'price-high', label: 'Price: High to Low' },
                  { value: 'name', label: 'Name' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      sortBy === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } hover:bg-gray-100`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((item) => (
          <Item 
            key={item.id} 
            id={item.id} 
            name={item.name || 'Untitled Product'} 
            image={item.image} 
            price={item.price || 0}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;