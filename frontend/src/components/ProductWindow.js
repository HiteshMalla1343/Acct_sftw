import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ProductWindow.css";
import { useGlobalState } from '../context/GlobalState'; // Import the custom hook

const ProductWindow = () => {
    const {products, fetchProducts,addProduct} = useGlobalState(); // Access the global state and functions
    useEffect(() => {
      fetchProducts();
    }, []);
    const [formData, setFormData] = useState({
        product_name: "",
      });
  // Function to handle the deletion of an account
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/products/${id}`);
      fetchProducts(); // Fetch updated accounts after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleSave = () => {
    console.log(formData);
    if (formData.product_name) {
      console.log("Form Data: ", formData);
      addProduct(formData); // Add account to global state
      setFormData({
        product_name: "",
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
  console.log('idiot');
  console.log(products);
  return (
    <div className="customerlist bold-text">
      {/* Table Section for Displaying Accounts */}

      <div className="form-container">
        <div className="form-labels">
            <label>Product Name</label>
        </div>
        <div className="form-inputs">
            <input
            type="text"
            name="product_name"
            value={formData.product_name}
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
                <th>Product Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.s_no}</td>
                  <td>{product.product_name}</td>
                  <td>
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
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

export default ProductWindow;

