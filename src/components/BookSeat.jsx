import React from 'react';
import bgImage from '../assets/img/book_seat.jpg'

const BookSeat = () => {
  return (
    <section
      id="book"
      className="relative bg-fixed bg-center bg-cover bg-no-repeat text-white py-32 px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
          Book a Seat Now
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Reserve your spot today and enjoy unforgettable nights with us!
        </p>
        <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold cursor-pointer hover:bg-yellow-500 transition">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default BookSeat;
