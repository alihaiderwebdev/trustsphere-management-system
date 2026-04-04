import { useState, useEffect } from "react";
import { getData, saveData } from "../utils/localStorage";
import Card from "../components/Card";
import Table from "../components/Table";

function Events() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = getData("events");
    setEvents(savedEvents);
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

    if (!formData.title || !formData.date || !formData.location || !formData.description) {
      alert("Please fill in all fields");
      return;
    }

    let updatedEvents;

    if (editingIndex !== null) {
      // Update existing event
      updatedEvents = [...events];
      updatedEvents[editingIndex] = formData;
      setEditingIndex(null);
    } else {
      // Add new event
      updatedEvents = [...events, formData];
    }

    setEvents(updatedEvents);
    saveData("events", updatedEvents);
    setFormData({ title: "", date: "", location: "", description: "" });
    setShowForm(false);
  };

  // Handle edit
  const handleEdit = (event, index) => {
    setFormData(event);
    setEditingIndex(index);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
      saveData("events", updatedEvents);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
    setFormData({ title: "", date: "", location: "", description: "" });
  };

  // Table columns configuration
  const columns = [
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Events</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="bi bi-plus-circle me-2"></i>
          {showForm ? "Cancel" : "Add Event"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="mb-4">
          <h5 className="mb-3">{editingIndex !== null ? "Edit Event" : "Add New Event"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Event Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Event Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                />
              </div>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-check-circle me-2"></i>
                {editingIndex !== null ? "Update" : "Add"} Event
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Events Table */}
      <Card>
        <h5 className="mb-3">Events List ({events.length})</h5>
        <Table columns={columns} data={events} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
    </div>
  );
}

export default Events;
