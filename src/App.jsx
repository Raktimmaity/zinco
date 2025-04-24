import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Gallery />
    <Events />
    <Contact />
    <Footer />
  </>
);

export default Home;
