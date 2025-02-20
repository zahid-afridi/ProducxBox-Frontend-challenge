import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import BaseUrl from "../utlis/BaseUrl";
import toast from "react-hot-toast";


export default function Checkout() {

  const {cart,addToCart,removeFromCart,decrement,clearAllProducts}=useContext(CartContext)


  

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.value?.price ? parseFloat(item.value.price) : parseFloat(item.price);
      return total + (price * item.quantity);
    }, 0);
  };
  
  const handleCheckout = () => {
    localStorage.removeItem("cart");
    clearAllProducts();
    toast.success('Order placed successfully')
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart && cart.map((item) => (
              <div key={item.id} className="card mb-3 shadow-sm border-0">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3 text-center">
                    <img
                      src={ item.value?.image ? item.value.image : `${BaseUrl}/${item.img}`}
                      alt={item.name}
                      className="img-fluid p-2"
                      style={{ maxHeight: "100px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="col-md-5">
                    <div className="card-body">
                      <h5 className="card-title"> {item.value?.name ? item.value?.name: item.name}</h5>
                      <p className="card-text fw-bold text-danger">${item.value?.price ? item.value?.price : item.price}</p>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decrement(item.id)}
                      >
                        −
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>Order Summary</h5>
              <p>Total: <strong>${getTotalPrice().toFixed(2)}</strong></p>
              <button className="btn btn-success w-100"  onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
