'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const GLOW_HEARTS_CONFIG = [
  { x: '-42px', y: '14%', size: 26, glow: '#10b981', delay: 0,   dur: 3.2, char: '💚' },
  { x: '-34px', y: '52%', size: 20, glow: '#34d399', delay: 0.8, dur: 2.8, char: '✨' },
  { x: '-48px', y: '80%', size: 28, glow: '#fbbf24', delay: 1.5, dur: 3.5, char: '🎋' },
  { x: '102%',  y: '16%', size: 22, glow: '#fbbf24', delay: 0.4, dur: 3.0, char: '🌸' },
  { x: '103%',  y: '54%', size: 26, glow: '#f472b6', delay: 1.2, dur: 2.7, char: '💖' },
  { x: '102%',  y: '82%', size: 18, glow: '#10b981', delay: 2.0, dur: 3.4, char: '🎋' },
  { x: '22%',   y: '-36px', size: 20, glow: '#10b981', delay: 0.6, dur: 2.9, char: '💚' },
  { x: '50%',   y: '-44px', size: 24, glow: '#fbbf24', delay: 1.3, dur: 3.1, char: '✨' },
  { x: '80%',   y: '-32px', size: 18, glow: '#f472b6', delay: 2.2, dur: 2.6, char: '🌸' },
]

function AmbientGlowHearts() {
  return (
    <>
      {GLOW_HEARTS_CONFIG.map((h, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: h.x,
            top: h.y,
            fontSize: h.size,
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 10,
            userSelect: 'none',
          }}
          animate={{
            y: [0, -18, 0],
            scale: [0.85, 1.25, 0.85],
            opacity: [0.55, 1, 0.55],
            filter: [
              `drop-shadow(0 0 6px ${h.glow}) drop-shadow(0 0 12px ${h.glow})`,
              `drop-shadow(0 0 14px ${h.glow}) drop-shadow(0 0 28px ${h.glow})`,
              `drop-shadow(0 0 6px ${h.glow}) drop-shadow(0 0 12px ${h.glow})`,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: h.dur,
            delay: h.delay,
            ease: 'easeInOut',
          }}
        >
          {h.char}
        </motion.div>
      ))}
    </>
  )
}

function SealSparkleBurst({ active }) {
  if (!active) return null

  const sparkles = [
    { char: '✨', x: -80, y: -70, s: 1.4, d: 0 },
    { char: '💚', x: 75,  y: -65, s: 1.2, d: 0.05 },
    { char: '🐾', x: -95, y: 15,  s: 1.3, d: 0.08 },
    { char: '🎋', x: 85,  y: 25,  s: 1.2, d: 0.02 },
    { char: '🌸', x: -45, y: -90, s: 1.1, d: 0.07 },
    { char: '✨', x: 50,  y: -85, s: 1.5, d: 0.04 },
    { char: '💖', x: -60, y: 70,  s: 1.2, d: 0.09 },
    { char: '🌸', x: 60,  y: 75,  s: 1.1, d: 0.06 },
    { char: '🐾', x: 0,   y: -105, s: 1.3, d: 0.03 },
    { char: '✨', x: 0,   y: 95,   s: 1.4, d: 0.05 },
    { char: '🎋', x: -110, y: -25, s: 1.2, d: 0.08 },
    { char: '💚', x: 105,  y: -20, s: 1.3, d: 0.06 },
  ]

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        top: '55%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {sparkles.map((sp, idx) => (
        <motion.span
          key={idx}
          initial={{ x: 0, y: 0, scale: 0.3, opacity: 1, rotate: 0 }}
          animate={{
            x: sp.x * 1.5,
            y: sp.y * 1.5,
            scale: [0.3, sp.s, 0],
            opacity: [1, 1, 0],
            rotate: sp.x > 0 ? 120 : -120,
          }}
          transition={{ duration: 0.9, delay: sp.d, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            fontSize: '1.4rem',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          {sp.char}
        </motion.span>
      ))}
    </div>
  )
}

