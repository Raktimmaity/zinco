import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import BookSeat from './components/BookSeat';

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Gallery />
    <Events />
    <Reviews/>
    <BookSeat/>
    <Contact />
    <Footer />
  </>
);

export default Home;
