require("dotenv").config();

const memberRoutes = require('./routes/members')

const express = require("express");

const mongoose = require("mongoose");

// Initialize express
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // Pass the request to the next middleware
});

// Routes
app.use('/api/members', memberRoutes)

// Use mongoose to connect to the database (MongoDB)

  // Connect to given URI (stored in .env for security)
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests on specified port
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  // Catch any errors that occur and output message to console
  .catch((error) => {
    console.log(error);
  });