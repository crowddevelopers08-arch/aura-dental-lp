"use client";
import React, { useState } from 'react';

const HNC_LOGO = "https://res.cloudinary.com/du6mjguvb/image/upload/HNC-LOGO-1_vbvcmy";

export default function ClientFeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suggestions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Feedback submitted successfully! Thank you.' });
        setFormData({ name: '', email: '', phone: '', suggestions: '' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit feedback.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const BRAND = '#1D4231';
  const BRAND_HOVER = '#1D4231';

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <div
        className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6"
        style={{ fontFamily: "'Outfit', sans-serif", backgroundColor: '#1D4231' }}
      >
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto my-4">
          {/* Logo Section */}
          <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
            <div className="w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 lg:w-44 lg:h-22 bg-[#ffffff] flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={HNC_LOGO}
                alt="Next Door Nutritionist Logo"
                className="w-full h-full object-contain p-1 sm:p-2"
              />
            </div>
          </div>

          {/* Help Us Improve Section */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3" style={{ color: BRAND }}>
              Help Us Improve!
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-md mx-auto">
              Tell us what didn&apos;t meet your expectations. We genuinely value your feedback and will work on making things better.
            </p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div
              className={`mb-4 p-3 rounded-lg text-center ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm md:text-base font-medium mb-1 sm:mb-2" style={{ color: BRAND }}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{ '--tw-ring-color': BRAND } as React.CSSProperties}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm md:text-base font-medium mb-1 sm:mb-2" style={{ color: BRAND }}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm md:text-base font-medium mb-1 sm:mb-2" style={{ color: BRAND }}>
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Suggestions Field */}
            <div>
              <label htmlFor="suggestions" className="block text-xs sm:text-sm md:text-base font-medium mb-1 sm:mb-2" style={{ color: BRAND }}>
                Your Suggestions *
              </label>
              <textarea
                id="suggestions"
                name="suggestions"
                value={formData.suggestions}
                onChange={handleChange}
                required
                rows={3}
                disabled={isSubmitting}
                className="w-full px-3 py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Share your valuable suggestions and feedback..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full cursor-pointer py-2 sm:py-2 md:py-3 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed mt-3 sm:mt-4"
              style={{ backgroundColor: isSubmitting ? undefined : BRAND }}
              onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = BRAND_HOVER; }}
              onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = BRAND; }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            disabled={isSubmitting}
            className="btn-outline w-full cursor-pointer py-2 sm:py-2 md:py-3 bg-transparent border-2 text-sm sm:text-base md:text-lg font-semibold rounded-lg disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-transparent mt-2 sm:mt-3"
            style={{ borderColor: BRAND, color: BRAND }}
            onMouseEnter={e => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = BRAND;
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={e => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = BRAND;
              }
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
