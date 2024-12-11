import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import axios from "axios";
import "../css/ProductWindow.css";
import { useGlobalState } from '../context/GlobalState';

const ProductWindow = (props, ref) => {
  const { products, fetchProducts, addProduct } = useGlobalState();
  useEffect(() => {
    fetchProducts();
  }, []);
  const [formData, setFormData] = useState({
    product_name: "",
  });

  // Expose handleSave function via ref
  useImperativeHandle(ref, () => ({
    handleSave: () => {
      if (formData.product_name) {
        console.log("Form Data: ", formData);
        addProduct(formData);
        setFormData({
          product_name: "",
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
      await axios.delete(`http://localhost:8000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-window">
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
        <button type="button" onClick={() => ref.current?.handleSave()}>Add</button>
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

export default forwardRef(ProductWindow);
