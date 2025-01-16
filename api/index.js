import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
mongoose.connect(process.env.MONGO)

.then(()=>{
    console.log("MongoDB is Connected")
})
.catch((err)=>{
    console.log(err);
})


const app=express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only from this domain
    methods: ['GET', 'POST', 'DELETE'],
  }));

app.listen(3000,()=>{
    console.log("Server is running on 3000");
});
//Route to add a new contact
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

  //Fetch contacts or search
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
  
      res.status(200).send(contacts); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  });