const router = require("express").Router();
const { saveAnalysis, getHistory, deleteAnalysis } = require("../Controllers/AnalysisController");
const ensureAuthenticated = require("../Middlewares/Auth");

router.post("/save", ensureAuthenticated, saveAnalysis);
router.get("/history", ensureAuthenticated, getHistory);
router.delete("/:id", ensureAuthenticated, deleteAnalysis);

module.exports = router;