import { useState, useEffect } from "react";
import { getData, saveData } from "../utils/localStorage";
import Card from "../components/Card";
import Table from "../components/Table";

function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    supportType: "",
  });

  const categories = ["Children", "Elderly", "Disabled", "Widows", "Students", "Homeless", "Other"];
  const supportTypes = ["Education", "Medical", "Food", "Shelter", "Financial", "Other"];

  // Load beneficiaries from localStorage on mount
  useEffect(() => {
    const savedBeneficiaries = getData("beneficiaries");
    setBeneficiaries(savedBeneficiaries);
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

    if (!formData.name || !formData.category || !formData.supportType) {
      alert("Please fill in all fields");
      return;
    }

    let updatedBeneficiaries;

    if (editingIndex !== null) {
      // Update existing beneficiary
      updatedBeneficiaries = [...beneficiaries];
      updatedBeneficiaries[editingIndex] = formData;
      setEditingIndex(null);
    } else {
      // Add new beneficiary
      updatedBeneficiaries = [...beneficiaries, formData];
    }

    setBeneficiaries(updatedBeneficiaries);
    saveData("beneficiaries", updatedBeneficiaries);
    setFormData({ name: "", category: "", supportType: "" });
    setShowForm(false);
  };

  // Handle edit
  const handleEdit = (beneficiary, index) => {
    setFormData(beneficiary);
    setEditingIndex(index);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this beneficiary record?")) {
      const updatedBeneficiaries = beneficiaries.filter((_, i) => i !== index);
      setBeneficiaries(updatedBeneficiaries);
      saveData("beneficiaries", updatedBeneficiaries);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
    setFormData({ name: "", category: "", supportType: "" });
  };

  // Table columns configuration
  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "supportType", label: "Support Type" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Beneficiaries</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {showForm ? "Cancel" : "Add Beneficiary"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="mb-4">
          <h5 className="mb-3">{editingIndex !== null ? "Edit Beneficiary" : "Add New Beneficiary"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Beneficiary Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter beneficiary name"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Support Type</label>
                <select
                  className="form-select"
                  name="supportType"
                  value={formData.supportType}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select Support Type --</option>
                  {supportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-check-circle me-2"></i>
                {editingIndex !== null ? "Update" : "Add"} Beneficiary
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Beneficiaries Table */}
      <Card>
        <h5 className="mb-3">Beneficiaries List ({beneficiaries.length})</h5>
        <Table columns={columns} data={beneficiaries} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
    </div>
  );
}

export default Beneficiaries;
