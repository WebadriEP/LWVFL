require("dotenv").config();

const memberRoutes = require('./routes/members')
const userRoutes = require('./routes/users')
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // Pass the request to the next middleware
});

// Routes
app.use('/api/members', memberRoutes)
app.use('/api/user', userRoutes)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Connect to DB
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })

  // Catch any errors that occur and output message to console
  .catch((error) => {
    console.log(error);
  });

  