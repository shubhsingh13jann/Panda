'use client'

import { useEffect, useState } from 'react'

function PandaPortrait({ variant, cx, cy, r }) {
  const size = r * 2
  const gradientId = `cake-portrait-bg-${variant}-${cx}`

  const palettes = {
    royal_panda: { bg1: '#d1fae5', bg2: '#a7f3d0', crown: '#fbbf24' },
    bamboo_panda: { bg1: '#ecfdf5', bg2: '#d1fae5', crown: '#10b981' },
    cozy_panda: { bg1: '#fffbeb', bg2: '#fde68a', crown: '#f59e0b' },
  }
  const theme = palettes[variant] || palettes.royal_panda

  return (
    <g transform={`translate(${cx - r}, ${cy - r}) scale(${size / 100})`}>
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor={theme.bg1} />
          <stop offset="100%" stopColor={theme.bg2} />
        </radialGradient>
      </defs>

      <rect width="100" height="100" rx="50" fill={`url(#${gradientId})`} />
      
      {/* Sparkles in cameo background */}
      <circle cx="20" cy="25" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="80" cy="30" r="1.8" fill="#fff" opacity="0.8" />
      <circle cx="25" cy="75" r="1.2" fill="#fff" opacity="0.8" />
      <circle cx="75" cy="70" r="1.4" fill="#fff" opacity="0.8" />

      {/* Panda Ears */}
      <circle cx="32" cy="32" r="13" fill="#1e293b" />
      <circle cx="68" cy="32" r="13" fill="#1e293b" />
      <circle cx="32" cy="32" r="6" fill="#f472b6" opacity="0.6" />
      <circle cx="68" cy="32" r="6" fill="#f472b6" opacity="0.6" />

      {/* Panda Head */}
      <ellipse cx="50" cy="54" rx="28" ry="24" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />

      {/* Black Eye Patches */}
      <ellipse cx="38" cy="50" rx="9" ry="11" fill="#1e293b" transform="rotate(-15 38 50)" />
      <ellipse cx="62" cy="50" rx="9" ry="11" fill="#1e293b" transform="rotate(15 62 50)" />

      {/* White Eye Highlights */}
      <circle cx="39" cy="48" r="3" fill="#ffffff" />
      <circle cx="37" cy="52" r="1.2" fill="#ffffff" />
      <circle cx="61" cy="48" r="3" fill="#ffffff" />
      <circle cx="63" cy="52" r="1.2" fill="#ffffff" />

      {/* Pink Blush Cheeks */}
      <circle cx="28" cy="60" r="4.5" fill="#f472b6" opacity="0.6" />
      <circle cx="72" cy="60" r="4.5" fill="#f472b6" opacity="0.6" />

      {/* Nose and Mouth */}
      <ellipse cx="50" cy="58" rx="4.5" ry="3" fill="#0f172a" />
      <path d="M47 62 Q50 65 53 62" stroke="#0f172a" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Variant Accessory */}
      {variant === 'royal_panda' && (
        <g transform="translate(42, 16) scale(0.8)">
          <path d="M 0 14 L 5 2 L 10 10 L 15 2 L 20 14 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <circle cx="5" cy="2" r="1.5" fill="#ef4444" />
          <circle cx="10" cy="10" r="1.5" fill="#10b981" />
          <circle cx="15" cy="2" r="1.5" fill="#3b82f6" />
        </g>
      )}

      {variant === 'bamboo_panda' && (
        <g transform="translate(62, 58) rotate(35)">
          <rect x="0" y="0" width="4" height="24" rx="2" fill="#10b981" />
          <ellipse cx="7" cy="4" rx="5" ry="2" fill="#34d399" transform="rotate(-30 7 4)" />
          <ellipse cx="-3" cy="12" rx="5" ry="2" fill="#34d399" transform="rotate(30 -3 12)" />
        </g>
      )}

      {variant === 'cozy_panda' && (
        <g transform="translate(42, 20)">
          <text x="8" y="4" fontSize="10" fill="#fbbf24" fontWeight="bold">✨</text>
        </g>
      )}
    </g>
  )
}

