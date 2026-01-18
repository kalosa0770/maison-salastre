import React from "react";
import { PackagePlus, LayoutPanelTop, Image as ImageIcon } from "lucide-react";

const Sidebar = ({ setActiveTab, activeTab }) => {
  const tabs = [
    { name: "Add Products", icon: PackagePlus },
    { name: "View Products", icon: LayoutPanelTop },
    { name: "Add Hero Pic", icon: ImageIcon },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-64 h-screen bg-stone-900 text-white p-8 flex-col border-r border-stone-800">
        <div className="mb-12">
          <h2 className="text-sm tracking-[0.3em] uppercase font-bold text-stone-500">Maison</h2>
          <p className="text-xl font-serif italic">Salastre</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-4 py-4 px-4 text-[11px] uppercase tracking-widest transition-all rounded-lg ${
                activeTab === tab.name 
                ? "bg-white text-stone-900 shadow-xl" 
                : "text-stone-400 hover:text-white hover:bg-stone-800"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 z-[100] px-6 py-3">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === tab.name ? "text-white" : "text-stone-500"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[8px] uppercase tracking-tighter font-bold">
                {tab.name.split(' ')[0]} {/* Shorter text for mobile */}
              </span>
              {activeTab === tab.name && (
                <div className="w-1 h-1 bg-white rounded-full mt-1" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;