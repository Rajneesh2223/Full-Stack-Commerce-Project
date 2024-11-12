import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ product }) => {
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: `/shop/${product.category.toLowerCase()}` },
    { label: product.name, href: '#', current: true }
  ];

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-gray-50">
      <ol className="mx-auto flex max-w-7xl items-center space-x-2 px-4 py-3 text-sm sm:px-6 lg:px-8">
        {breadcrumbItems.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {/* Add separator between items */}
            {index > 0 && (
              <ChevronRight 
                className="mx-2 h-4 w-4 flex-shrink-0 text-gray-400" 
                aria-hidden="true"
              />
            )}

            <div className="flex items-center">
              {/* Show icon for home */}
              {item.icon && (
                <item.icon className="mr-1 h-4 w-4 text-gray-500" aria-hidden="true" />
              )}
              
              {/* If it's the current item */}
              {item.current ? (
                <span className="font-medium text-gray-800" aria-current="page">
                  {item.label}
                </span>
              ) : (
                // If it's a clickable link
                <a
                  href={item.href}
                  className="text-gray-500 transition-colors hover:text-gray-700 hover:underline"
                >
                  {item.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;