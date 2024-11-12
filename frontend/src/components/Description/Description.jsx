import React, { useState } from 'react';

const Description = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('description')}
          className={`px-4 py-2 font-medium text-sm mr-4 border-b-2 transition-colors duration-200 ${
            activeTab === 'description'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 font-medium text-sm flex items-center border-b-2 transition-colors duration-200 ${
            activeTab === 'reviews'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Reviews
          <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            122
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'description' ? (
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
            </p>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8">
            Reviews content would go here
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;