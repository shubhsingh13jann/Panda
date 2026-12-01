'use client'
import { useState, useRef, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'

const HEART_CONFIG = [
  { x: '-38px', y: '15%',  size: 22, color: '#10b981', glow: '#10b981', delay: 0,    dur: 3.2 },
  { x: '-28px', y: '55%',  size: 16, color: '#34d399', glow: '#34d399', delay: 0.8,  dur: 2.8 },
  { x: '-44px', y: '80%',  size: 26, color: '#059669', glow: '#059669', delay: 1.6,  dur: 3.6 },
  { x: '100%',  y: '20%',  size: 18, color: '#fbbf24', glow: '#fbbf24', delay: 0.4,  dur: 3.0 },
  { x: '100%',  y: '60%',  size: 24, color: '#f472b6', glow: '#f472b6', delay: 1.2,  dur: 2.6 },
  { x: '100%',  y: '85%',  size: 14, color: '#6ee7b7', glow: '#6ee7b7', delay: 2.0,  dur: 3.4 },
  { x: '22%',   y: '-28px',size: 16, color: '#10b981', glow: '#10b981', delay: 0.6,  dur: 2.9 },
  { x: '55%',   y: '-34px',size: 20, color: '#fbbf24', glow: '#fbbf24', delay: 1.4,  dur: 3.1 },
  { x: '78%',   y: '-24px',size: 14, color: '#f472b6', glow: '#f472b6', delay: 2.2,  dur: 2.7 },
]

function GlowHearts() {
  return (
    <>
      {HEART_CONFIG.map((h, i) => (
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
            filter: `drop-shadow(0 0 6px ${h.glow}) drop-shadow(0 0 14px ${h.glow})`,
            userSelect: 'none',
          }}
          animate={{
            y: [0, -18, 0],
            scale: [0.85, 1.25, 0.85],
            opacity: [0.55, 1, 0.55],
            filter: [
              `drop-shadow(0 0 5px ${h.glow}) drop-shadow(0 0 10px ${h.glow})`,
              `drop-shadow(0 0 12px ${h.glow}) drop-shadow(0 0 28px ${h.glow})`,
              `drop-shadow(0 0 5px ${h.glow}) drop-shadow(0 0 10px ${h.glow})`,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: h.dur,
            delay: h.delay,
            ease: 'easeInOut',
          }}
        >
          {i % 3 === 0 ? '💚' : i % 3 === 1 ? '✨' : '💖'}
        </motion.div>
      ))}
    </>
  )
}

