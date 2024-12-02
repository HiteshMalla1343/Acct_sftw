// // src/Navbar.js
// import React from 'react';
// import '../css/Navbar.css';

// function Navbar() {
//   return (
//     <div className="navbar">
//       {/* Master link with dropdown */}
//       <div className="dropdown">
//         <a href="#master">Master</a>
//         <div className="dropdown-content">
//           <a href="#master-option1">Account</a>
//           <a href="#master-option2">Product</a>
//           <a href="#master-option3">Schedules</a>
//           <a href="#master-option4">Customer List</a>
//           <a href="#master-option5">Product List</a>
//           <a href="#master-option6">Schedule List</a>
//           <a href="#master-option7">Logout</a>
//           <a href="#master-option8">Exit</a>
//         </div>
//       </div>

//       {/* Inventory link with dropdown */}
//       <div className="dropdown">
//         <a href="#inventory">Inventory</a>
//         <div className="dropdown-content">
//           <a href="#inventory-option1">Stock Entry</a>
//           <a href="#inventory-option2">Purchase</a>
//           <a href="#inventory-option3">Sales</a>
//           <a href="#inventory-option4">Digumathi</a>
//           <a href="#inventory-option5">Sale Patty</a>
//           <a href="#inventory-option6">Salepatty List</a>
//           <a href="#inventory-option7">Salepatty Expenses</a>
//           <a href="#inventory-option8">Rate Wise Report</a>
//           <a href="#inventory-option9">Patty Stock</a>
//           <a href="#inventory-option10">Sales Stock</a>
//         </div>
//       </div>

//       {/* Finance link with dropdown */}
//       <div className="dropdown">
//         <a href="#finance">Finance</a>
//         <div className="dropdown-content">
//           <a href="#finance-option1">Cash Entry</a>
//           <a href="#finance-option2">Journal</a>
//           <a href="#finance-option3">Bank Entry</a>
//         </div>
//       </div>

//       {/* Reports link with dropdown */}
//       <div className="dropdown">
//           <a href="#reports">Reports</a>
//           <div className="dropdown-content">
//             <a href="#reports-option1">Ledger</a>
//             <a href="#reports-option2">Outstanding</a>
//             <a href="#reports-option3">Bill Print - 2</a>
//             <a href="#reports-option4">Vasool List</a>
//             <a href="#reports-option5">Cash List</a>
//             <a href="#reports-option6">Sales List</a>
//             <a href="#reports-option7">Purchase List</a>
//             <a href="#reports-option8">Journal List</a>
//             <a href="#reports-option9">Bank List</a>
//             <a href="#reports-option10">Stock Entry Report</a>
//             <a href="#reports-option11">Total Ledger</a>
//             <a href="#reports-option12">Customer Status</a>
//             <a href="#reports-option13">Stock Wise Report</a>
//             <a href="#reports-option14">Day Wise Report</a>
//             <a href="#reports-option15">Difference Quantity</a>
//             <a href="#reports-option16">Difference Amount</a>
//             <a href="#reports-option17">Bill Print</a>
//             <a href="#reports-option18">Account Opening Balances</a>

//           </div>
//         </div>

//         {/* Tray link with dropdown */}
//         <div className="dropdown">
//           <a href="#tray">Tray</a>
//           <div className="dropdown-content">
//             <a href="#tray-option1">Tray Entry</a>
//             <a href="#tray-option2">Tray OutStanding</a>
//             <a href="#tray-option3">Tray List</a>
//             <a href="#tray-option4">Tray Ledger</a>
//             <a href="#tray-option5">Tray Bill - 2</a>
//             <a href="#tray-option6">Tray Bill</a>
//             <a href="#tray-option7">Tray Op. Bal</a>
//           </div>
//         </div>

//         {/* Final Reports link with dropdown */}
//         <div className="dropdown">
//           <a href="#final-reports">Final Reports</a>
//           <div className="dropdown-content">
//             <a href="#final-reports-option1">TrailBal</a>
//             <a href="#final-reports-option2">Ledger All</a>
//             <a href="#final-reports-option3">Daybook</a>
//             <a href="#final-reports-option4">Trading Account</a>
//             <a href="#final-reports-option5">Profit & Loss</a>
//             <a href="#final-reports-option6">Balance Sheet</a>
//             <a href="#final-reports-option7">Balance Sheet (Detail)</a>
//           </div>
//         </div>

//         {/* Settings link with dropdown */}
//         <div className="dropdown">
//           <a href="#settings">Settings</a>
//           <div className="dropdown-content">
//             <a href="#settings-option1">Options</a>
//             <a href="#settings-option2">Change Password</a>
//             <a href="#settings-option3">Change Code</a>
//             <a href="#settings-option4">UnUsed Accounts</a>
//             <a href="#settings-option5">New Data</a>
//             <a href="#settings-option6">Old Data</a>
//           </div>
//         </div>

//         {/* Util link with dropdown */}
//         <div className="dropdown">
//           <a href="#util">Util</a>
//           <div className="dropdown-content">
//             <a href="#util-option1">Backup</a>
//             <a href="#util-option2">DayBook Update</a>
//           </div>
//         </div>
//       </div>
//   );
// }

// export default Navbar;

