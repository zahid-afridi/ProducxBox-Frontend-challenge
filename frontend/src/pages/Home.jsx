import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container  text-center mt-5">
      {/* Hero Section */}
      <div className="p-5  bg-light shadow-sm rounded">
        <h1 className="fw-bold">Welcome to <span className="text-primary">RandoStore</span></h1>
        <p className="lead text-muted">
          Your one-stop shop for amazing and unique items!
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link className="btn btn-primary px-4" to="/items">
            🛍️ View Items
          </Link>
          <Link className="btn btn-success px-4" to="/add-item">
            ➕ Add New Item
          </Link>
          <Link className="btn btn-warning px-4" to="/checkout">
        🛒 Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
