import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { useGlobalState } from '../context/GlobalState';
import "../css/Sales.css";
import axios from "axios";

const Sales = (props, ref) => {
  const { addSale, stocks, fetchProducts, products, fetchStocks } = useGlobalState();
  const { fetchAccounts, accounts } = useGlobalState();
  const { fetchSales, Sales } = useGlobalState();
  // const formRef = useRef(null);
  // console.log({stocks});
  const [showStockPopup, setShowStockPopup] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [selectedPopupIndex, setSelectedPopupIndex] = useState(-1);
  const formDataRef = useRef(null);
  const [filtered, setFiltered] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);
  

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
    fetchStocks();
    fetchAccounts();
    fetchSales();
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
    date: getTodayDate(),
    stockNo: "",
    code: "",
    name: "",
    bags: 0,
    quantity: 0,
    rate: 0,
    cooly: 0,
    amount: 0,
    detail: "",
  });
  useEffect(() => {
    if (formData.stockNo.length >= 0) {
      let filteredStocks = stocks.filter((stock) =>
        stock.stockNo.toUpperCase().includes(formData.stockNo.split(' ')[1]?.toUpperCase() || '') &&
        generateStockNo(stock.date).includes(formData.stockNo.split(' ')[0] || '')
      );

      if (formData.product) {
        filteredStocks = filteredStocks.filter((stock) =>
          stock.product.toUpperCase().includes(formData.product.toUpperCase())
        );
      }

      setFiltered(filteredStocks);
    } else {
      setFiltered([]);
    }
  }, [formData.stockNo, formData.product, stocks]);
  const handleStockKeyDown = (e) => {
    if (!showStockPopup) return;

    e.stopPropagation(); // Stop event from bubbling up

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedPopupIndex(prev =>
          prev < filteredStocks.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedPopupIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedPopupIndex >= 0) {
          // Select the stock data
          const selectedStock = filteredStocks[selectedPopupIndex];
          setFormData(prev => ({
            ...prev,
            stockNo: selectedStock.stockNo,
            product: selectedStock.product
          }));
          // Close the popup
          setShowStockPopup(false);
          setSelectedPopupIndex(-1);
          setFilteredStocks([]); // Clear filtered stocks
        }
        break;
      case 'Escape':
        setShowStockPopup(false);
        setSelectedPopupIndex(-1);
        setFilteredStocks([]); // Clear filtered stocks
        break;
    }
  };
  const handleCodeKeyDown = (e) => {
    if (!showAccountPopup) return;

    e.stopPropagation(); // Stop event from bubbling up

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedPopupIndex(prev =>
          prev < filteredAccounts.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedPopupIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedPopupIndex >= 0) {
          // Select the stock data
          const selectedStock = filteredAccounts[selectedPopupIndex];
          setFormData(prev => ({
            ...prev,
            code: selectedStock.code,
            name: selectedStock.name
          }));
          // Close the popup
          setShowAccountPopup(false);
          setSelectedPopupIndex(-1);
          setFilteredAccounts([]); // Clear filtered stocks
        }
        break;
      case 'Escape':
        setShowAccountPopup(false);
        setSelectedPopupIndex(-1);
        setFilteredAccounts([]); // Clear filtered stocks
        break;
    }
  };

  const handleStockDateChange = async (e) => {
    const value = e.target.value.toUpperCase();
  
    // Ensure stockNo exists and is properly formatted
    setFormData((prev) => ({
      ...prev,
      stockNo: `${value} ${(prev.stockNo || '').split(' ')[1] || ''}`, // Handle undefined or empty strings
    }));
  };
  
  const handleStockNoChange = async (e) => {
    const value = e.target.value.toUpperCase();

    // Update stock number while preserving the date part
    setFormData(prev => ({
      ...prev,
      stockNo: `${prev.stockNo.split(' ')[0]} ${value}`
    }));


    if (value.length >= 0) {
      
      // let filtered = stocks.filter(stock =>
      //   stock.stockNo.toUpperCase().includes(value) && generateStockNo(stock.date).includes(formData.stockNo.split(' ')[0]) 
      // );
      // if(formData.product){
      //   filtered = filtered.filter(product => product.product.includes(formData.product))
      // }
      console.log("odiyammma");
      console.log(filtered); 
      setFilteredStocks(filtered);
      setShowStockPopup(true);
      setSelectedPopupIndex(0);
    } else {
      setShowStockPopup(false);
      setSelectedPopupIndex(-1);
    }
  };
  const handleStockSelect = (stock) => {
    setFormData(prev => ({
      ...prev,
      stockNo: stock.stockNo,
      product: stock.product
    }));
    setShowStockPopup(false);
    setSelectedPopupIndex(-1); // Reset the selected index
    setFilteredStocks([]); // Clear filtered accounts
  };
  const handleCodeChange = async (e) => {
    const value = e.target.value.toUpperCase();
    setFormData(prev => ({ ...prev, code: value }));

    if (value.length >= 2) {
      const filtered = accounts.filter(account =>
        account.name.toUpperCase().includes(value)
      );
      setFilteredAccounts(filtered);
      setShowAccountPopup(true);
      setSelectedPopupIndex(0);
    } else {
      setShowAccountPopup(false);
      setSelectedPopupIndex(-1);
    }
  };

  const handleAccountSelect = (account) => {
    setFormData(prev => ({
      ...prev,
      code: account.code,
      name: account.name
    }));
    setShowAccountPopup(false);
    setSelectedPopupIndex(-1); // Reset the selected index
    setFilteredAccounts([]); // Clear filtered accounts
  };

  

  // Modify the useEffect for amount calculation to just update the UI
  useEffect(() => {
    const calculateAmount = () => {
      let finalAmount;

        // Calculate based on quantity or bags
        const bags = Number(formData.bags);
        const quantity = Number(formData.quantity);
        const rate = Number(formData.rate);

        if (quantity > 0 && rate > 0) {
          finalAmount = (quantity / 10) * rate;
        } else if (bags > 0 && rate > 0) {
          finalAmount = bags * rate;
        } else {
          finalAmount = formData.amount;
        }
        return finalAmount;
    };

    const newAmount = calculateAmount();
    setFormData(prevFormData => ({
      ...prevFormData,
      amount: newAmount,
    }));
  }, [formData.bags, formData.quantity, formData.rate]);


  useEffect(() => {
    fetchSales();
  }, [formData.date]);

  // Keep formDataRef in sync with the latest formData
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);


  // const [selectedRows, setSelectedRows] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      setFormData((prevData) => ({
        ...prevData,
        date: value,
      }));
      return;

    }
    if (name === 'amount' && formData.rate === 0) {
      setFormData((prevData) => ({
        ...prevData,
        amount: parseFloat(value) || 0
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'bags' || name === 'quantity' || name === 'rate' || name === 'cooly'
        ? parseFloat(value) || 0
        : value
    }));
  };


  useImperativeHandle(ref, () => ({
    handleSave: async () => {
      if (showStockPopup || showAccountPopup) {
        return;
      }

      if (!formData.stockNo || !formData.code || !formData.product) {
        alert("Please fill in all required fields");
        return;
      }

      // Calculate final amount based on conditions
      let finalAmount;

        // Calculate based on quantity or bags
        const bags = Number(formData.bags);
        const quantity = Number(formData.quantity);
        const rate = Number(formData.rate);

        if (quantity > 0 && rate > 0) {
          finalAmount = (quantity / 10) * rate;
        } else if (bags > 0 && rate > 0) {
          finalAmount = bags * rate;
        } else {
          finalAmount = formData.amount;
        }

      // Ensure amount is positive
      if (finalAmount <= 0) {
        alert("Amount must be greater than 0");
        return;
      }

      // Prepare data for backend
      const dataToSend = {
        ...formData,
        amount: finalAmount
      };

      // const duplicateEntry = Sales.find(
      //   (stock) => stock.stockNo === formData.stockNo && stock.product === formData.product 
      // );

      // if (duplicateEntry) {
      //   alert("A stock entry with the same Stock Number and Product already exists!");
      //   return;
      // }
      try {
        await addSale(dataToSend);
        alert("Sale entry added successfully!");
        fetchSales();
        setFormData({
          date: getTodayDate(),
          stockNo: "",
          code: "",
          name: "",
          bags: 0,
          quantity: 0,
          rate: 0,
          cooly: 0,
          amount: 0,
          detail: "",
          product: ""
        });
      } catch (error) {
        alert(`Failed to add sale: ${error.message}`);
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
      const response = await axios.delete('http://localhost:8000/sales/bulk-delete', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: selectedRows, // Use `data` for sending the request body in DELETE requests with axios
      });

      // Check if the response indicates success
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else {
        selectedRows.length = 0;
      }

      // Remove deleted stocks from local state
      fetchSales(); return
    } catch (error) {
      console.error('Error deleting stocks:', error.message);
      throw error;
    }
  };

  const handlePopulateForm = (selectedId) => {
    if (selectedRows.length === 0 || selectedRows.length > 1) {
      alert('Please select only 1 stock to edit');
      return;
    }
    // fetchStocks();
    const selectedData = Sales.find(stock => stock._id === selectedRows[0]);
    console.log('Selected stock:', selectedData);
    if (!selectedData) {
      alert('Selected stock not found');
      return;
    }

    if (selectedData) {
       setFormData({
        date: selectedData.date || getTodayDate(),
        product: selectedData.product || "",
        stockNo: selectedData.stockNo || "",
        code: selectedData.code || "",
        name: selectedData.name || "",
        bags: selectedData.bags || 0,
        quantity: selectedData.quantity || 0,
        rate: selectedData.rate || 0,
        cooly: selectedData.cooly || 0,
        amount: selectedData.amount  || 0,
        detail: selectedData.detail || "",
      });
    }
  };

  const handleUpdate = async () => {
    if (!formData.stockNo || !formData.product || !formData.bags) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const stockId = selectedRows[0];

      await axios.put(`http://localhost:8000/sales/${stockId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Stock entry updated successfully!');
      await fetchSales();

      setFormData({
        date: getTodayDate(),
        stockNo: "",
        code: "",
        name: "",
        bags: 0,
        quantity: 0,
        rate: 0,
        cooly: 0,
        amount: 0,
        detail: "",
        product: "",
      });
    } catch (error) {
      alert(`Failed to update sale: ${error.message}`);
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
              className="form-input date"
            />
          </label>
        </div>

        {/* Bottom Section: Divided into 3 Parts */}
        <div className="bottom-section">
          {/* First Column */}
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
                <label className="form-label" htmlFor="stockNo">
                  Stock No:
                </label>
              </div>
              <div className="input-container" style={{ display: 'flex' }}>
                <input
                  type="text"
                  value={formData.stockNo.split(' ')[0]|| ''}
                  onChange={handleStockDateChange}
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
                  onChange={handleStockNoChange}
                  onKeyDown={handleStockKeyDown}
                  required
                  className="form-input"
                  style={{
                    width: '70%',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                  }}
                />
                {showStockPopup && (
                  <div className="popup">
                    {filteredStocks.map((stock, index) => (
                      <div
                        key={stock._id}
                        className={`popup-item ${index === selectedPopupIndex ? 'selected' : ''}`}
                        onClick={() => handleStockSelect(stock)}
                        onMouseEnter={() => setSelectedPopupIndex(index)}
                      >
                        {stock.stockNo}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="code">
                  Code:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleCodeChange}
                  onKeyDown={handleCodeKeyDown}
                  required
                  className="form-input"
                />
                {showAccountPopup && (
                  <div className="popup">
                    {filteredAccounts.map((account, index) => (
                      <div
                        key={account._id}
                        className={`popup-item ${index === selectedPopupIndex ? 'selected' : ''}`}
                        onClick={() => handleAccountSelect(account)}
                        onMouseEnter={() => setSelectedPopupIndex(index)}
                      >
                        {account.code} {account.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="name">
                  Name:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="form-column">
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
                <label className="form-label" htmlFor="quantity">
                  Quantity:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="rate">
                  Rate:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="Cooly">
                  Cooly:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  id="cooly"
                  name="cooly"
                  value={formData.cooly}
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
                <label className="form-label" htmlFor="amount">
                  Amount:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="detail">
                  Detail:
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text-area"
                  id="detail"
                  name="detail"
                  value={formData.detail}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="stockwise">
                <button type="button" onClick={() => { }}>Stock Total</button>
                <button type="button" onClick={() => { }}>Stock Wise</button>
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
                  <th>Item</th>
                  <th>Name</th>
                  <th>Stock No</th>
                  <th>Bags</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Cooly</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {Sales.filter(data => data.date === formData.date)
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
                      <td>{data.product}</td>
                      <td>{data.name}</td>
                      <td>{data.stockNo}</td>
                      <td>{data.bags}</td>
                      <td>{data.quantity}</td>
                      <td>{data.rate}</td>
                      <td>{data.cooly}</td>
                      <td>{data.amount}</td>

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

export default forwardRef(Sales);