import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contact from './models/Contact.js'; 
import cors from 'cors';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'DELETE'],
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
  

// Route to Add a new contact
app.post('/contacts', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send("Name and Email are required.");
    }
    const newContact = new Contact({ name, email });
    await newContact.save();
    res.status(201).send(newContact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/contacts', async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, 'i');  

    const contacts = await Contact.find({
      $or: [
        { name: { $regex: regex } },
        { email: { $regex: regex } }
      ]
    });

    res.status(200).send(contacts); // Respond with the contacts
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Delete a contact

app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params; 
  
    
    Contact.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json({ message: 'Contact deleted successfully' });
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Failed to delete contact', error });
      });
  });
  
  





app.post('/contacts', async (req, res) => {
    try {
      const { name, email } = req.body;
  
    
      if (!name || !email) {
        return res.status(400).send("Name and Email are required.");
      }
  
      const existingContact = await Contact.findOne({ email });
      if (existingContact) {
        return res.status(409).json({ message: "A contact with this email already exists." });
      }
  
      const newContact = new Contact({ name, email });
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  