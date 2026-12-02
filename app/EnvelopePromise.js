'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GLOW_HEARTS_CONFIG = [
  { x: '-36px', y: '16%', size: 24, glow: '#10b981', delay: 0,   dur: 3.2, char: '💚' },
  { x: '-28px', y: '56%', size: 18, glow: '#34d399', delay: 0.8, dur: 2.8, char: '✨' },
  { x: '-42px', y: '82%', size: 26, glow: '#fbbf24', delay: 1.5, dur: 3.5, char: '🎋' },
  { x: '100%',  y: '18%', size: 20, glow: '#fbbf24', delay: 0.4, dur: 3.0, char: '🌸' },
  { x: '100%',  y: '58%', size: 24, glow: '#f472b6', delay: 1.2, dur: 2.7, char: '💖' },
  { x: '100%',  y: '84%', size: 16, glow: '#10b981', delay: 2.0, dur: 3.4, char: '🎋' },
  { x: '24%',   y: '-32px', size: 18, glow: '#10b981', delay: 0.6, dur: 2.9, char: '💚' },
  { x: '52%',   y: '-38px', size: 22, glow: '#fbbf24', delay: 1.3, dur: 3.1, char: '✨' },
  { x: '78%',   y: '-28px', size: 16, glow: '#f472b6', delay: 2.2, dur: 2.6, char: '🌸' },
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

