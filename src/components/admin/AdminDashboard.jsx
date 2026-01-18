import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import ProductForm from "./ProductForm.jsx";
import AdminSection from "./AdminDashboardProducts.jsx";
import HeroForm from "./HeroForm.jsx";

const AdminDashboard = () => {
  // Set "Add Products" as the default state so it is the landing page
  const [activeTab, setActiveTab] = useState("Add Products");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-stone-50 overflow-hidden font-sans text-stone-900">
      {/* Sidebar - Ensure your Sidebar component handles the activeTab styling */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      <main className="flex-1 overflow-y-auto p-4 md:p-12 pb-24 md:pb-12 custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          
          {/* Header section to provide context on the landing page */}
          <div className="mb-10">
            <h1 className="text-3xl font-light tracking-tight text-stone-900">
              {activeTab === "Add Products" && "Inventory Creation"}
              {activeTab === "View Products" && "Archive Management"}
              {activeTab === "Add Hero Pic" && "Homepage Editorial"}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mt-2">
              Boutique Management Systems // Atelier Admin
            </p>
          </div>

          {/* Conditional Rendering */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {activeTab === "Add Products" && <ProductForm />}
            {activeTab === "View Products" && <AdminSection />}
            {activeTab === "Add Hero Pic" && <HeroForm />}
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;