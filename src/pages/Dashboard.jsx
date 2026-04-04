import { useState, useEffect } from "react";
import { getData } from "../utils/localStorage";
import Card from "../components/Card";

function Dashboard() {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    totalBeneficiaries: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    const donations = getData("donations");
    const beneficiaries = getData("beneficiaries");
    const events = getData("events");

    const totalAmount = donations.reduce((sum, donation) => sum + (parseFloat(donation.amount) || 0), 0);

    setStats({
      totalDonations: donations.length,
      totalAmount: totalAmount,
      totalBeneficiaries: beneficiaries.length,
      totalEvents: events.length,
    });
  }, []);

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <p className="text-muted mb-5">Welcome to TrustSphere - Your Trust Organization Hub</p>

      {/* Summary Cards Row */}
      <div className="row g-4 mb-5">
        {/* Total Donations Card */}
        <div className="col-md-6 col-lg-3">
          <Card>
            <div className="text-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-block mb-3">
                <i className="bi bi-heart-fill text-primary" style={{ fontSize: "2rem" }}></i>
              </div>
              <h5 className="text-muted mb-2">Total Donations</h5>
              <h2 className="text-primary fw-bold">{stats.totalDonations}</h2>
            </div>
          </Card>
        </div>

        {/* Total Amount Card */}
        <div className="col-md-6 col-lg-3">
          <Card>
            <div className="text-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-block mb-3">
                <i className="bi bi-cash-coin text-success" style={{ fontSize: "2rem" }}></i>
              </div>
              <h5 className="text-muted mb-2">Total Amount</h5>
              <h2 className="text-success fw-bold">${stats.totalAmount.toFixed(2)}</h2>
            </div>
          </Card>
        </div>

        {/* Total Beneficiaries Card */}
        <div className="col-md-6 col-lg-3">
          <Card>
            <div className="text-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-block mb-3">
                <i className="bi bi-people-fill text-info" style={{ fontSize: "2rem" }}></i>
              </div>
              <h5 className="text-muted mb-2">Total Beneficiaries</h5>
              <h2 className="text-info fw-bold">{stats.totalBeneficiaries}</h2>
            </div>
          </Card>
        </div>

        {/* Total Events Card */}
        <div className="col-md-6 col-lg-3">
          <Card>
            <div className="text-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-block mb-3">
                <i className="bi bi-calendar-event text-warning" style={{ fontSize: "2rem" }}></i>
              </div>
              <h5 className="text-muted mb-2">Total Events</h5>
              <h2 className="text-warning fw-bold">{stats.totalEvents}</h2>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="row">
        <div className="col-lg-12">
          <Card>
            <h5 className="mb-4">Quick Overview</h5>
            <div className="row text-center">
              <div className="col-md-4 border-end">
                <p className="text-muted mb-2">Donations Tracked</p>
                <p className="h4 fw-bold text-primary">{stats.totalDonations}</p>
              </div>
              <div className="col-md-4 border-end">
                <p className="text-muted mb-2">Community Members</p>
                <p className="h4 fw-bold text-info">{stats.totalBeneficiaries}</p>
              </div>
              <div className="col-md-4">
                <p className="text-muted mb-2">Events Organized</p>
                <p className="h4 fw-bold text-warning">{stats.totalEvents}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
