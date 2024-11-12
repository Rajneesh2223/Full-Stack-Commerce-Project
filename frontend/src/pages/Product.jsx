import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import Description from '../components/Description/Description';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      if (!all_product || all_product.length === 0) {
        throw new Error('Products not available');
      }

      const foundProduct = all_product.find((e) => e.id === Number(productId));
      
      if (!foundProduct) {
        throw new Error('Product not found');
      }

      setProduct(foundProduct);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [productId, all_product]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-xl font-semibold mb-4">{error}</div>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Section */}
      <div className="mb-6">
        <Breadcrumb product={product} />
      </div>

      {/* Main Product Section */}
      <div className="mb-12">
        <ProductDisplay product={product} />
      </div>

      {/* Description Section */}
      <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
        <Description product={product} />
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Related Products</h2>
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>

      {/* Newsletter Subscription - Optional */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get special offers, free giveaways, and new product launches.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default Product;