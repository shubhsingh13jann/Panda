'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'

const PALETTE = [
  { body: '#10b981', highlight: '#a7f3d0' },
  { body: '#f43f5e', highlight: '#ffd1dc' },
  { body: '#fbbf24', highlight: '#fef3c7' },
  { body: '#3b82f6', highlight: '#bfdbfe' },
  { body: '#8b5cf6', highlight: '#ddd6fe' },
  { body: '#ec4899', highlight: '#fbcfe8' },
  { body: '#14b8a6', highlight: '#ccfbf1' },
  { body: '#f97316', highlight: '#ffedd5' },
]

const SHAYARI = `"तुम हँसो तो घर में रौनक आ जाए,
                तुम्हारी डांट में भी प्यार छुपा नज़र आए 🥹💚
                जब भी कभी मैं परेशान हुआ,
                सबसे पहले तुम्हारी ही याद आए 🥺🐼
                ऐसी कोई जगह नहीं इस दुनिया में,
                जहाँ मुझे अपनी प्यारी Gg🐼 की याद न आए 💛🌸"`

function generateBalloons() {
  const count = 6 + Math.floor(Math.random() * 3)
  const usedColors = [...PALETTE].sort(() => Math.random() - 0.5)

  return Array.from({ length: count }, (_, i) => {
    const slot = (i + 0.5) / count
    return {
      id: i,
      xPct: 0.12 + slot * 0.76 + (Math.random() * 0.04 - 0.02),
      yPct: 0.08 + Math.random() * 0.18,
      color: usedColors[i % usedColors.length],
      axPct: 0.01 + Math.random() * 0.014,
      ayPct: 0.018 + Math.random() * 0.022,
      dur: 3.2 + Math.random() * 2.4,
      delay: Math.random() * 1.6,
      tilt: Math.random() * 6 - 3,
    }
  })
}

function useScreenSize() {
  const [size, setSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 800,
    h: typeof window !== 'undefined' ? window.innerHeight : 600,
  }))

  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

function Balloon({ balloon, sw, sh, knotX, knotY, popped, onPop }) {
  const x = balloon.xPct * sw
  const y = balloon.yPct * sh
  const r = Math.max(26, Math.min(52, sw * 0.044))
  const ry = r * 1.22
  const ax = balloon.axPct * sw
  const ay = balloon.ayPct * sh
  const { color, dur, delay, tilt } = balloon

  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)

  const stringD = useTransform([offsetX, offsetY], ([ox, oy]) => {
    const bx = x + ox
    const by = y + ry + 8 + oy
    return `M ${bx} ${by} C ${bx} ${(by + knotY) / 2}, ${(bx + knotX) / 2} ${(by + knotY) / 2 + 30}, ${knotX} ${knotY}`
  })

  const confetti = useMemo(
    () =>
      Array.from({ length: 16 }).map(() => ({
        angle: Math.random() * Math.PI * 2,
        dist: 70 + Math.random() * 60,
        size: 4 + Math.random() * 5,
      })),
    []
  )

  return (
    <g style={{ pointerEvents: popped ? 'none' : 'auto' }}>
      <AnimatePresence>
        {!popped && (
          <motion.path
            d={stringD}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.4"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!popped && (
          <motion.g
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, ax, -ax * 0.6, ax * 0.4, 0],
              y: [0, -ay, ay * 0.6, -ay * 0.3, 0],
            }}
            exit={{ opacity: 0, scale: 1.7, transition: { duration: 0.25 } }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              x: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay },
              y: { duration: dur * 1.15, repeat: Infinity, ease: 'easeInOut', delay },
            }}
            style={{ transformOrigin: `${x}px ${y}px`, cursor: 'pointer' }}
            onClick={() => onPop(balloon.id)}
            onUpdate={(latest) => {
              offsetX.set(typeof latest.x === 'number' ? latest.x : 0)
              offsetY.set(typeof latest.y === 'number' ? latest.y : 0)
            }}
          >
            <motion.g
              animate={{ rotate: [0, tilt, -tilt, tilt * 0.5, 0] }}
              transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <ellipse cx={x} cy={y} rx={r} ry={ry} fill={color.body} stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
              <ellipse cx={x} cy={y + ry * 0.25} rx={r - 4} ry={ry * 0.6} fill={color.body} opacity="0.35" style={{ filter: 'blur(8px)' }} />
              <ellipse cx={x - r * 0.3} cy={y - ry * 0.32} rx={r * 0.24} ry={ry * 0.3} fill={color.highlight} opacity="0.9" />
              <ellipse cx={x - r * 0.39} cy={y - ry * 0.43} rx={r * 0.087} ry={ry * 0.107} fill="white" opacity="0.85" />
              <polygon points={`${x - 6},${y + ry + 1} ${x + 6},${y + ry + 1} ${x},${y + ry + 9}`} fill={color.body} />
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {popped && (
        <g>
          {confetti.map((piece, index) => (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r={piece.size}
              fill={color.body}
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                cx: x + Math.cos(piece.angle) * piece.dist,
                cy: y + Math.sin(piece.angle) * piece.dist,
                scale: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            />
          ))}
        </g>
      )}
    </g>
  )
}

