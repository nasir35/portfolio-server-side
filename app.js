const express = require('express');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/about", require("./routes/about.routes"));
app.use("/api/services", require("./routes/service.routes"));
app.use("/api/reviews", require("./routes/review.routes"));
app.use("/api/displayList", require("./routes/displayList.routes"));
app.use("/api/upload", require("./routes/upload.routes"));

// Export the app for server.js
module.exports = app;