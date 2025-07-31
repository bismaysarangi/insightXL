const AnalysisModel = require("../Models/Analysis");

const saveAnalysis = async (req, res) => {
  try {
    const { filename, chartType, excelData } = req.body;
    const userId = req.user.id; // Extracted from JWT token by middleware

    const newAnalysis = new AnalysisModel({
      userId,
      filename,
      chartType,
      excelData,
    });

    await newAnalysis.save();

    res
      .status(201)
      .json({ message: "Analysis saved successfully", success: true });
  } catch (err) {
    console.error("Save analysis error:", err);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await AnalysisModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, history });
  } catch (err) {
    console.error("Get history error:", err);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};

const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await AnalysisModel.findOne({ _id: id, userId });

    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found or you do not have permission to delete it", success: false });
    }

    await AnalysisModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Analysis deleted successfully", success: true });
  } catch (err) {
    console.error("Delete analysis error:", err);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};


module.exports = {
  saveAnalysis,
  getHistory,
  deleteAnalysis,
};