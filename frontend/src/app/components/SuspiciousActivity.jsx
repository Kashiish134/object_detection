import React from "react";

export default function SuspiciousActivity() {
  const models = [
    { title: "Unauthorized Access", status: "Active", icon: "bi bi-pipe" },
    { title: "Intrusion Detection", status: "Active", icon: "bi bi-search" },
    { title: "Unusual Behavior", status: "Active", icon: "bi bi-droplet" },
    { title: "Crowd Detection", status: "Normal", icon: "bi bi-speedometer" },
  ];

  return (
    <div className="container-fluid py-4">
      <h5 className="text-success fw-bold mb-4">Suspicious Activity Models</h5>
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
