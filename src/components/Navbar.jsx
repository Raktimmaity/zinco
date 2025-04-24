import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl md:text-4xl font-bold tracking-wider text-yellow-400">
          <span className="text-white">Miss</span> Ginko
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center text-sm md:text-lg">
          {["home", "about", "menu", "gallery", "events", "contact"].map(
            (section) => (
              <Link
                key={section}
                to={section}
                smooth={true}
                duration={600}
                className="text-white cursor-pointer relative group"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <button className="bg-yellow-400 text-white hover:text-gray-900 font-bold px-4 py-2 rounded-full">
            Sign Up
          </button>
          <button className="text-yellow-400 hover:text-yellow-500">
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-yellow-400 z-50"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 text-white flex flex-col items-center justify-center space-y-6 text-2xl transform transition-transform duration-500 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {["home", "about", "menu", "gallery", "events", "contact"].map(
          (section) => (
            <Link
              key={section}
              to={section}
              smooth={true}
              duration={600}
              onClick={closeMenu}
              className="cursor-pointer hover:text-yellow-400"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Link>
          )
        )}
        <div className="flex gap-6 mt-8">
          <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full">
            Sign Up
          </button>
          <button className="text-yellow-400">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
