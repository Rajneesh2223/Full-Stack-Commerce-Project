import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';

// Item component defined within the same file for completeness
const Item = ({ image, name, price, oldPrice }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image || "/api/placeholder/400/400"} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100">
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-1 text-lg font-medium text-gray-900">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">${price}</span>
          {oldPrice && (
            <span className="text-sm text-gray-500 line-through">${oldPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:4000/popularinwomen');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setPopularProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Popular in Women
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover our most loved styles for women
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popularProducts.map((item) => (
          <Item
            key={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            oldPrice={item.oldPrice}
          />
        ))}
      </div>
    </section>
  );
};

export default Popular;