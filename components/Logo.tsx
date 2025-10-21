import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: 'rgb(236, 72, 153)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgb(190, 24, 93)', stopOpacity: 1 }} />
      </radialGradient>
      <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g transform="rotate(15 50 50)" filter="url(#dropShadow)">
      {/* 'O' - Circle */}
      <circle
        cx="50"
        cy="50"
        r="40"
        strokeWidth="12"
        fill="none"
        stroke="url(#circleGradient)"
      />
      {/* 'X' - Cross */}
      <line
        x1="30"
        y1="30"
        x2="70"
        y2="70"
        strokeWidth="12"
        strokeLinecap="round"
        stroke="url(#crossGradient)"
      />
      <line
        x1="70"
        y1="30"
        x2="30"
        y2="70"
        strokeWidth="12"
        strokeLinecap="round"
        stroke="url(#crossGradient)"
      />
    </g>
  </svg>
);