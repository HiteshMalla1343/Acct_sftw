import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalState } from '../context/GlobalState'; // Import the custom hook

import "../css/AccountWindow.css";
const AccountWindow = () => {
const { addAccount, accounts ,schedules, fetchSchedules} = useGlobalState(); // Access the global state and functions
useEffect(() => {
  fetchSchedules();
}, []);


const [formData, setFormData] = useState({
  code: '',
  name: '',
  phone: '',
  city: '',
  credit: '',
  debit: '',
  schedule_id: ""
});

// Handle form input change
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Handle form submission to add a new account
const handleSave = () => {
  
  if (formData.code && formData.name) {
    console.log("Form Data: ", formData);
    addAccount(formData); // Add account to global state
    setFormData({
      code: '',
      name: '',
      phone: '',
      city: '',
      credit: '',
      debit: '',
      schedule_name: ""
    }); // Reset form after submission
  } else {
    alert('Please fill in all required fields');
  }
};

return (
  <div className="account-window">
    <div className="form-container">
      <div className="form-labels">
        <label>Code</label>
        <label>Name</label>
        <label>Phone</label>
        <label>City</label>
        <label>Credit</label>
        <label>Debit</label>
        {/* <label>Telugu Name</label> */}
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
        {/* <input
            type="text"
            readOnly
            value=""
            className="input name-phone-city"
        /> */}
        <select
          name="schedule_name"
          value={formData.schedule_name}
          onChange={handleInputChange}
          className="input schedule"
        >
          <option value="">Select Schedule</option>
          {schedules.map((schedule) => (
            <option key={schedule._id} value={schedule._id}>
              {schedule.schedule_name} {/* Accessing schedule_name */}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="button-section">
      <button onClick={handleSave}>Save</button>
    </div>

    {/* Display the list of accounts */}
    <div className="accounts-list">
      <h2>Accounts List</h2>
      {accounts.length === 0 ? (
        <p>No accounts available.</p>
      ) : (
        <ul>
          {accounts.map((account) => (
            <li key={account.code}>
              {account.name} - {account.schedule_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
};

export default AccountWindow;
