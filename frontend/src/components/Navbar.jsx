import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


export default function Navbar({ cartCount }) {
    const {cart}=useContext(CartContext)
    console.log('cart',cart)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">RandoStore</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/items">ITEMS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/add-item">ADD ITEMS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/checkout">
                CART <span className="badge bg-primary">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/checkout" >
        <button className='btn btn-success P-3 d-flex gap-1 '>Cart : <span>{cart.length}</span></button>
        
        
        </Link>
      </div>
    </nav>
  );
}
