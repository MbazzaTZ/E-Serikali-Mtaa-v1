import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Home,
  LayoutDashboard,
  FileText,
  User,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("verifiedUser")
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("verifiedUser");
    setUser(null);
    navigate("/");
  };

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo and Title */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
          <img
            src="/src/assets/tz-coat.png"
            alt="Tanzania Coat of Arms"
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-lg text-primary tracking-wide">
            TAMISEMI e-Services
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-secondary transition ${
                isActive ? "text-secondary font-semibold" : ""
              }`
            }
          >
            <Home className="w-4 h-4" /> Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-secondary transition ${
                isActive ? "text-secondary font-semibold" : ""
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </NavLink>
          <NavLink
            to="/vibali"
            className={({ isActive }) =>
              `flex items-center gap-1 hover:text-secondary transition ${
                isActive ? "text-secondary font-semibold" : ""
              }`
            }
          >
            <FileText className="w-4 h-4" /> Vibali
          </NavLink>
          {user && (
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-lg">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{user}</span>
            </div>
          )}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-white/10"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-white/10 shadow-xl animate-slide-down">
          <nav className="flex flex-col items-start p-4 space-y-3 font-medium">
            <NavLink
              to="/"
              onClick={closeMenu}
              className="w-full px-2 py-2 rounded hover:bg-white/10 flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Home
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className="w-full px-2 py-2 rounded hover:bg-white/10 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </NavLink>
            <NavLink
              to="/vibali"
              onClick={closeMenu}
              className="w-full px-2 py-2 rounded hover:bg-white/10 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Vibali
            </NavLink>

            {user && (
              <div className="flex items-center gap-2 mt-3 bg-primary/10 px-3 py-2 rounded-lg w-full justify-between">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary flex-1 text-center">
                  {user}
                </span>
              </div>
            )}

            <div className="flex justify-between w-full pt-3 border-t border-white/10">
              <button
                onClick={handleThemeToggle}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 w-full justify-center"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5 text-yellow-400" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-gray-700" /> Dark Mode
                  </>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition justify-center w-full"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
