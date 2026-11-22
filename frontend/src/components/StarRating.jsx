import React, { useState } from 'react';

const RATING_LABELS = {
  1: '1 - Needs improvement',
  2: '2 - Fair',
  3: '3 - Good',
  4: '4 - Very good',
  5: '5 - Outstanding',
};

export default function StarRating({ value, onChange, disabled = false, error = false }) {
  const [hoverValue, setHoverValue] = useState(0);

  const activeRating = hoverValue || value || 0;

  const handleKeyDown = (e, starIndex) => {
    if (disabled) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(5, (value || 0) + 1);
      onChange(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const prev = Math.max(1, (value || 1) - 1);
      onChange(prev);
    } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
      e.preventDefault();
      onChange(parseInt(e.key, 10));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(starIndex);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex flex-wrap items-center gap-2 -ml-1 focus:outline-none"
        role="radiogroup"
        aria-label="Rating from 1 to 5 stars"
        aria-required="true"
        onMouseLeave={() => setHoverValue(0)}
      >
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= activeRating;
            const isSelected = star === value;

            return (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                tabIndex={disabled ? -1 : star === (value || 1) ? 0 : -1}
                disabled={disabled}
                onClick={() => onChange(star)}
                onMouseEnter={() => !disabled && setHoverValue(star)}
                onKeyDown={(e) => handleKeyDown(e, star)}
                className={`p-1 rounded-sm transition-transform transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#cbfb45] ${
                  disabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:scale-110 active:scale-95'
                }`}
              >
                <svg
                  className={`w-7 h-7 transition-colors duration-150 ${
                    isFilled
                      ? 'text-[#cbfb45] fill-[#cbfb45]'
                      : error
                      ? 'text-[#ff5555]/60 fill-transparent hover:text-[#ff5555]'
                      : 'text-[#363948] fill-transparent hover:text-[#9699a6]'
                  }`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Selected Rating Description */}
        <span className="font-mono text-xs text-[#9699a6] sm:ml-2">
          {activeRating > 0 ? (
            <span className="text-[#f5f5f3] font-medium">{RATING_LABELS[activeRating]}</span>
          ) : (
            <span className="text-[#626573]">Select a rating (1-5)</span>
          )}
        </span>
      </div>
    </div>
  );
}
