require("dotenv").config();

const express = require("express");
const os = require('os');
const cors = require("cors");
const app = express();
const totalCPUS = os.cpus().length;
console.log(totalCPUS);

// Middleware for parsing request bodies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const userrouter = require("./useRouter");
app.use("/apis", userrouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(process.env.APP_PORT, () => {
  console.log("Server is listening at http://localhost:", process.env.APP_PORT);
});

module.exports = app;