import React, { useState } from "react";
import "../css/StockEntry.css";

const StockEntry = () => {
  const handleDelete = () => {
    // Implement delete logic here
    console.log('Deleting selected rows:', selectedRows);
  };
  const handleSave = () => {
    // Implement save logic here
    console.log('Saving form data');
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const handleCheckboxChange = (id, e) => {
    if (e.target.checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };
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
      {/* <h1 className="stock-entry-title">Stock Entry</h1>
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
      </form> */}
      <form onSubmit={handleSubmit} className="stock-entry-form">
  {/* <!-- Top Section: Date Field --> */}
  <div className="top-section">
    <label className="form-label">
      Date:
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        required
        className="form-input"
      />
    </label>
  </div>

  {/* <!-- Bottom Section: Divided into 3 Parts --> */}
  <div className="bottom-section">
    {/* <!-- First Column --> */}
    <div className="form-column">
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

    {/* <!-- Second Column --> */}
    <div className="form-column">
      <label className="form-label">
        Product:
        <select
          name="product"
          value={formData.product}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="Product 1">Product 1</option>
          <option value="Product 2">Product 2</option>
        </select>
      </label>
      <label className="form-label">
        Kirai:
        <input
          type="number"
          name="kirai"
          value={formData.kirai}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </label>
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

    {/* <!-- Third Column --> */}
    <div className="form-column">
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
      <label className="form-label">
        Exp:
        <input
          type="number"
          name="exp"
          value={formData.exp}
          onChange={handleInputChange}
          required
          className="form-input"
        />
      </label>
      <label className="form-label checkbox-label">
        <input
          type="checkbox"
          name="stockClear"
          checked={formData.stockClear}
          onChange={(e) => setFormData({ ...formData, stockClear: e.target.checked })}
        />
        Stock Clear
      </label>
    </div>
  </div>

  
  <button type="submit" className="submit-button">
    Save
  </button>
</form>

      {/* <table className="stock-table">
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
      </table> */}
  <div className="stocklist bold-text">
      <div className="button-section submit-button">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      {/* Table Section for Displaying Stock Data */}
      <div className="table-section">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Select</th>
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
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(data.id)}
                      onChange={(e) => handleCheckboxChange(data.id, e)}
                    />
                  </td>
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
      </div>
    </div>
    
    </div>
  );
};

export default StockEntry;
