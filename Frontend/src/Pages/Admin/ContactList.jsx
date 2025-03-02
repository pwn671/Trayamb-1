// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAllContacts, updateContactStatus } from '../../services/contactService';

// const ContactList = () => {
//   const navigate = useNavigate();
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => fetchContacts(), []);

//   useEffect(() => {
//     console.log('Current contacts state:', contacts);
//   }, [contacts]);

//   const fetchContacts = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllContacts();
//       console.log('Full API Response:', response);

//       // Determine the correct way to extract contacts
//       const contactData = response.data || response;
//       console.log('Extracted Contact Data:', contactData);

//       // Ensure contactData is an array
//       const contactList = Array.isArray(contactData) ? contactData :
//         (contactData.data ? contactData.data :
//         (contactData.contacts ? contactData.contacts : []));

//       console.log('Processed Contact List:', contactList);

//       setContacts(contactList);
//       setLoading(false);
//     } catch (err) {
//       console.error('Detailed Fetch Contacts Error:', err);
//       setError(`Failed to fetch contacts: ${err.message}`);
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (contactId, newStatus) => {
//     await updateContactStatus(contactId, newStatus);
//     fetchContacts();
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>Contact Submissions</h2>
//       <p>Total Contacts: {contacts.length}</p>
//       {contacts.length === 0 ? (
//         <p>No contacts found. Debug info: {JSON.stringify(contacts)}</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contacts.map((contact, index) => {
//               console.log(`Contact ${index}:`, contact);
//               return (
//                 <tr key={contact._id || index}>
//                   <td>{contact.name || 'N/A'}</td>
//                   <td>{contact.email || 'N/A'}</td>
//                   <td>{contact.phone || 'N/A'}</td>
//                   <td>
//                     <select
//                       value={contact.status || 'Pending'}
//                       onChange={(e) => handleStatusChange(contact._id, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Reviewed">Reviewed</option>
//                       <option value="Resolved">Resolved</option>
//                     </select>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ContactList;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllContacts,
  updateContactStatus,
} from "../../services/contactService";

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getAllContacts();

      const contactList = response?.data || [];

      if (!Array.isArray(contactList)) {
        throw new Error("Invalid contact data format");
      }

      setContacts(contactList);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError(`Failed to fetch contacts: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await updateContactStatus(contactId, newStatus);
      fetchContacts();
    } catch (error) {
      console.error("Failed to update contact status:", error);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) => filter === "All" || contact.status === filter
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Contact Submissions
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Filter by Status:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="All">All Contacts</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {filteredContacts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-xl">No contacts found.</p>
            {filter !== "All" && (
              <button
                onClick={() => setFilter("All")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Clear Filter
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "Phone",
                    "Subject",
                    "Message",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact._id || contact.email}
                    className="hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 p-3">
                          {contact.name || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 p-3">
                        {contact.email || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 p-3">
                        {contact.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 p-3">
                        {contact.subject || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 p-3">
                        {contact.message || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${contact.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 
                          contact.status === 'Reviewed' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 
                          'bg-green-100 text-green-800 border border-green-200'}`}>
                        {contact.status || 'Pending'}
                      </span> */}

                      {contact.status === "Pending" && (
                        <span className="pending px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                          Pending
                        </span>
                      )}
                      {contact.status === "Reviewed" && (
                        <span className="reviewed px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                          Reviewed
                        </span>
                      )}
                      {contact.status === "Approved" && (
                        <span className="approved px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
                          Approved
                        </span>
                      )}
                      {contact.status === "Rejected" && (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
                          Rejected
                        </span>
                      )}
                      {contact.status === "Resolved" && (
                        <span className="resolved px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          Resolved
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={contact.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(contact._id, e.target.value)
                        }
                        className="form-select block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-right">
          <span className="text-sm text-gray-600">
            Total Contacts: {filteredContacts.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
