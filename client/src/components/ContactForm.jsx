import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ fetchContacts }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before submitting

    if (!name || !email) {
      setError('Both fields are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3000/contacts', { name, email });

      // Refresh the contacts list after a successful contact addition
      fetchContacts();

      // Clear the form
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding contact:', error);
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong. Please try again later.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter name"
            className="input-field"
            aria-label="Enter contact name"
            required
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
            aria-label="Enter contact email"
            required
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
