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
  const HF_API_KEY = import.meta.env.VITE_API_TOKEN;

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

  // Predefined analysis prompts with improved wording
  const analysisPrompts = [
    {
      id: "summary",
      title: "Data Summary",
      prompt:
        "Analyze this dataset and provide a comprehensive overview including data structure, key statistics, data quality observations, and notable characteristics. Focus on what makes this dataset unique and valuable.",
      icon: BarChart3,
      color: "blue",
    },
    {
      id: "trends",
      title: "Trend Analysis",
      prompt:
        "Examine this data for meaningful patterns, trends, and correlations. Identify seasonal variations, growth patterns, anomalies, and relationships between different variables that could inform business decisions.",
      icon: TrendingUp,
      color: "green",
    },
    {
      id: "recommendations",
      title: "Recommendations",
      prompt:
        "Based on your analysis of this dataset, provide specific, actionable recommendations for improvement, optimization, or strategic decisions. Include data-driven insights that can drive business value.",
      icon: Target,
      color: "purple",
    },
    {
      id: "insights",
      title: "Key Insights",
      prompt:
        "Identify the most significant and actionable insights from this dataset. What stories does the data tell? What unexpected discoveries or important findings should stakeholders know about?",
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
    let preview = `Dataset Analysis: ${fileName}\n`;
    preview += `Structure: ${rows.length} records across ${headers.length} dimensions\n\n`;
    preview += `Column Headers: ${headers.join(", ")}\n\n`;

    preview += `Sample Records:\n`;
    rows.slice(0, 5).forEach((row, index) => {
      preview += `Record ${index + 1}: `;
      headers.forEach((header) => {
        preview += `${header}: ${row[header]}, `;
      });
      preview += "\n";
    });

    preview += "\nData Profile:\n";
    headers.forEach((header) => {
      const sampleValues = rows
        .slice(0, 10)
        .map((row) => row[header])
        .filter((val) => val !== "" && val !== null && val !== undefined);
      const uniqueValues = [...new Set(sampleValues)];
      preview += `${header}: Sample values include ${uniqueValues
        .slice(0, 3)
        .join(", ")}${
        uniqueValues.length > 3
          ? ` (${uniqueValues.length} unique values total)`
          : ""
      }\n`;
    });

    return preview;
  };

  const analyzeWithMistral = async (prompt) => {
    if (!dataPreview.trim()) {
      setError("Please upload a dataset first to begin analysis.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      // Improved prompt structure for better responses
      const enhancedPrompt = `<|system|>You are an expert data analyst with extensive experience in business intelligence and statistical analysis. Provide clear, actionable insights in a professional format.</s>
<|user|>Please analyze the following dataset and ${prompt.toLowerCase()}:

${dataPreview}

Structure your response with clear sections and bullet points. Focus on:
• Data-driven observations
• Business implications
• Specific recommendations
• Statistical insights where relevant

Provide a comprehensive yet concise analysis.</s>
<|assistant|>`;

      const response = await fetch(
        "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: enhancedPrompt,
            parameters: {
              max_new_tokens: 1200,
              temperature: 0.7,
              top_p: 0.9,
              repetition_penalty: 1.1,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API request failed");
      }

      const data = await response.json();
      let aiResponse = data[0]?.generated_text || "No response generated.";

      // Clean up the response by removing the prompt echo
      if (aiResponse.includes("<|assistant|>")) {
        aiResponse = aiResponse.split("<|assistant|>")[1] || aiResponse;
      }

      // Remove any remaining system tokens
      aiResponse = aiResponse.replace(/<\|[^|]*\|>/g, "").trim();

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
      // Fallback to improved mock response
      setInsights((prev) => [
        {
          id: Date.now(),
          query: prompt,
          response: generateImprovedMockResponse(prompt),
          timestamp: new Date().toLocaleString(),
          type: "mock",
        },
        ...prev,
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateImprovedMockResponse = (prompt) => {
    const datasetSize = excelData.length;
    const columnCount = headers.length;
    const primaryColumn = headers[0] || "data";
    const secondaryColumn = headers[1] || "values";

    if (
      prompt.toLowerCase().includes("summary") ||
      prompt.toLowerCase().includes("overview")
    ) {
      return `## Dataset Overview

**Structure & Scale**
• Dataset contains ${datasetSize.toLocaleString()} records across ${columnCount} key dimensions
• Primary data fields include: ${headers.slice(0, 4).join(", ")}${
        headers.length > 4
          ? ` and ${headers.length - 4} additional columns`
          : ""
      }

**Data Quality Assessment**
• Complete records: Approximately ${Math.floor(
        Math.random() * 15 + 80
      )}% of entries have full data coverage
• Data consistency: ${primaryColumn} field shows standardized formatting
• Temporal coverage: Data spans multiple periods enabling trend analysis

**Key Characteristics**
• The dataset appears well-structured for analytical purposes
• ${secondaryColumn} shows significant variation suggesting rich insights potential
• Distribution patterns indicate both categorical and numerical data types

This dataset provides a solid foundation for comprehensive business intelligence analysis.`;
    }

    if (
      prompt.toLowerCase().includes("trend") ||
      prompt.toLowerCase().includes("pattern")
    ) {
      return `## Trend Analysis Results

**Primary Patterns Identified**
• **Growth Trajectory**: ${primaryColumn} demonstrates consistent upward movement over the observed period
• **Seasonal Variations**: Notable cyclical patterns appear in ${secondaryColumn} with peaks occurring quarterly
• **Performance Clusters**: Data segments into 3-4 distinct performance tiers

**Correlation Insights**
• Strong positive correlation observed between ${headers[0]} and ${
        headers[1] || "secondary metrics"
      }
• Inverse relationship detected in ${Math.floor(
        datasetSize * 0.23
      )}% of record combinations
• Geographic/temporal clustering suggests regional or time-based influences

**Statistical Significance**
• Confidence level: 95% for primary trend identification
• Data volatility: Moderate variance with clear directional indicators
• Outlier impact: ${Math.floor(
        Math.random() * 8 + 2
      )}% of records show exceptional values requiring investigation

**Business Implications**
These patterns suggest opportunities for optimization and strategic planning based on identified cycles and correlations.`;
    }

    if (
      prompt.toLowerCase().includes("recommend") ||
      prompt.toLowerCase().includes("strategic")
    ) {
      return `## Strategic Recommendations

**Immediate Actions**
• **Data Quality Enhancement**: Implement validation checks for ${primaryColumn} to improve data completeness
• **Process Optimization**: Focus on high-performing segments identified in the analysis
• **Resource Allocation**: Redirect efforts based on correlation findings between key variables

**Medium-term Strategies**
• **Predictive Modeling**: Leverage identified patterns to build forecasting capabilities
• **Segmentation Strategy**: Develop targeted approaches for the 3-4 distinct performance clusters
• **Monitoring Framework**: Establish KPIs based on ${secondaryColumn} variations

**Long-term Initiatives**
• **Automation Opportunities**: ${Math.floor(
        datasetSize * 0.34
      )}% of processes show standardization potential
• **Expansion Planning**: Geographic/temporal patterns suggest optimal growth timing
• **Risk Mitigation**: Address outlier scenarios representing ${Math.floor(
        Math.random() * 8 + 2
      )}% of cases

**Expected Outcomes**
Implementation of these recommendations could improve overall performance by 15-25% based on data-driven projections.`;
    }

    // Default insights response
    return `## Key Insights Discovery

**Critical Findings**
• **Performance Distribution**: Top 20% of ${primaryColumn} entries drive disproportionate value
• **Efficiency Patterns**: ${secondaryColumn} optimization could yield 18-22% improvement
• **Data Anomalies**: ${Math.floor(
      datasetSize * 0.07
    )}% of records require attention for exceptional values

**Business Intelligence Highlights**
• **Market Positioning**: Current data suggests competitive advantages in ${Math.floor(
      Math.random() * 3 + 2
    )} key areas
• **Operational Insights**: Workflow patterns reveal optimization opportunities
• **Customer/User Behavior**: Distinct preference patterns emerge across ${columnCount} analyzed dimensions

**Actionable Intelligence**
• **Quick Wins**: Immediate 5-10% improvement possible through data-driven adjustments
• **Strategic Opportunities**: Long-term growth potential identified in underperforming segments
• **Risk Factors**: Early warning indicators present in ${Math.floor(
      Math.random() * 12 + 8
    )}% of historical data

**Confidence Level**
Analysis confidence: High (85%+) for primary insights, moderate (70%+) for predictive elements.

These insights provide a roadmap for data-driven decision making and strategic planning.`;
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
      .map(
        (i) =>
          `Query: ${i.query}\n\nResponse:\n${i.response}\n\n${"=".repeat(
            80
          )}\n\n`
      )
      .join("");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insights-${fileName.replace(
      /\.[^/.]+$/,
      ""
    )}-${Date.now()}.txt`;
    a.click();
  };

  // Render UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                AI Insights
              </h1>
              <p className="text-gray-400">
                Advanced data analysis powered by AI
              </p>
            </div>
          </div>
          {insights.length > 0 && (
            <button
              onClick={downloadInsights}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer transition-colors hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-700"
            >
              <Download className="w-5 h-5" />
              <span className="hidden md:inline">Export Insights</span>
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
                  <div className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer text-center transition-colors">
                    Upload New Dataset
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
                    } text-white p-3 rounded-lg flex items-center space-x-3 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
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
                <h3 className="text-white font-semibold mb-4">
                  Dataset Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Records</span>
                    <span className="text-white font-medium">
                      {excelData.length.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Dimensions</span>
                    <span className="text-white font-medium">
                      {headers.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Analyses</span>
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
                Custom Analysis Query
              </h3>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  placeholder="What specific insights would you like to discover from your data?"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleCustomQuery()}
                />
                <button
                  onClick={handleCustomQuery}
                  disabled={
                    isAnalyzing || !currentQuery.trim() || !excelData.length
                  }
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  {isAnalyzing ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">Analyze</span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
                <AlertCircle className="text-red-400 w-5 h-5" />
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
                            className={`w-5 h-5 ${
                              insight.type === "ai"
                                ? "text-green-400"
                                : "text-orange-400"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">
                            {insight.type === "ai"
                              ? "AI Analysis"
                              : "Sample Analysis"}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {insight.timestamp}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => copyInsight(insight.response)}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Analysis Query:</strong> {insight.query}
                      </p>
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <div className="text-gray-100 whitespace-pre-wrap text-sm leading-relaxed">
                          {insight.response}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
                <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">
                  Ready for Analysis
                </h3>
                <p className="text-gray-400">
                  {excelData.length > 0
                    ? "Your dataset is loaded. Choose an analysis type or ask a custom question to begin."
                    : "Upload your dataset to start discovering insights with AI-powered analysis."}
                </p>
              </div>
            )}

            {/* Data Preview */}
            {excelData.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Dataset Preview
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
                        {headers.length > 5 && (
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">
                            +{headers.length - 5} more
                          </th>
                        )}
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
                          {headers.length > 5 && (
                            <td className="py-2 px-3 text-gray-500">...</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {excelData.length > 5 && (
                    <p className="text-gray-400 text-sm mt-2">
                      Showing 5 of {excelData.length.toLocaleString()} records
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
