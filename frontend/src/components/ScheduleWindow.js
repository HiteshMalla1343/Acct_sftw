import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ScheduleWindow.css";
import { useGlobalState } from '../context/GlobalState'; // Import the custom hook

const ScheduleWindow = () => {
    const {schedules, fetchSchedules,addSchedule} = useGlobalState(); // Access the global state and functions
    useEffect(() => {
      fetchSchedules();
    }, []);
    const [formData, setFormData] = useState({
        schedule_name: "",
      });
  // Function to handle the deletion of an account
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/schedules/${id}`);
      fetchSchedules(); // Fetch updated accounts after deletion
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };
  const handleSave = () => {
    console.log(formData);
    if (formData.schedule_name) {
      console.log("Form Data: ", formData);
      addSchedule(formData); // Add account to global state
      setFormData({
        schedule_name: "",
      }); // Reset form after submission
    } else {
      alert('Please fill in all required fields');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(),
    }));
  };
//   console.log('idiot');
  console.log(schedules);
  return (
    <div className="customerlist bold-text">
      {/* Table Section for Displaying Accounts */}

      <div className="form-container">
        <div className="form-labels">
            <label>Schedule Name</label>
        </div>
        <div className="form-inputs">
            <input
            type="text"
            name="schedule_name"
            value={formData.schedule_name}
            onChange={handleInputChange}
            className="input code"
            />
        </div>
        
      </div>
      <div className="button-section">
            <button onClick={handleSave}>Add</button>
        </div> 
      <div className="table-section">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Schedule Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.s_no}</td>
                  <td>{schedule.schedule_name}</td>
                  <td>
                    <button onClick={() => handleDelete(schedule._id)}>Delete</button>
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

export default ScheduleWindow;

