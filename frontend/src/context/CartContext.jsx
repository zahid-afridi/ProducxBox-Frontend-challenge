import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
 
    // this function add product to cart if the product already exist then it will increase the quanity of same product by 1
    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
           
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
           
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    // reomve single product form cart 
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // decrement the quantity of product 
    const decrement = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0)
        );
    };

    // clear all product form the cart 
    const clearAllProducts = () => {
        localStorage.removeItem("cart");
        setCart([]);
        toast.success('Order placed successfully')
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart,decrement ,clearAllProducts}}>
            {children}
        </CartContext.Provider>
    );
};

export default ContextProvider;
