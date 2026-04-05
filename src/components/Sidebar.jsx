import { Link, useLocation } from "react-router-dom";

function Sidebar({ isMobileSidebarOpen, onCloseMobileSidebar }) {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/donations", label: "Donations" },
    { to: "/beneficiaries", label: "Beneficiaries" },
    { to: "/events", label: "Events" },
    { to: "/search", label: "Search" },
    { to: "/settings", label: "Settings" },
  ];

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const sidebarLinks = (
    <ul className="nav nav-pills flex-column gap-1">
      {navItems.map((item) => (
        <li key={item.to} className="nav-item">
          <Link
            to={item.to}
            onClick={onCloseMobileSidebar}
            className={`nav-link text-white rounded-3 px-3 py-2 ${isActive(item.to)}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <aside className="col-md-3 col-lg-2 d-none d-md-block bg-dark min-vh-100 p-3 position-fixed start-0">
        <h6 className="text-uppercase text-secondary mb-3">Navigation</h6>
        {sidebarLinks}
      </aside>

      <div
        className={`position-fixed top-0 start-0 h-100 bg-dark text-white p-3 d-md-none ${
          isMobileSidebarOpen ? "d-block" : "d-none"
        }`}
        style={{ width: "280px", zIndex: 1050 }}
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="mb-0 text-uppercase text-secondary">Menu</h6>
          <button
            type="button"
            className="btn btn-sm btn-outline-light"
            onClick={onCloseMobileSidebar}
          >
            Close
          </button>
        </div>
        {sidebarLinks}
      </div>

      <div
        className={`position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none ${
          isMobileSidebarOpen ? "d-block" : "d-none"
        }`}
        style={{ zIndex: 1040 }}
        onClick={onCloseMobileSidebar}
        aria-hidden="true"
      ></div>
    </>
  );
}

export default Sidebar;
