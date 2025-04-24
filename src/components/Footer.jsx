import React from 'react';

const Footer = () => (
  <>
  <footer className="bg-gray-900 text-white py-6">
    <div className="container mx-auto text-center">
      <p className="text-sm">&copy; Miss Ginko | Open daily: 12:00 PM – 11:15 PM</p>
      <p className="text-sm mt-1">169, Rashbihari Avenue, 3rd Floor, City Mart, Ballygunge, Kolkata</p>
      <a href='tel:+919836311220' className="text-sm">Call us: +91 9836311220</a>
      <div className="mt-2 flex justify-center gap-4 text-yellow-400">
        <a href="#"><i className="fa-brands fa-facebook"></i></a>
        <a href="#"><i className="fa-brands fa-instagram"></i></a>
        <a href="#">X</a>
      </div>
    </div>
  </footer>
  </>
);

export default Footer;
