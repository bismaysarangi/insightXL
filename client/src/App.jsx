import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Features from "./pages/Features";
import About from "./pages/AboutUs";
import Profile from "./pages/Profile";
import AuthPages from "./pages/AuthPages";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-amber-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPages />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Public Routes */}
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
