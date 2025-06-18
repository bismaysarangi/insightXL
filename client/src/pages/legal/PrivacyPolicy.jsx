import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <Helmet>
        <title>Privacy Policy | InsightXL</title>
        <meta
          name="description"
          content="How we collect, use, and protect your data"
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: June 18, 2025</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              1. Information We Collect
            </h2>
            <p className="text-gray-300 mb-4">
              We collect information when you register, use our services, or
              interact with our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Account information (name, email, organization)</li>
              <li>Data you upload for analysis</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              2. How We Use Your Data
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300">
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <h3 className="font-medium text-blue-300 mb-2">
                  Service Delivery
                </h3>
                <p>To provide and maintain our analytics services</p>
              </div>
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <h3 className="font-medium text-purple-300 mb-2">
                  Improvements
                </h3>
                <p>To enhance and develop new features</p>
              </div>
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <h3 className="font-medium text-blue-300 mb-2">Security</h3>
                <p>To protect against fraud and abuse</p>
              </div>
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <h3 className="font-medium text-purple-300 mb-2">
                  Communication
                </h3>
                <p>To send important service notices</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              3. Data Protection
            </h2>
            <p className="text-gray-300 mb-4">
              We implement industry-standard security measures:
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                Encryption
              </span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                Access Controls
              </span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                Regular Audits
              </span>
            </div>
            <p className="text-gray-300">
              Despite our measures, no method of transmission over the Internet
              is 100% secure.
            </p>
          </section>

          <div className="text-center mt-8 text-gray-400">
            <p className="text-sm mt-4">
              © {new Date().getFullYear()} InsightXL. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
