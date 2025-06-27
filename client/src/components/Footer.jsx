import { Instagram, Github, Linkedin, Mail, BarChart3 } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");

      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InsightXL
              </h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Transform your Excel data into powerful insights with our advanced
              analytics platform. Upload, analyze, and visualize seamlessly.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@insightxl.com"
                className="group bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-600"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://github.com/bismaysarangi/insightXL"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-600"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                className="group bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="#"
                className="group bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-600"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </h3>
            <nav className="space-y-3">
              <a
                href="/dashboard"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
              >
                Dashboard
              </a>
              <a
                href="/upload"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
              >
                Upload Data
              </a>
              <a
                href="/history"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
              >
                Analysis History
              </a>
              <a
                href="/about"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
              >
                About Us
              </a>
              <a
                href="/chart-generation"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
              >
                Chart Generation
              </a>
              <a
                href="/ai-insights"
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 transform transition-transform"
              >
                AI Insights
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Stay Updated
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest features and insights delivered to your inbox.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 text-sm border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                />
                <button
                  onClick={handleSubscribe}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Subscribe
                </button>
              </div>

              {subscribed && (
                <div className="text-green-400 bg-gray-800 border border-green-600 rounded-md px-4 py-2 text-sm mt-2 animate-fade-in">
                  🎉 Thank you for subscribing!
                </div>
              )}

              <p className="text-xs text-gray-400">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} InsightXL. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="terms-of-service"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookie-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
