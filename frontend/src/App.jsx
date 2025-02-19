import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Items from "./pages/Products";
import Checkout from "./pages/Checkout";
import AddItem from "./pages/AddProducts";
import { Toaster } from 'react-hot-toast';
import ContextProvider from "./context/CartContext";



const App = () => (
   <ContextProvider>
        <BrowserRouter>
           <Toaster/>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/items" element={<Items />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/add-item" element={<AddItem />} />
            </Routes>
        </BrowserRouter>
        </ContextProvider>
    
);

export default App;
