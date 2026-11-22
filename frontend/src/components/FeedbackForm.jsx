import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import StarRating from './StarRating';
import { API_BASE_URL, PORTFOLIO_CONFIG } from '../config/portfolio';

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 1000;

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Design & UI',
    rating: 0,
    message: '',
    website: '', // Honeypot field for bot spam prevention
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const charCount = formData.message.length;
  const isMessageTooShort = charCount > 0 && charCount < MIN_MESSAGE_LENGTH;
  const isMessageTooLong = charCount > MAX_MESSAGE_LENGTH;

  const validateFrontend = () => {
    const errors = {};
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      errors.rating = 'Please choose a rating between 1 and 5 stars.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Feedback message is required.';
    } else if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
      errors.message = `Please enter at least ${MIN_MESSAGE_LENGTH} characters (currently ${formData.message.trim().length}).`;
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      errors.message = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
    }
    if (!formData.category) {
      errors.category = 'Please select a category.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleRatingChange = (newRating) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
    if (validationErrors.rating) {
      setValidationErrors((prev) => ({ ...prev, rating: null }));
    }
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: If filled, silently pretend to accept or abort
    if (formData.website) {
      console.warn('Bot submission prevented via honeypot field.');
      setStatus('error');
      setErrorMessage('Automated submission rejected.');
      return;
    }

    const errors = validateFrontend();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/api/feedback`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim() || 'Anonymous',
          category: formData.category,
          rating: Number(formData.rating),
          message: formData.message.trim(),
          honeypot: formData.website,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.status === 201 && data?.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          category: 'Design & UI',
          rating: 0,
          message: '',
          website: '',
        });
        setValidationErrors({});
      } else if (response.status === 429) {
        setStatus('error');
        setErrorMessage(
          data?.message || 'Submission rate limit reached. Please wait a few minutes before submitting again.'
        );
      } else {
        setStatus('error');
        setErrorMessage(
          data?.message || `Server responded with status ${response.status}. Please check input.`
        );
      }
    } catch (err) {
      console.error('Feedback network error:', err);
      setStatus('error');
      setErrorMessage(
        'Unable to connect to the feedback server. Please ensure the Python Flask backend is running on port 5001.'
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setValidationErrors({});
  };

  return (
    <div className="surface-card p-6 md:p-9 border border-[#1e2029] relative overflow-hidden">
      {/* Decorative corner tag (responsive, non-overlapping) */}
      <div className="hidden sm:block absolute top-4 right-5 font-mono text-[0.68rem] text-[#626573] tracking-widest uppercase">
        SYS.ENDPOINT: POST /api/feedback
      </div>

      {status === 'success' ? (
        <div className="py-12 px-4 flex flex-col items-center text-center max-w-md mx-auto animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-[#cbfb45]/10 border border-[#cbfb45]/30 flex items-center justify-center text-[#cbfb45] mb-5">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#f5f5f3] tracking-tight mb-2">
            Feedback received. Thank you.
          </h3>
          <p className="text-sm text-[#9699a6] mb-8 leading-relaxed">
            Your response has been successfully saved to the SQLite database. Your feedback helps
            improve future projects and code quality.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary text-xs"
          >
            Submit another response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot field (hidden from real users, traps bots) */}
          <div aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
            <label htmlFor="website-field">Leave this empty</label>
            <input
              type="text"
              id="website-field"
              name="website"
              tabIndex={-1}
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          {/* Form Header info */}
          <div className="border-b border-[#1e2029] pb-3">
            <p className="text-xs text-[#9699a6] font-mono">
              Fields marked with an asterisk (<span className="text-[#cbfb45]">*</span>) are required.
            </p>
          </div>

          {/* Error Banner */}
          {status === 'error' && errorMessage && (
            <div
              className="p-4 rounded-sm bg-[#ff5555]/10 border border-[#ff5555]/30 text-[#ff8080] text-sm flex items-start gap-3 animate-shake"
              role="alert"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block text-xs tracking-wider uppercase font-mono">
                  Submission error
                </span>
                <p className="text-xs mt-0.5 text-[#ffb0b0]">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Row 1: Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs text-[#9699a6] mb-2 font-medium"
              >
                Name <span className="text-[#626573] font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={80}
                placeholder="Your name (optional)"
                disabled={status === 'submitting'}
                className="form-input text-sm h-11"
              />
              <span className="block mt-1.5 font-mono text-[0.68rem] text-[#626573]">
                Defaults to Anonymous if left blank
              </span>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block font-mono text-xs text-[#9699a6] mb-2 font-medium"
              >
                Feedback Category <span className="text-[#cbfb45]">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="form-select text-sm appearance-none cursor-pointer pr-10 h-11"
                >
                  {PORTFOLIO_CONFIG.feedback.categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#121318] text-[#f5f5f3]">
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#626573]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Star Rating */}
          <div className="pt-1">
            <label className="block font-mono text-xs text-[#9699a6] mb-2 font-medium">
              Rating <span className="text-[#cbfb45]">*</span>
            </label>
            <StarRating
              value={formData.rating}
              onChange={handleRatingChange}
              disabled={status === 'submitting'}
              error={Boolean(validationErrors.rating)}
            />
            {validationErrors.rating && (
              <p className="mt-1.5 font-mono text-xs text-[#ff6b6b] flex items-center gap-1">
                <AlertCircle size={12} /> {validationErrors.rating}
              </p>
            )}
          </div>

          {/* Row 3: Message Textarea */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="message"
                className="font-mono text-xs text-[#9699a6] font-medium"
              >
                Feedback Message <span className="text-[#cbfb45]">*</span>
              </label>
              <span
                className={`font-mono text-[0.7rem] ${
                  isMessageTooLong
                    ? 'text-[#ff6b6b] font-bold'
                    : isMessageTooShort
                    ? 'text-[#e5c07b]'
                    : 'text-[#626573]'
                }`}
                aria-live="polite"
              >
                {charCount} / {MAX_MESSAGE_LENGTH} characters
                {isMessageTooShort && ` (min ${MIN_MESSAGE_LENGTH})`}
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Tell me what you think, what could be improved, or what you'd like to see..."
              className={`form-textarea text-sm resize-y min-h-[110px] ${
                validationErrors.message ? 'border-[#ff5555]' : ''
              }`}
            />
            {validationErrors.message && (
              <p className="mt-1.5 font-mono text-xs text-[#ff6b6b] flex items-center gap-1">
                <AlertCircle size={12} /> {validationErrors.message}
              </p>
            )}
          </div>

          {/* Submit Action Area */}
          <div className="pt-3 border-t border-[#181921] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary text-xs font-mono uppercase tracking-wider self-start sm:self-auto"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit feedback ↗
                </>
              )}
            </button>

            <span className="font-mono text-[0.7rem] text-[#626573]">
              Persists securely in SQLite database
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
