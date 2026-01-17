import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import ProductForm from "./ProductForm.jsx";
import AdminSection from "./AdminDashboardProducts.jsx";
import HeroForm from "./HeroForm.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Products");

  return (
    <div className="flex h-screen">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <main className="flex-1 bg-stone-100 overflow-y-auto p-8">
        {activeTab === "Products" && <ProductForm />}
        {activeTab === "View Products" && <AdminSection />}
        {activeTab === "Hero" && <HeroForm />}
      </main>
    </div>
  );
};

export default AdminDashboard;
