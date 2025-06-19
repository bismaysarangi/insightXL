import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import React from "react";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ChartGeneration from "./pages/ChartGeneration";
import AboutUs from "./pages/AboutUs";
import AuthPages from "./pages/AuthPages";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Pages that shouldn't have navbar/footer
  const noLayoutPages = ["/auth", "/login", "/register"];

  const shouldShowLayout = !noLayoutPages.includes(location.pathname);

  if (shouldShowLayout) {
    return (
      <div className="min-h-screen bg-gray-900 text-amber-50">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/chart-generation" element={<ChartGeneration />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/auth" element={<AuthPages />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