function PandaEnvelopeGraphic({ isHovered = false }) {
  return (
    <svg
      viewBox="0 0 500 370"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        overflow: 'visible',
        filter: 'drop-shadow(0 20px 40px rgba(6, 78, 59, 0.45))',
      }}
      aria-label="Panda Envelope"
      role="img"
    >
      <defs>
        {/* Envelope Body Gradient */}
        <linearGradient id="panda-env-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>

        {/* Panda Head / Flap Gradient */}
        <linearGradient id="panda-env-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>

        {/* Ear Pink Gradient */}
        <radialGradient id="panda-ear-pink" cx="40%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fde2ec" />
          <stop offset="60%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f472b6" />
        </radialGradient>

        {/* Wax Seal Gradient */}
        <radialGradient id="wax-seal-grad" cx="35%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="80%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>

        {/* Soft Drop Shadow for Flap */}
        <filter id="panda-flap-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#064e3b" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* ══ 1. ENVELOPE BODY / POUCH ══ */}
      <rect
        x="25"
        y="65"
        width="450"
        height="280"
        rx="36"
        fill="url(#panda-env-body)"
        stroke="#10b981"
        strokeWidth="2.5"
      />

      {/* Decorative Gold Inner Stitching */}
      <rect
        x="33"
        y="73"
        width="434"
        height="264"
        rx="28"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.2"
        strokeDasharray="5 4"
        opacity="0.8"
      />

      {/* Diagonal Crease Shadows */}
      <path d="M 28 340 L 210 200" stroke="#a7f3d0" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
      <path d="M 472 340 L 290 200" stroke="#a7f3d0" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />

      {/* Bamboo & Floral Corner Accents */}
      <text x="45" y="105" fontSize="20">🎋</text>
      <text x="430" y="105" fontSize="20">🎋</text>
      <text x="45" y="325" fontSize="18">🌸</text>
      <text x="432" y="325" fontSize="18">🌸</text>

      {/* ══ 2. PANDA EARS (Sticking Out of Flap) ══ */}
      {/* Left Ear */}
      <g className="panda-ear-left">
        <circle cx="115" cy="55" r="42" fill="#1e293b" />
        <circle cx="115" cy="55" r="22" fill="url(#panda-ear-pink)" opacity="0.85" />
      </g>
      {/* Right Ear */}
      <g className="panda-ear-right">
        <circle cx="385" cy="55" r="42" fill="#1e293b" />
        <circle cx="385" cy="55" r="22" fill="url(#panda-ear-pink)" opacity="0.85" />
      </g>

      {/* ══ 3. PANDA HEAD FLAP (The Cute Folded Face) ══ */}
      <g filter="url(#panda-flap-shadow)">
        {/* Flap Base Path */}
        <path
          d="M 25 65 Q 250 85 475 65 L 435 155 Q 250 240 65 155 Z"
          fill="url(#panda-env-head)"
          stroke="#cbd5e1"
          strokeWidth="1.8"
        />

        {/* Panda Crown Between Ears */}
        <g transform="translate(250, 48) scale(1.15)">
          <path d="M -22 10 L -12 -6 L 0 4 L 12 -6 L 22 10 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.2" />
          <circle cx="-12" cy="-6" r="2.5" fill="#ef4444" />
          <circle cx="0" cy="4" r="2.8" fill="#10b981" />
          <circle cx="12" cy="-6" r="2.5" fill="#3b82f6" />
        </g>

        {/* Distinctive Slanted Black Eye Patches */}
        <ellipse cx="185" cy="118" rx="34" ry="42" fill="#1e293b" transform="rotate(-16 185 118)" />
        <ellipse cx="315" cy="118" rx="34" ry="42" fill="#1e293b" transform="rotate(16 315 118)" />

        {/* Sparkling Big Anime Panda Eyes with Blinking */}
        <g className="panda-eyes-group">
          {/* Left Eye */}
          <circle cx="189" cy="116" r="14" fill="#0f172a" />
          <circle cx="185" cy="112" r="5.2" fill="#ffffff" />
          <circle cx="193" cy="120" r="2.4" fill="#ffffff" />

          {/* Right Eye */}
          <circle cx="311" cy="116" r="14" fill="#0f172a" />
          <circle cx="307" cy="112" r="5.2" fill="#ffffff" />
          <circle cx="315" cy="120" r="2.4" fill="#ffffff" />
        </g>

        {/* Cute Pink Blushing Cheeks */}
        <circle cx="132" cy="154" r="18" fill="#f472b6" opacity="0.65" />
        <circle cx="368" cy="154" r="18" fill="#f472b6" opacity="0.65" />

        {/* Chubby Cream Snout */}
        <ellipse cx="250" cy="152" rx="40" ry="26" fill="#ffffff" stroke="#f1f5f9" strokeWidth="1.5" />

        {/* Glossy Button Nose */}
        <path
          d="M 238 143 Q 250 137 262 143 Q 266 154 250 161 Q 234 154 238 143 Z"
          fill="#0f172a"
        />
        <ellipse cx="246" cy="142" rx="3.5" ry="2" fill="#ffffff" opacity="0.8" />

        {/* Kawaii Cat/Panda Smile */}
        <path
          d="M 238 165 Q 244 172 250 165 Q 256 172 262 165"
          stroke="#0f172a"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ══ 4. PANDA PAWS (Hugging the Envelope) ══ */}
      {/* Left Paw */}
      <g transform="translate(68, 222) rotate(16)">
        <ellipse cx="0" cy="0" rx="36" ry="28" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
        <ellipse cx="2" cy="4" rx="15" ry="11" fill="#fbcfe8" />
        <circle cx="-14" cy="-14" r="5" fill="#fbcfe8" />
        <circle cx="0" cy="-20" r="5.5" fill="#fbcfe8" />
        <circle cx="14" cy="-14" r="5" fill="#fbcfe8" />
      </g>

      {/* Right Paw */}
      <g transform="translate(432, 222) rotate(-16)">
        <ellipse cx="0" cy="0" rx="36" ry="28" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
        <ellipse cx="-2" cy="4" rx="15" ry="11" fill="#fbcfe8" />
        <circle cx="-14" cy="-14" r="5" fill="#fbcfe8" />
        <circle cx="0" cy="-20" r="5.5" fill="#fbcfe8" />
        <circle cx="14" cy="-14" r="5" fill="#fbcfe8" />
      </g>

      {/* ══ 5. EMBOSSED GOLD WAX SEAL (Tap Target) ══ */}
      <g transform={`translate(250, 230) scale(${isHovered ? 1.08 : 1})`} style={{ transition: 'transform 0.25s ease' }}>
        {/* Ambient Seal Glow */}
        <circle cx="0" cy="0" r="44" fill="#fbbf24" opacity="0.3" filter="blur(6px)" />

        {/* 3D Wax Body */}
        <circle
          cx="0"
          cy="0"
          r="36"
          fill="url(#wax-seal-grad)"
          stroke="#fef08a"
          strokeWidth="2.4"
          filter="drop-shadow(0 8px 20px rgba(180, 83, 9, 0.55))"
        />

        {/* Embossed Inner Border */}
        <circle cx="0" cy="0" r="30" fill="none" stroke="#b45309" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Gold Paw Print in Center */}
        <text
          x="0"
          y="8"
          fontSize="26"
          textAnchor="middle"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))"
        >
          🐾
        </text>
      </g>

      {/* ══ 6. TAP TO OPEN HINT ══ */}
      <g transform="translate(250, 302)">
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontFamily="'Dancing Script', cursive"
          fontSize="20"
          fill="#065f46"
          fontWeight="bold"
          letterSpacing="0.06em"
        >
          ✦ Tap to open, Gg🐼 ✦
        </text>
      </g>
    </svg>
  )
}

