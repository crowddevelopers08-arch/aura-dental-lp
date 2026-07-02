"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const HNC_LOGO = "https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910678/aura-logo_ozknpu.jpg";
const BRAND = '#1D4231';

export default function ClientFeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requestCallback: 'no' as 'yes' | 'no',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value }));
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
        setFormData({ name: '', phone: '', requestCallback: 'no', message: '' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit feedback.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="font-body min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6"
        style={{ backgroundColor: BRAND }}
      >
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-7 md:p-8 w-full max-w-[95vw] sm:max-w-md md:max-w-lg mx-auto my-4">
          {/* Logo Section */}
          <div className="mb-4 sm:mb-6 flex justify-center">
            <div className="w-32 h-16 sm:w-36 sm:h-18 md:w-40 md:h-20 bg-[#ffffff] flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={HNC_LOGO}
                alt="Aura Dental Logo"
                className="w-full h-full object-contain p-1 sm:p-2"
              />
            </div>
          </div>

          {/* Icon Badge */}
          <div className="mb-4 sm:mb-5 flex justify-center">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl"
              style={{ backgroundColor: '#e8f0ec' }}
            >
              💬
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-5 sm:mb-6">
            <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold mb-2" style={{ color: BRAND }}>
              Tell us what went wrong
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-md mx-auto">
              We&apos;re sorry your experience was not perfect. Please share your concern with us.
            </p>
          </div>

          {/* Message Display */}
          {message.text && (
            <div
              className={`mb-4 p-3 rounded-lg text-center text-sm ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold mb-1.5" style={{ color: BRAND }}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{ '--tw-ring-color': BRAND } as React.CSSProperties}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold mb-1.5" style={{ color: BRAND }}>
                  Phone Number
                </label>
                <div
                  className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 transition-all duration-200"
                  style={{ '--tw-ring-color': BRAND } as React.CSSProperties}
                >
                  <span className="text-xs sm:text-sm font-semibold shrink-0" style={{ color: BRAND }}>+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    disabled={isSubmitting}
                    className="w-full min-w-0 bg-transparent text-xs sm:text-sm focus:outline-none disabled:cursor-not-allowed"
                    placeholder="10-digit number"
                  />
                </div>
              </div>
            </div>

            {/* Request a Callback */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5" style={{ color: BRAND }}>
                Request a Callback?
              </label>
              <div className="flex rounded-full border border-gray-200 bg-gray-50 p-1">
                {(['yes', 'no'] as const).map(option => {
                  const checked = formData.requestCallback === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setFormData(prev => ({ ...prev, requestCallback: option }))}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 ${
                        checked ? 'bg-white shadow' : ''
                      }`}
                      style={{ color: BRAND }}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0"
                        style={{ borderColor: BRAND }}
                      >
                        {checked && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />}
                      </span>
                      {option === 'yes' ? 'Yes' : 'No'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm font-semibold mb-1.5" style={{ color: BRAND }}>
                Tell us what went wrong
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                disabled={isSubmitting}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{ '--tw-ring-color': BRAND } as React.CSSProperties}
                placeholder="Write your message here"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full cursor-pointer py-3 text-white text-xs sm:text-sm font-bold tracking-wide uppercase rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed mt-2 shadow-lg"
              style={{ backgroundColor: isSubmitting ? undefined : BRAND }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>

          {/* Change Rating */}
          <div className="flex justify-center mt-4">
            <Link href="/review">
              <button
                type="button"
                disabled={isSubmitting}
                className="cursor-pointer px-6 py-2 text-white text-xs sm:text-sm font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#3f6b56' }}
              >
                Change rating
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
