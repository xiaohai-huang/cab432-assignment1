require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");

const apiRouter = require("./routes/api.routes");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("tiny"));

app.use("/api", apiRouter);

// Serve out any static assets correctly
app.use(express.static("../client/build"));
// Any routes that don't match on our static assets or api should be sent to the React Application
// This allows for the use of things like React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`QUT Study Helper listening at http://localhost:${port}`);
});
