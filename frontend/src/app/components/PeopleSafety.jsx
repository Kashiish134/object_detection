import React, { useState, useEffect, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DetectionPanel from "./DetectionPanel";
import { API } from "../lib/api";

const formatTime = (value) =>
  value ? new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--";

export default function PeopleSafety() {
  const [showModal, setShowModal] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const loadAlerts = useCallback(async () => {
    try {
      const res = await fetch(`${API}/alerts`);
      if (res.ok) setAlerts(await res.json());
    } catch {
      /* backend offline: leave the cards as they are */
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const models = [
    {
      title: "Helmet Detection",
      status: alerts.length ? `${alerts.length} alert(s) logged` : "No alerts",
      color: alerts.length ? "red" : "green",
      updated: alerts.length ? formatTime(alerts[0].time) : "--:--",
    },
    { title: "Slip & Fall Detection", status: "All Systems Normal", color: "green", updated: "15:04" },
    { title: "PPE Compliance", status: "Active", color: "red", updated: "15:04" },
    { title: "Safety Zone Violation", status: "Active", color: "red", updated: "15:04" },
  ];

  const handleCardClick = (modelTitle) => {
    if (modelTitle === "Helmet Detection") {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="container-fluid py-4">
        <h4 className="fw-bold text-success mb-4">People Safety Models</h4>
        <div className="row">
          {models.map((model, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div
                className="card h-100"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(model.title)}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="text-warning fw-bold">{model.title}</h5>
                    <i className="bi bi-check-circle fs-4 text-success"></i>
                  </div>
                  <p className="mt-2">{model.status}</p>
                  <span className={`badge bg-${model.color === "green" ? "success" : "danger"}`}>&#9679;</span>
                </div>
                <div className="card-footer bg-maroon text-white">
                  <small>Last updated: {model.updated}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DetectionPanel onDetected={loadAlerts} />

        <h5 className="fw-bold mb-3">Recent alerts</h5>
        {alerts.length === 0 ? (
          <p className="text-muted">No alerts yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th>Camera</th>
                  <th>Alert</th>
                  <th>Confidence</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {alerts.slice(0, 10).map((a) => (
                  <tr key={a.id}>
                    <td>{a.camera_name}</td>
                    <td>{a.alert_type}</td>
                    <td>{Math.round(a.confidence * 100)}%</td>
                    <td>{a.time ? new Date(a.time).toLocaleString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Helmet Detection */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Helmet Detection Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {/* Camera Settings */}
            <div className="col-md-6 border-end">
              <h5 className="fw-bold text-primary mb-3">Camera Settings</h5>
              <Form.Group className="mb-3">
                <Form.Label>Select Camera</Form.Label>
                <Form.Select>
                  <option>Camera 1 - Main Entrance</option>
                  <option>Camera 2 - Workshop</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>IP Address</Form.Label>
                <Form.Control type="text" defaultValue="192.168.1.101" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Port</Form.Label>
                <Form.Control type="text" defaultValue="8080" />
              </Form.Group>
              <Button variant="primary" className="w-100 mt-2">Save Camera Settings</Button>
            </div>

            {/* Notification Settings */}
            <div className="col-md-6">
              <h5 className="fw-bold text-primary mb-3">Notification Settings</h5>
              {["Email", "WhatsApp", "SMS", "Push"].map((type, idx) => (
                <Form.Group className="mb-3" key={idx}>
                  <Form.Label>{type} Notifications</Form.Label>
                  <Form.Select>
                    <option>Enable</option>
                    <option>Disable</option>
                  </Form.Select>
                </Form.Group>
              ))}
              <Button variant="primary" className="w-100 mt-2">Save Notification Settings</Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}