import React from "react";

const Sidebar = ({ setActiveTab, activeTab }) => {
  const tabs = ["Products", "View Products", "Hero"];
  return (
    <div className="w-60 h-screen bg-stone-900 text-white p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 px-4 text-left rounded hover:bg-stone-700 transition ${
            activeTab === tab ? "bg-stone-700 font-semibold" : ""
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
