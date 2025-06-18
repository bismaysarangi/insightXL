import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  User,
  BarChart3,
  Search,
  ChevronDown,
  X,
  LogIn,
  UserPlus,
  Upload as UploadIcon,
  Home,
  History,
  PieChart,
  Info,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("jwtToken");
  const profileRef = useRef(null);
  const user = {
    name: localStorage.getItem("userName") || "Guest",
    email: localStorage.getItem("userEmail") || "guest@example.com",
    avatar: "/user.png",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/auth");
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    navigate("/auth");
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
                <Link
                  to="/dashboard"
                  className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center"
                >
                  <PieChart className="w-4 h-4 mr-2" />
                  Dashboard
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link
                  to="/upload"
                  className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center"
                >
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload Data
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
                <Link
                  to="/history"
                  className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center"
                >
                  <History className="w-4 h-4 mr-2" />
                  History
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </>
            ) : (
              <Link
                to="/features"
                className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Features
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            )}
            <Link
              to="/about"
              className="group relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center"
            >
              <Info className="w-4 h-4 mr-2" />
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Profile/Auth - Desktop */}
            {isLoggedIn ? (
              <div className="hidden md:flex relative" ref={profileRef}>
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
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-600">
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <hr className="border-gray-600 my-2" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
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
                    className={`h-6 w-6 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "rotate-90 opacity-0"
                        : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`h-6 w-6 absolute transition-all duration-300 text-white ${
                      isMobileMenuOpen
                        ? "rotate-0 opacity-100"
                        : "-rotate-90 opacity-0"
                    }`}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gradient-to-b from-gray-900 to-gray-950 border-gray-700 p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        InsightXL
                      </span>
                    </div>
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <PieChart className="w-5 h-5 mr-3" />
                          Dashboard
                        </Link>
                        <Link
                          to="/upload"
                          className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <UploadIcon className="w-5 h-5 mr-3" />
                          Upload Data
                        </Link>
                        <Link
                          to="/history"
                          className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <History className="w-5 h-5 mr-3" />
                          History
                        </Link>
                      </>
                    ) : (
                      <Link
                        to="/features"
                        className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <BarChart3 className="w-5 h-5 mr-3" />
                        Features
                      </Link>
                    )}
                    <Link
                      to="/about"
                      className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Info className="w-5 h-5 mr-3" />
                      About
                    </Link>
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="p-4 border-t border-gray-700">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <div className="flex items-center px-4 py-3 rounded-lg bg-gray-800">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={user.avatar} alt="User" />
                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">
                              {user.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="w-5 h-5 mr-3" />
                          Profile
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button
                          onClick={() => {
                            handleSignIn();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          <LogIn className="w-5 h-5 mr-2" />
                          Sign In
                        </Button>
                        <Button
                          onClick={() => {
                            handleSignIn();
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline"
                          className="w-full text-white border-gray-600 hover:bg-gray-800"
                        >
                          <UserPlus className="w-5 h-5 mr-2" />
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
