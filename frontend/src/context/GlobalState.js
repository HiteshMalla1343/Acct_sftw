    // context/GlobalState.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios";
// Create the Global Context
const GlobalStateContext = createContext();

// GlobalStateProvider component to wrap your app
export const GlobalStateProvider = ({ children }) => {
  // Initial global state for accounts
  const [accounts, setAccounts] = useState([]);
  const [schedules, setSchedules] = useState([]); // Add a state for schedules
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  // Function to fetch schedules from the backend
  const fetchSchedules = async () => {
    try {
      const response = await fetch('http://localhost:8000/schedules');
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      console.log("puski");
      console.log(data);
      setSchedules(data); // Set the fetched schedules in global state
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/products');
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      console.log("puskii");
      console.log(data);
      setProducts(data); // Set the fetched schedules in global state
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };
  const fetchAccounts = async () => {
    try {
      const response = await fetch('http://localhost:8000/accounts');
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      
      setAccounts(data); // Set the fetched schedules in global state
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  // Function to add an account
  const addAccount = async (accountData) => {
    console.log(accountData);
    try {
      const response = await fetch('http://localhost:8000/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Extract error details from the backend
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
  
      const savedAccount = await response.json();
      setAccounts((prevAccounts) => [...prevAccounts, savedAccount]);
      return savedAccount;
    } catch (error) {
      console.error('Error adding account:', error.message);
      throw error; // Re-throw error to let the caller handle it
    }
  };

  const addSchedule =async (Scheduledata) => {
    console.log(Scheduledata);
    const response = await fetch('http://localhost:8000/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Scheduledata),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const savedSchedule = await response.json();
    setSchedules((prevSchedules) => [...prevSchedules, savedSchedule]);
    fetchSchedules();
  };
  const addProduct =async (Productdata) => {
    console.log(Productdata);
    const response = await fetch('http://localhost:8000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Productdata),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const savedProduct = await response.json();
    setProducts((prevProducts) => [...prevProducts, savedProduct]);
    fetchProducts();
  };

  
  const fetchStocks = async () => {
    try {
      const response = await fetch('http://localhost:8000/stocks');
      const data = await response.json();
      setStocks(data);
      console.log(stocks,"fetched successfully")
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const addStock = async (stockData) => {
    try {
      const response = await fetch('http://localhost:8000/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
  
      const savedStock = await response.json();
      setStocks((prevStocks) => [...prevStocks, savedStock]);
      return savedStock;
    } catch (error) {
      console.error('Error adding stock:', error.message);
      throw error;
    }
  };
  
  // Provide the state and functions to the rest of the app
  return (
    <GlobalStateContext.Provider
      value={{
        accounts,
        schedules, 
        products,
        addAccount,
        fetchSchedules,
        fetchProducts,
        fetchAccounts,
        addSchedule,  
        addProduct,  
        stocks,
        fetchStocks,
        addStock,
        
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use global state
export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
