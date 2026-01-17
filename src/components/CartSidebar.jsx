import React from "react";
import { X, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";

const CartSidebar = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart } = useCart();

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-stone-100 flex justify-between items-center">
              <h2 className="text-[10px] tracking-[0.3em] uppercase font-bold text-stone-900">
                Your Selection ({cartItems.length})
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:rotate-90 transition-transform duration-300"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-serif italic text-stone-400">
                    Your gallery is empty.
                  </p>
                  <button
                    onClick={toggleCart}
                    className="text-[9px] uppercase tracking-widest font-bold underline"
                  >
                    Return to Collection
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-6 group">
                    {/* Product Image */}
                    <div className="w-20 aspect-[3/4] bg-stone-100 overflow-hidden rounded">
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-stone-400 mt-1">
                          {item.category}
                        </p>
                      </div>

                      <div className="flex justify-between items-end">
                        <span className="text-sm font-light text-stone-900">
                          R{item.price?.toLocaleString()}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-stone-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-stone-50 space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">
                    Estimated Total
                  </span>
                  <span className="text-2xl font-light text-stone-900">
                    R{total.toLocaleString()}
                  </span>
                </div>

                <button className="w-full bg-stone-900 text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-colors flex items-center justify-center gap-3">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
