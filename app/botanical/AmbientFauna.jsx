'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

function RealisticCumulusCloud({
  variant = 'tower', // 'tower' | 'wide' | 'wisp'
  scale = 1.0,
  sunsetFactor = 0,
  isNight = false,
}) {
  const isSunset = sunsetFactor > 0.25
  const bodyGrad = isNight
    ? 'url(#cloudBodyNightGrad)'
    : isSunset
    ? 'url(#cloudBodySunsetGrad)'
    : 'url(#cloudBodyDayGrad)'
  const underGrad = isNight
    ? 'url(#cloudBodyNightGrad)'
    : isSunset
    ? 'url(#cloudUnderbellySunsetGrad)'
    : 'url(#cloudUnderbellyDayGrad)'
  const highlightColor = isNight ? '#f8fafc' : isSunset ? '#fef08a' : '#ffffff'

  if (variant === 'tower') {
    return (
      <g transform={`scale(${scale})`}>
        {/* Underbelly atmospheric shadow */}
        <g opacity={isNight ? 0.2 : 0.45} filter="url(#cloudUnderShadow)">
          <ellipse cx="-45" cy="22" rx="68" ry="18" fill={underGrad} />
          <ellipse cx="20" cy="24" rx="78" ry="20" fill={underGrad} />
          <ellipse cx="80" cy="18" rx="58" ry="16" fill={underGrad} />
        </g>

        {/* Base flat cumulus bed with rounded edges */}
        <rect x="-115" y="-4" width="240" height="36" rx="18" fill={bodyGrad} />

        {/* Volumetric billowing puffs (natural asymmetrical cumulus profile) */}
        <circle cx="-80" cy="-2" r="32" fill={bodyGrad} />
        <circle cx="-42" cy="-20" r="42" fill={bodyGrad} />
        <circle cx="16" cy="-34" r="50" fill={bodyGrad} />
        <circle cx="70" cy="-18" r="38" fill={bodyGrad} />
        <circle cx="108" cy="2" r="26" fill={bodyGrad} />

        {/* Soft edge vapor wisps */}
        <ellipse cx="-125" cy="8" rx="18" ry="10" fill={bodyGrad} opacity="0.75" />
        <ellipse cx="132" cy="8" rx="16" ry="9" fill={bodyGrad} opacity="0.75" />
        <circle cx="148" cy="12" r="7" fill={bodyGrad} opacity="0.55" />
        <ellipse cx="168" cy="10" rx="12" ry="6" fill={bodyGrad} opacity="0.4" />

        {/* Sunlit silver highlight crests on upper billow curves */}
        <ellipse cx="14" cy="-44" rx="36" ry="18" fill="url(#cloudHighlightGrad)" opacity={isNight ? 0.35 : 0.9} />
        <ellipse cx="-42" cy="-30" rx="28" ry="14" fill="url(#cloudHighlightGrad)" opacity={isNight ? 0.3 : 0.85} />
        <ellipse cx="68" cy="-26" rx="24" ry="12" fill="url(#cloudHighlightGrad)" opacity={isNight ? 0.3 : 0.85} />
        <circle cx="16" cy="-46" r="16" fill={highlightColor} opacity={isNight ? 0.25 : 0.75} filter="blur(3px)" />
      </g>
    )
  }

  if (variant === 'wide') {
    return (
      <g transform={`scale(${scale})`}>
        {/* Underbelly atmospheric shadow */}
        <g opacity={isNight ? 0.2 : 0.42} filter="url(#cloudUnderShadow)">
          <ellipse cx="-60" cy="18" rx="78" ry="16" fill={underGrad} />
          <ellipse cx="15" cy="20" rx="88" ry="18" fill={underGrad} />
          <ellipse cx="90" cy="16" rx="72" ry="15" fill={underGrad} />
        </g>

        {/* Elongated base */}
        <rect x="-145" y="-2" width="290" height="32" rx="16" fill={bodyGrad} />

        {/* Billowing rolling puffs */}
        <circle cx="-100" cy="-4" r="28" fill={bodyGrad} />
        <circle cx="-55" cy="-16" r="36" fill={bodyGrad} />
        <circle cx="-5" cy="-26" r="44" fill={bodyGrad} />
        <circle cx="48" cy="-22" r="38" fill={bodyGrad} />
        <circle cx="95" cy="-12" r="32" fill={bodyGrad} />
        <circle cx="130" cy="2" r="22" fill={bodyGrad} />

        {/* Wisps */}
        <ellipse cx="-158" cy="8" rx="18" ry="9" fill={bodyGrad} opacity="0.7" />
        <ellipse cx="152" cy="8" rx="16" ry="8" fill={bodyGrad} opacity="0.65" />
        <circle cx="172" cy="11" r="7" fill={bodyGrad} opacity="0.45" />

        {/* Highlights */}
        <ellipse cx="-5" cy="-36" rx="34" ry="15" fill="url(#cloudHighlightGrad)" opacity={isNight ? 0.35 : 0.9} />
        <ellipse cx="48" cy="-32" rx="28" ry="13" fill="url(#cloudHighlightGrad)" opacity={isNight ? 0.3 : 0.85} />
        <ellipse cx="-55" cy="-26" rx="26" ry="12" fill="url(#cloudHighlightGrad)" opacity={isNight ? 0.3 : 0.8} />
      </g>
    )
  }

  // 'wisp' / high cirrocumulus wisp
  return (
    <g transform={`scale(${scale})`}>
      <g opacity={isNight ? 0.18 : 0.38} filter="url(#cloudUnderShadow)">
        <ellipse cx="0" cy="14" rx="65" ry="14" fill={underGrad} />
      </g>
      <rect x="-85" y="-2" width="170" height="24" rx="12" fill={bodyGrad} />
      <circle cx="-45" cy="-6" r="24" fill={bodyGrad} />
      <circle cx="0" cy="-16" r="30" fill={bodyGrad} />
      <circle cx="42" cy="-8" r="24" fill={bodyGrad} />
      <ellipse cx="-95" cy="6" rx="16" ry="8" fill={bodyGrad} opacity="0.65" />
      <ellipse cx="92" cy="6" rx="15" ry="7" fill={bodyGrad} opacity="0.65" />
      <ellipse cx="0" cy="-22" rx="22" ry="11" fill="url(#cloudHighlightGrad)" opacity={isNight ? 0.3 : 0.85} />
    </g>
  )
}

