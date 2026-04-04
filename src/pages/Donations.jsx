import { useState, useEffect } from "react";
import { getData, saveData } from "../utils/localStorage";
import Card from "../components/Card";
import Table from "../components/Table";

function Donations() {
  const [donations, setDonations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    donorName: "",
    amount: "",
    purpose: "",
    date: "",
  });

  // Load donations from localStorage on mount
  useEffect(() => {
    const savedDonations = getData("donations");
    setDonations(savedDonations);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.donorName || !formData.amount || !formData.purpose || !formData.date) {
      alert("Please fill in all fields");
      return;
    }

    let updatedDonations;

    if (editingIndex !== null) {
      // Update existing donation
      updatedDonations = [...donations];
      updatedDonations[editingIndex] = formData;
      setEditingIndex(null);
    } else {
      // Add new donation
      updatedDonations = [...donations, formData];
    }

    setDonations(updatedDonations);
    saveData("donations", updatedDonations);
    setFormData({ donorName: "", amount: "", purpose: "", date: "" });
    setShowForm(false);
  };

  // Handle edit
  const handleEdit = (donation, index) => {
    setFormData(donation);
    setEditingIndex(index);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      const updatedDonations = donations.filter((_, i) => i !== index);
      setDonations(updatedDonations);
      saveData("donations", updatedDonations);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
    setFormData({ donorName: "", amount: "", purpose: "", date: "" });
  };

  // Table columns configuration
  const columns = [
    { key: "donorName", label: "Donor Name" },
    { key: "amount", label: "Amount", render: (value) => `$${parseFloat(value).toFixed(2)}` },
    { key: "purpose", label: "Purpose" },
    { key: "date", label: "Date" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Donations</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {showForm ? "Cancel" : "Add Donation"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="mb-4">
          <h5 className="mb-3">{editingIndex !== null ? "Edit Donation" : "Add New Donation"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Donor Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleInputChange}
                  placeholder="Enter donor name"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  step="0.01"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Purpose</label>
                <input
                  type="text"
                  className="form-control"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="Enter donation purpose"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-check-circle me-2"></i>
                {editingIndex !== null ? "Update" : "Add"} Donation
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Donations Table */}
      <Card>
        <h5 className="mb-3">Donations List ({donations.length})</h5>
        <Table columns={columns} data={donations} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
    </div>
  );
}

export default Donations;
