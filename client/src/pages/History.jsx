import { useState, useEffect } from "react";
import { BarChart3, Trash2, Calendar, FileText, PieChart, LineChart, AreaChart, ScatterChart, ChevronRight } from "lucide-react";

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
      const response = await fetch("http://localhost:3000/analysis/history", {
        headers: {
          Authorization: token,
        },
      });

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
        const response = await fetch(`http://localhost:3000/analysis/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        });
  
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
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">
            Analysis History
          </h1>
          <p className="text-gray-400 text-lg">
            Review your past data analyses and visualizations.
          </p>
        </div>

        {isLoading && <p className="text-center text-gray-400">Loading history...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {!isLoading && !error && history.length === 0 && (
          <p className="text-center text-gray-400">
            You have no saved analyses yet.
          </p>
        )}

        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={item._id}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-lg p-4 flex items-center justify-between shadow-lg transform transition-all duration-300 hover:border-blue-500/50 hover:scale-105"
              style={{ animation: `popIn 0.5s ease-out ${index * 100}ms backwards` }}
            >
              <div className="flex items-center space-x-4 flex-grow">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                    <ChartIcon chartType={item.chartType} />
                </div>
                <div className="flex-grow">
                  <h2 className="text-md font-semibold text-white truncate" title={item.filename}>
                    {item.filename}
                  </h2>
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                      <div className="flex items-center space-x-1.5">
                          <p>{item.chartType} Chart</p>
                      </div>
                      <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                          <FileText className="w-3 h-3" />
                          <span>{item.excelData?.data?.length || 0} rows</span>
                      </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-gray-700/50"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;