const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app"); // now this already includes CORS + routes

// ✅ Database connection
mongoose.connect(process.env.URI).then(() => {
  console.log("Database connection is successful 🛢".magenta.bold);
});

// ✅ Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

// ✅ Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`.red.bold);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});
