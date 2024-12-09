// context/GlobalState.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Global Context
const GlobalStateContext = createContext();

// GlobalStateProvider component to wrap your app
export const GlobalStateProvider = ({ children }) => {
  // Initial global state for accounts
  const [accounts, setAccounts] = useState([]);
  const [schedules, setSchedules] = useState([]); // Add a state for schedules

  // Function to fetch schedules from the backend
  const fetchSchedules = async () => {
    try {
      const response = await fetch('http://localhost:8000/schedules');
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      setSchedules(data); // Set the fetched schedules in global state
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
    setAccounts((prevAccounts) => [...prevAccounts, savedAccount]);
  };

  // Function to update an account (modify)
  const updateAccount = (updatedAccount) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.code === updatedAccount.code ? updatedAccount : account
      )
    );
  };

  // Function to delete an account
  const deleteAccount = (accountCode) => {
    setAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account.code !== accountCode)
    );
  };

  // Provide the state and functions to the rest of the app
  return (
    <GlobalStateContext.Provider
      value={{
        accounts,
        schedules, 
        addAccount,
        updateAccount,
        deleteAccount,
        fetchSchedules,
        fetchAccounts
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
