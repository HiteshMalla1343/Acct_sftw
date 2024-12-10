// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/CustomerList.css";
// import { useGlobalState } from '../context/GlobalState'; // Import the custom hook
// const CustomerList = ({trigger}) => {
//   const options=['happy','sad']
//   const { fetchAccounts, accounts} = useGlobalState(); // Access the global state and functions
//   const [formData, setFormData] = useState(null); // Form data for editing
  
//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   // Function to handle form submission to update an account
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const { code, name, phone, city, credit, debit, schedule_id } = formData;
//     try {
//       await axios.put(`http://localhost:8000/accounts/${code}`, {
//         name,
//         phone,
//         city,
//         credit,
//         debit,
//         schedule_id
//       });
//       setFormData(null); // Reset form after submission
//       fetchAccounts(); // Fetch updated accounts
//     } catch (error) {
//       console.error('Error updating account:', error);
//     }
//   };

//   // Function to handle form submission to delete an account

//   const handleDelete = async (code) => {
//     try {
//       await axios.delete(`http://localhost:8000/accounts/${code}`);
//       fetchAccounts(); // Fetch updated accounts
//     } catch (error) {
//       console.error('Error deleting account:', error);
//     }
//   };
//   console.log("idiot")
//   console.log(accounts)
//   return (
//     <div className="customerlist bold-text">
//       {/* Form Section for Editing */}
//       {formData &&  (<div className="form-container">
//         {/* Left Section: Labels */}
//         <div className="form-labels">
//           <label>Code</label>
//           <label>Name</label>
//           <label>Telugu Name</label>
//           <label>Schedule</label>
          
//         </div>

//         {/* Right Section: Inputs */}
//         <div className="form-inputs">
//           <input type="text" className="input code" />
//           <input type="text" className="input name-phone-city" />
//           <input type="text" className="input name-phone-city" />
//           <select className="input schedule">
//             {options.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>)}

//       {/* Table Section */}
//       <div className="table-section">
//         <div className="table-container">
//           <table className="custom-table">
//             <thead>
//               <tr>
//                 <th>Code</th>
//                 <th>Account Name</th>
//                 <th>Town</th>
//                 <th>Schedule</th>
//                 <th>Update</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {accounts.map((customer, index) => (
//                 <tr key={index}>
//                   <td>{customer.code}</td>
//                   <td>{customer.name}</td>
//                   <td>{customer.town}</td>
//                   <td>{customer.schedule_name}</td>
//                   <td>
//                     <button onClick={() => handleUpdate(customer)}>Update</button>
//                   </td>
//                   <td>
//                     <button onClick={() => handleDelete(customer.code)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CustomerList.css";
import { useGlobalState } from '../context/GlobalState'; // Import the custom hook

const CustomerList = () => {
  const { fetchAccounts, accounts } = useGlobalState(); // Access the global state and functions

  useEffect(() => {
    fetchAccounts(); // Fetch accounts when the component is mounted
  }, []);

  // Function to handle the deletion of an account
  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:8000/accounts/${code}`);
      fetchAccounts(); // Fetch updated accounts after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  console.log('idiot');
  console.log(accounts);
  return (
    <div className="customerlist bold-text">
      {/* Table Section for Displaying Accounts */}
      <div className="table-section">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Account Name</th>
                <th>City</th>
                <th>Schedule</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.code}</td>
                  <td>{customer.name}</td>
                  <td>{customer.city}</td> {/* Correct field */}
                  <td>{customer.schedule_name}</td>
                  <td>
                    <button onClick={() => handleDelete(customer._id)}>Delete</button>
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

export default CustomerList;