function SparkleCloud() {
  const ref = useRef()
  const count = 75

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      [0.063, 0.725, 0.506], // emerald
      [0.2, 0.85, 0.6],      // mint
      [0.98, 0.75, 0.15],    // gold
      [0.96, 0.45, 0.71],    // blush pink
      [1, 1, 1],             // white sparkle
    ]
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 2.0 + Math.random() * 1.5
      pos[i * 3]     = Math.cos(angle) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1
      const c = palette[i % palette.length]
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2]
    }
    return { positions: pos, colors: col }
  }, [count])

  const phases = useMemo(() => Float32Array.from({ length: count }, () => Math.random() * Math.PI * 2), [count])
  const speeds = useMemo(() => Float32Array.from({ length: count }, () => 0.6 + Math.random() * 0.9), [count])
  const baseY  = useMemo(() => Float32Array.from({ length: count }, (_, i) => positions[i * 3 + 1]), [count, positions])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] = baseY[i] + Math.sin(t * speeds[i] + phases[i]) * 0.24
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.material.opacity = 0.5 + 0.4 * Math.abs(Math.sin(t * 0.35))
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.075} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function EnvelopePromise({ openingEnvelope, onPromise }) {
  const [lidOpen, setLidOpen] = useState(false)

  const handleLidClick = () => {
    if (lidOpen || openingEnvelope) return
    setLidOpen(true)
  }

  return (
    <div className="promise-envelope-wrap" style={{ position: 'relative' }}>
      <GlowHearts />

      {/* Three.js sparkle canvas */}
      <div style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 0,
        borderRadius: '16px', overflow: 'hidden',
      }}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 55 }}
          gl={{ alpha: true, antialias: false }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <SparkleCloud />
          </Suspense>
        </Canvas>
      </div>

      <div className="promise-envelope-shadow" aria-hidden="true" />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 16, delay: 0.12 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="promise-envelope">

          {/* Panda ears — rounded black ears with inner tint */}
          <div className="promise-panda-ears" aria-hidden="true">
            <motion.span
              className="promise-panda-ear promise-panda-ear-left"
              animate={{ rotate: [-6, 4, -6], y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              style={{ display: 'block' }}
            />
            <motion.span
              className="promise-panda-ear promise-panda-ear-right"
              animate={{ rotate: [6, -4, 6], y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3.7, ease: 'easeInOut' }}
              style={{ display: 'block' }}
            />
          </div>

          {/* Panda face — distinctive black eye patches with glossy pupils, blush, and cute snout */}
          <div className="promise-panda-face" aria-hidden="true" style={{ zIndex: 8 }}>
            <motion.span
              className="promise-panda-eye-patch promise-panda-eye-left"
              animate={{ scaleY: [1, 0.08, 1] }}
              transition={{ repeat: Infinity, duration: 0.25, ease: 'easeInOut', repeatDelay: 3.5 }}
              style={{ display: 'block' }}
            >
              <span className="promise-panda-pupil" />
            </motion.span>
            <motion.span
              className="promise-panda-eye-patch promise-panda-eye-right"
              animate={{ scaleY: [1, 0.08, 1] }}
              transition={{ repeat: Infinity, duration: 0.25, ease: 'easeInOut', repeatDelay: 3.8 }}
              style={{ display: 'block' }}
            >
              <span className="promise-panda-pupil" />
            </motion.span>
            <span className="promise-panda-snout">
              <span className="promise-panda-nose" />
            </span>
          </div>

          {/* Envelope body */}
          <div className="promise-envelope-body" aria-hidden="true" />

          {/* Sealed cover */}
          <AnimatePresence>
            {!lidOpen && (
              <motion.div
                className="env-sealed-cover"
                onClick={handleLidClick}
                style={{ cursor: 'pointer', zIndex: 5 }}
                initial={{ y: 0, opacity: 1 }}
                exit={{
                  y: '-105%',
                  opacity: 0,
                  transition: { duration: 0.55, ease: [0.34, 1.1, 0.64, 1] },
                }}
              >
                <div className="env-cover-crease env-cover-crease-left"  aria-hidden="true" />
                <div className="env-cover-crease env-cover-crease-right" aria-hidden="true" />

                <motion.div
                  className="env-wax-seal"
                  animate={{ scale: [1, 1.07, 1], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                >
                  <span className="env-wax-paw">🐾</span>
                </motion.div>

                <motion.div
                  className="env-tap-hint"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  ✦ Tap to open Gg🐼 ✦
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Letter */}
          <div style={{
            position: 'absolute',
            left: 0, right: 0,
            top: '18%',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            pointerEvents: lidOpen ? 'auto' : 'none',
          }}>
            <motion.div
              className="promise-envelope-letter"
              style={{
                position: 'relative',
                left: 'auto',
                top: 'auto',
                transform: 'none',
                width: 'min(86%, 520px)',
              }}
              initial={{ opacity: 0, y: 80 }}
              animate={lidOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={lidOpen
                ? { type: 'spring', stiffness: 85, damping: 18, delay: 0.3 }
                : { duration: 0 }
              }
            >
              <p className="promise-kicker">Ek Chhota Sa Promise Pehle Badi Sis 🐼</p>
              <h2 className="promise-title">First promise me ki aap hamesha muskurati rahengi</h2>
              <p className="promise-text">
                Aap hamesha sabka itna khayal rakhti ho, sabko sambhalti ho... par aaj apne chote bhai ko ek pyara sa promise chahiye: chahe din kaisa bhi ho, aap apni smile kabhi khona mat. Aaj ka yeh special surprise tabhi khulega jab meri Gg🐼 yeh promise karegi! 🥹💚
              </p>
              <div className="promise-seal-row">
                <span className="promise-seal-flower">🎋</span>
                <motion.button
                  type="button"
                  className="promise-button"
                  whileHover={{ scale: 1.06, boxShadow: '0 14px 36px rgba(16,185,129,0.45)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPromise}
                >
                  Promise Karti Hoon 🐼
                </motion.button>
                <span className="promise-seal-flower">🌸</span>
              </div>
            </motion.div>
          </div>

          {/* Panda paws resting on envelope flap */}
          <AnimatePresence>
            {!lidOpen && (
              <motion.div
                className="promise-panda-paws"
                aria-hidden="true"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
              >
                <motion.span
                  className="promise-panda-paw promise-panda-paw-left"
                  animate={{ rotate: [-8, 2, -8] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  style={{ display: 'block' }}
                />
                <motion.span
                  className="promise-panda-paw promise-panda-paw-right"
                  animate={{ rotate: [8, -2, 8] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.4 }}
                  style={{ display: 'block' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  )
}
