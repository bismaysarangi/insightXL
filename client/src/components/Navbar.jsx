import { Link } from "react-router-dom";
import {
  Menu,
  User,
  BarChart3,
  Search,
  ChevronDown,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false to test logged out state
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/user.png",
  });

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md border-b border-gray-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 min-w-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
            >
              InsightXL
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300">
                  Dashboard
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link to="/upload" className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300">
                  Upload Data
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link to="/history" className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300">
                  Analysis History
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </>
            ) : (
              <Link to="/features" className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300">
                Features
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            )}
            <Link to="/about" className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300">
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            {isLoggedIn && (
              <div className="hidden xl:flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-600 focus-within:ring-blue-500 transition-all duration-300">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  className="bg-transparent text-gray-300 placeholder-gray-400 text-sm w-40 focus:outline-none focus:w-60 transition-all duration-300"
                />
              </div>
            )}

            {/* Profile/Auth - Desktop */}
            {isLoggedIn ? (
              <div className="hidden md:flex relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-full px-3 py-2 border border-gray-600 hover:border-gray-500 transition-all duration-300"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.avatar} alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-300 text-sm font-medium hidden lg:block">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-600">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                      Profile Settings
                    </Link>
                    <Link to="/faqs" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                      FAQs
                    </Link>
                    <hr className="border-gray-600 my-2" />
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  onClick={handleSignIn}
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  onClick={handleSignIn}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 relative"
                >
                  <Menu
                    className={`h-6 w-6 transition-all duration-300 ${isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                  />
                  <X
                    className={`h-6 w-6 absolute transition-all duration-300 ${isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gradient-to-b from-gray-900 to-gray-950 border-gray-700 p-0"
              >
                {/* Continue with your existing SheetContent JSX... */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
