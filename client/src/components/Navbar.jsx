import { Menu, User, BarChart3, Bell, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md border-b border-gray-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 min-w-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
            >
              InsightXL
            </a>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            <a
              href="/dashboard"
              className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium"
            >
              Dashboard
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a
              href="/upload"
              className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium"
            >
              Upload Data
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a
              href="/history"
              className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium"
            >
              Analysis History
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a
              href="/about"
              className="group relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium"
            >
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          </nav>

          {/* Right Side - Search & Profile */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop only */}
            <div className="hidden xl:flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-600 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-300">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search insights..."
                className="bg-transparent text-gray-300 placeholder-gray-400 text-sm w-40 focus:outline-none focus:w-60 transition-all duration-300"
              />
            </div>

            {/* Notifications - Desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex relative text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-2 h-2"></span>
            </Button>

            {/* Profile Dropdown - Desktop */}
            <div className="hidden md:flex relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-full px-3 py-2 border border-gray-600 hover:border-gray-500 transition-all duration-300"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/user.png" alt="User" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-300 text-sm font-medium hidden lg:block">
                  John Doe
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-600">
                    <p className="text-white font-medium">John Doe</p>
                    <p className="text-gray-400 text-sm">john@example.com</p>
                  </div>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    Profile Settings
                  </a>
                  <a
                    href="/billing"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    Billing
                  </a>
                  <a
                    href="/help"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    Help & Support
                  </a>
                  <hr className="border-gray-600 my-2" />
                  <button className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-gray-900 border-gray-700"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center space-x-2 mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">
                      InsightXL
                    </span>
                  </div>

                  {/* Mobile Search */}
                  <div className="flex items-center bg-gray-800 rounded-lg px-4 py-3 border border-gray-600 mb-6">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Search insights..."
                      className="bg-transparent text-gray-300 placeholder-gray-400 w-full focus:outline-none"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 space-y-2">
                    <a
                      href="/dashboard"
                      className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 font-medium"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/upload"
                      className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 font-medium"
                    >
                      Upload Data
                    </a>
                    <a
                      href="/history"
                      className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 font-medium"
                    >
                      Analysis History
                    </a>
                    <a
                      href="/about"
                      className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300 font-medium"
                    >
                      About
                    </a>
                  </nav>

                  {/* Mobile Profile Section */}
                  <div className="border-t border-gray-700 pt-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/user.png" alt="User" />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">John Doe</p>
                        <p className="text-gray-400 text-sm">
                          john@example.com
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Profile Settings
                      </a>
                      <button className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-colors">
                        Sign Out
                      </button>
                    </div>
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
