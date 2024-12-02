import React from "react";
import "../css/CustomerList.css";

const CustomerList = () => {
  const options = ["MARKET INDIA BATCH", "OPTION 2", "OPTION 3"];
  const data = [
    { code: "001", accountName: "John Doe", town: "New York", schedule: "Option 1", teluguName: "జాన్ డో" },
    { code: "002", accountName: "Jane Smith", town: "Los Angeles", schedule: "Option 2", teluguName: "జేన్ స్మిత్" },
    { code: "003", accountName: "Michael Scott", town: "Scranton", schedule: "Option 3", teluguName: "మైఖేల్ స్కాట్" },
  ];
  return (
    <div className="customerlist bold-text">
      {/* Form Container */}
      <div className="form-container">
        {/* Left Section: Labels */}
        <div className="form-labels">
          <label>Code</label>
          <label>Name</label>
          <label>Telugu Name</label>
          <label>Schedule</label>
          
        </div>

        {/* Right Section: Inputs */}
        <div className="form-inputs">
          <input type="text" className="input code" />
          <input type="text" className="input name-phone-city" />
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
        <button>Show</button>
        <button>Print</button>
        <button>Close</button>
      </div>

      {/* Tray Section */}
      <div className="table-section">
        <div className="table-container">
        <table className="custom-table">
            <thead>
            <tr>
                <th>Code</th>
                <th>Account Name</th>
                <th>Town</th>
                <th>Schedule</th>
                <th>Telugu Name</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                <td>{row.code}</td>
                <td>{row.accountName}</td>
                <td>{row.town}</td>
                <td>{row.schedule}</td>
                <td>{row.teluguName}</td>
                <td><button>Update</button></td>
                <td><button>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
