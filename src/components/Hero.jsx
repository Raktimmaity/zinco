import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
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

      {/* Overlay for contrast */}
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
        <a
          href="#menu"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition"
        >
          Explore Menu
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
