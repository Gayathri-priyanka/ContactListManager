import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showContacts, setShowContacts] = useState(false); 

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/contacts', {
        params: { query: searchQuery }, 
      });
      setContacts(response.data); 
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false); 
    }
  };

 
  const handleViewContacts = () => {
    setShowContacts(true); 
    fetchContacts(); 
  };

  // Function to handle the "Close" button click
  const handleCloseContacts = () => {
    setShowContacts(false); // Hide the contacts list
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search button click
  const handleSearch = () => {
    fetchContacts(); 
  };

  return (
    <div>
      <button onClick={handleViewContacts} className="view-button">
        View Contacts
      </button>
      {showContacts && (
        <div className="contacts-container">
          <h2>Contact List</h2>

          <button onClick={handleCloseContacts} className="close-button">
            Close
          </button>

          <div className="search-section">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange} 
              placeholder="Search contacts by name or email"
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>

          {isLoading && <p>Loading...</p>}

          {contacts.length === 0 && !isLoading ? (
            <p>No contacts available</p>
          ) : (
            <ul>
              {contacts.map((contact) => (
                <li key={contact._id}>
                  <strong>{contact.name}</strong> - {contact.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactList;
