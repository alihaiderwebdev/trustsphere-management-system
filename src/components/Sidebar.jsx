import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="bg-dark min-vh-100 p-3" style={{ width: "280px" }}>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link
            to="/dashboard"
            className={`nav-link text-white rounded ${isActive("/dashboard")}`}
          >
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/donations"
            className={`nav-link text-white rounded ${isActive("/donations")}`}
          >
            <i className="bi bi-heart me-2"></i> Donations
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/beneficiaries"
            className={`nav-link text-white rounded ${isActive("/beneficiaries")}`}
          >
            <i className="bi bi-people me-2"></i> Beneficiaries
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/events"
            className={`nav-link text-white rounded ${isActive("/events")}`}
          >
            <i className="bi bi-calendar me-2"></i> Events
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/search"
            className={`nav-link text-white rounded ${isActive("/search")}`}
          >
            <i className="bi bi-search me-2"></i> Search
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link
            to="/settings"
            className={`nav-link text-white rounded ${isActive("/settings")}`}
          >
            <i className="bi bi-gear me-2"></i> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
