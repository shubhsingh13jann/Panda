'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

/* ══════════════════════════════════════════════════════════════════
   🐼 MOBILE ORIENTATION BILLBOARD (PRE-SCREEN)
   Shows Queen Panda holding a billboard sign requesting landscape mode!
══════════════════════════════════════════════════════════════════ */
export default function PandaOrientationBillboard({ onProceed }) {
  const [shake, setShake] = useState(false)

  const handleEnter = () => {
    onProceed?.()
  }

  return (
    <section
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'radial-gradient(circle at 50% 30%, #064e3b 0%, #022c22 65%, #01140e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
        color: '#ffffff',
      }}
    >
      <motion.div
        animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        style={{
          width: 'min(92vw, 420px)',
          background: 'rgba(255, 255, 255, 0.96)',
          borderRadius: '24px',
          padding: '24px 20px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 5px rgba(16, 185, 129, 0.35)',
          textAlign: 'center',
          color: '#064e3b',
          boxSizing: 'border-box',
        }}
      >
        <svg viewBox="0 0 200 140" width="150" height="110" style={{ margin: '0 auto', display: 'block' }}>
          <circle cx="65" cy="45" r="22" fill="#1e293b" />
          <circle cx="65" cy="45" r="12" fill="#334155" opacity="0.6" />
          <circle cx="135" cy="45" r="22" fill="#1e293b" />
          <circle cx="135" cy="45" r="12" fill="#334155" opacity="0.6" />
          <ellipse cx="100" cy="75" rx="54" ry="45" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2.5" />
          <ellipse cx="80" cy="74" rx="14" ry="18" transform="rotate(-15 80 74)" fill="#1e293b" />
          <ellipse cx="120" cy="74" rx="14" ry="18" transform="rotate(15 120 74)" fill="#1e293b" />
          <circle cx="81" cy="72" r="5" fill="#ffffff" />
          <circle cx="82" cy="73" r="2.5" fill="#090d16" />
          <circle cx="119" cy="72" r="5" fill="#ffffff" />
          <circle cx="118" cy="73" r="2.5" fill="#090d16" />
          <circle cx="68" cy="88" r="8" fill="#f472b6" opacity="0.6" />
          <circle cx="132" cy="88" r="8" fill="#f472b6" opacity="0.6" />
          <ellipse cx="100" cy="84" rx="6" ry="4.5" fill="#0f172a" />
          <path d="M 95 91 Q 100 95 105 91" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <path d="M 82 42 L 91 52 L 100 36 L 109 52 L 118 42 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          <ellipse cx="55" cy="120" rx="14" ry="11" fill="#1e293b" />
          <ellipse cx="145" cy="120" rx="14" ry="11" fill="#1e293b" />
        </svg>

        <div
          style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: '2px solid #d97706',
            borderRadius: '16px',
            padding: '12px 14px',
            margin: '8px 0 14px',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#92400e', letterSpacing: '1px' }}>
            🎋 PANDA’S BOTANICAL SPECIAL 🎋
          </div>
          <h2
            style={{
              margin: '6px 0 4px',
              fontSize: '1.2rem',
              color: '#78350f',
              fontWeight: 800,
              lineHeight: 1.3,
            }}
          >
            Please Rotate Your Phone to Landscape Mode! 📱🔄
          </h2>
          <p style={{ margin: 0, fontSize: '0.84rem', color: '#854d0e', lineHeight: 1.45 }}>
            Gg, the botanical lake, snow-capped mountains, drinking deer & blooming lotuses are designed for a wide cinematic view!
          </p>
        </div>

        <motion.div
          animate={{ rotate: [0, -90, -90, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '32px', margin: '4px auto 12px', display: 'inline-block' }}
        >
          📱
        </motion.div>

        <button
          onClick={handleEnter}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '24px',
            padding: '12px 20px',
            fontSize: '1rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(16, 185, 129, 0.45)',
          }}
        >
          Enter Enchanted Valley 🌸
        </button>
      </motion.div>
    </section>
  )
}
