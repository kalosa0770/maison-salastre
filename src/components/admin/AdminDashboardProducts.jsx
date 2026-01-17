import React, { useEffect, useState } from "react";
import { ProductAPI } from "../../api/product.api.js";
import AdminSection from "./AdminSection";
import AdminEditProduct from "./AdminEditProduct";
import AdminDeleteModal from "./AdminDeleteModal";

const AdminDashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductAPI.getAll();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProductAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading products...</p>;

  if (products.length === 0)
    return <p className="text-center py-10 text-stone-500">No products uploaded yet.</p>;

  const featured = products.filter((p) => p.isFeatured);
  const trending = products.filter((p) => p.isTrending);
  const others = products.filter((p) => !p.isFeatured && !p.isTrending);

  return (
    <div className="space-y-20">
      <AdminSection 
        title="Featured Products" 
        products={featured} 
        handleDelete={handleDelete}
        setEditProduct={setEditProduct}
        setDeleteProduct={setDeleteProduct}
      />

      <AdminSection 
        title="Trending Products" 
        products={trending} 
        handleDelete={handleDelete}
        setEditProduct={setEditProduct}
        setDeleteProduct={setDeleteProduct}
      />

      <AdminSection 
        title="All Products" 
        products={others} 
        handleDelete={handleDelete}
        setEditProduct={setEditProduct}
        setDeleteProduct={setDeleteProduct}
      />

      {/* Edit Modal */}
      {editProduct && (
        <AdminEditProduct
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdated={fetchProducts}
        />
      )}

      {/* Delete Modal */}
      {deleteProduct && (
        <AdminDeleteModal
          open={true}
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onConfirm={() => {
            handleDelete(deleteProduct._id);
            setDeleteProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboardProducts;
