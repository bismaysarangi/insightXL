import { useState, useEffect } from "react";
import {
  BarChart3,
  Upload,
  History,
  BrainCircuit,
  TrendingUp,
  FileSpreadsheet,
  Calendar,
  Activity,
  Database,
  ArrowRight,
  Star,
  Clock,
  ChevronRight,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart,
  Zap,
  Target,
  Award,
  Lightbulb,
  User,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChartIcon = ({ chartType }) => {
  switch (chartType) {
    case "Bar":
      return <BarChart3 className="w-4 h-4 text-blue-400" />;
    case "Line":
      return <LineChart className="w-4 h-4 text-purple-400" />;
    case "Pie":
      return <PieChart className="w-4 h-4 text-green-400" />;
    case "Scatter":
      return <ScatterChart className="w-4 h-4 text-yellow-400" />;
    case "Area":
      return <AreaChart className="w-4 h-4 text-red-400" />;
    default:
      return <BarChart3 className="w-4 h-4 text-gray-400" />;
  }
};

const Dashboard = () => {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "",
  });
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    totalFiles: 0,
    chartTypes: {},
    recentActivity: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard | InsightXL";
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/auth");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Fetch user data from localStorage or API if needed
      if (!user.name || !user.email) {
        const userResponse = await fetch(
          "https://insightxl-server.onrender.com/auth/profile",
          {
            headers: { Authorization: token },
          }
        );
        const userData = await userResponse.json();
        if (userData.success) {
          setUser(userData.user);
          localStorage.setItem("userName", userData.user.name);
          localStorage.setItem("userEmail", userData.user.email);
        }
      }

      // Fetch analysis history
      const historyResponse = await fetch(
        "https://insightxl-server.onrender.com/analysis/history",
        {
          headers: { Authorization: token },
        }
      );
      const historyData = await historyResponse.json();

      if (historyData.success) {
        const analyses = historyData.history || [];
        setRecentAnalyses(analyses);

        // Calculate statistics
        const chartTypes = {};
        const uniqueFilenames = new Set();

        analyses.forEach((analysis) => {
          chartTypes[analysis.chartType] =
            (chartTypes[analysis.chartType] || 0) + 1;
          uniqueFilenames.add(analysis.filename);
        });

        // Calculate recent activity (last 7 days)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentActivity = analyses.filter(
          (analysis) => new Date(analysis.createdAt) > oneWeekAgo
        ).length;

        setStats({
          totalAnalyses: analyses.length,
          totalFiles: uniqueFilenames.size,
          chartTypes,
          recentActivity,
        });
      } else {
        setError(historyData.error || "Failed to load analysis history");
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to connect to server. Please try again.");
      if (err.response?.status === 401) {
        localStorage.removeItem("jwtToken");
        navigate("/auth");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Upload File",
      description: "Upload a new Excel file for analysis",
      icon: Upload,
      color: "from-blue-600 to-blue-700",
      action: () => navigate("/upload"),
    },
    {
      title: "View History",
      description: "Browse your past analyses",
      icon: History,
      color: "from-purple-600 to-purple-700",
      action: () => navigate("/history"),
    },
    {
      title: "AI Insights",
      description: "Get AI-powered data insights",
      icon: BrainCircuit,
      color: "from-green-600 to-green-700",
      action: () => navigate("/ai-insights"),
    },
    {
      title: "Generate Charts",
      description: "Create interactive visualizations",
      icon: BarChart3,
      color: "from-orange-600 to-orange-700",
      action: () => navigate("/chart-generation"),
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process Excel files in seconds with optimized parsing",
    },
    {
      icon: Target,
      title: "Precise Insights",
      description: "AI-powered analysis delivers accurate data interpretations",
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Export publication-ready charts and reports",
    },
    {
      icon: Lightbulb,
      title: "Smart Suggestions",
      description:
        "Get intelligent recommendations for your data visualization",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="bg-red-500/20 p-6 rounded-lg border border-red-500/30">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-400 text-lg">
                Ready to unlock insights from your data? Let's dive in.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Total Analyses
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.totalAnalyses}
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">
                {stats.totalAnalyses > 0
                  ? "+100% from last month"
                  : "Start your first analysis"}
              </span>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Files Processed
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.totalFiles}
                </p>
              </div>
              <div className="bg-purple-500/10 p-3 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Database className="w-4 h-4 text-blue-400 mr-1" />
              <span className="text-blue-400 text-sm">Unique datasets</span>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  Recent Activity
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {stats.recentActivity}
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Clock className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-400 text-sm">Last 7 days</span>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Chart Types</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {Object.keys(stats.chartTypes).length}
                </p>
              </div>
              <div className="bg-orange-500/10 p-3 rounded-lg">
                <PieChart className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-yellow-400 text-sm">
                Different visualizations
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-blue-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 text-left group"
              >
                <div
                  className={`bg-gradient-to-r ${action.color} p-3 rounded-lg inline-block mb-4 group-hover:shadow-lg transition-all`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {action.description}
                </p>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Analyses */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <History className="w-6 h-6 mr-2 text-purple-400" />
                  Recent Analyses
                </h2>
                {recentAnalyses.length > 0 && (
                  <button
                    onClick={() => navigate("/history")}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1 transition-colors"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {recentAnalyses.length > 0 ? (
                <div className="space-y-3">
                  {recentAnalyses.slice(0, 5).map((analysis) => (
                    <div
                      key={analysis._id}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all cursor-pointer group"
                      onClick={() => navigate(`/analysis/${analysis._id}`)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-gray-600/50 p-2 rounded-lg">
                          <ChartIcon chartType={analysis.chartType} />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-sm truncate max-w-xs">
                            {analysis.filename}
                          </h3>
                          <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                            <span>{analysis.chartType} Chart</span>
                            <span>•</span>
                            <span>
                              {new Date(
                                analysis.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No analyses yet</p>
                  <button
                    onClick={() => navigate("/upload")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all flex items-center space-x-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Your First Analysis</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* User Profile Summary */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Your Profile
              </h3>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{user.name}</h4>
                  <p className="text-gray-400 text-sm flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/profile")}
                className="mt-4 w-full bg-gray-700/50 hover:bg-gray-700/70 text-white py-2 rounded-lg transition-colors text-sm"
              >
                Edit Profile
              </button>
            </div>

            {/* Chart Types Distribution */}
            {Object.keys(stats.chartTypes).length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-green-400" />
                  Chart Types Used
                </h3>
                <div className="space-y-3">
                  {Object.entries(stats.chartTypes).map(([type, count]) => (
                    <div
                      key={type}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <ChartIcon chartType={type} />
                        <span className="text-gray-300 text-sm">{type}</span>
                      </div>
                      <span className="text-white font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Tips */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-orange-400" />
                Pro Tips
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Use clear column headers for better AI insights
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Try different chart types for various perspectives
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Export charts as PNG/PDF for presentations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
