import React from 'react';
import './BreadCrumb.css'; // Corrected filename
import arrow_icon from '../Assests/arrow.png';

const Breadcrumb = (props) => { // Corrected component name
  const { product } = props;
  return (
    <div className='breadcrumb'> {/* Corrected class name */}
      HOME <img src={arrow_icon} alt=''/> SHOP <img src={arrow_icon} alt='' />{product.category}<img src={arrow_icon} alt=''/> {product.name}
    </div>
  );
}

export default Breadcrumb; // Corrected component export
