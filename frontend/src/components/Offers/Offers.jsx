import React from 'react';
import { ArrowRight } from 'lucide-react';

const Offers = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="animate-fade-up text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Exclusive
                <br />
                Offers For You
              </h2>
              <p className="text-lg font-medium text-purple-100">
                ONLY ON BEST SELLERS PRODUCTS
              </p>
              <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-lg font-semibold text-purple-600 transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg">
                Check Now
                <ArrowRight 
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={20}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
              </button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-purple-100/10 backdrop-blur-sm">
              <img
                src="/api/placeholder/600/600"
                alt="Exclusive offer product"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Decorative elements */}
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-purple-400/20 blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl"></div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -right-4 top-4 rotate-12 rounded-lg bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm">
              <p className="text-sm font-semibold text-purple-600">Up to 50% Off</p>
            </div>
            <div className="absolute -left-4 bottom-4 -rotate-12 rounded-lg bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm">
              <p className="text-sm font-semibold text-blue-600">Limited Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
    </div>
  );
};

export default Offers;