export default function EnvelopePromise({ openingEnvelope, onPromise }) {
  const [lidOpen, setLidOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  const handleLidClick = () => {
    if (lidOpen || openingEnvelope) return
    setShowSparkles(true)
    setLidOpen(true)
    setTimeout(() => setShowSparkles(false), 1200)
  }

  return (
    <div
      className="promise-envelope-wrap"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '680px',
        margin: '0 auto',
      }}
    >
      <AmbientGlowHearts />
      <SealSparkleBurst active={showSparkles} />

      {/* Ambient shadow beneath the envelope */}
      <div
        className="promise-envelope-shadow"
        style={{
          position: 'absolute',
          bottom: '-28px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '88%',
          height: '42px',
          background: 'radial-gradient(ellipse at center, rgba(6, 78, 59, 0.55) 0%, transparent 72%)',
          filter: 'blur(10px)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ══ 3D ENVELOPE STAGE ══ */}
      <div
        className="promise-envelope-stage"
        onClick={handleLidClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '370px',
          perspective: '1400px',
          transformStyle: 'preserve-3d',
          cursor: lidOpen ? 'default' : 'pointer',
        }}
      >
        {/* ── 1. ENVELOPE BACK WALL, CROWN, & EARS (zIndex: 1) ── */}
        <svg
          viewBox="0 0 600 370"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            filter: 'drop-shadow(0 24px 48px rgba(6, 78, 59, 0.45))',
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="panda-env-back-lining" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#042f2e" />
              <stop offset="50%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
            <linearGradient id="panda-gold-rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <radialGradient id="panda-back-ear-pink" cx="40%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#fde2ec" />
              <stop offset="60%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" />
            </radialGradient>
          </defs>

          {/* Fluffy Panda Ears on Envelope Top Rim */}
          <g className="panda-ear-left">
            <circle cx="130" cy="42" r="44" fill="#1e293b" />
            <circle cx="130" cy="42" r="24" fill="url(#panda-back-ear-pink)" opacity="0.85" />
          </g>
          <g className="panda-ear-right">
            <circle cx="470" cy="42" r="44" fill="#1e293b" />
            <circle cx="470" cy="42" r="24" fill="url(#panda-back-ear-pink)" opacity="0.85" />
          </g>

          {/* Panda Royal Crown Between Ears */}
          <g transform="translate(300, 34) scale(1.25)">
            <path d="M -22 10 L -12 -6 L 0 4 L 12 -6 L 22 10 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.2" />
            <circle cx="-12" cy="-6" r="2.6" fill="#ef4444" />
            <circle cx="0" cy="4" r="3" fill="#10b981" />
            <circle cx="12" cy="-6" r="2.6" fill="#3b82f6" />
          </g>

          {/* Back wall solid rounded body */}
          <rect
            x="20"
            y="50"
            width="560"
            height="300"
            rx="36"
            fill="url(#panda-env-back-lining)"
            stroke="url(#panda-gold-rim)"
            strokeWidth="3"
          />

          {/* Inner gold stitching on back lining */}
          <rect
            x="28"
            y="58"
            width="544"
            height="284"
            rx="28"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.2"
            strokeDasharray="6 5"
            opacity="0.65"
          />
        </svg>

        {/* ── 2. PROMISE LETTER / CARD (Slides Up From Inside Envelope) ── */}
        <motion.div
          className="promise-envelope-letter"
          initial={false}
          animate={
            lidOpen
              ? {
                  y: -115,
                  scale: 1,
                  opacity: 1,
                }
              : {
                  y: 40,
                  scale: 0.92,
                  opacity: 0,
                }
          }
          transition={{
            type: 'spring',
            stiffness: 85,
            damping: 15,
            delay: lidOpen ? 0.32 : 0,
          }}
          style={{
            position: 'relative',
            zIndex: lidOpen ? 30 : 2,
            width: '92%',
            maxWidth: '580px',
            margin: '0 auto',
            padding: 'clamp(1.5rem, 3.5vw, 2.3rem)',
            borderRadius: '28px',
            background: 'linear-gradient(175deg, #ffffff 0%, #f0fdf4 65%, #ecfdf5 100%)',
            boxShadow: '0 28px 70px rgba(6, 78, 59, 0.45), 0 0 0 2px rgba(16, 185, 129, 0.35)',
            border: '2px solid rgba(251, 191, 36, 0.55)',
            textAlign: 'center',
            pointerEvents: lidOpen ? 'auto' : 'none',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Crown & Panda Badges */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎋</span>
            <span style={{ fontSize: '1.4rem' }}>👑</span>
            <span style={{ fontSize: '2.1rem' }}>🐼</span>
            <span style={{ fontSize: '1.4rem' }}>👑</span>
            <span style={{ fontSize: '1.5rem' }}>🌸</span>
          </div>

          <p
            className="promise-kicker"
            style={{
              fontSize: 'clamp(0.8rem, 1.8vw, 0.92rem)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#059669',
              marginBottom: '0.7rem',
              fontWeight: 800,
            }}
          >
            Ek Chhota Sa Promise Pehle, Badi Sis 🐼
          </p>

          <h2
            className="promise-title"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(1.35rem, 3.4vw, 2rem)',
              color: '#064e3b',
              fontWeight: 800,
              marginBottom: '1rem',
              lineHeight: 1.35,
            }}
          >
            First promise me ki aap hamesha muskurati rahengi
          </h2>

          <p
            className="promise-text"
            style={{
              fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
              lineHeight: 1.85,
              color: '#065f46',
              marginBottom: '1.8rem',
            }}
          >
            Aap hamesha sabka itna khayal rakhti ho, sabko sambhalti ho... par aaj apne chote bhai ko ek pyara sa promise chahiye: chahe din kaisa bhi ho, aap apni smile kabhi khona mat. Aaj ka yeh special surprise tabhi khulega jab meri Gg🐼 yeh promise karegi! 🥹💚
          </p>

          <div
            className="promise-seal-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <span className="promise-seal-flower" style={{ fontSize: '1.5rem' }}>🎋</span>
            <motion.button
              type="button"
              className="promise-button"
              whileHover={{ scale: 1.06, boxShadow: '0 16px 40px rgba(16,185,129,0.55)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onPromise}
              style={{
                padding: 'clamp(0.8rem, 2vw, 1.1rem) clamp(1.8rem, 4vw, 2.6rem)',
                borderRadius: '999px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 60%, #fbbf24 100%)',
                color: '#ffffff',
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '0 12px 32px rgba(16,185,129,0.4)',
              }}
            >
              Promise Karti Hoon 🐼
            </motion.button>
            <span className="promise-seal-flower" style={{ fontSize: '1.5rem' }}>🌸</span>
          </div>
        </motion.div>

        {/* ── 3. ENVELOPE FRONT POUCH (Fully Enclosed Corners with Hugging Paws) (zIndex: 10) ── */}
        <svg
          viewBox="0 0 600 370"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="panda-pouch-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#d1fae5" />
            </linearGradient>
            <radialGradient id="panda-paw-pink" cx="40%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#fde2ec" />
              <stop offset="60%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" />
            </radialGradient>
          </defs>

          {/* Front pouch pocket with fully-enclosed top corners and dipped card opening */}
          <path
            d="M 20 100 L 20 80 Q 20 50 56 50 L 90 50 Q 300 135 510 50 L 544 50 Q 580 50 580 80 L 580 314 Q 580 350 544 350 L 56 350 Q 20 350 20 314 Z"
            fill="url(#panda-pouch-body)"
            stroke="#10b981"
            strokeWidth="2.5"
          />

          {/* Decorative Gold Inner Stitching on Front Pouch */}
          <path
            d="M 30 100 L 30 82 Q 30 60 58 60 L 90 60 Q 300 145 510 60 L 542 60 Q 570 60 570 82 L 570 312 Q 570 340 542 340 L 58 340 Q 30 340 30 312 Z"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.2"
            strokeDasharray="6 5"
            opacity="0.8"
          />

          {/* Diagonal Crease Highlights */}
          <path d="M 28 342 L 245 205" stroke="#a7f3d0" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
          <path d="M 572 342 L 355 205" stroke="#a7f3d0" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />

          {/* Bamboo & Floral Corner Accents */}
          <text x="50" y="325" fontSize="22">🎋</text>
          <text x="525" y="325" fontSize="22">🎋</text>
          <text x="46" y="115" fontSize="20">🌸</text>
          <text x="528" y="115" fontSize="20">🌸</text>

          {/* ══ HUGGING PANDA PAWS (Resting on Envelope Edges) ══ */}
          {/* Left Paw */}
          <g transform="translate(68, 222) rotate(16)">
            <ellipse cx="0" cy="0" rx="38" ry="30" fill="#1e293b" stroke="#334155" strokeWidth="1.4" />
            <ellipse cx="2" cy="4" rx="16" ry="12" fill="url(#panda-paw-pink)" />
            <circle cx="-15" cy="-15" r="5.2" fill="url(#panda-paw-pink)" />
            <circle cx="0" cy="-21" r="5.8" fill="url(#panda-paw-pink)" />
            <circle cx="15" cy="-15" r="5.2" fill="url(#panda-paw-pink)" />
          </g>

          {/* Right Paw */}
          <g transform="translate(532, 222) rotate(-16)">
            <ellipse cx="0" cy="0" rx="38" ry="30" fill="#1e293b" stroke="#334155" strokeWidth="1.4" />
            <ellipse cx="-2" cy="4" rx="16" ry="12" fill="url(#panda-paw-pink)" />
            <circle cx="-15" cy="-15" r="5.2" fill="url(#panda-paw-pink)" />
            <circle cx="0" cy="-21" r="5.8" fill="url(#panda-paw-pink)" />
            <circle cx="15" cy="-15" r="5.2" fill="url(#panda-paw-pink)" />
          </g>

          {/* Tap to open hint at bottom when closed */}
          {!lidOpen && (
            <g transform="translate(300, 316)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fontFamily="'Dancing Script', cursive"
                fontSize="22"
                fill="#065f46"
                fontWeight="bold"
                letterSpacing="0.08em"
              >
                ✦ Tap to open, Gg🐼 ✦
              </text>
            </g>
          )}
        </svg>

        {/* ── 4. 3D TOP HINGED PANDA FLAP (Completely Covers Upper Envelope) ── */}
        <motion.div
          className="promise-envelope-flap-3d"
          initial={false}
          animate={
            lidOpen
              ? {
                  rotateX: -168,
                  zIndex: 2,
                }
              : {
                  rotateX: 0,
                  zIndex: 20,
                }
          }
          transition={{
            duration: 0.75,
            ease: [0.34, 1.25, 0.64, 1],
          }}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: '50% 50px',
            transformStyle: 'preserve-3d',
            pointerEvents: lidOpen ? 'none' : 'auto',
          }}
        >
          {/* Front Face: Kawaii Panda Flap with Full-Span Top Coverage & 3D Wax Seal */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <svg
              viewBox="0 0 600 370"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                overflow: 'visible',
              }}
            >
              <defs>
                <linearGradient id="panda-flap-face" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="65%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <radialGradient id="panda-wax-seal" cx="35%" cy="32%" r="65%">
                  <stop offset="0%" stopColor="#fef9c3" />
                  <stop offset="38%" stopColor="#fbbf24" />
                  <stop offset="80%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </radialGradient>
                <filter id="flap-drop-shadow" x="-10%" y="-10%" width="120%" height="135%">
                  <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#064e3b" floodOpacity="0.35" />
                </filter>
              </defs>

              {/* Full-width triangular Flap Path that completely seals the upper envelope */}
              <g filter="url(#flap-drop-shadow)">
                <path
                  d="M 20 50 L 20 85 Q 160 145 300 230 Q 440 145 580 85 L 580 50 Z"
                  fill="url(#panda-flap-face)"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />

                {/* Inner Gold Stitching on Flap */}
                <path
                  d="M 28 58 L 28 82 Q 160 138 300 218 Q 440 138 572 82 L 572 58"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.2"
                  strokeDasharray="5 4"
                  opacity="0.8"
                />

                {/* Distinctive Slanted Black Eye Patches */}
                <ellipse cx="225" cy="115" rx="36" ry="44" fill="#1e293b" transform="rotate(-14 225 115)" />
                <ellipse cx="375" cy="115" rx="36" ry="44" fill="#1e293b" transform="rotate(14 375 115)" />

                {/* Sparkling Big Anime Panda Eyes with Blinking */}
                <g className="panda-eyes-group">
                  {/* Left Eye */}
                  <circle cx="229" cy="113" r="15" fill="#0f172a" />
                  <circle cx="225" cy="109" r="5.5" fill="#ffffff" />
                  <circle cx="233" cy="117" r="2.6" fill="#ffffff" />

                  {/* Right Eye */}
                  <circle cx="371" cy="113" r="15" fill="#0f172a" />
                  <circle cx="367" cy="109" r="5.5" fill="#ffffff" />
                  <circle cx="375" cy="117" r="2.6" fill="#ffffff" />
                </g>

                {/* Rosy Blushing Cheeks */}
                <circle cx="160" cy="144" r="20" fill="#f472b6" opacity="0.65" />
                <circle cx="440" cy="144" r="20" fill="#f472b6" opacity="0.65" />

                {/* Chubby Cream Snout */}
                <ellipse cx="300" cy="146" rx="44" ry="30" fill="#ffffff" stroke="#f1f5f9" strokeWidth="1.5" />

                {/* Glossy Button Nose */}
                <path
                  d="M 288 136 Q 300 130 312 136 Q 316 147 300 154 Q 284 147 288 136 Z"
                  fill="#0f172a"
                />
                <ellipse cx="296" cy="134" rx="3.6" ry="2.2" fill="#ffffff" opacity="0.8" />

                {/* Kawaii Cat/Panda Smile */}
                <path
                  d="M 288 155 Q 294 163 300 155 Q 306 163 312 155"
                  stroke="#0f172a"
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>

              {/* ══ EMBOSSED 3D GOLD WAX SEAL (Tap Target) ══ */}
              <g
                transform={`translate(300, 215) scale(${isHovered ? 1.1 : 1})`}
                style={{ transition: 'transform 0.25s ease' }}
              >
                {/* Ambient Seal Glow */}
                <circle cx="0" cy="0" r="48" fill="#fbbf24" opacity="0.35" filter="blur(8px)" />

                {/* 3D Wax Body */}
                <circle
                  cx="0"
                  cy="0"
                  r="38"
                  fill="url(#panda-wax-seal)"
                  stroke="#fef08a"
                  strokeWidth="2.6"
                  filter="drop-shadow(0 8px 24px rgba(180, 83, 9, 0.6))"
                />

                {/* Embossed Inner Border */}
                <circle cx="0" cy="0" r="32" fill="none" stroke="#b45309" strokeWidth="1.4" strokeDasharray="4 3" />

                {/* Gold Paw Print in Center */}
                <text
                  x="0"
                  y="9"
                  fontSize="28"
                  textAnchor="middle"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
                >
                  🐾
                </text>
              </g>
            </svg>
          </div>

          {/* Back Face: Silk Diamond Lining shown when rotated -168deg */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
            }}
          >
            <svg
              viewBox="0 0 600 370"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                overflow: 'visible',
              }}
            >
              <defs>
                <linearGradient id="panda-flap-back-lining" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#042f2e" />
                  <stop offset="50%" stopColor="#064e3b" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
              </defs>

              {/* Flap interior path matching exact flap shape */}
              <path
                d="M 20 50 L 20 85 Q 160 145 300 230 Q 440 145 580 85 L 580 50 Z"
                fill="url(#panda-flap-back-lining)"
                stroke="#fbbf24"
                strokeWidth="2.5"
              />

              {/* Gold stitching on interior */}
              <path
                d="M 28 58 L 28 82 Q 160 138 300 218 Q 440 138 572 82 L 572 58"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="1.2"
                strokeDasharray="6 5"
                opacity="0.75"
              />

              {/* Diamond Silk Center Emblem */}
              <text x="300" y="140" fontSize="28" textAnchor="middle" opacity="0.85">🎋 👑 🎋</text>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
