import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ onContactAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out both fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3000/contacts', {
        name,
        email,
      });

      onContactAdded(response.data);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter name"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            className="input-field"
          />
        </div>
        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
