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

  const handleCloseContacts = () => {
    setShowContacts(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    fetchContacts();
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container">
      {!showContacts && (
        <button onClick={handleViewContacts} className="view-button">
          View Contacts
        </button>
      )}

      {showContacts && (
        <div className="contacts-container">
        <button onClick={handleCloseContacts} className="close-button">X</button>
          <h2>Contact List</h2>

          <button onClick={handleCloseContacts} className="close-button">
            &times;
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

          {isLoading && <p className="loading">Loading...</p>}

          {contacts.length === 0 && !isLoading ? (
            <p className="no-contacts">No contacts available</p>
          ) : (
            <div className="contacts-list">
              {contacts.map((contact) => (
                <div key={contact._id} className="contact-card">
                  <div>
                    <strong>{contact.name}</strong>
                    <br />
                    <span>{contact.email}</span>
                  </div>
                  <div className="actions">
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteContact(contact._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactList;
