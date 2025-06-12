'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight,} from 'react-icons/fi';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/app/lib/firebase'; // Your existing Firebase config import

interface HeroImage {
  alt: string;
  imageUrl: string;
  position: number;
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState<HeroImage[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);

  // Fetch images directly from Firebase
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'HeroCarousal', 'Images');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const images: HeroImage[] = [];

          // Extract all image fields (image1, image2, etc.)
          Object.keys(data).forEach(key => {
            if (key.startsWith('image')) {
              images.push({
                alt: data[key].alt,
                imageUrl: data[key].imageUrl,
                position: data[key].position
              });
            }
          });

          // Sort by position
          images.sort((a, b) => a.position - b.position);
          setSlides(images);
          setImageLoaded(new Array(images.length).fill(false));
        }
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  useEffect(() => {
    if (slides.length === 0) return;
    
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, nextSlide, slides.length]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-stone-300 border-t-amber-600 rounded-full animate-spin"></div>
          <p className="text-stone-600 text-lg">Loading carousel...</p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
        <div className="text-center">
          <p className="text-stone-600 text-xl">No images found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-amber-50 to-stone-100">
      <div className="relative w-full h-[85vh] overflow-hidden group rounded-3xl shadow-2xl">
        {/* Slides Container */}
        <div 
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full relative">
              {/* Image Loading Skeleton */}
              {!imageLoaded[index] && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-stone-200 to-amber-100 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                </div>
              )}
              
              <img
                src={slide.imageUrl}
                alt={slide.alt}
                className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
                  imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                loading="eager"
                onLoad={() => handleImageLoad(index)}
              />
              
              {/* Gradient Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-amber-100/20 backdrop-blur-md text-stone-800 hover:bg-amber-200/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
          aria-label="Previous image"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-amber-100/20 backdrop-blur-md text-stone-800 hover:bg-amber-200/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
          aria-label="Next image"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Enhanced Controls Panel */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-6 bg-stone-100/20 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
          {/* Dots Navigation */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index 
                    ? 'w-8 h-3 bg-amber-200 shadow-md' 
                    : 'w-3 h-3 bg-stone-300/50 hover:bg-stone-300/70'
                }`}
                aria-label={`Go to image ${index + 1}`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          
        </div>

        {/* Slide Counter */}
        <div className="absolute top-6 right-6 z-20 bg-stone-800/50 backdrop-blur-sm rounded-full px-4 py-2 text-amber-100 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>{currentSlide + 1}</span>
          <span className="mx-1 opacity-60">/</span>
          <span className="opacity-60">{slides.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-200/20 z-10">
          <div 
            className="h-full bg-amber-200 transition-all duration-300 ease-out"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}