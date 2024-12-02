import React from "react";
import "../css/AccountWindow.css";

const AccountWindow = () => {
  const options = ["MARKET INDIA BATCH", "OPTION 2", "OPTION 3"];
  return (
    <div className="account-window bold-text">
      {/* Form Container */}
      <div className="form-container">
        {/* Left Section: Labels */}
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

        {/* Right Section: Inputs */}
        <div className="form-inputs">
          <input type="text" className="input code" />
          <input type="text" className="input name-phone-city" />
          <input type="text" className="input name-phone-city" />
          <input type="text" className="input name-phone-city" />
          <input type="text" className="input credit" />
          <input type="text" className="input debit" />
          <input type="text" className="input name-phone-city" />
          <select className="input schedule">
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Button Section */}
      <div className="button-section">
        <button>Save</button>
        {/* <button>Edit</button>
        <button>Delete</button>
        <button>Find</button>
        <button>Close</button> */}
      </div>

      {/* Tray Section */}
      <div className="tray-section">
        <h4>Tray</h4>
        <div className="tray-contents">
          <div>
            <label>Credit</label>
            <input type="text" className="input credit" />
          </div>
          <div>
            <label>Debit</label>
            <input type="text" className="input debit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountWindow;
