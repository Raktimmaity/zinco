import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Detect scroll to toggle background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-4xl font-bold tracking-wider text-yellow-400">
          Zinco
        </div>

        {/* Hamburger Button */}
        <button className="md:hidden text-yellow-400" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Items */}
        <nav
          className={`absolute top-full left-0 w-full md:static md:w-auto md:block ${
            isOpen ? "block bg-black" : "hidden md:bg-transparent"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-6 p-4 md:p-0 text-sm md:text-lg">
            {["hero", "about", "menu", "gallery", "events", "contact"].map(
              (section) => (
                <li key={section}>
                  <Link
                    to={section}
                    smooth={true}
                    duration={600}
                    className="text-white cursor-pointer block relative group"
                    onClick={closeMenu}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
        <div className="flex flex-wrap justify-between items-center gap-5">
          <button className="bg-yellow-400 text-white hover:text-gray-900 font-bold p-2 rounded-full cursor-pointer outline-0">
            Sign Up
          </button>
          <button className="text-yellow-400 hover:text-yellow-500 outline-0 cursor-pointer">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
