'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'
import {
  FullPandaArtwork,
  PandaPuzzleTile,
  PUZZLE_TILES_CONFIG,
} from './PandaPuzzleArtwork'

/* ══════════════════════════════════════════════
   CONSTANTS & DATA (CONCEPT 2: HOT-AIR BASKET)
══════════════════════════════════════════════ */

const SHAYARI = `"तुम हँसो तो घर में रौनक आ जाए,
तुम्हारी डांट में भी प्यार छुपा नज़र आए 🥹💚
जब भी कभी मैं परेशान हुआ,
सबसे पहले तुम्हारी ही याद आए 🥺🐼
ऐसी कोई जगह नहीं इस दुनिया में,
जहाँ मुझे अपनी प्यारी Gg🐼 की याद न आए 💛🌸"`

const PANDA_HOT_AIR_CONFIG = [
  {
    id: 0,
    name: 'Emerald Aviator',
    theme: '#10b981',
    lightTheme: '#a7f3d0',
    accessory: 'bamboo',
    xPct: 0.15,
    yPct: 0.18,
    dur: 3.6,
    delay: 0,
    tilt: 4,
  },
  {
    id: 1,
    name: 'Sakura Cloud',
    theme: '#f43f5e',
    lightTheme: '#fbcfe8',
    accessory: 'flower',
    xPct: 0.29,
    yPct: 0.11,
    dur: 4.2,
    delay: 0.4,
    tilt: -5,
  },
  {
    id: 2,
    name: 'Royal Sunburst',
    theme: '#fbbf24',
    lightTheme: '#fef3c7',
    accessory: 'crown',
    xPct: 0.44,
    yPct: 0.20,
    dur: 3.7,
    delay: 0.2,
    tilt: 3,
  },
  {
    id: 3,
    name: 'Sky Explorer',
    theme: '#3b82f6',
    lightTheme: '#bfdbfe',
    accessory: 'goggles',
    xPct: 0.57,
    yPct: 0.12,
    dur: 3.9,
    delay: 0.6,
    tilt: -4,
  },
  {
    id: 4,
    name: 'Violet Dream',
    theme: '#8b5cf6',
    lightTheme: '#ddd6fe',
    accessory: 'heartEyes',
    xPct: 0.71,
    yPct: 0.19,
    dur: 4.3,
    delay: 0.1,
    tilt: 5,
  },
  {
    id: 5,
    name: 'Peach Horizon',
    theme: '#f97316',
    lightTheme: '#fed7aa',
    accessory: 'bowtie',
    xPct: 0.85,
    yPct: 0.13,
    dur: 3.5,
    delay: 0.5,
    tilt: -3,
  },
]

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

/* ══════════════════════════════════════════════
   1. PANDA HOT-AIR BALLOON COMPONENT
══════════════════════════════════════════════ */