function DriftingClouds({ simTick, sunsetFactor, isNight, nightFactor }) {
  // Beautifully orchestrated clouds drifting serenely across the sky at varied gentle speeds
  // Simulating atmospheric depth, slow natural wind, and gentle mountain buoyancy
  const clouds = [
    { id: 'cloud-1', startX: 100, baseY: 85, speed: 6.0, variant: 'wisp', scale: 0.85, phase: 0 },
    { id: 'cloud-2', startX: 580, baseY: 130, speed: 8.5, variant: 'tower', scale: 1.15, phase: 1.5 },
    { id: 'cloud-3', startX: 1080, baseY: 95, speed: 7.2, variant: 'wide', scale: 1.0, phase: 3.2 },
    { id: 'cloud-4', startX: 1560, baseY: 145, speed: 10.0, variant: 'wisp', scale: 0.8, phase: 4.8 },
    { id: 'cloud-5', startX: 2020, baseY: 110, speed: 7.8, variant: 'tower', scale: 0.92, phase: 2.4 },
  ]

  const totalSpan = 2400
  const offset = 400

  return (
    <g id="drifting-clouds" pointerEvents="none" opacity={1 - nightFactor * 0.72}>
      {clouds.map((cloud) => {
        // Continuous slow horizontal drift with seamless wrap-around across the 1600px sky
        const currentX = ((cloud.startX + simTick * cloud.speed) % totalSpan) - offset
        // Gentle buoyant atmospheric undulation
        const currentY = cloud.baseY + Math.sin(simTick * 0.22 + cloud.phase) * 3.5

        return (
          <g key={cloud.id} transform={`translate(${currentX}, ${currentY})`}>
            <RealisticCumulusCloud
              variant={cloud.variant}
              scale={cloud.scale}
              sunsetFactor={sunsetFactor}
              isNight={isNight}
            />
          </g>
        )
      })}
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🦅 ANIMATED FLYING VALLEY BIRDS (CONTINUOUS FLAPPING & SOARING)
   - Real-time sinusoidal wing flapping
   - Undulating soaring paths across the 1600px mountain valley
   - Seamless wrap-around flight cycling
══════════════════════════════════════════════════════════════════ */
function FlyingBirds({ simTick, isNight }) {
  if (isNight) return null

  const birdsData = [
    { startX: 60, baseY: 135, speed: 52, wingSpan: 16, flapSpeed: 6.5, phase: 0, scale: 1.0 },
    { startX: 250, baseY: 170, speed: 60, wingSpan: 13, flapSpeed: 7.2, phase: 1.4, scale: 0.85 },
    { startX: 450, baseY: 115, speed: 48, wingSpan: 18, flapSpeed: 5.8, phase: 2.8, scale: 1.15 },
    { startX: 720, baseY: 180, speed: 56, wingSpan: 12, flapSpeed: 7.8, phase: 0.6, scale: 0.78 },
    { startX: 960, baseY: 145, speed: 50, wingSpan: 15, flapSpeed: 6.2, phase: 3.2, scale: 0.95 },
    { startX: 1220, baseY: 125, speed: 54, wingSpan: 14, flapSpeed: 6.8, phase: 1.9, scale: 0.88 },
  ]

  return (
    <g id="flying-valley-birds" pointerEvents="none">
      {birdsData.map((bird, idx) => {
        const currentX = ((bird.startX + simTick * bird.speed) % 1850) - 120
        const currentY = bird.baseY + Math.sin(simTick * 1.2 + bird.phase) * 12
        const flap = Math.sin(simTick * bird.flapSpeed + bird.phase)
        const wingY = flap * 10
        const midWingY = flap * 6.5

        return (
          <g
            key={`valley-bird-${idx}`}
            transform={`translate(${currentX}, ${currentY}) scale(${bird.scale}) rotate(${flap * 2.5})`}
            opacity="0.85"
          >
            {/* Left Wing */}
            <path
              d={`M 0 0 C ${-bird.wingSpan * 0.4} ${midWingY - 3}, ${-bird.wingSpan * 0.7} ${wingY - 1.5}, ${-bird.wingSpan} ${wingY}`}
              fill="none"
              stroke="#1e293b"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Right Wing */}
            <path
              d={`M 0 0 C ${bird.wingSpan * 0.4} ${midWingY - 3}, ${bird.wingSpan * 0.7} ${wingY - 1.5}, ${bird.wingSpan} ${wingY}`}
              fill="none"
              stroke="#1e293b"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Torso & Tail */}
            <ellipse cx="0" cy="0.8" rx="2.5" ry="4" fill="#1e293b" />
            <path d="M -1.2 4 L 0 7 L 1.2 4 Z" fill="#1e293b" />
          </g>
        )
      })}
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🏔️ REALISTIC ALPINE MOUNTAIN RANGE & CONIFEROUS SHORELINE FOREST
   - Atmospheric depth layering (Distant Ridge -> Midground Massifs -> Hero Peaks)
   - Organic geological facets with natural arêtes, couloirs & crag buttresses
   - Natural windswept snow mantles with couloir snow ribbons & exposed nunataks
   - Procedural evergreen pine forest belt (105+ trees with 3-tier stepped boughs)
   - Real-physics dynamic lighting: Day granite, Sunset Alpenglow, Night twilight
══════════════════════════════════════════════════════════════════ */


function AmbientFauna({
  simTick = 0,
  isNight = false,
  sunsetFactor = 0,
  nightFactor = 0,
  bloomFactor = 1.0,
  onInspect,
}) {
  const handleInspect = onInspect || (() => {})
  return (
    <g id="ambient-fauna-and-atmosphere">
      {/* Honeybees, Butterflies by Day & Fireflies by Night */}
        {/* ── 17. FAUNA: HONEYBEES & BUTTERFLIES IN DAY, FIREFLIES IN NIGHT ── */}
        {!isNight ? (
          <g opacity={bloomFactor}>
            {/* Butterflies fluttering over water */}
            <g
              transform={`translate(${520 + Math.sin(simTick * 1.5) * 60}, ${540 + Math.cos(simTick * 2) * 25})`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleInspect('butterfly')}
              title="Tap to inspect Papilio machaon (Swallowtail Butterfly)"
            >
              {/* Butterfly Wings with flutter */}
              <ellipse
                cx="-8"
                cy="-6"
                rx="11"
                ry="8"
                transform={`rotate(${Math.sin(simTick * 14) * 20} -8 -6)`}
                fill="#fb923c"
                stroke="#c2410c"
                strokeWidth="1"
              />
              <ellipse
                cx="8"
                cy="-6"
                rx="11"
                ry="8"
                transform={`rotate(${-Math.sin(simTick * 14) * 20} 8 -6)`}
                fill="#fb923c"
                stroke="#c2410c"
                strokeWidth="1"
              />
              <ellipse cx="0" cy="0" rx="2.5" ry="7" fill="#1c1917" />
            </g>

            <g
              transform={`translate(${1120 + Math.cos(simTick * 1.2) * 55}, ${580 + Math.sin(simTick * 1.8) * 20})`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleInspect('butterfly')}
              title="Tap to inspect Morpho Butterfly"
            >
              <ellipse
                cx="-7"
                cy="-5"
                rx="10"
                ry="7"
                transform={`rotate(${Math.sin(simTick * 15) * 22} -7 -5)`}
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="1"
              />
              <ellipse
                cx="7"
                cy="-5"
                rx="10"
                ry="7"
                transform={`rotate(${-Math.sin(simTick * 15) * 22} 7 -5)`}
                fill="#38bdf8"
                stroke="#0284c7"
                strokeWidth="1"
              />
              <ellipse cx="0" cy="0" rx="2.2" ry="6" fill="#0f172a" />
            </g>

            {/* Honeybees foraging */}
            {[
              { x: 250, y: 580, rot: -10 },
              { x: 620, y: 730, rot: 15 },
              { x: 1220, y: 650, rot: -8 },
            ].map((bee, idx) => (
              <g
                key={`bee-${idx}`}
                transform={`translate(${bee.x + Math.sin(simTick * 2 + idx) * 12}, ${bee.y + Math.cos(simTick * 2 + idx) * 8}) rotate(${bee.rot})`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleInspect('honeybee')}
                title="Tap to inspect Apis mellifera (Honeybee)"
              >
                <ellipse cx="0" cy="0" rx="10" ry="7" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
                <path d="M -3 -6.5 Q -1 0 -3 6.5" stroke="#1c0a00" strokeWidth="2.5" fill="none" />
                <path d="M 3 -6.5 Q 5 0 3 6.5" stroke="#1c0a00" strokeWidth="2.5" fill="none" />
                <circle cx="-7" cy="0" r="3.8" fill="#1c0a00" />
                <circle cx="-6.5" cy="-1" r="1.2" fill="#ffffff" />
                <ellipse
                  cx="-1"
                  cy="-8"
                  rx="6"
                  ry="4.5"
                  transform={`rotate(${Math.sin(simTick * 30 + idx) * 25} -1 -8)`}
                  fill="#e0f2fe"
                  opacity="0.85"
                  stroke="#93c5fd"
                  strokeWidth="0.6"
                />
                <ellipse cx="4" cy="-7" rx="5" ry="3.5" fill="#e0f2fe" opacity="0.75" />
              </g>
            ))}
          </g>
        ) : (
          /* Bioluminescent Fireflies at Night */
          <g opacity={nightFactor}>
            {[
              { x: 450, cy: 690 },
              { x: 560, cy: 610 },
              { x: 770, cy: 650 },
              { x: 890, cy: 720 },
              { x: 1090, cy: 610 },
              { x: 1190, cy: 700 },
              { x: 1310, cy: 770 },
              { x: 970, cy: 800 },
              { x: 680, cy: 780 },
              { x: 350, cy: 650 },
              { x: 1470, cy: 630 },
            ].map((ff, idx) => (
              <motion.g
                key={`firefly-${idx}`}
                transform={`translate(${ff.x}, ${ff.cy})`}
                animate={{
                  y: [0, -10, 5, 0],
                  opacity: [0.35, 1, 0.4],
                }}
                transition={{
                  duration: 2 + (idx % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ cursor: 'pointer' }}
                onClick={() => handleInspect('firefly')}
                title="Tap to inspect Lampyris noctiluca (Firefly)"
              >
                <circle cx="0" cy="0" r="10" fill="#bef264" opacity="0.45" filter="blur(4px)" />
                <circle cx="0" cy="0" r="3.2" fill="#fef08a" />
              </motion.g>
            ))}
          </g>
        )}

    </g>
  )
}

export default React.memo(AmbientFauna)
export { DriftingClouds, FlyingBirds }
