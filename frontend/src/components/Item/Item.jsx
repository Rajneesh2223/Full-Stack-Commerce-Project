import React from 'react';
import { Link } from 'react-router-dom';
import { BadgePercent } from 'lucide-react'; // Import Lucide icon


const Item = (props) => {
  return (
    <div className="item p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105">
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)} className="block relative">
        <img src={props.image} alt={props.name} className="w-full h-48 object-cover rounded-md" />
        {props.old_price > props.new_price && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full flex items-center">
            <BadgePercent className="w-4 h-4 mr-1" /> Sale
          </span>
        )}
      </Link>
      <div className="mt-3">
        <p className="text-lg font-medium text-gray-800 truncate">{props.name}</p>
        <div className="flex items-center space-x-2 mt-2">
          <div className="text-xl font-semibold text-gray-900">${props.new_price}</div>
          {props.old_price > props.new_price && (
            <div className="text-sm line-through text-gray-500">${props.old_price}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
