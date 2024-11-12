import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignUp from './pages/LoginSignUp';


const banners = {
  men: require('./components/Assests/banner_mens.png'),
  women: require('./components/Assests/banner_women.png'),
  kids: require('./components/Assests/banner_kids.png'),
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/mens" element={<ShopCategory banner={banners.men} category="men" />} />
            <Route path="/womens" element={<ShopCategory banner={banners.women} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={banners.kids} category="kid" />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignUp />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
