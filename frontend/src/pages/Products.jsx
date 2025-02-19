import React, { useContext, useEffect, useState } from "react";
import BaseUrl from "../utlis/BaseUrl";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";

export default function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    GetItems();
  }, []);

  const GetItems = async () => {
    try {
      const req = await fetch(`${BaseUrl}/items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      setItems(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddtoCart = (cart) => {
    addToCart(cart);
    toast.success("Item added to cart", {
      position: "top-right",
    });
  };

  const filteredItems = items.filter((item) => {
    const name = item.value?.name || item.name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-4 px-4 fw-bold"> Products:</h2>
          <div className="input-group mb-3" style={{ maxWidth: "20%" }}>
            <span className="input-group-text p-1" id="basic-addon1">
              <CiSearch />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control form-control-sm"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredItems.length > 0 &&
            filteredItems.map((cart) => (
              <div className="col" key={cart.id}>
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={cart.value?.image ? cart.value.image : `${BaseUrl}/${cart.img}`}
                    className="card-img-top p-3"
                    alt={cart.name}
                    style={{ objectFit: "contain", height: "250px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-truncate">
                      {cart.value?.name ? cart.value.name : cart.name}
                    </h5>
                    <p className="card-text fw-bold text-danger">
                      ${cart.value?.price ? cart.value.price : cart.price}
                    </p>
                    <button
                      className="btn btn-warning w-100"
                      onClick={() => handleAddtoCart(cart)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
