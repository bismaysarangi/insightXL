import { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service | InsightXL";
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400">Effective: June 18, 2025</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300">
              By accessing or using InsightXL's services, you agree to be bound
              by these Terms. If you don't agree, you may not use our services.
            </p>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              2. User Responsibilities
            </h2>
            <ul className="list-decimal pl-6 space-y-3 text-gray-300">
              <li>You must be at least 18 years old</li>
              <li>You're responsible for maintaining account security</li>
              <li>You may not use the service for illegal purposes</li>
              <li>You retain ownership of data you upload</li>
            </ul>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              3. Service Limitations
            </h2>
            <div className="bg-gray-700/30 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-blue-300 mb-2">Availability</h3>
              <p className="text-gray-300">
                We strive for 99.9% uptime but don't guarantee uninterrupted
                service.
              </p>
            </div>
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <h3 className="font-medium text-purple-300 mb-2">Changes</h3>
              <p className="text-gray-300">
                We may modify or discontinue features at any time.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-2 h-6 mr-3 rounded-full"></span>
              4. Termination
            </h2>
            <p className="text-gray-300">
              We may suspend or terminate your account if you violate these
              Terms. You may terminate at any time by deleting your account.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
