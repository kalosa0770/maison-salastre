import React, { useEffect, useState } from "react";
import { ProductAPI } from "../../api/product.api.js";
import AdminSection from "./AdminSection.jsx";
import { useCart } from "../CartContext";
// Import your modal components
import AdminEditProduct from "./AdminEditProduct";
import AdminDeleteModal from "./AdminDeleteModal";

const AdminDashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { triggerToast } = useCart();

  // Modal States
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const data = await ProductAPI.getAll();
      setProducts(data);
    } catch (err) {
      triggerToast("Sync Error", "Failed to load boutique collections", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await ProductAPI.delete(productToDelete._id);
      triggerToast("Success", "Product removed from atelier", "success");
      setProductToDelete(null);
      fetchAll(); // Refresh list
    } catch (err) {
      triggerToast("Error", "Failed to delete piece", "error");
    }
  };

  if (loading && products.length === 0) {
    return <div className="py-20 text-center animate-pulse text-stone-400 uppercase tracking-widest text-xs">Synchronizing Atelier...</div>;
  }

  // Grouping Logic
  // Ensure your backend returns these boolean flags (isSpotlight, isNewArrival, etc.)
  const spotlightProducts = products.filter(p => p.isSpotlight);
  const trendingProducts = products.filter(p => p.isTrending);
  const newArrivals = products.filter(p => p.isNewArrival); 
  const featuredPieces = products.filter(p => p.isFeatured);

  return (
    <div className="space-y-20 pb-20">
      <AdminSection 
        title="Top Selections (Spotlight)" 
        products={spotlightProducts} 
        setEditProduct={setProductToEdit}
        setDeleteProduct={setProductToDelete}
      />

      <AdminSection 
        title="New Arrivals" 
        products={newArrivals} 
        setEditProduct={setProductToEdit}
        setDeleteProduct={setProductToDelete}
      />

      <AdminSection 
        title="Trending Pieces" 
        products={trendingProducts} 
        setEditProduct={setProductToEdit}
        setDeleteProduct={setProductToDelete}
      />

      <AdminSection 
        title="Featured Archives" 
        products={featuredPieces} 
        setEditProduct={setProductToEdit}
        setDeleteProduct={setProductToDelete}
      />
      
      <AdminSection 
        title="Total Inventory" 
        products={products} 
        setEditProduct={setProductToEdit}
        setDeleteProduct={setProductToDelete}
      />

      {/* Modals */}
      {productToEdit && (
        <AdminEditProduct 
          product={productToEdit} 
          onClose={() => setProductToEdit(null)} 
          onUpdated={() => {
            fetchAll();
            triggerToast("Success", "Collection updated", "success");
          }} 
        />
      )}

      <AdminDeleteModal 
        open={!!productToDelete} 
        product={productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AdminDashboardProducts;