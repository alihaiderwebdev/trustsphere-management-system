import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          🔐 TrustSphere
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <span className="nav-link text-white">
                {location.pathname === "/dashboard"
                  ? "Dashboard"
                  : location.pathname === "/donations"
                  ? "Donations"
                  : location.pathname === "/beneficiaries"
                  ? "Beneficiaries"
                  : location.pathname === "/events"
                  ? "Events"
                  : location.pathname === "/search"
                  ? "Search"
                  : location.pathname === "/settings"
                  ? "Settings"
                  : "Page"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
