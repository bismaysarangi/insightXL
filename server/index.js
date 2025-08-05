const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const AnalysisRouter = require("./Routes/AnalysisRouter");
require("dotenv").config();
require("./Models/db");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use("/auth", AuthRouter);
app.use("/analysis", AnalysisRouter);

app.use((req, res, next) => {
  if (req.path.startsWith('/auth') || req.path.startsWith('/analysis')) {
    return res.status(404).json({ error: 'API endpoint not found', success: false });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