export default function EnvelopePromise({ openingEnvelope, onPromise }) {
  const [lidOpen, setLidOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLidClick = () => {
    if (lidOpen || openingEnvelope) return
    setLidOpen(true)
  }

  return (
    <div className="promise-envelope-wrap" style={{ position: 'relative', width: '100%', maxWidth: '520px', margin: '0 auto' }}>
      <AmbientGlowHearts />

      {/* Shadow under the envelope */}
      <div
        className="promise-envelope-shadow"
        style={{
          position: 'absolute',
          bottom: '-18px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '84%',
          height: '32px',
          background: 'radial-gradient(ellipse at center, rgba(6, 78, 59, 0.45) 0%, transparent 72%)',
          filter: 'blur(6px)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 16, delay: 0.12 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="promise-envelope-card" style={{ position: 'relative' }}>
          {/* ══ CLOSED PANDA ENVELOPE COVER ══ */}
          <AnimatePresence>
            {!lidOpen && (
              <motion.div
                className="env-sealed-cover-panda"
                onClick={handleLidClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: 'pointer', zIndex: 5, position: 'relative' }}
                initial={{ y: 0, opacity: 1 }}
                exit={{
                  y: '-110%',
                  opacity: 0,
                  transition: { duration: 0.65, ease: [0.34, 1.1, 0.64, 1] },
                }}
              >
                <PandaEnvelopeGraphic isHovered={isHovered} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══ PROMISE LETTER (Slides Up When Opened) ══ */}
          <div
            style={{
              position: lidOpen ? 'relative' : 'absolute',
              left: 0,
              right: 0,
              top: lidOpen ? 0 : '18%',
              zIndex: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              pointerEvents: lidOpen ? 'auto' : 'none',
            }}
          >
            <motion.div
              className="promise-envelope-letter"
              style={{
                position: 'relative',
                left: 'auto',
                top: 'auto',
                transform: 'none',
                width: '100%',
                maxWidth: '500px',
                padding: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                borderRadius: '28px',
                background: 'linear-gradient(175deg, #ffffff 0%, #f0fdf4 60%, #ecfdf5 100%)',
                boxShadow: '0 24px 60px rgba(6, 78, 59, 0.35), inset 0 0 0 2px rgba(16, 185, 129, 0.3)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                textAlign: 'center',
              }}
              initial={{ opacity: 0, y: 70, scale: 0.94 }}
              animate={lidOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 70, scale: 0.94 }}
              transition={
                lidOpen
                  ? { type: 'spring', stiffness: 95, damping: 18, delay: 0.25 }
                  : { duration: 0 }
              }
            >
              {/* Cute Panda Mascot Mini Badge on Letter */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🎋</span>
                <span style={{ fontSize: '1.8rem' }}>🐼</span>
                <span style={{ fontSize: '1.4rem' }}>🌸</span>
              </div>

              <p className="promise-kicker" style={{ fontSize: '0.82rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#059669', marginBottom: '0.8rem', fontWeight: 700 }}>
                Ek Chhota Sa Promise Pehle, Badi Sis 🐼
              </p>

              <h2 className="promise-title" style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.3rem, 3.2vw, 1.85rem)', color: '#064e3b', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.35 }}>
                First promise me ki aap hamesha muskurati rahengi
              </h2>

              <p className="promise-text" style={{ fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', lineHeight: 1.8, color: '#065f46', marginBottom: '1.8rem' }}>
                Aap hamesha sabka itna khayal rakhti ho, sabko sambhalti ho... par aaj apne chote bhai ko ek pyara sa promise chahiye: chahe din kaisa bhi ho, aap apni smile kabhi khona mat. Aaj ka yeh special surprise tabhi khulega jab meri Gg🐼 yeh promise karegi! 🥹💚
              </p>

              <div className="promise-seal-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <span className="promise-seal-flower" style={{ fontSize: '1.4rem' }}>🎋</span>
                <motion.button
                  type="button"
                  className="promise-button"
                  whileHover={{ scale: 1.06, boxShadow: '0 14px 36px rgba(16,185,129,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPromise}
                  style={{
                    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.6rem, 4vw, 2.4rem)',
                    borderRadius: '999px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 60%, #fbbf24 100%)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    boxShadow: '0 10px 28px rgba(16,185,129,0.35)',
                  }}
                >
                  Promise Karti Hoon 🐼
                </motion.button>
                <span className="promise-seal-flower" style={{ fontSize: '1.4rem' }}>🌸</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
