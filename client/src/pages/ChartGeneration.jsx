import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Settings,
  RefreshCw,
  ChevronDown,
  Eye,
  Palette,
  ArrowLeft,
  TrendingUp,
  Activity,
  Zap,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";
import * as XLSX from "xlsx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartGeneration() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Chart Generation | InsightXL";
  }, []);

  const [excelData, setExcelData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedXAxis, setSelectedXAxis] = useState("");
  const [selectedYAxis, setSelectedYAxis] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [colorScheme, setColorScheme] = useState("blue");
  const [fileName, setFileName] = useState("No file selected");
  const [error, setError] = useState("");
  const chartRef = useRef(null);

  // Color schemes
  const colorSchemes = {
    blue: {
      primary: "#3B82F6",
      secondary: "#1E40AF",
      gradient: ["#3B82F6", "#1E40AF", "#1D4ED8", "#2563EB"],
    },
    purple: {
      primary: "#8B5CF6",
      secondary: "#7C3AED",
      gradient: ["#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6"],
    },
    green: {
      primary: "#10B981",
      secondary: "#059669",
      gradient: ["#10B981", "#059669", "#047857", "#065F46"],
    },
    orange: {
      primary: "#F59E0B",
      secondary: "#D97706",
      gradient: ["#F59E0B", "#D97706", "#B45309", "#92400E"],
    },
  };

  // Process uploaded file from router state on component mount
  useEffect(() => {
    const routerState = location.state;
    if (routerState && routerState.uploadedFile) {
      const file = routerState.uploadedFile;
      setFileName(routerState.fileName || file.name);
      processExcelFile(file);
    }
  }, [location.state]);

  useEffect(() => {
    if (excelData && selectedXAxis && selectedYAxis) {
      generateChart();
    }
  }, [excelData, selectedXAxis, selectedYAxis, chartType, colorScheme]);

  const processExcelFile = (file) => {
    setIsLoading(true);
    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target.result;
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });

        if (!jsonData.length) {
          setError("Empty or invalid Excel file.");
          setIsLoading(false);
          return;
        }

        const parsedHeaders = jsonData[0];
        const parsedRows = jsonData.slice(1).map((row) => {
          const rowObj = {};
          parsedHeaders.forEach((key, i) => {
            rowObj[key] = row[i] ?? "";
          });
          return rowObj;
        });

        setHeaders(parsedHeaders);
        setExcelData(parsedRows);
        setColumns(parsedHeaders);
        setSelectedXAxis(parsedHeaders[0] || "");
        setSelectedYAxis(parsedHeaders[1] || "");
        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        setError("Failed to parse Excel file.");
        setIsLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const generateChart = () => {
    if (!excelData.length || !selectedXAxis || !selectedYAxis) return;

    const labels = excelData.map((row) => row[selectedXAxis]);
    const dataValues = excelData.map((row) => {
      const value = row[selectedYAxis];
      return typeof value === "string" && !isNaN(value) && value !== ""
        ? parseFloat(value)
        : typeof value === "number"
        ? value
        : 0;
    });

    const colors = colorSchemes[colorScheme];

    let config = {
      labels,
      datasets: [
        {
          label: selectedYAxis,
          data: dataValues,
          backgroundColor:
            chartType === "pie" ? colors.gradient : colors.primary,
          borderColor: colors.secondary,
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };

    setChartData(config);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    processExcelFile(file);
  };

  const downloadChart = () => {
    if (chartRef.current) {
      const link = document.createElement("a");
      link.download = `chart_${Date.now()}.png`;
      link.href = chartRef.current.toBase64Image();
      link.click();
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#E5E7EB",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: `${selectedYAxis} vs ${selectedXAxis}`,
        color: "#F9FAFB",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales:
      chartType !== "pie"
        ? {
            x: {
              ticks: {
                color: "#9CA3AF",
              },
              grid: {
                color: "#374151",
              },
            },
            y: {
              ticks: {
                color: "#9CA3AF",
              },
              grid: {
                color: "#374151",
              },
            },
          }
        : {},
  };

  const renderChart = () => {
    if (!chartData) return null;

    const chartProps = {
      ref: chartRef,
      data: chartData,
      options: chartOptions,
    };

    switch (chartType) {
      case "line":
        return <Line {...chartProps} />;
      case "pie":
        return <Pie {...chartProps} />;
      default:
        return <Bar {...chartProps} />;
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

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-md md:text-2xl font-bold text-white">
                  Chart Generation
                </h1>
                <p className="text-gray-400 text-sm md:text-base">
                  Create interactive visualizations from your data
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={downloadChart}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
            >
              <Download className="w-5 h-5" />
              <span className="text-xs md:text-xl">Export Chart</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Upload */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <FileSpreadsheet className="w-5 h-5 mr-2" />
                Data Source
              </h3>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">Current: {fileName}</div>
                <label className="block">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer text-center transition-colors">
                    Upload New File
                  </div>
                </label>
              </div>
            </div>

            {/* Chart Configuration */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Configuration</h3>
              <div className="space-y-4">
                {/* Chart Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chart Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { type: "bar", icon: BarChart3 },
                      { type: "line", icon: LineChart },
                      { type: "pie", icon: PieChart },
                    ].map(({ type, icon: Icon }) => (
                      <button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`p-3 rounded-lg border transition-all ${
                          chartType === type
                            ? "border-blue-500 bg-blue-500/10 text-blue-400"
                            : "border-gray-600 text-gray-400 hover:border-gray-500"
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* X-Axis */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    X-Axis
                  </label>
                  <select
                    value={selectedXAxis}
                    onChange={(e) => setSelectedXAxis(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    {columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Y-Axis */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Y-Axis
                  </label>
                  <select
                    value={selectedYAxis}
                    onChange={(e) => setSelectedYAxis(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    {columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color Scheme */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color Scheme
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(colorSchemes).map(([name, colors]) => (
                      <button
                        key={name}
                        onClick={() => setColorScheme(name)}
                        className={`p-2 rounded-lg border flex items-center space-x-2 transition-all ${
                          colorScheme === name
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-600 hover:border-gray-500"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        ></div>
                        <span className="text-gray-300 text-sm capitalize">
                          {name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Data Points</span>
                  <span className="text-white font-medium">
                    {excelData?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Columns</span>
                  <span className="text-white font-medium">
                    {columns.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Chart Type</span>
                  <span className="text-white font-medium capitalize">
                    {chartType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading data...</p>
                  </div>
                </div>
              ) : chartData ? (
                <div className="h-96">{renderChart()}</div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">
                      No chart data available
                    </p>
                    <p className="text-gray-500 text-sm">
                      Upload an Excel file to get started
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Data Preview */}
            {excelData.length > 0 && (
              <div className="mt-6 bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Data Preview
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        {headers.map((col) => (
                          <th
                            key={col}
                            className="text-left py-2 px-3 text-gray-300 font-medium"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.slice(0, 5).map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-800">
                          {headers.map((col) => (
                            <td key={col} className="py-2 px-3 text-gray-300">
                              <div className="max-w-xs truncate">
                                {typeof row[col] === "object"
                                  ? JSON.stringify(row[col])
                                  : String(row[col] ?? "")}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {excelData.length > 5 && (
                    <p className="text-gray-500 text-xs mt-2">
                      Showing 5 of {excelData.length} rows
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
