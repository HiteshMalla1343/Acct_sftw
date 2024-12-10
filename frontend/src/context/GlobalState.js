// context/GlobalState.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Global Context
const GlobalStateContext = createContext();

// GlobalStateProvider component to wrap your app
export const GlobalStateProvider = ({ children }) => {
  // Initial global state for accounts
  const [accounts, setAccounts] = useState([]);
  const [schedules, setSchedules] = useState([]); // Add a state for schedules
  const [products, setProducts] = useState([]);
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
  const addAccount =async (accountData) => {
    console.log(accountData);
    const response = await fetch('http://localhost:8000/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountData),
    });
    console.log("hi");
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const savedAccount = await response.json();
    console.log(savedAccount);
    setAccounts((prevAccounts) => [...prevAccounts, savedAccount]);
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
    console.log("hi");
    console.log(response);
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
    console.log("hi");
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const savedProduct = await response.json();
    setProducts((prevProducts) => [...prevProducts, savedProduct]);
    fetchProducts();
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
