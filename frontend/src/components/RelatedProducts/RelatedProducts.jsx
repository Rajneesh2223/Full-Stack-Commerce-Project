import React from 'react';
import './RelatedProducts.css'; // Importing CSS file for styling
import data_product from "../Assests/data" // Importing product data
import Item from "../Item/Item"

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'> {/* Main container for related products */}
      <h1>Related Products</h1> 
      <hr /> 
      <div className="relatedproducts-item"> 
        {data_product.map((item, i) => { 
          return  <Item
          key={i}
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={item.new_price}
          old_price={item.old_price}
        />; // Rendering Item component for each product
        })}
      </div>
    </div>
  );
}

export default RelatedProducts; // Exporting RelatedProducts component
