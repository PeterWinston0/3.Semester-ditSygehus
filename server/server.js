const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const path = require("path");
const session = require("express-session"); // Add session middleware

const app = express();

require("dotenv-flow").config();

// Parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'server/uploads' directory
app.use("/uploads", express.static("../client/uploads"));

// Connect to MongoDB
mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Configure sessions
app.use(
  session({
    secret: "secret", // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in a production environment with HTTPS
  })
);

// CORS setup
app.use(cors());

// Welcome Route
app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to the REST API mitSygehus" });
});

// API Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const hospitalRoutes = require("./routes/hospital");
const departmentRoutes = require("./routes/department");
const sectionsRoutes = require("./routes/sections");
const articleRoutes = require("./routes/article");
const waitingRoutes = require("./routes/waitingroom");

app.use("/api/user", authRoutes.router);
app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/hospitals", departmentRoutes);
app.use("/api/hospitals", sectionsRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/waitingroom", waitingRoutes);

// Swagger setup
const swaggerDefinition = yaml.load("./swagger.yaml");
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html')); // Adjust the path as needed
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;