'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EcologyModal({ activeSpecimen, onClose }) {
  return (
    <AnimatePresence>
      {activeSpecimen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            background: 'rgba(7, 13, 30, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.88, y: 20 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 'min(92vw, 480px)',
              background: 'linear-gradient(155deg, #ffffff 0%, #f8fafc 40%, #f1f5f9 100%)',
              border: '1.5px solid #38bdf8',
              borderRadius: '24px',
              padding: '24px 22px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 4px rgba(255,255,255,0.85)',
              color: '#0f172a',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '12px',
                right: '14px',
                background: 'rgba(15, 23, 42, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontSize: '14px',
                cursor: 'pointer',
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '36px' }}>{activeSpecimen.icon}</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: 800 }}>
                  {activeSpecimen.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Times New Roman', serif",
                    fontStyle: 'italic',
                    color: '#0284c7',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {activeSpecimen.latin}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span
                style={{
                  background: 'rgba(2, 132, 199, 0.12)',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: '#0369a1',
                }}
              >
                {activeSpecimen.badge}
              </span>
              <span
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  padding: '3px 10px',
                  borderRadius: '10px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: '#047857',
                }}
              >
                Family: {activeSpecimen.family}
              </span>
            </div>

            <div
              style={{
                background: '#ffffff',
                borderLeft: '4px solid #0284c7',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '0.86rem',
                lineHeight: 1.5,
                marginBottom: '12px',
                color: '#334155',
              }}
            >
              <strong>🔬 Scientific Insight:</strong> {activeSpecimen.science}
            </div>

            <div
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '1.2rem',
                lineHeight: 1.4,
                color: '#065f46',
                fontWeight: 700,
                textAlign: 'center',
                background: '#ecfdf5',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px dashed #10b981',
              }}
            >
              {activeSpecimen.sisterNote}
            </div>

            <button
              onClick={onClose}
              style={{
                marginTop: '14px',
                width: '100%',
                padding: '9px 0',
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Close Field Note 🌿
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