function PandaHotAirBalloon({ balloon, sw, sh, basketAnchorX, basketAnchorY, popped, onPop }) {
  const x = balloon.xPct * sw
  const y = balloon.yPct * sh

  const r = Math.max(38, Math.min(58, sw * 0.056))
  const ry = r * 1.35

  const ax = (balloon.id % 2 === 0 ? 0.012 : -0.012) * sw
  const ay = 0.02 * sh
  const { theme, lightTheme, accessory, dur, delay, tilt } = balloon

  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)

  const ropeLeftD = useTransform([offsetX, offsetY], ([ox, oy]) => {
    const bx = x - r * 0.28 + ox
    const by = y + ry * 0.95 + oy
    const tx = basketAnchorX - 45
    return `M ${bx} ${by} C ${bx} ${(by + basketAnchorY) / 2}, ${(bx + tx) / 2} ${(by + basketAnchorY) / 2 + 15}, ${tx} ${basketAnchorY}`
  })

  const ropeRightD = useTransform([offsetX, offsetY], ([ox, oy]) => {
    const bx = x + r * 0.28 + ox
    const by = y + ry * 0.95 + oy
    const tx = basketAnchorX + 45
    return `M ${bx} ${by} C ${bx} ${(by + basketAnchorY) / 2}, ${(bx + tx) / 2} ${(by + basketAnchorY) / 2 + 15}, ${tx} ${basketAnchorY}`
  })

  const confetti = useMemo(
    () =>
      Array.from({ length: 24 }).map(() => ({
        angle: Math.random() * Math.PI * 2,
        dist: 80 + Math.random() * 80,
        size: 4 + Math.random() * 6,
        color: Math.random() > 0.4 ? theme : '#fde047',
        isStar: Math.random() > 0.5,
      })),
    [theme]
  )

  const balloonOutline = `
    M ${x - r * 0.24} ${y + ry * 0.92}
    C ${x - r * 0.88} ${y + ry * 0.52}, ${x - r * 1.05} ${y - ry * 0.25}, ${x - r * 0.72} ${y - ry * 0.78}
    C ${x - r * 0.42} ${y - ry * 1.08}, ${x + r * 0.42} ${y - ry * 1.08}, ${x + r * 0.72} ${y - ry * 0.78}
    C ${x + r * 1.05} ${y - ry * 0.25}, ${x + r * 0.88} ${y + ry * 0.52}, ${x + r * 0.24} ${y + ry * 0.92}
    Z
  `

  return (
    <g style={{ pointerEvents: popped ? 'none' : 'auto' }}>
      <AnimatePresence>
        {!popped && (
          <>
            <motion.path
              d={ropeLeftD}
              stroke="rgba(254,240,138,0.7)"
              strokeWidth="1.4"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
            <motion.path
              d={ropeRightD}
              stroke="rgba(254,240,138,0.7)"
              strokeWidth="1.4"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!popped && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, ax, -ax * 0.7, ax * 0.4, 0],
              y: [0, -ay, ay * 0.6, -ay * 0.3, 0],
            }}
            exit={{
              opacity: 0,
              scale: 1.6,
              y: -80,
              transition: { duration: 0.35, ease: 'easeOut' },
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              x: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay },
              y: { duration: dur * 1.15, repeat: Infinity, ease: 'easeInOut', delay },
            }}
            style={{ transformOrigin: `${x}px ${y}px`, cursor: 'pointer' }}
            onClick={() => onPop(balloon.id, x, y)}
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
              <path d={balloonOutline} fill={theme} opacity="0.3" filter="blur(10px)" />

              {/* Left Ear */}
              <circle
                cx={x - r * 0.68}
                cy={y - ry * 0.78}
                r={r * 0.34}
                fill="#1e293b"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.2"
              />
              <circle
                cx={x - r * 0.68}
                cy={y - ry * 0.78}
                r={r * 0.17}
                fill={lightTheme}
                opacity="0.85"
              />

              {/* Right Ear */}
              <circle
                cx={x + r * 0.68}
                cy={y - ry * 0.78}
                r={r * 0.34}
                fill="#1e293b"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.2"
              />
              <circle
                cx={x + r * 0.68}
                cy={y - ry * 0.78}
                r={r * 0.17}
                fill={lightTheme}
                opacity="0.85"
              />

              {/* Aerostat Base */}
              <path
                d={balloonOutline}
                fill="#ffffff"
                stroke={theme}
                strokeWidth="2.5"
              />

              {/* Left & Right Hot-Air Colored Ribs */}
              <path
                d={`
                  M ${x - r * 0.24} ${y + ry * 0.92}
                  C ${x - r * 0.75} ${y + ry * 0.52}, ${x - r * 0.95} ${y - ry * 0.25}, ${x - r * 0.65} ${y - ry * 0.78}
                  C ${x - r * 0.45} ${y - ry * 1.05}, ${x - r * 0.25} ${y - ry * 1.05}, ${x - r * 0.2} ${y - ry * 0.9}
                  C ${x - r * 0.45} ${y - ry * 0.3}, ${x - r * 0.4} ${y + ry * 0.4}, ${x - r * 0.24} ${y + ry * 0.92}
                  Z
                `}
                fill={lightTheme}
                opacity="0.55"
              />
              <path
                d={`
                  M ${x + r * 0.24} ${y + ry * 0.92}
                  C ${x + r * 0.75} ${y + ry * 0.52}, ${x + r * 0.95} ${y - ry * 0.25}, ${x + r * 0.65} ${y - ry * 0.78}
                  C ${x + r * 0.45} ${y - ry * 1.05}, ${x + r * 0.25} ${y - ry * 1.05}, ${x + r * 0.2} ${y - ry * 0.9}
                  C ${x + r * 0.45} ${y - ry * 0.3}, ${x + r * 0.4} ${y + ry * 0.4}, ${x + r * 0.24} ${y + ry * 0.92}
                  Z
                `}
                fill={lightTheme}
                opacity="0.55"
              />

              {/* Glossy Sheen */}
              <ellipse
                cx={x - r * 0.35}
                cy={y - ry * 0.42}
                rx={r * 0.26}
                ry={ry * 0.22}
                fill="#ffffff"
                opacity="0.88"
              />

              {/* Eye Patches */}
              <ellipse
                cx={x - r * 0.32}
                cy={y - ry * 0.04}
                rx={r * 0.24}
                ry={ry * 0.26}
                transform={`rotate(-14 ${x - r * 0.32} ${y - ry * 0.04})`}
                fill="#1e293b"
              />
              <ellipse
                cx={x + r * 0.32}
                cy={y - ry * 0.04}
                rx={r * 0.24}
                ry={ry * 0.26}
                transform={`rotate(14 ${x + r * 0.32} ${y - ry * 0.04})`}
                fill="#1e293b"
              />

              {/* Eyes */}
              {accessory === 'goggles' ? (
                <>
                  <circle cx={x - r * 0.32} cy={y - ry * 0.04} r={r * 0.17} fill="#38bdf8" opacity="0.85" stroke="#fbbf24" strokeWidth="2" />
                  <circle cx={x + r * 0.32} cy={y - ry * 0.04} r={r * 0.17} fill="#38bdf8" opacity="0.85" stroke="#fbbf24" strokeWidth="2" />
                  <line x1={x - r * 0.15} y1={y - ry * 0.04} x2={x + r * 0.15} y2={y - ry * 0.04} stroke="#fbbf24" strokeWidth="2.5" />
                  <ellipse cx={x - r * 0.35} cy={y - ry * 0.08} rx={r * 0.06} ry={r * 0.03} fill="#ffffff" opacity="0.9" />
                  <ellipse cx={x + r * 0.29} cy={y - ry * 0.08} rx={r * 0.06} ry={r * 0.03} fill="#ffffff" opacity="0.9" />
                </>
              ) : accessory === 'heartEyes' ? (
                <>
                  <text x={x - r * 0.32} y={y + ry * 0.03} textAnchor="middle" fontSize={r * 0.28} fill="#f43f5e">♥</text>
                  <text x={x + r * 0.32} y={y + ry * 0.03} textAnchor="middle" fontSize={r * 0.28} fill="#f43f5e">♥</text>
                </>
              ) : (
                <>
                  <circle cx={x - r * 0.32} cy={y - ry * 0.05} r={r * 0.11} fill="#090d16" />
                  <circle cx={x - r * 0.34} cy={y - ry * 0.09} r={r * 0.045} fill="#ffffff" />
                  <circle cx={x - r * 0.29} cy={y - ry * 0.02} r={r * 0.022} fill="#ffffff" />

                  <circle cx={x + r * 0.32} cy={y - ry * 0.05} r={r * 0.11} fill="#090d16" />
                  <circle cx={x + r * 0.30} cy={y - ry * 0.09} r={r * 0.045} fill="#ffffff" />
                  <circle cx={x + r * 0.35} cy={y - ry * 0.02} r={r * 0.022} fill="#ffffff" />
                </>
              )}

              {/* Pink Cheeks */}
              <circle cx={x - r * 0.52} cy={y + ry * 0.18} r={r * 0.15} fill="#f472b6" opacity="0.65" />
              <circle cx={x + r * 0.52} cy={y + ry * 0.18} r={r * 0.15} fill="#f472b6" opacity="0.65" />

              {/* Nose & Smile */}
              <ellipse cx={x} cy={y + ry * 0.14} rx={r * 0.10} ry={r * 0.07} fill="#0f172a" />
              <path
                d={`M ${x - r * 0.13} ${y + ry * 0.22} Q ${x} ${y + ry * 0.29} ${x + r * 0.13} ${y + ry * 0.22}`}
                fill="none"
                stroke="#0f172a"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Accessory */}
              {accessory === 'bamboo' && (
                <g transform={`translate(${x - r * 0.05}, ${y + ry * 0.22}) rotate(25)`}>
                  <rect x="0" y="-3" width={r * 0.45} height="6" rx="2" fill="#10b981" />
                  <path d={`M ${r * 0.4} -3 C ${r * 0.6} -12, ${r * 0.75} -6, ${r * 0.85} -8 C ${r * 0.75} 0, ${r * 0.55} -1, ${r * 0.4} 0 Z`} fill="#34d399" />
                </g>
              )}

              {accessory === 'crown' && (
                <g transform={`translate(${x}, ${y - ry * 0.95})`}>
                  <polygon
                    points={`-${r * 0.28},0 -${r * 0.36},-${r * 0.26} -${r * 0.16},-${r * 0.11} 0,-${r * 0.34} ${r * 0.16},-${r * 0.11} ${r * 0.36},-${r * 0.26} ${r * 0.28},0`}
                    fill="#fbbf24"
                    stroke="#b45309"
                    strokeWidth="1"
                  />
                  <circle cx="0" cy={-r * 0.34} r="2.5" fill="#ef4444" />
                </g>
              )}

              {accessory === 'flower' && (
                <g transform={`translate(${x - r * 0.58}, ${y - ry * 0.55})`}>
                  <circle cx="0" cy="0" r="5" fill="#f43f5e" />
                  <circle cx="-5" cy="0" r="4" fill="#fbcfe8" />
                  <circle cx="5" cy="0" r="4" fill="#fbcfe8" />
                  <circle cx="0" cy="-5" r="4" fill="#fbcfe8" />
                  <circle cx="0" cy="5" r="4" fill="#fbcfe8" />
                  <circle cx="0" cy="0" r="2.5" fill="#fde047" />
                </g>
              )}

              {accessory === 'bowtie' && (
                <g transform={`translate(${x}, ${y + ry * 0.78})`}>
                  <polygon points={`0,0 -${r * 0.22},-${r * 0.1} -${r * 0.22},${r * 0.1}`} fill="#f43f5e" />
                  <polygon points={`0,0 ${r * 0.22},-${r * 0.1} ${r * 0.22},${r * 0.1}`} fill="#f43f5e" />
                  <circle cx="0" cy="0" r={r * 0.07} fill="#fbbf24" />
                </g>
              )}

              {/* Burner Collar & Flame */}
              <rect
                x={x - r * 0.22}
                y={y + ry * 0.92}
                width={r * 0.44}
                height={ry * 0.08}
                rx="2"
                fill="#fbbf24"
                stroke="#b45309"
                strokeWidth="1"
              />
              <path
                d={`M ${x - 3} ${y + ry * 0.92} Q ${x - 6} ${y + ry * 0.8} ${x} ${y + ry * 0.72} Q ${x + 6} ${y + ry * 0.8} ${x + 3} ${y + ry * 0.92} Z`}
                fill="#f59e0b"
                opacity="0.9"
              />
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Pop Starburst */}
      {popped && (
        <g>
          {confetti.map((piece, index) => (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r={piece.size}
              fill={piece.color}
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                cx: x + Math.cos(piece.angle) * piece.dist,
                cy: y + Math.sin(piece.angle) * piece.dist,
                scale: 0,
                opacity: 0,
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          ))}
        </g>
      )}
    </g>
  )
}

