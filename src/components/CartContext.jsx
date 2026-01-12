import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openQuickView = (product) => setSelectedProduct(product);
  const closeQuickView = () => setSelectedProduct(null);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, { ...product, cartId: Date.now() }]);
    setLastAdded(product);
    setShowToast(true);
    // When adding, we close the detail view and open the cart
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id && item.cartId !== id));
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, cartCount: cartItems.length,
      showToast, setShowToast, lastAdded, isCartOpen, toggleCart,
      selectedProduct, openQuickView, closeQuickView
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);