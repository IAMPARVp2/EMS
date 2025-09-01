import React from "react";

function TabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="tab-switcher">
      <button
        className={`tab-btn ${activeTab === "signIn" ? "active" : ""}`}
        onClick={() => setActiveTab("signIn")}
        type="button"
      >
        Sign In
      </button>
      <button
        className={`tab-btn ${activeTab === "signUp" ? "active" : ""}`}
        onClick={() => setActiveTab("signUp")}
        type="button"
      >
        Sign Up
      </button>
    </div>
  );
}

export default TabSwitcher;