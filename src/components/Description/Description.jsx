import React from 'react'
import './Description.css'

const Description = () => {
    return (
      <div className='descriptionbox'> {/* Opening div for the DescriptionBox component */}
        <div className='descriptionbox-navigator'> {/* Navigator section */}
          <div className='descriptionbox-nav-box'>Description</div> {/* Description box */}
          <div className='descriptionbox-nav-box fade'>Reviews (122)</div> {/* Reviews box */}
        </div>
        <div className='descriptionbox-description'> {/* Description section */}
          <p>
            An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
        </div>
      </div>
    );
  }
  
  export default Description;
  