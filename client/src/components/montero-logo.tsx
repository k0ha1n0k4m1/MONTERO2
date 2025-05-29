import React from "react";

interface MonterologoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function MonteroLogo({ className = "", width = 60, height = 60 }: MonterologoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Градиенты для 3D эффекта */}
      <defs>
        <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f1ea" />
          <stop offset="50%" stopColor="#e8e0d0" />
          <stop offset="100%" stopColor="#d4c4a8" />
        </linearGradient>
        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b49a" />
          <stop offset="100%" stopColor="#a89b84" />
        </linearGradient>
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#00000020"/>
        </filter>
      </defs>

      {/* Тень букв */}
      <g transform="translate(3, 5)" fill="url(#shadowGradient)" opacity="0.3">
        {/* M тень */}
        <path d="M15 20 L15 70 L25 70 L25 35 L35 55 L40 55 L50 35 L50 70 L60 70 L60 20 L45 20 L37.5 45 L30 20 Z" />
        {/* Звездочка тень */}
        <path d="M75 15 L78 25 L88 25 L80 32 L83 42 L75 35 L67 42 L70 32 L62 25 L72 25 Z" />
      </g>

      {/* Основные буквы */}
      <g fill="url(#letterGradient)" filter="url(#dropShadow)">
        {/* Буква M */}
        <path d="M12 18 L12 68 L22 68 L22 33 L32 53 L37 53 L47 33 L47 68 L57 68 L57 18 L42 18 L34.5 43 L27 18 Z" />
        
        {/* Звездочка */}
        <path d="M72 13 L75 23 L85 23 L77 30 L80 40 L72 33 L64 40 L67 30 L59 23 L69 23 Z" />
      </g>

      {/* Блики для 3D эффекта */}
      <g fill="#ffffff" opacity="0.4">
        {/* Блик на M */}
        <path d="M14 20 L14 25 L20 25 L20 68 L22 68 L22 33 L32 53 L35 53 L45 33 L45 25 L55 25 L55 20 L42 20 L34.5 43 L27 20 Z" />
        
        {/* Блик на звездочке */}
        <path d="M72 15 L74 20 L82 20 L77 23 L79 28 L72 25 L70 28 L72 23 L67 20 L75 20 Z" />
      </g>
    </svg>
  );
}