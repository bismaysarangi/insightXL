import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Brain,
  FileSpreadsheet,
  Send,
  Loader2,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  Target,
  MessageSquare,
  Copy,
  Download,
  RefreshCw,
  Eye,
  Sparkles,
  BarChart3,
  PieChart,
  Users,
  Calendar,
} from "lucide-react";
import * as XLSX from "xlsx";

export default function AIInsights() {
  const location = useLocation();
  const HF_API_KEY = "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";

  useEffect(() => {
    document.title = "AI Insights | InsightXL";
  }, []);

  const [excelData, setExcelData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState("No file selected");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [insights, setInsights] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dataPreview, setDataPreview] = useState("");

  // Predefined analysis prompts
  const analysisPrompts = [
    {
      id: "summary",
      title: "Data Summary",
      prompt:
        "Provide a comprehensive summary of this dataset including key statistics, data types, and overall structure.",
      icon: BarChart3,
      color: "blue",
    },
    {
      id: "trends",
      title: "Trend Analysis",
      prompt:
        "Identify trends, patterns, and correlations in this data. What insights can you derive?",
      icon: TrendingUp,
      color: "green",
    },
    {
      id: "recommendations",
      title: "Recommendations",
      prompt:
        "Based on this data, what actionable recommendations would you provide?",
      icon: Target,
      color: "purple",
    },
    {
      id: "insights",
      title: "Key Insights",
      prompt:
        "What are the most interesting and valuable insights from this dataset?",
      icon: Lightbulb,
      color: "orange",
    },
  ];

  // Process uploaded file
  useEffect(() => {
    const routerState = location.state;
    if (routerState && routerState.uploadedFile) {
      const file = routerState.uploadedFile;
      setFileName(routerState.fileName || file.name);
      processExcelFile(file);
    }
  }, [location.state]);

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
        setDataPreview(createDataPreview(parsedHeaders, parsedRows));
        setIsLoading(false);
      } catch (error) {
        setError("Failed to parse Excel file.");
        setIsLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const createDataPreview = (headers, rows) => {
    let preview = `Dataset: ${fileName}\nColumns: ${headers.length}\nRows: ${
      rows.length
    }\n\nHeaders: ${headers.join(", ")}\n\nSample Data:\n`;
    rows.slice(0, 5).forEach((row, index) => {
      preview += `Row ${index + 1}: `;
      headers.forEach((header) => {
        preview += `${header}: ${row[header]}, `;
      });
      preview += "\n";
    });

    preview += "\nData Types:\n";
    headers.forEach((header) => {
      const sampleValues = rows
        .slice(0, 10)
        .map((row) => row[header])
        .filter((val) => val !== "");
      const uniqueValues = [...new Set(sampleValues)];
      preview += `${header}: ${uniqueValues.slice(0, 3).join(", ")}${
        uniqueValues.length > 3 ? "..." : ""
      }\n`;
    });

    return preview;
  };

  const analyzeWithMistral = async (prompt) => {
    if (!dataPreview.trim()) {
      setError("Upload a file first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      // Updated endpoint with working free model
      const response = await fetch(
        "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `<|system|>You are a helpful data analyst.</s>
                  <|user|>Analyze this dataset and ${prompt}:
                  
                  ${dataPreview}
                  
                  Provide response with:
                  1. Key findings
                  2. Trends
                  3. Recommendations</s>
                  <|assistant|>`,
            parameters: {
              max_new_tokens: 1000,
              temperature: 0.7,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API request failed");
      }

      const data = await response.json();
      const aiResponse = data[0]?.generated_text || "No response generated.";

      setInsights((prev) => [
        {
          id: Date.now(),
          query: prompt,
          response: aiResponse,
          timestamp: new Date().toLocaleString(),
          type: "ai",
        },
        ...prev,
      ]);
    } catch (error) {
      setError(`API Error: ${error.message}`);
      // Fallback to mock response
      setInsights((prev) => [
        {
          id: Date.now(),
          query: prompt,
          response: generateMockResponse(prompt),
          timestamp: new Date().toLocaleString(),
          type: "mock",
        },
        ...prev,
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockResponse = (prompt) => {
    const mockResponses = {
      summary: `**Mock Data Summary**\n\nDataset contains ${
        excelData.length
      } rows with ${headers.length} columns.\nKey columns: ${headers
        .slice(0, 3)
        .join(", ")}...`,
      trends: `**Mock Trend Analysis**\n\nPotential trends in your data would be identified here.\nExample: Column "${headers[0]}" shows possible seasonal patterns.`,
      recommendations: `**Mock Recommendations**\n\n1. Clean missing values\n2. Explore correlation between ${headers[1]} and ${headers[2]}\n3. Segment analysis by key variables`,
      insights: `**Mock Key Insights**\n\n1. 80% of values in ${headers[0]} are within expected range\n2. Interesting outlier in row 42\n3. Potential data quality issues in ${headers[3]}`,
    };

    return mockResponses[
      prompt.toLowerCase().includes("summary")
        ? "summary"
        : prompt.toLowerCase().includes("trend")
        ? "trends"
        : prompt.toLowerCase().includes("recommend")
        ? "recommendations"
        : "insights"
    ];
  };

  const handleCustomQuery = () => {
    if (!currentQuery.trim()) return;
    analyzeWithMistral(currentQuery);
    setCurrentQuery("");
  };

  const copyInsight = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadInsights = () => {
    const content = insights
      .map((i) => `Query: ${i.query}\nResponse: ${i.response}\n\n`)
      .join("");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insights-${Date.now()}.txt`;
    a.click();
  };

  // Render UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                AI Insights
              </h1>
              <p className="text-gray-400">Analyze your data with Mistral AI</p>
            </div>
          </div>
          {insights.length > 0 && (
            <button
              onClick={downloadInsights}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span className="hidden md:inline">Download</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Upload */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
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
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                        processExcelFile(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  <div className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer text-center">
                    Upload New File
                  </div>
                </label>
              </div>
            </div>

            {/* Quick Analysis */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Quick Analysis
              </h3>
              <div className="space-y-3">
                {analysisPrompts.map((analysis) => (
                  <button
                    key={analysis.id}
                    onClick={() => analyzeWithMistral(analysis.prompt)}
                    disabled={isAnalyzing || !excelData.length}
                    className={`w-full bg-gradient-to-r ${
                      analysis.color === "blue"
                        ? "from-blue-600 to-blue-700"
                        : analysis.color === "green"
                        ? "from-green-600 to-green-700"
                        : analysis.color === "purple"
                        ? "from-purple-600 to-purple-700"
                        : "from-orange-600 to-orange-700"
                    } text-white p-3 rounded-lg flex items-center space-x-3`}
                  >
                    <analysis.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {analysis.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            {excelData.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Dataset Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Records</span>
                    <span className="text-white font-medium">
                      {excelData.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Columns</span>
                    <span className="text-white font-medium">
                      {headers.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Insights</span>
                    <span className="text-white font-medium">
                      {insights.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Query Input */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">
                Ask About Your Data
              </h3>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  placeholder="Ask any question about your data..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === "Enter" && handleCustomQuery()}
                />
                <button
                  onClick={handleCustomQuery}
                  disabled={isAnalyzing || !currentQuery.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
                >
                  {isAnalyzing ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Send />
                  )}
                  <span>Ask AI</span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
                <AlertCircle className="text-red-400" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Insights */}
            {insights.length > 0 ? (
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            insight.type === "ai"
                              ? "bg-green-500/10"
                              : "bg-orange-500/10"
                          }`}
                        >
                          <Brain
                            className={
                              insight.type === "ai"
                                ? "text-green-400"
                                : "text-orange-400"
                            }
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">
                            {insight.type === "ai"
                              ? "AI Analysis"
                              : "Sample Response"}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {insight.timestamp}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyInsight(insight.response)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy />
                      </button>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Query:</strong> {insight.query}
                      </p>
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <pre className="text-gray-100 whitespace-pre-wrap text-sm">
                          {insight.response}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
                <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">
                  No Analysis Yet
                </h3>
                <p className="text-gray-400">
                  Upload data and run your first analysis
                </p>
              </div>
            )}

            {/* Data Preview */}
            {excelData.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Data Preview
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        {headers.slice(0, 5).map((col) => (
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
                          {headers.slice(0, 5).map((col) => (
                            <td key={col} className="py-2 px-3 text-gray-300">
                              {String(row[col] || "").slice(0, 30)}
                              {String(row[col] || "").length > 30 ? "..." : ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
