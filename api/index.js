import express from 'express';
import mongoose from 'mern-estate';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
mongoose.connect('mongodb://localhost:27017/mern-estate', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();
  
  
const app = express();


app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/mern_estate';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Start your server or do other operations here
  })
  .catch(err => console.log(err));

// Example schema and model definition (if using Mongoose)
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
  name: String,
  age: Number
});
const ExampleModel = mongoose.model('Example', exampleSchema);

// Example usage of the model
ExampleModel.find().then(docs => console.log(docs)).catch(err => console.error(err));

