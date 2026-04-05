import { Link, useLocation } from "react-router-dom";

function Navbar({ onToggleSidebar }) {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/donations": "Donations",
    "/beneficiaries": "Beneficiaries",
    "/events": "Events",
    "/search": "Search",
    "/settings": "Settings",
  };

  const currentPageTitle = pageTitles[location.pathname] || "Overview";

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-primary d-md-none"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            Menu
          </button>
          <Link className="navbar-brand fw-bold text-primary mb-0" to="/dashboard">
            TrustSphere
          </Link>
          <span className="text-muted d-none d-sm-inline">/ {currentPageTitle}</span>
        </div>

        <div className="d-flex align-items-center ms-auto">
          <div className="text-end me-2 d-none d-sm-block">
            <div className="fw-semibold small">Organization Admin</div>
            <div className="text-muted small">trustsphere.org</div>
          </div>
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px" }}>
            TS
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
