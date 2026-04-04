import { useState, useEffect } from "react";
import { getData } from "../utils/localStorage";
import Card from "../components/Card";
import Table from "../components/Table";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [results, setResults] = useState({
    donations: [],
    beneficiaries: [],
    events: [],
  });
  const [allData, setAllData] = useState({
    donations: [],
    beneficiaries: [],
    events: [],
  });

  // Load all data on mount
  useEffect(() => {
    const donations = getData("donations");
    const beneficiaries = getData("beneficiaries");
    const events = getData("events");

    setAllData({ donations, beneficiaries, events });
    setResults({ donations, beneficiaries, events });
  }, []);

  // Filter data based on search term and filter type
  useEffect(() => {
    const term = searchTerm.toLowerCase();

    if (!term) {
      setResults(allData);
      return;
    }

    const filteredDonations = allData.donations.filter(
      (donation) =>
        donation.donorName.toLowerCase().includes(term) ||
        donation.purpose.toLowerCase().includes(term) ||
        donation.amount.toString().includes(term)
    );

    const filteredBeneficiaries = allData.beneficiaries.filter(
      (beneficiary) =>
        beneficiary.name.toLowerCase().includes(term) ||
        beneficiary.category.toLowerCase().includes(term) ||
        beneficiary.supportType.toLowerCase().includes(term)
    );

    const filteredEvents = allData.events.filter(
      (event) =>
        event.title.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term)
    );

    setResults({
      donations: filteredDonations,
      beneficiaries: filteredBeneficiaries,
      events: filteredEvents,
    });
  }, [searchTerm, allData]);

  // Donation columns
  const donationColumns = [
    { key: "donorName", label: "Donor Name" },
    { key: "amount", label: "Amount", render: (value) => `$${parseFloat(value).toFixed(2)}` },
    { key: "purpose", label: "Purpose" },
    { key: "date", label: "Date" },
  ];

  // Beneficiary columns
  const beneficiaryColumns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "supportType", label: "Support Type" },
  ];

  // Event columns
  const eventColumns = [
    { key: "title", label: "Event Title" },
    { key: "date", label: "Date" },
    { key: "location", label: "Location" },
    {
      key: "description",
      label: "Description",
      render: (value) => (
        <div title={value} style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </div>
      ),
    },
  ];

  const totalResults = results.donations.length + results.beneficiaries.length + results.events.length;

  return (
    <div>
      <h1 className="mb-4">Search & Filter</h1>
      <p className="text-muted mb-4">Search across donations, beneficiaries, and events</p>

      {/* Search Box */}
      <Card className="mb-4">
        <div className="row g-3">
          <div className="col-md-9">
            <label className="form-label">Search Keyword</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, donor, purpose, location, title, etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Filter By Type</label>
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Records</option>
              <option value="donations">Donations Only</option>
              <option value="beneficiaries">Beneficiaries Only</option>
              <option value="events">Events Only</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Results Summary */}
      <Card className="mb-4 bg-light">
        <div className="row text-center">
          <div className="col-md-3">
            <p className="text-muted mb-1">Total Results</p>
            <p className="h4 fw-bold text-primary">{totalResults}</p>
          </div>
          <div className="col-md-3">
            <p className="text-muted mb-1">Donations</p>
            <p className="h4 fw-bold text-success">{results.donations.length}</p>
          </div>
          <div className="col-md-3">
            <p className="text-muted mb-1">Beneficiaries</p>
            <p className="h4 fw-bold text-info">{results.beneficiaries.length}</p>
          </div>
          <div className="col-md-3">
            <p className="text-muted mb-1">Events</p>
            <p className="h4 fw-bold text-warning">{results.events.length}</p>
          </div>
        </div>
      </Card>

      {/* Search Results */}
      {searchTerm && totalResults === 0 ? (
        <Card>
          <div className="text-center py-5">
            <i className="bi bi-search" style={{ fontSize: "3rem", color: "#ccc" }}></i>
            <p className="text-muted mt-3">No results found for "{searchTerm}"</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Donations Results */}
          {(filterType === "all" || filterType === "donations") && results.donations.length > 0 && (
            <Card className="mb-4">
              <h5 className="mb-3">
                <i className="bi bi-heart me-2 text-danger"></i>
                Donations ({results.donations.length})
              </h5>
              <Table columns={donationColumns} data={results.donations} onEdit={() => {}} onDelete={() => {}} />
            </Card>
          )}

          {/* Beneficiaries Results */}
          {(filterType === "all" || filterType === "beneficiaries") && results.beneficiaries.length > 0 && (
            <Card className="mb-4">
              <h5 className="mb-3">
                <i className="bi bi-people me-2 text-info"></i>
                Beneficiaries ({results.beneficiaries.length})
              </h5>
              <Table columns={beneficiaryColumns} data={results.beneficiaries} onEdit={() => {}} onDelete={() => {}} />
            </Card>
          )}

          {/* Events Results */}
          {(filterType === "all" || filterType === "events") && results.events.length > 0 && (
            <Card className="mb-4">
              <h5 className="mb-3">
                <i className="bi bi-calendar me-2 text-warning"></i>
                Events ({results.events.length})
              </h5>
              <Table columns={eventColumns} data={results.events} onEdit={() => {}} onDelete={() => {}} />
            </Card>
          )}

          {/* No results for selected filter */}
          {filterType !== "all" && results[filterType === "donations" ? "donations" : filterType === "beneficiaries" ? "beneficiaries" : "events"].length === 0 && (
            <Card>
              <div className="text-center py-5">
                <i className="bi bi-search" style={{ fontSize: "3rem", color: "#ccc" }}></i>
                <p className="text-muted mt-3">No {filterType} found matching "{searchTerm}"</p>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
