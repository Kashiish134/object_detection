import React, { useState } from "react";
import PeopleSafety from "../components/PeopleSafety";
import PlantSafety from "../components/PlantSafety";
import SuspiciousActivity from "../components/SuspiciousActivity";
import EquipmentBehaviour from "../components/EquipmentBehaviour";
import AssetIdentification from "../components/AssetIdentification";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "people": return <PeopleSafety />;
      case "plant": return <PlantSafety />;
      case "suspicious": return <SuspiciousActivity />;
      case "equipment": return <EquipmentBehaviour />;
      case "asset": return <AssetIdentification />;
      case "overview":
      default:
        return (
          <div className="container-fluid py-4">
            <div className="row">
              {[
                { title: "People Safety", icon: "bi bi-person-lines-fill" },
                { title: "Plant Safety", icon: "bi bi-building" },
                { title: "Suspicious Activity", icon: "bi bi-exclamation-triangle" },
                { title: "Equipment Behaviour", icon: "bi bi-tools" },
                { title: "Asset Identification", icon: "bi bi-box" },
              ].map((card, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="card-title text-warning fw-bold">{card.title}</h5>
                        <i className={`${card.icon} fs-4 text-success`}></i>
                      </div>
                      <p className="card-text mt-3">All Systems Normal</p>
                      <span className="badge bg-success">●</span>
                    </div>
                    <div className="card-footer bg-maroon text-white">
                      <small>Last updated: 15:04</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary d-flex justify-content-between px-3">
        <div className="navbar-brand d-flex align-items-center">
          <img src="/logo2.png" alt="Logo" style={{ height: "30px" }} />
          <span className="ms-3 text-white">JAI - Object Detection</span>
        </div>
        <div className="text-white">
          <i className="bi bi-person-circle me-2"></i> Sumit Kumar
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-light px-4 py-3 border-bottom">
        <div className="nav nav-tabs">
          {[
            { id: "overview", label: "OVERVIEW" },
            { id: "people", label: "PEOPLE SAFETY" },
            { id: "plant", label: "PLANT SAFETY" },
            { id: "suspicious", label: "SUSPICIOUS ACTIVITY" },
            { id: "equipment", label: "EQUIPMENT BEHAVIOUR" },
            { id: "asset", label: "ASSET IDENTIFICATION" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Footer */}
      <footer className="text-center py-3 text-muted">
        © Jindal Steel & Power Limited
      </footer>
    </div>
  );
}
