
Contact List Manager

This is a Contact List Manager web application built with Node.js, React, Express.js, and MongoDB. It allows users to manage contacts by adding new ones, viewing them in a list, searching by name or email, and deleting them if necessary.

Features

Add Contacts: Users can add new contacts by providing a name and email.
View Contacts: A list of all contacts is displayed.
Search Contacts: Users can search contacts by name or email.
Delete Contacts: Users can delete contacts from the list.
Error Handling: Provides feedback if any fields are missing or if the contact already exists.
Tech Stack

Back-End: Node.js with Express.js
Database: MongoDB (using Mongoose ORM)
Front-End: React.js
CSS: Custom styles for user interface


Steps to Set Up the Project
1. Clone the Repository

Clone the repository from GitHub to your local machine:

git clone <repository-url>
cd contact-list-manager
2. Set Up the Back-End (Node.js, Express, MongoDB)

Navigate to the api folder:
cd api
Install the required dependencies:
npm install
Create a .env file in the api folder with the following content:
MONGO=mongodb://localhost:27017/contact-list-manager
You can replace the MongoDB URL with your cloud MongoDB URL if using MongoDB Atlas.

Start the server:
npm start
The server should now be running on http://localhost:3000.

3. Set Up the Front-End (React)

Navigate to the client folder:
cd client
Install the required dependencies:
npm install
Start the React development server:
npm run dev
The front-end should now be running on http://localhost:5173.

Application Functionality

ContactForm Component
Fields: Users can add a new contact by filling in the name and email.
Validation: It checks if both fields are provided and handles errors if not.
API Call: Upon form submission, the new contact is added to the MongoDB database via a POST request to the server.
ContactList Component
Displays a list of all contacts fetched from the server.
Each contact shows the name and email.
Search: Users can search contacts by name or email.
Delete: Users can delete a contact by clicking the delete button next to the contact.
Server (Express.js)
The back-end uses Express.js to handle requests from the front-end.
POST /contacts: Adds a new contact to the database.
GET /contacts: Fetches all contacts from the database and returns them.
DELETE /contacts/:id: Deletes a contact based on its ID.
MongoDB
MongoDB is used to store the contact data. It allows for efficient searching, adding, and deleting of contacts.
Pending Features

Scrollbar in Contact List: The contact list will soon include a scrollbar for better navigation when there are many contacts.
Styling: Additional styles can be applied for an even more polished user interface.


Future Enhancements

Implement pagination for large contact lists.
Add user authentication for saving and managing contacts securely.
Unit tests for key parts of the codebase (API routes, contact form submission, etc.).