function Candle({ x, y, scale = 1, lit = true, blowing = false, delay = 0 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Candle stick */}
      <rect x="-6" y="0" width="12" height="42" rx="3" fill="url(#cake-candle-grad)" stroke="#d1fae5" strokeWidth="0.8" />
      {/* Candle stripes */}
      <path d="M-6 8 L6 14" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <path d="M-6 20 L6 26" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <path d="M-6 32 L6 38" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      {/* Wick */}
      <line x1="0" y1="0" x2="0" y2="-7" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />

      {/* Flame */}
      {lit && (
        <g className="cake-candle-flame-group" style={{ animationDelay: `${delay}s` }}>
          <ellipse cx="0" cy="-20" rx="18" ry="26" fill="url(#cake-flame-glow)" />
          <path
            d="M 0 -34 C -7 -22, -9 -14, -6 -9 C -4 -4, 4 -4, 6 -9 C 9 -14, 7 -22, 0 -34 Z"
            fill="url(#cake-flame-outer)"
          />
          <path
            d="M 0 -26 C -4 -18, -5 -13, -3 -9 C -2 -6, 2 -6, 3 -9 C 5 -13, 4 -18, 0 -26 Z"
            fill="url(#cake-flame-inner)"
          />
        </g>
      )}

      {/* Smoke wisps after blow */}
      {blowing && (
        <g className="cake-candle-smoke">
          <path
            d="M 0 -8 Q -5 -18 2 -28 T -1 -44 T 4 -58"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  )
}

function Swirl({ x, y, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`}>
      <path
        d="M 0 0 C 14 -10, 26 2, 20 14 C 14 24, 0 16, 6 6 C 10 -2, 22 2, 20 8"
        stroke="#fbbf24"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
    </g>
  )
}

function TierFrame({ cx, cy, r, panda = 'royal_panda' }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 8} fill="#ffffff" stroke="#fbbf24" strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
      <PandaPortrait variant={panda} cx={cx} cy={cy} r={r} />
    </g>
  )
}

export default function PandaCakeScene({ candleBlown = false, name = 'Gg🐼🥰' }) {
  const [candlesLit, setCandlesLit] = useState(!candleBlown)
  const [showBlowAnimation, setShowBlowAnimation] = useState(false)

  useEffect(() => {
    if (candleBlown) {
      setShowBlowAnimation(true)
      const timer = setTimeout(() => {
        setCandlesLit(false)
      }, 350)
      return () => clearTimeout(timer)
    } else {
      setCandlesLit(true)
      setShowBlowAnimation(false)
    }
  }, [candleBlown])

  const candleLayout = [
    { x: 300, y: 228, scale: 1.15, delay: 0 },
    { x: 265, y: 232, scale: 0.95, delay: 0.2 },
    { x: 335, y: 232, scale: 0.95, delay: 0.4 },
  ]

  return (
    <div className="cake-scene-container" style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      <svg
        viewBox="0 0 600 700"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        aria-label="Birthday Cake for Gg"
      >
        <defs>
          <linearGradient id="cake-bottom-tier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="60%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="cake-mid-tier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="60%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          <linearGradient id="cake-top-tier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="60%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="cake-gold-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="cake-candle-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d1fae5" />
          </linearGradient>

          <radialGradient id="cake-flame-outer">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
          </radialGradient>

          <radialGradient id="cake-flame-inner">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fbbf24" />
          </radialGradient>

          <radialGradient id="cake-flame-glow">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="cake-plate-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="cake-plaque-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>
        </defs>

        {/* Cake Stand / Base Plate */}
        <ellipse cx="300" cy="660" rx="270" ry="22" fill="#064e3b" opacity="0.4" />
        <ellipse cx="300" cy="650" rx="265" ry="18" fill="url(#cake-plate-grad)" stroke="#10b981" strokeWidth="1.5" />
        {Array.from({ length: 40 }).map((_, index) => (
          <circle key={index} cx={40 + index * 13.5} cy="650" r="2.5" fill="#fff" stroke="#10b981" strokeWidth="0.4" />
        ))}

        {/* ══ BOTTOM TIER ══ */}
        <ellipse cx="300" cy="640" rx="240" ry="20" fill="#047857" />
        <rect x="60" y="490" width="480" height="155" rx="6" fill="url(#cake-bottom-tier)" />
        <ellipse cx="300" cy="490" rx="240" ry="20" fill="#a7f3d0" />
        {Array.from({ length: 38 }).map((_, index) => (
          <circle key={index} cx={68 + index * 12.5} cy="490" r="3" fill="#fff" stroke="#fbbf24" strokeWidth="0.6" />
        ))}
        {Array.from({ length: 38 }).map((_, index) => (
          <circle key={`cake-bottom-${index}`} cx={68 + index * 12.5} cy="640" r="3" fill="#fff" stroke="#fbbf24" strokeWidth="0.6" />
        ))}

        <Swirl x="100" y="560" scale={1.3} />
        <Swirl x="180" y="600" scale={1} />
        <Swirl x="450" y="560" scale={1.3} flip />
        <Swirl x="380" y="600" scale={1} flip />

        {/* Center Cameo: Royal Panda */}
        <TierFrame cx="300" cy="580" r={55} panda="royal_panda" />

        {/* Golden Royal Plaque */}
        <g transform="translate(470, 555)">
          <ellipse cx="0" cy="0" rx="60" ry="42" fill="url(#cake-plaque-grad)" stroke="url(#cake-gold-grad)" strokeWidth="2.2" />
          {Array.from({ length: 20 }).map((_, index) => {
            const angle = (index / 20) * Math.PI * 2
            return (
              <circle
                key={index}
                cx={Math.cos(angle) * 60}
                cy={Math.sin(angle) * 42}
                r="1.8"
                fill="#fff"
                stroke="#d97706"
                strokeWidth="0.4"
              />
            )
          })}
          <text x="0" y="-8" textAnchor="middle" fontFamily="'Pacifico', cursive" fontSize="13" fill="#047857">Happy</text>
          <text x="0" y="8" textAnchor="middle" fontFamily="'Pacifico', cursive" fontSize="13" fill="#047857">Birthday</text>
          <text x="0" y="26" textAnchor="middle" fontFamily="'Pacifico', cursive" fontSize="14" fill="#d97706">{name}</text>
        </g>

        {/* Decorative hearts and lotus flowers on bottom tier */}
        <text x="105" y="515" fontSize="18" fill="#10b981">🎋</text>
        <text x="135" y="545" fontSize="16" fill="#f472b6">🌸</text>
        <text x="80" y="570" fontSize="16" fill="#fbbf24">✨</text>
        <text x="225" y="515" fontSize="16" fill="#10b981">🎋</text>

        {/* ══ MIDDLE TIER ══ */}
        <ellipse cx="300" cy="485" rx="180" ry="16" fill="#15803d" />
        <rect x="120" y="360" width="360" height="125" rx="6" fill="url(#cake-mid-tier)" />
        <ellipse cx="300" cy="360" rx="180" ry="16" fill="#86efac" />
        {Array.from({ length: 28 }).map((_, index) => (
          <circle key={index} cx={130 + index * 12.5} cy="360" r="2.7" fill="#fff" stroke="#fbbf24" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 28 }).map((_, index) => (
          <circle key={`cake-mid-${index}`} cx={130 + index * 12.5} cy="485" r="2.7" fill="#fff" stroke="#fbbf24" strokeWidth="0.5" />
        ))}

        <Swirl x="155" y="430" scale={1.1} />
        <Swirl x="425" y="430" scale={1.1} flip />

        {/* Cameo: Bamboo Panda */}
        <TierFrame cx="300" cy="425" r={48} panda="bamboo_panda" />

        <text x="155" y="390" fontSize="16" fill="#10b981">🎋</text>
        <text x="445" y="400" fontSize="16" fill="#f472b6">🌸</text>

        {/* ══ TOP TIER ══ */}
        <ellipse cx="300" cy="355" rx="130" ry="13" fill="#b45309" />
        <rect x="170" y="240" width="260" height="115" rx="6" fill="url(#cake-top-tier)" />
        <ellipse cx="300" cy="240" rx="130" ry="13" fill="#fde68a" />
        {Array.from({ length: 22 }).map((_, index) => (
          <circle key={index} cx={177 + index * 11.5} cy="240" r="2.5" fill="#fff" stroke="#d97706" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 22 }).map((_, index) => (
          <circle key={`cake-top-${index}`} cx={177 + index * 11.5} cy="355" r="2.5" fill="#fff" stroke="#d97706" strokeWidth="0.5" />
        ))}

        <Swirl x="195" y="300" scale={0.95} />
        <Swirl x="395" y="300" scale={0.95} flip />

        {/* Cameo: Cozy Panda */}
        <TierFrame cx="300" cy="300" r={42} panda="cozy_panda" />

        {/* Top Cake Topper Deco */}
        <g transform="translate(300, 225)">
          <text x="-50" y="0" fontSize="16">🌸</text>
          <text x="-20" y="-12" fontSize="18">🎋</text>
          <text x="15" y="-12" fontSize="18">🎋</text>
          <text x="45" y="0" fontSize="16">🌸</text>
        </g>

        {/* Candles */}
        <g transform="translate(0, 195)">
          {candleLayout.map((candle) => (
            <Candle
              key={`${candle.x}-${candle.scale}`}
              x={candle.x}
              y={candle.y}
              scale={candle.scale}
              lit={candlesLit}
              blowing={showBlowAnimation}
              delay={candle.delay}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
