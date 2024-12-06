import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CustomerList.css";

const CustomerList = ({trigger}) => {
  const options=['happy','sad']
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState(null); // Form data for editing
  

    useEffect(() => {
      const fetchCustomers = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/customers");
          setCustomers(response.data);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      };

      fetchCustomers();
    }, [trigger]);

  const handleUpdate = (customer) => {
    setFormData(customer); // Set the selected customer data in the form for editing
  };

  const handleDelete = async (code) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:8000/api/customers/${code}`);
        setCustomers((prev) => prev.filter((customer) => customer.code !== code));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!formData) return;
      const response = await axios.put(
        `http://localhost:8000/api/customers/${formData.code}`,
        formData
      );
      alert("Customer updated successfully");
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.code === formData.code ? formData : customer
        )
      );
      setFormData(null); // Clear the form after saving
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="customerlist bold-text">
      {/* Form Section for Editing */}
      {formData &&  (<div className="form-container">
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
      </div>)}

      {/* Table Section */}
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
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.code}</td>
                  <td>{customer.accountName}</td>
                  <td>{customer.town}</td>
                  <td>{customer.schedule}</td>
                  <td>{customer.teluguName}</td>
                  <td>
                    <button onClick={() => handleUpdate(customer)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(customer.code)}>Delete</button>
                  </td>
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
