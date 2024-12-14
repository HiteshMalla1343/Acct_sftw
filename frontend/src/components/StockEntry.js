import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { useGlobalState } from '../context/GlobalState';
import "../css/StockEntry.css";
import axios from "axios";

const StockEntry = (props, ref) => {
  const { addStock, stocks, fetchProducts, products, fetchStocks } = useGlobalState();
  // const formRef = useRef(null);
  // console.log({stocks});

  const formDataRef = useRef(null);
  
  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
  }, []);


  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Function to generate stock number from date
  const generateStockNo = (date) => {
    console.log(date.split('-'))
    const formattedDate = date.split('-').reverse().map(part => part.slice(-2)).join('');
    return `${formattedDate} `;
  };

  const [formData, setFormData] = useState({
    date:  getTodayDate(),
    stockNo: generateStockNo(getTodayDate()),
    village: "",
    vehicle: "",
    bags: "",
    product: "",
    kirai: 0,
    type: "Commission",
    exp: 0,
    stockClear: false
  });

  useEffect(() => {
    fetchStocks(); // Fetch products when component mounts
  }, [formData.date]);

    // Keep formDataRef in sync with the latest formData
    useEffect(() => {
      formDataRef.current = formData;
    }, [formData]);


  const [selectedRows, setSelectedRows] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      setFormData((prevData) => ({
        ...prevData,
        date: value,
        stockNo: generateStockNo(value)
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'bags' || name === 'kirai' || name === 'exp' 
        ? value.replace(/[^0-9.]/g, '') 
        : value.toUpperCase(),
    }));

    console.log(formData,"data check");
  };
  

  useImperativeHandle(ref, () => ({
    handleSave: async () => {
      const currentFormData = formDataRef.current; // Access the latest formData

      if (!currentFormData.stockNo || !currentFormData.product || !currentFormData.bags) {
        alert("Please fill in all required fields");
        return;
      }

      const duplicateEntry = stocks.find(
        (stock) => stock.stockNo === currentFormData.stockNo && stock.product === currentFormData.product
      );

      if (duplicateEntry) {
        alert("A stock entry with the same Stock Number and Product already exists!");
        return;
      }

      try {
        await addStock(currentFormData);
        alert("Stock entry added successfully!");
        fetchStocks();
        setFormData({
          date: getTodayDate(),
          stockNo: generateStockNo(getTodayDate()),
          village: "",
          vehicle: "",
          bags: "",
          product: "",
          kirai: 0,
          type: "Commission",
          exp: 0,
          stockClear: false,
        });
      } catch (error) {
        alert(`Failed to add stock: ${error.message}`);
      }
    },
  }));

  
  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert('Please select rows to delete');
      return;
    }

    console.log('hemlo');
    console.log(selectedRows);
    
    try {
      const response = await axios.delete('http://localhost:8000/stocks/bulk-delete', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: selectedRows, // Use `data` for sending the request body in DELETE requests with axios
      });
  
      // Check if the response indicates success
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else{
        selectedRows.length = 0;
      }
  
      // Remove deleted stocks from local state
     fetchStocks(); return
    } catch (error) {
      console.error('Error deleting stocks:', error.message);
      throw error;
    }
  };
  
  const handlePopulateForm = () => {
    if (selectedRows.length === 0 || selectedRows.length > 1) {
      alert('Please select only 1 stock to edit');
      return;
    }
    // fetchStocks();
    const selectedStock = stocks.find(stock => stock._id === selectedRows[0]);
    console.log('Selected stock:', selectedStock);
    if (!selectedStock) {
      alert('Selected stock not found');
      return;
    }
  
    setFormData({
      date: selectedStock.date || getTodayDate(),
      stockNo: selectedStock.stockNo,
      village: selectedStock.village || "",
      vehicle: selectedStock.vehicle || "",
      bags: selectedStock.bags || "",
      product: selectedStock.product || "",
      kirai: selectedStock.kirai || 0,
      type: selectedStock.type || "Commission",
      exp: selectedStock.exp || 0,
      stockClear: selectedStock.stockClear || false,
    });
  
    alert('Form populated with selected stock data!');
  };
  
  const handleUpdate = async () => {
    if (!formData.stockNo || !formData.product || !formData.bags) {
      alert('Please fill in all required fields');
      return;
    }
  
    const duplicateEntry = stocks.find(
      stock =>
        stock.stockNo === formData.stockNo &&
        stock.product === formData.product &&
        stock._id !== selectedRows[0]
    );
  
    if (duplicateEntry) {
      alert('A stock entry with the same Stock Number and Product already exists!');
      return;
    }
  
    try {
      const stockId = selectedRows[0];
  
      await axios.put(`http://localhost:8000/stocks/${stockId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      alert('Stock entry updated successfully!');
      await fetchStocks();
  
      setFormData({
        date: getTodayDate(),
        stockNo: generateStockNo(getTodayDate()),
        village: "",
        vehicle: "",
        bags: "",
        product: "",
        kirai: 0,
        type: "Commission",
        exp: 0,
        stockClear: false,
      });
    } catch (error) {
      alert(`Failed to update stock: ${error.message}`);
    }
  };
  
  
  

  const handleCheckboxChange = (id, e) => {
    if (e.target.checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  return (
    <div className="stock-entry-container">
      <form onSubmit={(e) => e.preventDefault()} className="stock-entry-form">
        {/* Top Section: Date Field */}
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

        {/* Bottom Section: Divided into 3 Parts */}
        <div className="bottom-section">
          {/* First Column */}
          <div className="form-column">
          <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="stockNo">
                  Stock No:
                </label>
              </div>
              <div className="input-container" style={{display: 'flex'}}>
                <input
                  type="text"
                  value={formData.stockNo.split(' ')[0]}
                  readOnly
                  style={{
                    width: '30%', 
                    backgroundColor: '#f0f0f0', 
                    borderRight: 'none',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0
                  }}
                />
                <input
                  type="text"
                  id="stockNo"
                  name="stockNo"
                  value={formData.stockNo.split(' ')[1] || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    stockNo: `${prev.stockNo.split(' ')[0]} ${e.target.value.toUpperCase()}`
                  }))}
                  required
                  className="form-input"
                  style={{
                    width: '70%',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="bags">
                  Bags:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  id="bags"
                  name="bags"
                  value={formData.bags}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="vehicle">
                  Vehicle:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="form-column">
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="product">
                  Product:
                </label>
              </div>
              <div className="input-container">
                <select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="form-select"
                >
                <option value="">SELECT PRODUCT</option>
                  {products.map((product) => (
                    <option key={product._id} value={product.product_name}>
                      {product.product_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="kirai">
                  Kirai:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  id="kirai"
                  name="kirai"
                  value={formData.kirai}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="village">
                  Village/City:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="village"
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Third Column */}
          <div className="form-column">
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="type">
                  Type:
                </label>
              </div>
              <div className="input-container">
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">SELECT TYPE</option>
                  <option value="Commission">Commission</option>
                  <option value="Stock Clear">Stock Clear</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="exp">
                  Exp:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  name="exp"
                  id="exp"
                  value={formData.exp}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label-container checkbox-container">
                <label className="form-label checkbox-label">
                  Stock Clear
                  <input
                    type="checkbox"
                    name="stockClear"
                    checked={formData.stockClear}
                    onChange={(e) => setFormData({ ...formData, stockClear: e.target.checked })}
                    className="form-checkbox"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="button-section submit-button">
          <button type="button" onClick={ref.current?.handleSave}>Save</button>
          <button type="button" onClick={handleDelete}>Delete</button>
          <button type="button" onClick={handlePopulateForm}>Edit</button>
          <button type="button" onClick={handleUpdate}>Update</button>
        </div>
      </form>

      <div className="stocklist bold-text">
        <div className="table-section">
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>S No</th>
                  <th>Stock No</th>
                  <th>Bags</th>
                  <th>Product</th>
                </tr>
              </thead>
              <tbody>
                {stocks
                .filter(data => data.date === formData.date)
                .map((data, index) => (
                  <tr key={data._id}>
                    <td>
                      <input
                        type="checkbox"
                        // checked={selectedRows.includes(data.id)}
                        onChange={(e) => handleCheckboxChange(data._id, e)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{data.stockNo}</td>
                    <td>{data.bags}</td>
                    <td>{data.product}</td>
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

export default forwardRef(StockEntry);