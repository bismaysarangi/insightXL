import { useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  X,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Cloud,
  ArrowRight,
  Download,
  Eye,
} from "lucide-react";

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    setError("");
    setSuccess("");

    // Validate file type
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload only Excel files (.xlsx, .xls)");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setSuccess("File uploaded successfully! Ready for analysis.");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setError("");
    setSuccess("");
  };

  const processAnalysis = () => {
    // This would typically navigate to the analysis page
    console.log("Processing analysis for:", uploadedFile.name);
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              InsightXL
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Upload Your Excel File
          </h1>
          <p className="text-gray-400 text-lg">
            Upload your Excel file and let AI generate powerful insights from
            your data
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl mb-6">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="text-green-400">{success}</p>
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? "border-blue-500 bg-blue-500/5"
                : uploadedFile
                ? "border-green-500 bg-green-500/5"
                : "border-gray-600 hover:border-gray-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!uploadedFile ? (
              <>
                <div className="mb-4">
                  <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Drop your Excel file here
                  </h3>
                  <p className="text-gray-400 mb-4">
                    or click to browse from your computer
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Supports .xlsx and .xls files</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Maximum file size: 10MB
                  </p>
                </div>

                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                  />
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Upload className="w-5 h-5" />
                    <span>Choose File</span>
                  </div>
                </label>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <FileSpreadsheet className="w-8 h-8 text-green-400" />
                  <div className="text-left">
                    <p className="text-white font-semibold">
                      {uploadedFile.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                {isUploading && (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                {/* Action Buttons */}
                {!isUploading && uploadProgress === 100 && (
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    <button
                      onClick={processAnalysis}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>Analyze Data</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <button className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                      <Eye className="w-5 h-5" />
                      <span>Preview Data</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-xl p-6 text-center">
            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Smart Parsing</h3>
            <p className="text-gray-400 text-sm">
              Automatically detects and parses Excel data with SheetJS
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-xl p-6 text-center">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">
              Interactive Charts
            </h3>
            <p className="text-gray-400 text-sm">
              Generate 2D/3D charts with Chart.js and Three.js
            </p>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-xl p-6 text-center">
            <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Export Results</h3>
            <p className="text-gray-400 text-sm">
              Download charts as PNG/PDF and save analysis history
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-blue-400 mr-2" />
            Tips for Better Results
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Ensure your Excel file has clear column headers</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Remove any merged cells for better parsing</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Keep file size under 10MB for faster processing</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Use consistent data formats in each column</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
