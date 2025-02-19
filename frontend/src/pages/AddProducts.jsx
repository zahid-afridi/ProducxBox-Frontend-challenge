import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseUrl from '../utlis/BaseUrl';
import toast from 'react-hot-toast';

export default function AddItem() {
  const [value, setValue] = useState({
    name: "",
    price: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.name || !value.price || !value.image) {
      return toast.error(`Please enter a product ${
        !value.name ? "title" : !value.price ? "price" : "image"
      }`,{
        position:'top-right'
      });
    }
    
    setLoading(true);
    try {
      const req = await fetch(`${BaseUrl}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      });
      const res = await req.json();

      if (req.ok) {
        toast.success('Product added successfully', { position: "top-right" });
        setValue({ name: "", price: "", image: "" });
      } else {
        toast.error(res.message || 'Product not added. Try Again');
      }
    } catch (error) {
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Product Title</label>
                <input 
                  type="text" 
                  name='name'
                  className="form-control" 
                  value={value.name} 
                  onChange={handleChange}
                  placeholder='Enter title'
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input 
                  type="number" 
                  name='price'
                  className="form-control" 
                  value={value.price} 
                  onChange={handleChange}
                  placeholder='Enter price'
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input 
                  type="text" 
                  name='image'
                  className="form-control" 
                  value={value.image} 
                  onChange={handleChange} 
                  placeholder='Enter image URL'
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
