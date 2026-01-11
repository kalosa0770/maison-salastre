import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Renamed 'cart' to 'cartItems' for clarity
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);
  
  // NEW: State to track if the sidebar drawer is open
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, { ...product, cartId: Date.now() }]); // Added unique ID for list rendering
    setLastAdded(product);
    setShowToast(true);
    // Optional: Uncomment the line below if you want the cart to slide open automatically when adding
    // setIsCartOpen(true); 
  };

  const removeFromCart = (id) => {
    // It's safer to filter by a unique ID than by index
    setCartItems((prev) => prev.filter((item) => item.id !== id && item.cartId !== id));
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Auto-hide toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <CartContext.Provider value={{ 
      cartItems, // Changed from 'cart' to 'cartItems' to match your Sidebar/Header
      addToCart, 
      removeFromCart, 
      cartCount: cartItems.length,
      showToast,
      setShowToast,
      lastAdded,
      isCartOpen, // REQUIRED for Sidebar visibility
      toggleCart  // REQUIRED for Header button
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};