import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-black text-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl text-yellow-400 font-bold text-center mb-10">Contact Us</h2>
        <form className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <textarea
            rows="5"
            placeholder="Your Message"
            className="p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
          <button type="submit" className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 font-semibold transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
