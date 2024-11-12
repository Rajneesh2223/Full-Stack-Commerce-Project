import React from 'react';

const Newsletter = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-lg shadow-lg max-w-lg mx-auto my-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Get Exclusive Offers On Your Email</h1>
      <p className="mb-6 text-gray-100">Subscribe to our newsletter and stay updated</p>
      <div className="flex items-center justify-center">
        <input
          type="email"
          placeholder="Your Email ID"
          className="p-3 rounded-l-lg w-full max-w-xs focus:outline-none text-gray-800"
        />
        <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold p-3 rounded-r-lg transition duration-200">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
