import React from 'react';
import { FaInstagram, FaPinterest, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-white tracking-wide mb-4">
              SHOPPER
            </h2>
            <p className="text-sm text-gray-400 text-center md:text-left">
              Your one-stop destination for all your shopping needs.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Company', 'Products', 'Offices', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#instagram"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#pinterest"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                aria-label="Pinterest"
              >
                <FaPinterest className="w-5 h-5" />
              </a>
              <a
                href="#whatsapp"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter Section (New Addition) */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <div className="flex flex-col space-y-2 w-full max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;