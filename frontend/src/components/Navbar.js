import React from 'react';
import '../css/Navbar.css';

const Navbar = ({ onOpenWindow }) => {
    return (
      <div className="navbar">
        <div className="dropdown">
          <a href="#master">Master</a>
          <div className="dropdown-content">
            <a href="#account" onClick={() => onOpenWindow("Account")}>Account</a>
            <a href="#product" onClick={() => onOpenWindow("Product")}>Product</a>
            <a href="#schedules" onClick={() => onOpenWindow("Schedules")}>Schedules</a>
            <a href="#customer-list" onClick={() => onOpenWindow("Customer List")}>Customer List</a>
            <a href="#product-list" onClick={() => onOpenWindow("Product List")}>Product List</a>
            <a href="#schedule-list" onClick={() => onOpenWindow("Schedule List")}>Schedule List</a>
            <a href="#logout" onClick={() => onOpenWindow("Logout")}>Logout</a>
            <a href="#exit" onClick={() => onOpenWindow("Exit")}>Exit</a>
            {/* Add other dropdown items here */}
          </div>
        </div>
        <div className="dropdown">
          <a href="#inventoryr">Inventory</a>
          <div className="dropdown-content">
            <a href="#stock-entry" onClick={() => onOpenWindow("Stock Entry")}>Stock Entry</a>
            <a href="#purchase" onClick={() => onOpenWindow("Purchase")}>Purchase</a>
            <a href="#sales" onClick={() => onOpenWindow("Sales")}>Sales</a>
            <a href="#digumathi" onClick={() => onOpenWindow("Digumathi")}>Digumathi</a>
            <a href="#sale-patty" onClick={() => onOpenWindow("Sale Patty")}>Sale Patty</a>
            <a href="#salepatty-list" onClick={() => onOpenWindow("Salepatty List")}>Salepatty List</a>
            <a href="#salepatty-expenses" onClick={() => onOpenWindow("Salepatty Expenses")}>Salepatty Expenses</a>
            <a href="#rate-wise-report" onClick={() => onOpenWindow("Rate Wise Report")}>Rate Wise Report</a>
            <a href="#patty-stock" onClick={() => onOpenWindow("Patty Stock")}>Patty Stock</a>
            <a href="#sales-stock" onClick={() => onOpenWindow("Sales Stock")}>Sales Stock</a>
            {/* Add other dropdown items here */}
          </div>
        </div>
        <div className="dropdown">
          <a href="#finance">Finance</a>
          <div className="dropdown-content">
            <a href="#cash-entry" onClick={() => onOpenWindow("Cash Entry")}>Cash Entry</a>
            <a href="#journal" onClick={() => onOpenWindow("Journal")}>Journal</a>
            <a href="#bank-entry" onClick={() => onOpenWindow("Bank Entry")}>Bank Entry</a>
            {/* Add other dropdown items here */}
          </div>
        </div>
        <div className="dropdown">
          <a href="#reports">Reports</a>
          <div className="dropdown-content">
            <a href="#ledger" onClick={() => onOpenWindow("Ledger")}>Ledger</a>
            <a href="#outstanding" onClick={() => onOpenWindow("Outstanding")}>Outstanding</a>
            <a href="#bill-print-2" onClick={() => onOpenWindow("Bill Print - 2")}>Bill Print - 2</a>
            <a href="#vasool-list" onClick={() => onOpenWindow("Vasool List")}>Vasool List</a>
            <a href="#cash-list" onClick={() => onOpenWindow("Cash List")}>Cash List</a>
            <a href="#sales-list" onClick={() => onOpenWindow("Sales List")}>Sales List</a>
            <a href="#purchase-list" onClick={() => onOpenWindow("Purchase List")}>Purchase List</a>
            <a href="#journal-list" onClick={() => onOpenWindow("Journal List")}>Journal List</a>
            <a href="#bank-list" onClick={() => onOpenWindow("Bank List")}>Bank List</a>
            <a href="#stock-entry-report" onClick={() => onOpenWindow("Stock Entry Report")}>Stock Entry Report</a>
            <a href="#total-ledger" onClick={() => onOpenWindow("Total Ledger")}>Total Ledger</a>
            <a href="#customer-status" onClick={() => onOpenWindow("Customer Status")}>Customer Status</a>
            <a href="#stock-wise-report" onClick={() => onOpenWindow("Stock Wise Report")}>Stock Wise Report</a>
            <a href="#day-wise-report" onClick={() => onOpenWindow("Day Wise Report")}>Day Wise Report</a>
            <a href="#difference-quantity" onClick={() => onOpenWindow("Difference Quantity")}>Difference Quantity</a>
            <a href="#difference-amount" onClick={() => onOpenWindow("Difference Amount")}>Difference Amount</a>
            <a href="#bill-print" onClick={() => onOpenWindow("Bill Print")}>Bill Print</a>
            <a href="#account-opening-balances" onClick={() => onOpenWindow("Account Opening Balances")}>Account Opening Balances</a>
            {/* Add other dropdown items here */}
          </div>
        </div>
        <div className="dropdown">
          <a href="#tray">Tray</a>
          <div className="dropdown-content">
            <a href="#tray-entry" onClick={() => onOpenWindow("Tray Entry")}>Tray Entry</a>
            <a href="#tray-outstanding" onClick={() => onOpenWindow("Tray OutStanding")}>Tray OutStanding</a>
            <a href="#tray-list" onClick={() => onOpenWindow("Tray List")}>Tray List</a>
            <a href="#tray-ledger" onClick={() => onOpenWindow("Tray Ledger")}>Tray Ledger</a>
            <a href="#tray-bill-2" onClick={() => onOpenWindow("Tray Bill - 2")}>Tray Bill - 2</a>
            <a href="#tray-bill" onClick={() => onOpenWindow("Tray Bill")}>Tray Bill</a>
            <a href="#tray-op-bal" onClick={() => onOpenWindow("Tray Op. Bal")}>Tray Op. Bal</a>
            {/* Add other dropdown items here */}
          </div>
        </div>
        <div className="dropdown">
          <a href="#final-reports">Final Reports</a>
          <div className="dropdown-content">
            <a href="#trailbal" onClick={() => onOpenWindow("TrailBal")}>TrailBal</a>
            <a href="#ledger-all" onClick={() => onOpenWindow("Ledger All")}>Ledger All</a>
            <a href="#daybook" onClick={() => onOpenWindow("Daybook")}>Daybook</a>
            <a href="#trading-account" onClick={() => onOpenWindow("Trading Account")}>Trading Account</a>
            <a href="#profit-loss" onClick={() => onOpenWindow("Profit & Loss")}>Profit & Loss</a>
            <a href="#balance-sheet" onClick={() => onOpenWindow("Balance Sheet")}>Balance Sheet</a>
            <a href="#balance-sheet-detail" onClick={() => onOpenWindow("Balance Sheet (Detail)")}>Balance Sheet (Detail)</a>
            {/* Add other dropdown items here */}
          </div>
        </div>
        <div className="dropdown">
          <a href="#settings">Settings</a>
          <div className="dropdown-content">
            <a href="#options" onClick={() => onOpenWindow("Options")}>Options</a>
            <a href="#change-password" onClick={() => onOpenWindow("Change Password")}>Change Password</a>
            <a href="#change-code" onClick={() => onOpenWindow("Change Code")}>Change Code</a>
            <a href="#unused-accounts" onClick={() => onOpenWindow("UnUsed Accounts")}>UnUsed Accounts</a>
            <a href="#new-data" onClick={() => onOpenWindow("New Data")}>New Data</a>
            <a href="#old-data" onClick={() => onOpenWindow("Old Data")}>Old Data</a>
            {/* Add other dropdown items here */}
          </div>
        </div>
        <div className="dropdown">
          <a href="#util">Util</a>
          <div className="dropdown-content">
            <a href="#backup" onClick={() => onOpenWindow("Backup")}>Backup</a>
            <a href="#daybook-update" onClick={() => onOpenWindow("DayBook Update")}>DayBook Update</a>
            {/* Add other dropdown items here */}
          </div>
        </div>

        {/* Other dropdowns */}
      </div>
    );
  };
  
  export default Navbar;