import { slides } from '@constants/home/slides';
import React from 'react';

const SectionIntro = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  return (
    <section className="relative py-16 px-4 md:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex justify-center mb-8">
          <p className="section-title text-center text-blue-900 font-bold text-2xl md:text-3xl lg:text-4xl">
            GIỚI THIỆU
          </p>
        </div>

        <div className="relative">
          <div className="backdrop-blur-sm rounded-3xl overflow-hidden">
            <div className="relative min-h-[320px] md:min-h-[280px] h-full">
              {slides?.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out 
                    px-12 md:px-16 py-2
                    ${
                      index === activeSlide
                        ? 'opacity-100 translate-x-0'
                        : index < activeSlide
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${slide.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                      >
                        {slide.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-blue-900">
                        {slide.title}
                      </h3>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify flex-1">
                      {slide.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-100/60 hover:bg-blue-200/80 rounded-full flex items-center justify-center text-blue-700 hover:text-blue-900 transition-all duration-300 hover:shadow-lg shadow-inner z-10 backdrop-blur-sm border border-blue-200/30"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-100/60 hover:bg-blue-200/80 rounded-full flex items-center justify-center text-blue-700 hover:text-blue-900 transition-all duration-300 hover:shadow-lg shadow-inner z-10 backdrop-blur-sm border border-blue-200/30"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 font-medium">
              {activeSlide + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionIntro;
