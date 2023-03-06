require("dotenv").config()
require("dotenv").config()

const memberRoutes = require("./routes/members")
const userRoutes = require("./routes/users")
const donorRoutes = require("./routes/donors")
const donationRoutes = require("./routes/donations")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

// Initialize express
const app = express()
const app = express()

// Middleware
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
// Default page
app.get("/", (req, res) => {
  res.send("Welcome to the DontraCRM API")
})

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next() // Pass the request to the next middleware
})
  console.log(req.path, req.method)
  next() // Pass the request to the next middleware
})

// Routes
app.use('/api/members', memberRoutes)
app.use('/api/users', userRoutes)
app.use('/api/donors', donorRoutes)
app.use('/api/donations', donationRoutes)
app.use("/api/members", memberRoutes)
app.use("/api/user", userRoutes)
app.use("/api/users", userRoutes)
app.use("/api/donors", donorRoutes)
app.use("/api/donations", donationRoutes)

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static(path.join(__dirname, "frontend/build")))

//   app.get("/", function(req, res) {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   })
// }

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })

  // Catch any errors that occur and output message to console
  .catch((error) => {
    console.log(error)
  })

    console.log(error)
  })
