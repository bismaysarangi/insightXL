// Your existing index.js should have something like this:
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const AnalysisRouter = require("./Routes/AnalysisRouter"); // Import the new router
require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/analysis", AnalysisRouter); // Use the new router

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});