/* ══════════════════════════════════════════════
   2. WICKER HOT-AIR BASKET
══════════════════════════════════════════════ */

function WickerBasket({ cx, cy, poppedCount, total = 6 }) {
  const basketW = 210
  const basketH = 120

  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <ellipse cx="0" cy={basketH / 2 + 18} rx={basketW * 0.55} ry="14" fill="#011611" opacity="0.6" filter="blur(8px)" />

      {/* Pilot Mascot */}
      <g transform={`translate(0, ${-basketH / 2 + 6})`}>
        <ellipse cx="0" cy="-20" rx="34" ry="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        <ellipse cx="-26" cy="-42" rx="13" ry="11" fill="#1e293b" />
        <ellipse cx="-26" cy="-42" rx="6" ry="5" fill="#f472b6" opacity="0.6" />
        <ellipse cx="26" cy="-42" rx="13" ry="11" fill="#1e293b" />
        <ellipse cx="26" cy="-42" rx="6" ry="5" fill="#f472b6" opacity="0.6" />

        <rect x="-24" y="-36" width="48" height="11" rx="5" fill="#fbbf24" stroke="#92400e" strokeWidth="1" />
        <circle cx="-13" cy="-30" r="6" fill="#38bdf8" />
        <circle cx="13" cy="-30" r="6" fill="#38bdf8" />
        <line x1="-7" y1="-30" x2="7" y2="-30" stroke="#92400e" strokeWidth="2" />

        <ellipse cx="-13" cy="-19" rx="8" ry="9" fill="#1e293b" />
        <circle cx="-12" cy="-21" r="3" fill="#ffffff" />
        <ellipse cx="13" cy="-19" rx="8" ry="9" fill="#1e293b" />
        <circle cx="12" cy="-21" r="3" fill="#ffffff" />

        <ellipse cx="0" cy="-13" rx="4" ry="3" fill="#0f172a" />
        <path d="M -4 -8 Q 0 -5 4 -8" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="-22" cy="-14" r="5.5" fill="#f472b6" opacity="0.6" />
        <circle cx="22" cy="-14" r="5.5" fill="#f472b6" opacity="0.6" />

        <ellipse cx="-38" cy="-2" rx="12" ry="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="-38" cy="-2" r="3" fill="#f472b6" opacity="0.6" />
        <ellipse cx="38" cy="-2" rx="12" ry="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="38" cy="-2" r="3" fill="#f472b6" opacity="0.6" />
      </g>

      {/* Basket Body */}
      <rect
        x={-basketW / 2}
        y={-basketH / 2}
        width={basketW}
        height={basketH}
        rx="14"
        fill="#92400e"
        stroke="#d97706"
        strokeWidth="2.5"
      />
      {[-45, -15, 15, 45, 75].map((yOffset, i) => (
        <line
          key={`weave-h-${i}`}
          x1={-basketW / 2 + 6}
          y1={-basketH / 2 + 20 + i * 18}
          x2={basketW / 2 - 6}
          y2={-basketH / 2 + 20 + i * 18}
          stroke="#78350f"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
      ))}

      <rect
        x={-basketW / 2 - 4}
        y={-basketH / 2 - 4}
        width={basketW + 8}
        height="14"
        rx="6"
        fill="#b45309"
        stroke="#fde047"
        strokeWidth="1.2"
      />

      <circle cx={-basketW / 2 + 10} cy={basketH / 2 - 12} r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
      <circle cx={basketW / 2 - 10} cy={basketH / 2 - 12} r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />

      <ellipse cx={-basketW / 2 - 6} cy="10" rx="9" ry="13" fill="#d97706" stroke="#78350f" strokeWidth="1" />
      <ellipse cx={basketW / 2 + 6} cy="10" rx="9" ry="13" fill="#d97706" stroke="#78350f" strokeWidth="1" />

      <rect
        x={-basketW / 2 + 14}
        y={-basketH / 2 + 18}
        width={basketW - 28}
        height="22"
        rx="5"
        fill="#047857"
        stroke="#34d399"
        strokeWidth="1"
      />
      <text
        x="0"
        y={-basketH / 2 + 33}
        textAnchor="middle"
        fill="#fef08a"
        fontSize="11"
        fontWeight="800"
        letterSpacing="1"
      >
        ★ GG'S BIRTHDAY FLIGHT 🧺 ★
      </text>

      <g transform="translate(0, 16)">
        {Array.from({ length: total }).map((_, i) => {
          const isCollected = i < poppedCount
          const px = -68 + i * 27
          return (
            <g key={i} transform={`translate(${px}, 0)`}>
              <rect
                x="-10"
                y="-10"
                width="20"
                height="20"
                rx="4"
                fill={isCollected ? '#fbbf24' : '#064e3b'}
                stroke={isCollected ? '#fef08a' : '#10b981'}
                strokeWidth="1.5"
                filter={isCollected ? 'drop-shadow(0 0 6px #f59e0b)' : 'none'}
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontSize="10"
                fontWeight="900"
                fill={isCollected ? '#78350f' : '#6ee7b7'}
              >
                {isCollected ? '🧩' : i + 1}
              </text>
            </g>
          )
        })}
      </g>

      <text
        x="0"
        y={basketH / 2 - 10}
        textAnchor="middle"
        fill="#a7f3d0"
        fontSize="10.5"
        fontWeight="700"
      >
        {poppedCount < total
          ? `Untether balloons to land basket (${poppedCount}/${total})`
          : '🎉 Basket Landed! Opening Panda Jigsaw...'}
      </text>
    </g>
  )
}

