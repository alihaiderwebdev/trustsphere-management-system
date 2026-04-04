import { useState, useEffect } from "react";
import { clearAllData, getData } from "../utils/localStorage";
import Card from "../components/Card";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [dataStats, setDataStats] = useState({
    donations: 0,
    beneficiaries: 0,
    events: 0,
  });

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || false;
    setDarkMode(isDark);
    applyTheme(isDark);

    // Load data statistics
    updateDataStats();
  }, []);

  // Update data statistics
  const updateDataStats = () => {
    const donations = getData("donations");
    const beneficiaries = getData("beneficiaries");
    const events = getData("events");

    setDataStats({
      donations: donations.length,
      beneficiaries: beneficiaries.length,
      events: events.length,
    });
  };

  // Apply theme to document
  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
      localStorage.setItem("theme", "light");
    }
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    applyTheme(newTheme);
  };

  // Handle clear all data
  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to delete ALL data? This action cannot be undone.")) {
      if (window.confirm("This will delete all donations, beneficiaries, and events. Confirm again?")) {
        clearAllData();
        updateDataStats();
        alert("All data has been cleared successfully.");
      }
    }
  };

  return (
    <div>
      <h1 className="mb-4">Settings</h1>
      <p className="text-muted mb-5">Manage your preferences and application data</p>

      {/* Application Theme */}
      <Card className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-2">
              <i className="bi bi-palette me-2"></i> Appearance
            </h5>
            <p className="text-muted mb-0">Toggle between light and dark mode</p>
          </div>
          <div className="form-check form-switch" style={{ fontSize: "1.25rem" }}>
            <input
              className="form-check-input"
              type="checkbox"
              id="themeToggle"
              checked={darkMode}
              onChange={handleThemeToggle}
              style={{ width: "3rem", height: "1.5rem", cursor: "pointer" }}
            />
            <label className="form-check-label" htmlFor="themeToggle">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </label>
          </div>
        </div>
      </Card>

      {/* Data Statistics */}
      <Card className="mb-4">
        <h5 className="mb-4">
          <i className="bi bi-bar-chart me-2"></i> Data Overview
        </h5>
        <div className="row text-center">
          <div className="col-md-4 border-end">
            <p className="text-muted mb-2">Total Donations</p>
            <p className="h3 fw-bold text-success">{dataStats.donations}</p>
          </div>
          <div className="col-md-4 border-end">
            <p className="text-muted mb-2">Total Beneficiaries</p>
            <p className="h3 fw-bold text-info">{dataStats.beneficiaries}</p>
          </div>
          <div className="col-md-4">
            <p className="text-muted mb-2">Total Events</p>
            <p className="h3 fw-bold text-warning">{dataStats.events}</p>
          </div>
        </div>
      </Card>

      {/* About Application */}
      <Card className="mb-4 bg-light">
        <h5 className="mb-3">
          <i className="bi bi-info-circle me-2"></i> About TrustSphere
        </h5>
        <p className="mb-2">
          <strong>Version:</strong> 1.0.0
        </p>
        <p className="mb-2">
          <strong>Description:</strong> TrustSphere is a comprehensive Trust Organization Management System designed to help manage donations, beneficiaries, and community events with transparency and efficiency.
        </p>
        <p className="mb-2">
          <strong>Features:</strong>
        </p>
        <ul className="mb-3">
          <li>Manage donations and track funding</li>
          <li>Organize beneficiary information</li>
          <li>Plan and coordinate community events</li>
          <li>Search and filter across all data</li>
          <li>Persistent local storage of data</li>
          <li>Responsive design for all devices</li>
        </ul>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-danger">
        <h5 className="mb-3 text-danger">
          <i className="bi bi-exclamation-triangle me-2"></i> Danger Zone
        </h5>
        <p className="text-muted mb-4">
          Clear all application data. This action is permanent and cannot be undone.
        </p>

        <div className="alert alert-warning" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>
          <strong>Warning:</strong> Clearing data will delete all donations, beneficiaries, and events from your browser.
        </div>

        <button
          className="btn btn-danger btn-lg"
          onClick={handleClearAllData}
        >
          <i className="bi bi-trash3 me-2"></i>
          Clear All Data
        </button>
      </Card>

      {/* Footer Note */}
      <Card className="mt-4 text-center bg-light">
        <p className="text-muted mb-0">
          <i className="bi bi-lock me-2"></i>
          All your data is stored locally in your browser. No information is sent to any server.
        </p>
      </Card>
    </div>
  );
}

export default Settings;
