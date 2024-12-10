import React, { useState } from "react";
import "../css/StockEntry.css";

const StockEntry = () => {
  const [stockData, setStockData] = useState([
    {
      id: 1,
      stockNo: "031023 SMB",
      village: "TMC",
      vehicle: "440",
      bags: 10,
      type: "Commission",
    },
    {
      id: 2,
      stockNo: "031023 MSR",
      village: "DONDA",
      vehicle: "18",
      bags: 5,
      type: "Commission",
    },
    {
      id: 3,
      stockNo: "031023 BVR",
      village: "POTALLS",
      vehicle: "3",
      bags: 15,
      type: "Commission",
    },
    {
      id: 4,
      stockNo: "031023 SSM BUJJ",
      village: "CT",
      vehicle: "15",
      bags: 7,
      type: "Commission",
    },
    {
      id: 5,
      stockNo: "031023 SVC",
      village: "ANAPA",
      vehicle: "11",
      bags: 12,
      type: "Commission",
    },
  ]);

  const [formData, setFormData] = useState({
    stockNo: "",
    village: "",
    vehicle: "",
    bags: "",
    type: "Commission",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStockData([...stockData, { id: stockData.length + 1, ...formData }]);
    setFormData({
      stockNo: "",
      village: "",
      vehicle: "",
      bags: "",
      type: "Commission",
    });
  };

  return (
    <div className="stock-entry-container">
      <h1 className="stock-entry-title">Stock Entry</h1>
      <form onSubmit={handleSubmit} className="stock-entry-form">
        <div className="form-group">
          <label className="form-label">
            Stock No:
            <input
              type="text"
              name="stockNo"
              value={formData.stockNo}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Village/City:
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Vehicle:
            <input
              type="text"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Bags:
            <input
              type="number"
              name="bags"
              value={formData.bags}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Type:
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Commission">Commission</option>
              <option value="Stock Clear">Stock Clear</option>
            </select>
          </label>
        </div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
      <table className="stock-table">
        <thead>
          <tr>
            <th>S No</th>
            <th>Stock No</th>
            <th>Village/City</th>
            <th>Vehicle</th>
            <th>Bags</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.stockNo}</td>
              <td>{data.village}</td>
              <td>{data.vehicle}</td>
              <td>{data.bags}</td>
              <td>{data.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockEntry;
