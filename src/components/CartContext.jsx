import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // New: Universal Toast Configuration
  const [toastConfig, setToastConfig] = useState({
    title: "Added to Collection",
    message: "",
    type: "success" // 'success', 'error', or 'admin'
  });

  // Function to trigger toast for any purpose (Admin or Cart)
  const triggerToast = (title, message, type = "success") => {
    setToastConfig({ title, message, type });
    setShowToast(true);
  };

  const openQuickView = (product) => setSelectedProduct(product);
  const closeQuickView = () => setSelectedProduct(null);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  const addToCart = (product) => {
    const newItem = { ...product, cartId: `cart-${Date.now()}-${Math.random()}` };
    setCartItems((prev) => [...prev, newItem]);
    
    // Set config for shopper toast
    setLastAdded(product);
    triggerToast("Added to Collection", product.title, "success");
    
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <CartContext.Provider value={{ 
      cartItems, cartTotal, cartCount,
      addToCart, removeFromCart, 
      showToast, setShowToast, toastConfig, triggerToast,
      lastAdded, isCartOpen, setIsCartOpen, toggleCart,
      selectedProduct, openQuickView, closeQuickView
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);