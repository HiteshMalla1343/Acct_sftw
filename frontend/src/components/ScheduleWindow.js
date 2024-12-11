import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import axios from "axios";
import "../css/ScheduleWindow.css";
import { useGlobalState } from '../context/GlobalState';

const ScheduleWindow = (props, ref) => {
  const { schedules, fetchSchedules, addSchedule } = useGlobalState();
  useEffect(() => {
    fetchSchedules();
  }, []);
  const [formData, setFormData] = useState({
    schedule_name: "",
  });

  // Expose handleSave function via ref
  useImperativeHandle(ref, () => ({
    handleSave: () => {
      if (formData.schedule_name) {
        console.log("Form Data: ", formData);
        addSchedule(formData);
        setFormData({
          schedule_name: "",
        });
      } else {
        alert('Please fill in all required fields');
      }
    }
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(),
    }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/schedules/${id}`);
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <div className="schedule-window">
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
        <button type="button" onClick={() => ref.current?.handleSave()}>Add</button>
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

export default forwardRef(ScheduleWindow);
