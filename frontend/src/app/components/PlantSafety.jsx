import React from "react";

export default function PlantSafety() {
  const models = [
    { title: "Gas Leak Detection", status: "Active", icon: "bi bi-pipeline", updated: "15:04", color: "green" },
    { title: "Fire Detection", status: "Active", icon: "bi bi-search", updated: "15:04", color: "green" },
    { title: "Spill Detection", status: "Active", icon: "bi bi-droplet", updated: "15:04", color: "green" },
    { title: "Pressure Monitoring", status: "Normal", icon: "bi bi-speedometer2", updated: "15:04", color: "green" },
  ];

  return (
    <div className="container-fluid py-4">
      <h5 className="text-success fw-bold mb-4">Plant Safety Models</h5>
      <div className="row">
        {models.map((model, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h6 className="text-warning fw-bold">{model.title}</h6>
                  <i className={`${model.icon} fs-4 text-success`}></i>
                </div>
                <p className="card-text mt-2">{model.status}</p>
                <span className={`badge bg-${model.color}`}>●</span>
              </div>
              <div className="card-footer bg-maroon text-white">
                <small>Last updated: {model.updated}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
