require("dotenv").config();

const path = require("path");
const express = require("express");
const getStudentNumber = require("./ocr");
const app = express();
const port = process.env.SERVER_PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const getUnits = require("./qut");
app.use(cors());
app.use(express.json({ limit: "50mb" })); // <==== parse request body as JSON
app.use(morgan("tiny"));

// What's your favorite animal?
app.get("/api/question", (req, res) => {
  res.json({ answer: "Llama" });
});

// New api routes should be added here.
// It's important for them to be before the `app.use()` call below as that will match all routes.
// POST method can carry more data
app.post("/api/GetStudentNumber", async (req, res) => {
  const number = await getStudentNumber(req.body.ImageBase64);
  if (number === -1) {
    res.json({
      number: "",
      error: "Cannot find the student number, Please retry.",
    });
  } else {
    res.json({ number });
  }
});
app.get("/api/GetUnits", async (req, res) => {
  try {
    const units = (await getUnits()) || [];
    res.json({ units });
  } catch (err) {
    console.log("Error occured in finding units");
    console.log(err);
    res.json({ units: [] });
  }
});
// Serve out any static assets correctly
app.use(express.static("../client/build"));
// Any routes that don't match on our static assets or api should be sent to the React Application
// This allows for the use of things like React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
