require("dotenv").config();

const path = require("path");
const express = require("express");
const getStudentNumber = require("./api/ocr");
const app = express();
const port = process.env.SERVER_PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const { getUnits, getAssessment } = require("./api/qut");
const getNews = require("./api/news");

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
    res.json({ number: `N${number}` });
  }
});

app.post("/api/Units", async (req, res) => {
  const { studentNumber, password } = req.body;
  try {
    const units = (await getUnits(studentNumber, password)) || [];
    res.json({ units });
  } catch (err) {
    console.log(err);
    res.json({ units: [], error: "Incorrect username or password." });
  }
});

// Find this student's all the assessments
app.post("/api/Assessments", async (req, res) => {
  const { studentNumber, password } = req.body;
  console.log({ studentNumber, password });
  let units;
  try {
    units = await getUnits(studentNumber, password);
  } catch (error) {
    res.json({ error: "Incorrect username or password." });
    return;
  }
  try {
    const data = await Promise.all(
      units.map(async (unit) => {
        const { unitCode } = unit;
        return { unit, assessments: await getAssessment(unitCode) };
      })
    );
    res.json({ data });
  } catch (_) {
    res.json({ error: "Something went wrong" });
  }
});

app.get("/api/News", (req, res) => {
  const unitName = req.query.unitName || "Cloud Computing";
  getNews(unitName)
    .then((news) => res.json({ news }))
    .catch((error) => {
      console.log(error);
      res.json({ error: "Unable to find news!" });
    });
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
