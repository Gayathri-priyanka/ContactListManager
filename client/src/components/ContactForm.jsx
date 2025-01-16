import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Both fields are required!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/contacts', { name, email });
      setName('');
      setEmail('');
      setErrorMessage(''); 
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('A contact with this email already exists.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="input-field" 
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="input-field"
        />
        <button type="submit" className="add-button">Add Contact</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
      </form>
    </div>
  );
};

export default ContactForm;
