import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/navbar")
      .then((res) => {
        setLogo(res.data.logo || null);
        setNavLinks(res.data.links || []);
      })
      .catch(() => {
        setNavLinks([]);
      });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo ? `http://localhost:5000/uploads/${logo}` : "/default-logo.png"}
              alt="Logo"
              className="h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-base lg:text-lg font-medium tracking-wide transition-colors duration-200 hover:text-orange-500",
                  location.pathname === link.path ? "text-orange-500" : "text-black"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-black"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t animate-slideDown">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium py-2 tracking-wide",
                    location.pathname === link.path ? "text-orange-500" : "text-gray-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
