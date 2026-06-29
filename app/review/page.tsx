"use client";
import React from 'react';

const HNC_LOGO = "https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy";

export default function ReviewPage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
        style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: '#1D4231' }}
      >
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          {/* Logo Section */}
          <div className="mb-4 sm:mb-6 lg:mb-8 flex justify-center">
            <div className="w-40 h-20 sm:w-48 sm:h-24 md:w-56 md:h-28 lg:w-64 lg:h-32 bg-[#ffffff] flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={HNC_LOGO}
                alt="Next Door Nutritionist Logo"
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>

          {/* Click & Review Section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D4231] mb-3 sm:mb-4">
              Click &amp; Review
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
              We&apos;d love to hear your feedback!<br />
              Please click any one of the buttons below to share your review.<br />
              A short review of 4 to 5 lines would be greatly appreciated.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            <a href="https://g.page/r/CeVzC4gxJ2NtEBM/review" target="_blank" rel="noopener noreferrer">
              <button
                className="btn-primary w-full cursor-pointer py-2 sm:py-3 lg:py-4 text-white text-base sm:text-lg lg:text-xl font-semibold rounded-lg shadow-lg"
                style={{ backgroundColor: '#1D4231' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1D4231')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1D4231')}
              >
                Client Review
              </button>
            </a>
            <a href="/client-feedback">
              <button
                className="btn-outline w-full cursor-pointer py-2 sm:py-3 lg:py-4 bg-transparent border-2 text-base sm:text-lg lg:text-xl font-semibold rounded-lg"
                style={{ borderColor: '#1D4231', color: '#1D4231' }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#1D4231';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#1D4231';
                }}
              >
                Client Feedback
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
