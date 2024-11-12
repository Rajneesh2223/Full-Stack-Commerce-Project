import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-8 -left-4 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Content Section */}
          <div className="flex flex-col space-y-8 text-center md:text-left">
            {/* Animated Subtitle */}
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="px-4 py-1 bg-black/5 rounded-full backdrop-blur-sm">
                <span className="text-sm font-medium tracking-wider text-gray-600">
                  NEW ARRIVALS ONLY
                </span>
              </div>
              <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-xs font-semibold text-white">
                2024
              </span>
            </div>

            {/* Main Heading Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
                  New
                </h1>
                <div className="w-12 h-12 animate-wave">
                  <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center">
                    👋
                  </div>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
                Collection
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                For Everyone
              </h1>
            </div>

            {/* Features List */}
            <div className="flex flex-col space-y-3">
              {['Premium Quality', 'Sustainable Materials', 'Free Shipping'].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-black text-white rounded-full overflow-hidden transition-all hover:scale-105">
                <span className="relative z-10">Latest Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button className="w-full sm:w-auto px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative">
            {/* Background gradient circle */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 rounded-full transform scale-95 blur-3xl opacity-70" />
            
            {/* Main image container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100" />
              <div className="relative rounded-3xl overflow-hidden transform transition-transform hover:scale-[1.02] duration-500 ease-out">
                <div className="aspect-w-4 aspect-h-5">
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-3xl">
                    {/* Placeholder for hero_image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <span className="text-sm">Image Placeholder</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;