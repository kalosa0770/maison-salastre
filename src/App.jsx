import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import { CartProvider } from "./components/CartContext";
import CartToast from "./components/CartToast";
import ProductModal from "./components/ProductModal";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="selection:bg-stone-200">
          {/* Global UI */}
          <ProductModal />
          <CartToast />

          {/* Page Routing */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Optional: 404 route */}
            <Route path="*" element={<p className="p-8">Page Not Found</p>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