// src/Navbar.js
import React from 'react';
import '../css/Navbar.css';

// const Navbar = ({ onOpenWindow }) => {
//   return (
//     <div className="navbar">
//       {/* Master link with dropdown */}
//       <div className="dropdown">
//         <a href="#master">Master</a>
//         <div className="dropdown-content">
//           <a href="#master-option1" onClick={() => onOpenWindow('Account', <div>Account Table Content</div>)}>Account</a>
//           <a href="#master-option2" onClick={() => onOpenWindow('Product', <div>Product Table Content</div>)}>Product</a>
//           <a href="#master-option3" onClick={() => onOpenWindow('Schedules', <div>Schedules Table Content</div>)}>Schedules</a>
//           <a href="#master-option4" onClick={() => onOpenWindow('Customer List', <div>Customer List Content</div>)}>Customer List</a>
//           <a href="#master-option5" onClick={() => onOpenWindow('Product List', <div>Product List Content</div>)}>Product List</a>
//           <a href="#master-option6" onClick={() => onOpenWindow('Schedule List', <div>Schedule List Content</div>)}>Schedule List</a>
//           <a href="#master-option7" onClick={() => onOpenWindow('Logout', <div>Logging out...</div>)}>Logout</a>
//           <a href="#master-option8" onClick={() => onOpenWindow('Exit', <div>Exiting...</div>)}>Exit</a>
//         </div>
//       </div>

//       {/* Inventory link with dropdown */}
//       <div className="dropdown">
//         <a href="#inventory">Inventory</a>
//         <div className="dropdown-content">
//           <a href="#inventory-option1" onClick={() => onOpenWindow('Stock Entry', <div>Stock Entry Table Content</div>)}>Stock Entry</a>
//           <a href="#inventory-option2" onClick={() => onOpenWindow('Purchase', <div>Purchase Table Content</div>)}>Purchase</a>
//           <a href="#inventory-option3" onClick={() => onOpenWindow('Sales', <div>Sales Table Content</div>)}>Sales</a>


//           {/* Add more options as needed */}
//         </div>
//       </div>

//       {/* Finance link with dropdown */}
//       <div className="dropdown">
//         <a href="#finance">Finance</a>
//         <div className="dropdown-content">
//           <a href="#finance-option1" onClick={() => onOpenWindow('Cash Entry', <div>Cash Entry Content</div>)}>Cash Entry</a>
//           <a href="#finance-option2" onClick={() => onOpenWindow('Journal', <div>Journal Content</div>)}>Journal</a>
//           <a href="#finance-option3" onClick={() => onOpenWindow('Bank Entry', <div>Bank Entry Content</div>)}>Bank Entry</a>
//         </div>
//       </div>

//       {/* Reports link with dropdown */}
//       <div className="dropdown">
//         <a href="#reports">Reports</a>
//         <div className="dropdown-content">
//           <a href="#reports-option1" onClick={() => onOpenWindow('Ledger', <div>Ledger Report Content</div>)}>Ledger</a>
//           <a href="#reports-option2" onClick={() => onOpenWindow('Outstanding', <div>Outstanding Report Content</div>)}>Outstanding</a>
//           {/* Add more options as needed */}
//         </div>
//       </div>

//       {/* Tray link with dropdown */}
//       <div className="dropdown">
//         <a href="#tray">Tray</a>
//         <div className="dropdown-content">
//           <a href="#tray-option1" onClick={() => onOpenWindow('Tray Entry', <div>Tray Entry Content</div>)}>Tray Entry</a>
//           <a href="#tray-option2" onClick={() => onOpenWindow('Tray Outstanding', <div>Tray Outstanding Content</div>)}>Tray Outstanding</a>
//           {/* Add more options as needed */}
//         </div>
//       </div>

//       {/* Final Reports link with dropdown */}
//       <div className="dropdown">
//         <a href="#final-reports">Final Reports</a>
//         <div className="dropdown-content">
//           <a href="#final-reports-option1" onClick={() => onOpenWindow('Trail Balance', <div>Trail Balance Content</div>)}>Trail Balance</a>
//           <a href="#final-reports-option2" onClick={() => onOpenWindow('Ledger All', <div>Ledger All Content</div>)}>Ledger All</a>
//           {/* Add more options as needed */}
//         </div>
//       </div>

//       {/* Settings link with dropdown */}
//       <div className="dropdown">
//         <a href="#settings">Settings</a>
//         <div className="dropdown-content">
//           <a href="#settings-option1" onClick={() => onOpenWindow('Options', <div>Settings Options Content</div>)}>Options</a>
//           <a href="#settings-option2" onClick={() => onOpenWindow('Change Password', <div>Change Password Content</div>)}>Change Password</a>
//           {/* Add more options as needed */}
//         </div>
//       </div>

//       {/* Util link with dropdown */}
//       <div className="dropdown">
//         <a href="#util">Util</a>
//         <div className="dropdown-content">
//           <a href="#util-option1" onClick={() => onOpenWindow('Backup', <div>Backup Utility</div>)}>Backup</a>
//           <a href="#util-option2" onClick={() => onOpenWindow('DayBook Update', <div>DayBook Update Utility</div>)}>DayBook Update</a>
//         </div>
//       </div>
//     </div>
//   );
// };



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