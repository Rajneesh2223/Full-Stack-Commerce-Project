import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { ShoppingCart, LogIn, LogOut, Store, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();
  const cartItems = getTotalCartItems();

  const navItems = [
    { path: '/', label: 'Shop', id: 'shop' },
    { path: '/mens', label: 'Men', id: 'mens' },
    { path: '/womens', label: 'Women', id: 'womens' },
    { path: '/kids', label: 'Kids', id: 'kids' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SHOPPER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
                  ${isActive(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section: Login/Logout and Cart */}
          <div className="flex items-center space-x-4">
            {localStorage.getItem('auth-token') ? (
              <button
                onClick={() => {
                  localStorage.removeItem('auth-token');
                  window.location.replace('/');
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            ) : (
              <Link to="/login">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg">
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Login</span>
                </button>
              </Link>
            )}

            <Link to="/cart" className="relative group">
              <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                {cartItems > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold">
                    {cartItems}
                  </div>
                )}
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;