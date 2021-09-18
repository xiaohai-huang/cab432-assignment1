const express = require("express");
const router = express.Router();

const getNews = require("../api/news");
const getStudentNumber = require("../api/ocr");
const { getUnits, getAssessment } = require("../api/qut");

// POST method can carry more data
// Use OCR to extract student number
router.post("/GetStudentNumber", async (req, res) => {
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

router.post("/Units", async (req, res) => {
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
router.post("/Assessments", async (req, res) => {
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

// Find breaking news about a query
router.get("/News", (req, res) => {
  const unitName = req.query.unitName || "Cloud Computing";
  getNews(unitName)
    .then((news) => res.json({ news }))
    .catch((error) => {
      console.log(error);
      res.json({ error: "Unable to find news!" });
    });
});

module.exports = router;
