import React, { useState } from "react";
import { API } from "../lib/api";

export default function DetectionPanel({ onDetected }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError("");
  };

  const runDetection = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch(`${API}/detect?camera=upload`, { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Detection failed");
        return;
      }
      setResult(data);
      if (onDetected) onDetected();
    } catch {
      setError("Cannot reach the server. Is the backend running on port 8000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-2 mb-4">
      <div className="card-header fw-bold">Run detection on an image</div>
      <div className="card-body">
        <div className="d-flex gap-2 mb-3">
          <input type="file" accept="image/*" className="form-control" onChange={handleFile} />
          <button className="btn btn-primary" onClick={runDetection} disabled={!file || loading}>
            {loading ? "Detecting..." : "Detect"}
          </button>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        {preview && (
          <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
            <img src={preview} alt="preview" style={{ maxWidth: "100%", display: "block" }} />
            {result &&
              result.detections.map((d, i) => {
                const { x1, y1, x2, y2 } = d.box;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: `${(x1 / result.width) * 100}%`,
                      top: `${(y1 / result.height) * 100}%`,
                      width: `${((x2 - x1) / result.width) * 100}%`,
                      height: `${((y2 - y1) / result.height) * 100}%`,
                      border: "2px solid #ffc107",
                      boxSizing: "border-box",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        transform: "translateY(-100%)",
                        background: "#ffc107",
                        color: "#000",
                        fontSize: 12,
                        padding: "0 4px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.label} {Math.round(d.confidence * 100)}%
                    </span>
                  </div>
                );
              })}
          </div>
        )}

        {result && (
          <div className="mt-3">
            <strong>{result.detections.length} object(s) found</strong>
            <ul className="mb-0">
              {result.detections.map((d, i) => (
                <li key={i}>
                  {d.label} ({Math.round(d.confidence * 100)}%)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}