/* ══════════════════════════════════════════════
   3. BLOOMING LOTUS FLOWER
══════════════════════════════════════════════ */

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

/* ══════════════════════════════════════════════
   4. MAIN STAGE ORCHESTRATOR
══════════════════════════════════════════════ */

export default function BalloonRoseStage({ onComplete }) {
  const { w: sw, h: sh } = useScreenSize()

  const [poppedIds, setPoppedIds] = useState(new Set())
  const [stage, setStage] = useState('balloons')

  const basketX = sw / 2
  const basketY = sh * 0.58
  const basketAnchorX = basketX
  const basketAnchorY = basketY - 60

  const allPopped = poppedIds.size === PANDA_HOT_AIR_CONFIG.length

  useEffect(() => {
    if (allPopped && stage === 'balloons') {
      const timer = setTimeout(() => {
        setStage('shayari')
      }, 1000)
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
        background:
          'radial-gradient(circle at 50% 30%, #065f46 0%, #022c22 65%, #011611 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── STAGE 1: PANDA HOT-AIR BALLOONS & WICKER BASKET ── */}
      {stage === 'balloons' && (
        <svg
          width="100%"
          height="100%"
          style={{ width: '100%', height: '100%', display: 'block' }}
          viewBox={`0 0 ${sw} ${sh}`}
        >
          <WickerBasket
            cx={basketX}
            cy={basketY}
            poppedCount={poppedIds.size}
            total={6}
          />

          {PANDA_HOT_AIR_CONFIG.map((balloon) => (
            <PandaHotAirBalloon
              key={balloon.id}
              balloon={balloon}
              sw={sw}
              sh={sh}
              basketAnchorX={basketAnchorX}
              basketAnchorY={basketAnchorY}
              popped={poppedIds.has(balloon.id)}
              onPop={handlePop}
            />
          ))}
        </svg>
      )}

      {/* ── SHAYARI LETTER ── */}
      {stage === 'shayari' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 'min(92vw, 560px)',
            background: 'linear-gradient(155deg, #ffffff 0%, #f0fdf4 50%, #ecfdf5 100%)',
            border: '2px solid #a7f3d0',
            borderRadius: '24px',
            padding: 'clamp(20px, 4vh, 32px) clamp(18px, 4vw, 36px)',
            boxShadow:
              '0 30px 70px rgba(16,185,129,0.35), 0 0 0 6px rgba(255,255,255,0.7)',
            textAlign: 'center',
            boxSizing: 'border-box',
            zIndex: 15,
            cursor: 'pointer',
          }}
          onClick={() => setStage('lotus')}
        >
          <div style={{ fontSize: '18px', color: '#10b981', marginBottom: '8px' }}>
            🎋 ✦ 👑 QUEEN GG'S BIRTHDAY FLIGHT 🐼 ✦ 🎋
          </div>

          <div
            style={{
              fontFamily: "'Dancing Script', cursive",
              color: '#064e3b',
              whiteSpace: 'pre-line',
              fontSize: 'clamp(1.15rem, 2.5vw, 1.55rem)',
              lineHeight: 1.55,
              fontWeight: 700,
              margin: '12px 0',
            }}
          >
            {SHAYARI}
          </div>

          <div
            style={{
              width: '60%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #34d399, transparent)',
              margin: '14px auto',
            }}
          />

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{
              fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
              color: '#059669',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 800,
              background: 'rgba(16, 185, 129, 0.12)',
              padding: '8px 18px',
              borderRadius: '20px',
              display: 'inline-block',
            }}
          >
            🌸 Tap to Bloom Lotus 🌸
          </motion.div>
        </motion.div>
      )}

      {/* ── STAGE 4: LOTUS BLOOM ── */}
      {stage === 'lotus' && (
        <svg
          width="100%"
          height="100%"
          style={{ width: '100%', height: '100%', display: 'block' }}
          viewBox={`0 0 ${sw} ${sh}`}
        >
          <Lotus cx={sw / 2} cy={sh / 2} scale={roseScale} onComplete={onComplete} />
        </svg>
      )}

      {/* ── BOTTOM BANNER MESSAGE ── */}
      {stage === 'balloons' && (
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(1rem, 3vh, 2.4rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
            width: 'min(94vw, 920px)',
            padding: '0 12px',
            boxSizing: 'border-box',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin: 0,
              color: 'rgba(255,255,255,0.96)',
              fontSize: 'clamp(1.05rem, 2.2vw, 1.85rem)',
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 700,
              textShadow: '0 2px 14px rgba(0,0,0,0.6)',
              lineHeight: 1.4,
            }}
          >
            Gg🐼! Saare 6 Panda Hot-Air Balloons ko tap karke basket ko safe utaro! 🎈🧺 — Har balloon me chhipa hai 1 puzzle piece! 🧩
          </motion.p>
        </div>
      )}
    </section>
  )
}
