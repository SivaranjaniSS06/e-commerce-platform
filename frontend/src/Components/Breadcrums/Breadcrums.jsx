import React from 'react';
import './Breadcrums.css';
import arrow from '../Assets/breadcrumsarr.jpeg';

const Breadcrums = (props) => {
    const { product } = props;
    return (
        <div className="breadcrums">
            HOME <img className="breadcrums-arrow" src={arrow} alt="" /> 
            SHOP <img className="breadcrums-arrow" src={arrow} alt="" /> 
            {product.category} <img className="breadcrums-arrow" src={arrow} alt="" /> 
            {product.name}
        </div>
    );
};

export default Breadcrums;
