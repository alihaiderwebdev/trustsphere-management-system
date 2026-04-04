import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient" 
         style={{ backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section - Hero Content */}
          <div className="col-lg-6 col-md-12 text-white mb-4 mb-lg-0">
            <h1 className="display-3 fw-bold mb-4">
              🔐 TrustSphere
            </h1>
            <p className="lead mb-4">
              A comprehensive Trust Organization Management System for managing donations, 
              beneficiaries, and community events with transparency and efficiency.
            </p>
            <ul className="list-unstyled mb-4">
              <li className="mb-3">
                <i className="bi bi-check-circle me-2"></i>
                <strong>Manage Donations</strong> - Track and manage all donations seamlessly
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle me-2"></i>
                <strong>Support Beneficiaries</strong> - Organize and support your community members
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle me-2"></i>
                <strong>Organize Events</strong> - Plan and coordinate community events
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle me-2"></i>
                <strong>Search & Filter</strong> - Find information quickly and efficiently
              </li>
            </ul>
            <Link
              to="/dashboard"
              className="btn btn-light btn-lg fw-bold"
            >
              Get Started →
            </Link>
          </div>

          {/* Right Section - Stats */}
          <div className="col-lg-6 col-md-12">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card bg-white bg-opacity-20 border-0 text-white h-100 p-4">
                  <div className="card-body text-center">
                    <i className="bi bi-heart display-4 mb-3" style={{ color: "#ff6b6b" }}></i>
                    <h5 className="card-title">Donations</h5>
                    <p className="card-text text-white-50">
                      Track and manage donation campaigns
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-white bg-opacity-20 border-0 text-white h-100 p-4">
                  <div className="card-body text-center">
                    <i className="bi bi-people display-4 mb-3" style={{ color: "#51cf66" }}></i>
                    <h5 className="card-title">Beneficiaries</h5>
                    <p className="card-text text-white-50">
                      Manage beneficiary information and support
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-white bg-opacity-20 border-0 text-white h-100 p-4">
                  <div className="card-body text-center">
                    <i className="bi bi-calendar display-4 mb-3" style={{ color: "#ffd43b" }}></i>
                    <h5 className="card-title">Events</h5>
                    <p className="card-text text-white-50">
                      Organize and coordinate community events
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-white bg-opacity-20 border-0 text-white h-100 p-4">
                  <div className="card-body text-center">
                    <i className="bi bi-search display-4 mb-3" style={{ color: "#74c0fc" }}></i>
                    <h5 className="card-title">Search</h5>
                    <p className="card-text text-white-50">
                      Find data quickly with advanced search
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
