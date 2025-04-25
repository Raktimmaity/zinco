import React, { useState, useEffect } from "react";
import { scroller } from "react-scroll";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Modal Component with Framer Motion
const Modal = ({ show, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white text-black rounded-2xl w-[90%] max-w-md p-6 relative shadow-xl"
            initial={{ scale: 0.9, y: -30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupError, setSignupError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError(true);
    } else {
      setLoginError(false);
      alert("Logged in!");
      setShowLogin(false);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      setSignupError(true);
    } else {
      setSignupError(false);
      alert("Registered successfully!");
      setShowSignup(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    if (section === "home") {
      navigate("/");
    } else if (section === "menu") {
      navigate("/menu");
    } else {
      if (location.pathname === "/") {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 600,
          offset: -70,
        });
      } else {
        navigate("/", { state: { scrollTo: section } });
      }
    }
    closeMenu();
  };

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 600,
        offset: -70,
      });
    }
  }, [location]);

  const sections = ["home", "about", "menu", "gallery", "events", "contact"];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 p-2 ${
          scrolled ? "bg-black shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-3xl md:text-4xl font-bold tracking-wider text-yellow-400">
            <NavLink to="/">
              <span className="text-white">Miss</span>Ginko
            </NavLink>
          </div>

          <nav className="hidden md:flex gap-8 items-center text-sm md:text-lg">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className="text-white cursor-pointer relative group bg-transparent"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex gap-4 items-center">
            <button
              className="bg-yellow-400 text-white hover:text-gray-900 font-bold px-4 py-2 rounded-full"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
            <button
              className="text-yellow-400 hover:text-yellow-500"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>

          <button className="md:hidden text-yellow-400 z-50" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 text-white flex flex-col items-center justify-center space-y-6 text-2xl transform transition-transform duration-500 md:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className="cursor-pointer hover:text-yellow-400 bg-transparent"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <div className="flex gap-6 mt-8">
            <button
              className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-full"
              onClick={() => {
                closeMenu();
                setShowSignup(true);
              }}
            >
              Sign Up
            </button>
            <button
              className="text-yellow-400"
              onClick={() => {
                closeMenu();
                setShowLogin(true);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Signup Modal */}
      <Modal show={showSignup} onClose={() => setShowSignup(false)} title="Sign Up">
        <form className="space-y-4" onSubmit={handleSignupSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full px-4 py-2 border rounded outline-none ${
              signupError && !signupName ? "border-red-500 animate-shake" : ""
            }`}
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-2 border rounded outline-none ${
              signupError && !signupEmail ? "border-red-500 animate-shake" : ""
            }`}
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-2 border rounded outline-none ${
              signupError && !signupPassword ? "border-red-500 animate-shake" : ""
            }`}
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <button type="submit" className="bg-yellow-400 w-full py-2 rounded text-white font-bold">
            Register
          </button>
        </form>
      </Modal>

      {/* Login Modal */}
      <Modal show={showLogin} onClose={() => setShowLogin(false)} title="Login">
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-2 border rounded ${
              loginError && !loginEmail ? "border-red-500 animate-shake" : ""
            }`}
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full px-4 py-2 border rounded ${
              loginError && !loginPassword ? "border-red-500 animate-shake" : ""
            }`}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit" className="bg-yellow-400 w-full py-2 rounded text-white font-bold">
            Login
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Navbar;
