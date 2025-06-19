import { useEffect } from "react";

const CookiePolicy = () => {
  useEffect(() => {
    document.title = "Cookie Policy | InsightXL";
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-400">Last updated: June 18, 2025</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              What Are Cookies?
            </h2>
            <p className="text-gray-300">
              Cookies are small text files stored on your device when you visit
              websites. We use them to:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-300">
              <li>Remember your preferences</li>
              <li>Analyze site traffic</li>
              <li>Improve user experience</li>
            </ul>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              Types We Use
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-300">
                <thead className="text-left border-b border-gray-600">
                  <tr>
                    <th className="pb-2 pr-4">Type</th>
                    <th className="pb-2 pr-4">Purpose</th>
                    <th className="pb-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="py-3 pr-4 text-blue-300">Essential</td>
                    <td className="py-3 pr-4">Core functionality</td>
                    <td className="py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-purple-300">Analytics</td>
                    <td className="py-3 pr-4">Usage statistics</td>
                    <td className="py-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-blue-300">Preference</td>
                    <td className="py-3 pr-4">Remember settings</td>
                    <td className="py-3">30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              Managing Cookies
            </h2>
            <p className="text-gray-300 mb-4">
              You can control cookies through your browser settings:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700/30 hover:bg-gray-700/50 p-3 rounded-lg transition-colors"
              >
                Chrome
              </a>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700/30 hover:bg-gray-700/50 p-3 rounded-lg transition-colors"
              >
                Firefox
              </a>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700/30 hover:bg-gray-700/50 p-3 rounded-lg transition-colors"
              >
                Safari
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
