import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Time check logic
  const checkBarStatus = () => {
    // const now = new Date();
    // const hours = now.getHours();

    // // Open from 6 PM (18) to 2 AM (2)
    // const open = (hours >= 11 || hours < 2);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Open from 12:00 PM (12:00) to 11:15 PM (23:15)
    const isAfterOpening = currentHour > 12 || (currentHour === 12 && currentMinute >= 0);
    // const isBeforeClosing = currentHour < 23 || (currentHour === 12 && currentMinute <= 46);
    const isBeforeClosing = currentHour < 23 || (currentHour === 23 && currentMinute <= 15);

    const open = isAfterOpening && isBeforeClosing;

    setIsOpen(open);
  };

  useEffect(() => {
    checkBarStatus(); // initial check
    const interval = setInterval(checkBarStatus, 1000); // update every minute

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.log('Playback prevented:', err);
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center text-white text-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bar-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full mix-blend-multiply bg-gray-400 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 p-10 rounded-xl max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Where Nights Come Alive</h1>
        <p className="mb-6 text-lg md:text-xl">Craft cocktails, live music, and unforgettable vibes.</p>

        {/* Open/Closed Status */}
        <div className={`mb-6 font-semibold inline-block py-2 px-3 rounded-xl ${isOpen ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}>
          {isOpen ? 'We are Open Now' : 'Currently Closed'}
        </div>
        <br />
        <a
          href="#menu"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition animate-bounce"
        >
          Explore More <i className="fa-regular fa-circle-down"></i>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
