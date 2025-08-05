import { useState, useEffect } from "react";
import {
  BarChart3,
  Trash2,
  Calendar,
  FileText,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart,
  ChevronRight,
  Loader2,
  FileSpreadsheet,
} from "lucide-react";

const ChartIcon = ({ chartType }) => {
  switch (chartType) {
    case "Bar":
      return <BarChart3 className="w-5 h-5 text-blue-400" />;
    case "Line":
      return <LineChart className="w-5 h-5 text-purple-400" />;
    case "Pie":
      return <PieChart className="w-5 h-5 text-green-400" />;
    case "Scatter":
      return <ScatterChart className="w-5 h-5 text-yellow-400" />;
    case "Area":
      return <AreaChart className="w-5 h-5 text-red-400" />;
    default:
      return <BarChart3 className="w-5 h-5 text-gray-400" />;
  }
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "History | InsightXL";
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Please log in to view your history.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://insightxl-server.onrender.com/analysis/history",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setHistory(data.history);
      } else {
        setError(data.error || "Failed to fetch history.");
      }
    } catch (err) {
      setError("An error occurred while fetching history.");
      console.error("Fetch history error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("You must be logged in to delete this analysis.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this analysis?")) {
      try {
        const response = await fetch(
          `https://insightxl-server.onrender.com/analysis/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setHistory(history.filter((item) => item._id !== id));
        } else {
          alert("Failed to delete analysis: " + result.error);
        }
      } catch (error) {
        console.error("Error deleting analysis:", error);
        alert("An error occurred while deleting the analysis.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mb-4">
            <FileSpreadsheet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Analysis History
          </h1>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Review and manage your past data analyses and visualizations
          </p>
        </div>

        {/* Content */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-4" />
              <p className="text-gray-400">Loading your analysis history...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center justify-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <BarChart3 className="w-12 h-12 text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No analyses found
              </h3>
              <p className="text-gray-500 text-sm max-w-md text-center">
                You haven't created any analyses yet. Start by uploading a file
                to generate your first visualization.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={item._id}
                  className="group bg-gray-800/70 hover:bg-gray-800/90 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 rounded-xl p-5 flex items-center justify-between transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-center space-x-4 flex-grow min-w-0">
                    <div
                      className={`p-3 rounded-xl ${
                        item.chartType === "Bar"
                          ? "bg-blue-500/10"
                          : item.chartType === "Line"
                          ? "bg-purple-500/10"
                          : item.chartType === "Pie"
                          ? "bg-green-500/10"
                          : item.chartType === "Scatter"
                          ? "bg-yellow-500/10"
                          : item.chartType === "Area"
                          ? "bg-red-500/10"
                          : "bg-gray-600/10"
                      }`}
                    >
                      <ChartIcon chartType={item.chartType} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h2
                        className="text-md font-semibold text-white truncate"
                        title={item.filename}
                      >
                        {item.filename}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 mt-1">
                        <div className="flex items-center space-x-1.5">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              item.chartType === "Bar"
                                ? "bg-blue-400"
                                : item.chartType === "Line"
                                ? "bg-purple-400"
                                : item.chartType === "Pie"
                                ? "bg-green-400"
                                : item.chartType === "Scatter"
                                ? "bg-yellow-400"
                                : item.chartType === "Area"
                                ? "bg-red-400"
                                : "bg-gray-400"
                            }`}
                          ></span>
                          <span>{item.chartType} Chart</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <FileText className="w-3 h-3 text-gray-400" />
                          <span>{item.excelData?.data?.length || 0} rows</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-700/50 group-hover:opacity-100 opacity-0"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-700/50">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
