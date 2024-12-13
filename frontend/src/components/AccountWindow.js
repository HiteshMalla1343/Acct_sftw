import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { useGlobalState } from '../context/GlobalState';
import "../css/AccountWindow.css";

const AccountWindow = (props, ref) => {
  const globalState = useGlobalState();
  const { addAccount, accounts ,schedules, fetchSchedules} = useGlobalState(); // Access the global state and functions
useEffect(() => {
  fetchSchedules();
}, []);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    phone: '',
    city: '',
    credit: 0,
    debit: 0,
    schedule_name: ""
  });

  // Expose handleSave function via ref
  useImperativeHandle(ref, () => ({
    handleSave: async () => {
      console.log('jimmik');
      console.log("Form Data: ", formData);

      if (formData.code && formData.name && formData.schedule_name) {
        // Validate that the code and name start with the same letter
        if (formData.code[0] !== formData.name[0]) {
          alert('Code and Name should start with the same letter');
          return;
        }

        try {
          await addAccount(formData); // Try to add the account
          alert('Account added successfully!');
          // Reset the form after successful submission
          setFormData({
            code: '',
            name: '',
            phone: '',
            city: '',
            credit: 0,
            debit: 0,
            schedule_name: "",
          });
        } catch (error) {
          alert('Failed to add account: ${error.message}');
        }
      } else {
        alert('Please fill in all required fields');
      }
    }
  }));

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(),
    }));
  };

  return (
    <div className="account-window">
      <form>
        <div className="form-container">
          <div className="form-labels">
            <label>Code</label>
            <label>Name</label>
            <label>Phone</label>
            <label>City</label>
            <label>Credit</label>
            <label>Debit</label>
            <label>Schedule</label>
          </div>

          <div className="form-inputs">
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="input code"
              tabIndex={1}
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input name-phone-city"
              tabIndex={2}
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input name-phone-city"
              tabIndex={3}
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="input name-phone-city"
              tabIndex={4}
            />
            <input
              type="number"
              name="credit"
              value={formData.credit}
              onChange={handleInputChange}
              className="input credit"
              tabIndex={5}
            />
            <input
              type="number"
              name="debit"
              value={formData.debit}
              onChange={handleInputChange}
              className="input debit"
              tabIndex={6}
            />
            <select
              name="schedule_name"
              value={formData.schedule_name}
              onChange={handleInputChange}
              className="input schedule"
              tabIndex={7}
            >
              <option value="">Select Schedule</option>
              {schedules.map((schedule) => (
                <option key={schedule._id} value={schedule.schedule_name}>
                  {schedule.schedule_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="button-section">
          <button type="button" onClick={() => ref.current?.handleSave()}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default forwardRef(AccountWindow);