function Envelope({
  cx,
  cy,
  knotX,
  knotY,
  envW,
  envH,
  stage,
  onOpened,
  onLetterClick,
  shayari,
  showShayari,
  hideEnvelope,
}) {
  const opening = stage === 'opening' || stage === 'shayari'
  const left = cx - envW / 2
  const right = cx + envW / 2
  const top = cy - envH / 2
  const bottom = cy + envH / 2
  const foldCy = cy - envH * 0.04

  const flapPathClosed = `M ${left} ${top} L ${cx} ${cy + envH * 0.14} L ${right} ${top} Z`
  const flapPathOpen = `M ${left} ${top} L ${cx} ${top - envH * 0.72} L ${right} ${top} Z`

  const flapDetailClosed = `M ${left + 6} ${top + 3} L ${cx} ${cy + envH * 0.11} L ${right - 6} ${top + 3}`
  const flapDetailOpen = `M ${left + 6} ${top - 3} L ${cx} ${top - envH * 0.68} L ${right - 6} ${top - 3}`

  const cardW = Math.min(540, envW * 2.2)
  const cardH = Math.min(320, envH * 1.8)
  const cardFs = Math.max(16, Math.min(24, envW * 0.085))

  return (
    <g>
      <defs>
        <linearGradient id="panda-env-body" x1="0.1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="45%" stopColor="#d1fae5" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </linearGradient>
        <radialGradient id="panda-env-seal" cx="30%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="60%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
        <linearGradient id="panda-env-letter" x1="0" y1="0" x2="0.05" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
      </defs>

      <line x1={cx} y1={top} x2={knotX} y2={knotY} stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />

      <AnimatePresence>
        {!hideEnvelope && (
          <motion.g
            initial={{ opacity: 0, y: envH * 0.5, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.62,
              y: envH * 0.25,
              transition: { duration: 0.55, ease: [0.4, 0, 1, 1] },
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <rect x={left} y={top} width={envW} height={envH} rx="8" fill="url(#panda-env-body)" stroke="#10b981" strokeWidth="1.5" />
            <rect x={left + 7} y={top + 7} width={envW - 14} height={envH - 14} rx="5" fill="none" stroke="#059669" strokeWidth="0.7" strokeDasharray="3 5" opacity="0.5" />

            <AnimatePresence>
              {opening && !showShayari && (
                <motion.g
                  initial={{ y: envH * 0.28, opacity: 0 }}
                  animate={{ y: -(envH * 0.1), opacity: 1 }}
                  exit={{
                    y: -(envH * 0.9),
                    opacity: 0,
                    transition: { duration: 0.42, ease: [0.4, 0, 1, 1] },
                  }}
                  transition={{
                    y: { delay: 0.52, duration: 0.62, ease: [0.25, 1, 0.5, 1] },
                    opacity: { delay: 0.32, duration: 0.3 },
                  }}
                  onAnimationComplete={() => {
                    if (stage === 'opening') onOpened?.()
                  }}
                >
                  <rect
                    x={left + 15}
                    y={top + 12}
                    width={envW - 30}
                    height={envH - 18}
                    rx="5"
                    fill="url(#panda-env-letter)"
                    stroke="#a7f3d0"
                    strokeWidth="1"
                    style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))', cursor: 'pointer' }}
                    onClick={onLetterClick}
                  />
                  <text
                    x={cx}
                    y={top + envH * 0.37}
                    textAnchor="middle"
                    fontFamily="'Dancing Script', cursive"
                    fontSize={Math.max(18, envW * 0.13)}
                    fill="#10b981"
                    fontWeight="700"
                  >
                    🎋
                  </text>
                </motion.g>
              )}
            </AnimatePresence>

            <polygon points={`${left},${bottom} ${cx},${foldCy} ${right},${bottom}`} fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
            <polygon points={`${left},${top} ${left},${bottom} ${cx},${foldCy}`} fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5" />
            <polygon points={`${right},${top} ${right},${bottom} ${cx},${foldCy}`} fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5" />

            <motion.path
              initial={{ d: flapPathClosed }}
              animate={{
                d: opening ? flapPathOpen : flapPathClosed,
                fill: opening ? '#ecfdf5' : '#d1fae5',
              }}
              transition={{
                d: { duration: 0.88, delay: 0.08, ease: [0.37, 0, 0.63, 1] },
                fill: { duration: 0.45, delay: 0.42 },
              }}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {!opening && (
              <circle cx={cx} cy={foldCy} r={envW * 0.085} fill="url(#panda-env-seal)" stroke="#78350f" strokeWidth="1.5" />
            )}
          </motion.g>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShayari && (
          <motion.foreignObject
            x={cx - cardW / 2}
            y={cy - cardH - envH * 0.65}
            width={cardW}
            height={cardH}
            initial={{ opacity: 0, y: 36, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.72, transition: { duration: 0.35 } }}
            transition={{ duration: 0.78, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'visible', transformOrigin: `${cx}px ${cy - cardH * 0.5}px`, transformBox: 'fill-box' }}
          >
            <div
              onClick={onLetterClick}
              style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                background: 'linear-gradient(155deg, #ffffff 0%, #f0fdf4 50%, #ecfdf5 100%)',
                border: '1.5px solid #a7f3d0',
                borderRadius: '20px',
                padding: `${Math.max(14, cardH * 0.07)}px ${Math.max(18, cardW * 0.055)}px`,
                boxShadow: '0 30px 70px rgba(16,185,129,0.25), 0 0 0 5px rgba(255,255,255,0.65)',
                fontFamily: "'Dancing Script', cursive",
                color: '#064e3b',
                whiteSpace: 'pre-line',
                fontSize: `${cardFs}px`,
                lineHeight: 1.45,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: `${Math.max(6, cardH * 0.025)}px`,
                boxSizing: 'border-box',
              }}
            >
              <div style={{ fontSize: `${Math.max(14, cardFs * 0.6)}px`, color: '#10b981' }}>
                🎋 ✦ 🐼 ✦ 🎋
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{shayari}</div>
              <div style={{ width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, #34d399, transparent)' }} />
              <div
                style={{
                  fontSize: `${Math.max(10, cardFs * 0.45)}px`,
                  color: '#059669',
                  fontFamily: 'system-ui, sans-serif',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  fontWeight: 600,
                }}
              >
                ✦ tap to bloom lotus ✦
              </div>
            </div>
          </motion.foreignObject>
        )}
      </AnimatePresence>
    </g>
  )
}

function Lotus({ cx, cy, scale = 1, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 4800)
    return () => clearTimeout(timer)
  }, [onComplete])

  const layers = [
    { key: 'outer', count: 8, scale: 1.25, grad: 'lotusOuter', delay: 1.2 },
    { key: 'mid', count: 7, scale: 0.95, grad: 'lotusMid', delay: 0.9 },
    { key: 'inner', count: 6, scale: 0.65, grad: 'lotusInner', delay: 0.6 },
    { key: 'core', count: 5, scale: 0.42, grad: 'lotusCore', delay: 0.35 },
  ]

  const petalPath = (px, py) => `
    M ${px} ${py}
    C ${px - 26} ${py - 12}, ${px - 42} ${py - 42}, ${px - 32} ${py - 72}
    C ${px - 24} ${py - 90}, ${px - 10} ${py - 99}, ${px} ${py - 96}
    C ${px + 10} ${py - 99}, ${px + 24} ${py - 90}, ${px + 32} ${py - 72}
    C ${px + 42} ${py - 42}, ${px + 26} ${py - 12}, ${px} ${py} Z
  `

  return (
    <g transform={`translate(${cx},${cy}) scale(${scale}) translate(${-cx},${-cy})`}>
      <defs>
        <linearGradient id="lotusOuter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="lotusMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="lotusInner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="lotusCore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {layers.map((layer) => (
        <g key={layer.key}>
          {Array.from({ length: layer.count }).map((_, i) => {
            const angle = (i / layer.count) * 360
            return (
              <motion.path
                key={i}
                d={petalPath(cx, cy)}
                fill={`url(#${layer.grad})`}
                opacity={0.92}
                initial={{ scale: 0, rotate: angle }}
                animate={{ scale: layer.scale, rotate: angle }}
                transition={{
                  duration: 2.2,
                  delay: layer.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            )
          })}
        </g>
      ))}

      {/* Golden Glowing Stamen */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={22}
        fill="url(#lotusCore)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
      />
    </g>
  )
}

export default function BalloonRoseStage({ onComplete }) {
  const { w: sw, h: sh } = useScreenSize()
  const [balloons, setBalloons] = useState([])
  const [poppedIds, setPoppedIds] = useState(new Set())
  const [stage, setStage] = useState('balloons')

  useEffect(() => {
    setBalloons(generateBalloons())
  }, [])

  const knotX = sw / 2
  const knotY = sh * 0.48
  const envelopeW = Math.max(140, Math.min(220, sw * 0.22))
  const envelopeH = envelopeW * 0.65
  const allPopped = balloons.length > 0 && poppedIds.size === balloons.length

  useEffect(() => {
    if (allPopped && stage === 'balloons') {
      const timer = setTimeout(() => {
        setStage('opening')
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [allPopped, stage])

  const handlePop = (id) => {
    setPoppedIds((prev) => new Set([...prev, id]))
  }

  const roseScale = Math.min(sw / 460, sh / 460, 1.4)

  return (
    <section
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 35%, #064e3b 0%, #022c22 65%, #011611 100%)',
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ width: '100%', height: '100%', display: 'block' }}
        viewBox={`0 0 ${sw} ${sh}`}
      >
        <Envelope
          cx={sw / 2}
          cy={sh * 0.64}
          knotX={knotX}
          knotY={knotY}
          envW={envelopeW}
          envH={envelopeH}
          stage={stage}
          onOpened={() => setStage('shayari')}
          onLetterClick={() => {
            if (stage === 'shayari') setStage('rose')
          }}
          shayari={SHAYARI}
          showShayari={stage === 'shayari'}
          hideEnvelope={stage === 'rose' || stage === 'done'}
        />

        {!allPopped && <circle cx={knotX} cy={knotY} r="4" fill="#ffffff" opacity="0.9" />}

        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            balloon={balloon}
            sw={sw}
            sh={sh}
            knotX={knotX}
            knotY={knotY}
            popped={poppedIds.has(balloon.id)}
            onPop={handlePop}
          />
        ))}

        {(stage === 'rose' || stage === 'done') && (
          <Lotus cx={sw / 2} cy={sh / 2} scale={roseScale} onComplete={onComplete} />
        )}
      </svg>

      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 2,
          width: 'min(96vw, 980px)',
        }}
      >
        <AnimatePresence mode="wait">
          {stage === 'balloons' && !allPopped && (
            <motion.p
              key="pop"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: 'clamp(1.15rem, 2.4vw, 2rem)',
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              Gg🐼! Saare balloons phodne padenge aapko 🎈💥 —
              {' '}ek bhi chhoota toh aage ka surprise band! Lagao haath! 😂🥹💚
            </motion.p>
          )}
          {stage === 'shayari' && (
            <motion.p
              key="tap"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: 'clamp(1.6rem, 4vw, 3rem)',
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              Tap the shayari to bloom lotus 🌸🎋
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
