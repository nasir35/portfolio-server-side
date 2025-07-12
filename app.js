const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS middleware: Must come before routes
app.use(
  cors({
    origin: "*", // or "*" for public APIs
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ API routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/about", require("./routes/about.routes"));
app.use("/api/services", require("./routes/service.routes"));
app.use("/api/reviews", require("./routes/review.routes"));
app.use("/api/displayList", require("./routes/displayList.routes"));
app.use("/api/upload", require("./routes/upload.routes")); // this must come after cors!

// ✅ Export app for use in server.js
module.exports = app;
