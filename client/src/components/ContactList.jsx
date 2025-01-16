import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch contacts from the server
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

  

  return (
    <div>
      {/* Button to view contacts */}
      <button onClick={handleViewContacts} className="view-button">
        View Contacts
      </button>

      {showContacts && (
        <div className="contacts-container">
          <h2>Contact List</h2>




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
