"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const HNC_LOGO = "https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910678/aura-logo_ozknpu.jpg";
const GOOGLE_REVIEW_LINK = "https://g.page/r/CeVzC4gxJ2NtEBM/review";
const BRAND = '#1D4231';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
    fill={filled ? BRAND : 'none'}
    stroke={filled ? BRAND : '#94a3b8'}
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 21.24a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

export default function ReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value: number) => {
    setRating(value);
    if (value >= 4) {
      setSubmitted(true);
    } else {
      router.push('/client-feedback');
    }
  };

  const handleChangeRating = () => {
    setRating(0);
    setHovered(0);
    setSubmitted(false);
  };

  return (
    <>
      <div
        className="font-body min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8"
        style={{ backgroundColor: BRAND }}
      >
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto text-center">
          {/* Logo Section */}
          <div className="mb-4 sm:mb-6 lg:mb-8 flex justify-center">
            <div className="w-40 h-20 sm:w-48 sm:h-24 md:w-56 md:h-28 lg:w-64 lg:h-32 bg-[#ffffff] flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={HNC_LOGO}
                alt="Aura Dental Logo"
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>

          {/* Emoji Badge */}
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl"
              style={{ backgroundColor: '#e8f0ec' }}
            >
              {submitted ? '🎉' : '😊'}
            </div>
          </div>

          {!submitted ? (
            <>
              {/* Rating Prompt */}
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3" style={{ color: BRAND }}>
                How was your experience?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto mb-6 sm:mb-8">
                Please rate your visit. Your feedback helps us improve our care.
              </p>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
                    onClick={() => handleSelect(value)}
                    onMouseEnter={() => setHovered(value)}
                    onMouseLeave={() => setHovered(0)}
                    className="cursor-pointer w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl border-2 transition-colors duration-150"
                    style={{
                      borderColor: (hovered || rating) >= value ? BRAND : '#e2e8f0',
                    }}
                  >
                    <StarIcon filled={(hovered || rating) >= value} />
                  </button>
                ))}
              </div>
              <p className="text-xs sm:text-sm font-semibold" style={{ color: BRAND }}>
                Select your rating
              </p>
            </>
          ) : (
            <>
              {/* Thank You */}
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3" style={{ color: BRAND }}>
                Thank you for your feedback!
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto mb-6 sm:mb-8">
                We&apos;re glad you had a good experience.<br />
                Please share it on Google.
              </p>

              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-3 sm:mb-4"
              >
                <button
                  className="btn-primary w-full cursor-pointer flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 sm:py-3 text-white rounded-xl shadow-lg"
                  style={{ backgroundColor: BRAND }}
                >
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center text-blue-600 font-bold text-base sm:text-lg shrink-0">
                    G
                  </span>
                  <span className="text-left flex-1">
                    <span className="block text-sm sm:text-base font-semibold">Leave a Google Review</span>
                    <span className="block text-xs sm:text-sm opacity-80">Share your experience</span>
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    →
                  </span>
                </button>
              </a>

              <button
                onClick={handleChangeRating}
                className="btn-outline w-full cursor-pointer py-2 sm:py-3 bg-transparent border-2 text-sm sm:text-base font-semibold rounded-lg"
                style={{ borderColor: BRAND, color: BRAND }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = BRAND;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = BRAND;
                }}
              >
                Change rating
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
