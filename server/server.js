const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");

const app = express();

require("dotenv-flow").config();

// Parse JSON requests
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const hospitalRoutes = require("./routes/hospital");

// Connect to MongoDB
mongoose.connect(process.env.DBHOST, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// CORS setup
app.use(cors());

// Welcome Route
app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to the REST API mitSygehus" });
});

// API Routes
app.use("/api/user", authRoutes.router);
app.use("/api/hospitals", hospitalRoutes);


// Swagger setup
const swaggerDefinition = yaml.load("./swagger.yaml");
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDefinition));

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