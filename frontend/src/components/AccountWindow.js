import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AccountWindow.css";

const AccountWindow = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    phone: "",
    city: "",
    credit: 0,
    debit: 0,
    schedule_id: "",
  });

  // Fetch schedules on component mount
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/schedules");
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules", error);
      }
    };
    fetchSchedules();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const handleSave = async () => {
    try {
      // Basic validation
      if (!formData.name || !formData.code || !formData.schedule_id) {
        alert("Name, Code, and Schedule are mandatory");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/create_account",
        {
          ...formData,
          credit: parseInt(formData.credit) || 0,
          debit: parseInt(formData.debit) || 0,
        }
      );

      alert(response.data.message);
      // Reset form after successful save
      setFormData({
        code: "",
        name: "",
        phone: "",
        city: "",
        credit: 0,
        debit: 0,
        schedule_id: "",
      });
    } catch (error) {
      alert(error.response?.data?.detail || "Error saving account");
    }
  };

  return (
    <div className="account-window bold-text">
      <div className="form-container">
        <div className="form-labels">
          <label>Code</label>
          <label>Name</label>
          <label>Phone</label>
          <label>City</label>
          <label>Credit</label>
          <label>Debit</label>
          <label>Telugu Name</label>
          <label>Schedule</label>
        </div>

        <div className="form-inputs">
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            className="input code"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input name-phone-city"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input name-phone-city"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="input name-phone-city"
          />
          <input
            type="number"
            name="credit"
            value={formData.credit}
            onChange={handleInputChange}
            className="input credit"
          />
          <input
            type="number"
            name="debit"
            value={formData.debit}
            onChange={handleInputChange}
            className="input debit"
          />
          <input
            type="text"
            readOnly
            value=""
            className="input name-phone-city"
          />
          <select
            name="schedule_id"
            value={formData.schedule_id}
            onChange={handleInputChange}
            className="input schedule"
          >
            <option value="">Select Schedule</option>
            {schedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="button-section">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AccountWindow;
