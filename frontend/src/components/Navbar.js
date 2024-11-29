// src/Navbar.js
import React from 'react';
import '../css/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      {/* Master link with dropdown */}
      <div className="dropdown">
        <a href="#master">Master</a>
        <div className="dropdown-content">
          <a href="#master-option1">Account</a>
          <a href="#master-option2">Product</a>
          <a href="#master-option3">Schedules</a>
          <a href="#master-option4">Customer List</a>
          <a href="#master-option5">Product List</a>
          <a href="#master-option6">Schedule List</a>
          <a href="#master-option7">Logout</a>
          <a href="#master-option8">Exit</a>
        </div>
      </div>

      {/* Inventory link with dropdown */}
      <div className="dropdown">
        <a href="#inventory">Inventory</a>
        <div className="dropdown-content">
          <a href="#inventory-option1">Stock Entry</a>
          <a href="#inventory-option2">Purchase</a>
          <a href="#inventory-option3">Sales</a>
          <a href="#inventory-option4">Digumathi</a>
          <a href="#inventory-option5">Sale Patty</a>
          <a href="#inventory-option6">Salepatty List</a>
          <a href="#inventory-option7">Salepatty Expenses</a>
          <a href="#inventory-option8">Rate Wise Report</a>
          <a href="#inventory-option9">Patty Stock</a>
          <a href="#inventory-option10">Sales Stock</a>
        </div>
      </div>

      {/* Finance link with dropdown */}
      <div className="dropdown">
        <a href="#finance">Finance</a>
        <div className="dropdown-content">
          <a href="#finance-option1">Cash Entry</a>
          <a href="#finance-option2">Journal</a>
          <a href="#finance-option3">Bank Entry</a>
        </div>
      </div>

      {/* Reports link with dropdown */}
      <div className="dropdown">
          <a href="#reports">Reports</a>
          <div className="dropdown-content">
            <a href="#reports-option1">Ledger</a>
            <a href="#reports-option2">Outstanding</a>
            <a href="#reports-option3">Bill Print - 2</a>
            <a href="#reports-option4">Vasool List</a>
            <a href="#reports-option5">Cash List</a>
            <a href="#reports-option6">Sales List</a>
            <a href="#reports-option7">Purchase List</a>
            <a href="#reports-option8">Journal List</a>
            <a href="#reports-option9">Bank List</a>
            <a href="#reports-option10">Stock Entry Report</a>
            <a href="#reports-option11">Total Ledger</a>
            <a href="#reports-option12">Customer Status</a>
            <a href="#reports-option13">Stock Wise Report</a>
            <a href="#reports-option14">Day Wise Report</a>
            <a href="#reports-option15">Difference Quantity</a>
            <a href="#reports-option16">Difference Amount</a>
            <a href="#reports-option17">Bill Print</a>
            <a href="#reports-option18">Account Opening Balances</a>

          </div>
        </div>

        {/* Tray link with dropdown */}
        <div className="dropdown">
          <a href="#tray">Tray</a>
          <div className="dropdown-content">
            <a href="#tray-option1">Tray Entry</a>
            <a href="#tray-option2">Tray OutStanding</a>
            <a href="#tray-option3">Tray List</a>
            <a href="#tray-option4">Tray Ledger</a>
            <a href="#tray-option5">Tray Bill - 2</a>
            <a href="#tray-option6">Tray Bill</a>
            <a href="#tray-option7">Tray Op. Bal</a>
          </div>
        </div>

        {/* Final Reports link with dropdown */}
        <div className="dropdown">
          <a href="#final-reports">Final Reports</a>
          <div className="dropdown-content">
            <a href="#final-reports-option1">TrailBal</a>
            <a href="#final-reports-option2">Ledger All</a>
            <a href="#final-reports-option3">Daybook</a>
            <a href="#final-reports-option4">Trading Account</a>
            <a href="#final-reports-option5">Profit & Loss</a>
            <a href="#final-reports-option6">Balance Sheet</a>
            <a href="#final-reports-option7">Balance Sheet (Detail)</a>
          </div>
        </div>

        {/* Settings link with dropdown */}
        <div className="dropdown">
          <a href="#settings">Settings</a>
          <div className="dropdown-content">
            <a href="#settings-option1">Options</a>
            <a href="#settings-option2">Change Password</a>
            <a href="#settings-option3">Change Code</a>
            <a href="#settings-option4">UnUsed Accounts</a>
            <a href="#settings-option5">New Data</a>
            <a href="#settings-option6">Old Data</a>
          </div>
        </div>

        {/* Util link with dropdown */}
        <div className="dropdown">
          <a href="#util">Util</a>
          <div className="dropdown-content">
            <a href="#util-option1">Backup</a>
            <a href="#util-option2">DayBook Update</a>
          </div>
        </div>
      </div>
  );
}

export default Navbar;
