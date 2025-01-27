import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './styles/global.css'; 


const App = () => {
  const [contacts, setContacts] = useState([]);


  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Contact List Manager</h1>
      <ContactForm fetchContacts={fetchContacts} />
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
