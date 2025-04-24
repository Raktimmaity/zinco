import React, { useState, useEffect } from 'react';
import gallery1 from '../assets/img/gallery1.jpg';
import gallery2 from '../assets/img/gallery2.jpg';
import gallery3 from '../assets/img/gallery3.jpg';
import gallery4 from '../assets/img/gallery4.jpg';
import gallery5 from '../assets/img/gallery5.jpg';
import gallery6 from '../assets/img/gallery6.jpg';

const galleryImages = [
  { src: gallery1, caption: "Cocktail Hour Vibes" },
  { src: gallery2, caption: "Live DJ Night" },
  { src: gallery3, caption: "Classy Interior" },
  { src: gallery4, caption: "Signature Drinks" },
  { src: gallery5, caption: "The Buzzing Bar" },
  { src: gallery6, caption: "Evening Lounge" },
];

const Gallery = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const openLightbox = (img, index) => {
    setLightboxImage(img);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setCurrentImageIndex(null);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPreviousImage();
    } else if (e.key === 'ArrowRight') {
      goToNextImage();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  useEffect(() => {
    if (lightboxImage) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxImage]);

  return (
    <section id="gallery" className="bg-black text-white py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl text-yellow-400 font-bold text-center mb-10">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative cursor-pointer group"
              onClick={() => openLightbox(img, index)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg flex items-center justify-center text-sm">
                <span className="text-yellow-400 font-semibold">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-3xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-yellow-400 text-2xl font-bold z-10"
            >
              ✕
            </button>

            {/* Previous Arrow */}
            <button
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
            >
              &#10094;
            </button>

            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].caption}
              className="w-full rounded-lg"
            />

            {/* Next Arrow */}
            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
            >
              &#10095;
            </button>

            <p className="text-yellow-400 text-center mt-4">{galleryImages[currentImageIndex].caption}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
