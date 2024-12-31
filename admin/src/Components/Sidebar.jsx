import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/product_cart.jpeg';
import list_product_icon from '../../assets/product_list.jpeg';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Product" className="sidebar-icon" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="Product List" className="sidebar-icon" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
