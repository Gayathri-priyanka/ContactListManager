import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';



const App = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Contact List Manager</h1>
      <ContactForm fetchContacts={fetchContacts} />
    </div>
  );
};

export default App;
