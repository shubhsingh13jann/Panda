'use client'

import React, { useMemo } from 'react'

function BotanicalLotusPetal({ width = 36, height = 64, stroke = '#d81b60', fill = 'url(#lotusPetalGrad)' }) {
  const hw = width / 2
  return (
    <path
      d={`M 0 0 C ${-hw * 1.05} ${-height * 0.25}, ${-hw * 1.15} ${-height * 0.72}, 0 ${-height} C ${hw * 1.15} ${-height * 0.72}, ${hw * 1.05} ${-height * 0.25}, 0 0 Z`}
      fill={fill}
      stroke={stroke}
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  )
}

/* ══════════════════════════════════════════════════════════════════
   🪷 COMPLETE BIOLOGICAL LOTUS BLOOM ENGINE
   Transitions continuously from:
   - Stage 0: Tight Sleeping Bud (Right Lotus in user ref 63b0c510.png)
   - Stage 1: Half-bloomed Awakening (Left Lotus in user ref 63b0c510.png)
   - Stage 2: Grand Multi-tiered Bloom (Center Lotus in user ref 63b0c510.png)
══════════════════════════════════════════════════════════════════ */


function RealisticBloomingLotus({
  x = 840,
  y = 575,
  stemH = 105,
  scale = 1.22,
  bloom = 1.0, // 0.0 = night closed bud, 1.0 = midday open bloom
  isNight = false,
  variant = 'center', // 'center' | 'sister' | 'budding'
  onInspect,
}) {
  // Opening flare angles scaled continuously by individual bloom factor
  // Lower wide petals spread out to 74° in day, fold down to 4° in bud
  const lowerAngle = 74 * bloom
  // Mid tier petals spread to 45° in day, fold to 3° in bud
  const midAngle = 46 * bloom
  // Upper top petals spread to 22° in day, fold to 2° in bud
  const topAngle = 22 * bloom

  // Vertical elongation of petals when closed into bud vs splayed in bloom
  const petalScaleY = 0.86 + 0.14 * bloom
  const petalScaleX = 0.75 + 0.25 * bloom

  // Receptacle pod reveals in sunlight (bloom > 0.4)
  const podOpacity = Math.max(0, Math.min(1, (bloom - 0.3) / 0.4))
  // Outer bud shell envelope visible at night/early dawn (bloom < 0.6)
  const budCoverOpacity = Math.max(0, Math.min(1, (0.55 - bloom) / 0.45))

  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect('lotus')}
      title="Tap to inspect Nelumbo nucifera (Sacred Lotus)"
    >
      {/* ── 1. CLEAN VERTICAL GREEN STEM DESCENDING INTO LAKE ── */}
      <line x1="0" y1="0" x2="0" y2={stemH} stroke="#16a34a" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="-1" y1="0" x2="-1" y2={stemH} stroke="#22c55e" strokeWidth="2" opacity="0.6" strokeLinecap="round" />

      {/* ── 2. NIGHTTIME BIOLUMINESCENT GLOW AURA ── */}
      {isNight && (
        <ellipse
          cx="0"
          cy="-30"
          rx={45 + 35 * (1 - bloom)}
          ry={40 + 30 * (1 - bloom)}
          fill="url(#sunGlowGrad)"
          opacity={0.42 * (1 - bloom)}
          filter="blur(16px)"
        />
      )}

      <g transform={`scale(${scale})`}>
        {/* ── 3. TIER 1: APEX & UPPER FLANKING PETALS ── */}
        {/* Upper Center Petal */}
        <g transform={`translate(0, ${-4 * (1 - bloom)}) scale(${petalScaleX}, ${petalScaleY})`}>
          <BotanicalLotusPetal width={36} height={68} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>
        {/* Upper Left Petal */}
        <g transform={`rotate(${-topAngle}) scale(${petalScaleX * 0.96}, ${petalScaleY})`}>
          <BotanicalLotusPetal width={34} height={64} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>
        {/* Upper Right Petal */}
        <g transform={`rotate(${topAngle}) scale(${petalScaleX * 0.96}, ${petalScaleY})`}>
          <BotanicalLotusPetal width={34} height={64} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>

        {/* ── 4. TIER 2: MID-TIER FLANKING PETALS ── */}
        {/* Mid Left Petal */}
        <g transform={`rotate(${-midAngle}) scale(${petalScaleX * 0.94}, ${petalScaleY})`}>
          <BotanicalLotusPetal width={34} height={58} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>
        {/* Mid Right Petal */}
        <g transform={`rotate(${midAngle}) scale(${petalScaleX * 0.94}, ${petalScaleY})`}>
          <BotanicalLotusPetal width={34} height={58} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>

        {/* ── 5. TIER 3: LOWER WIDE WING PETALS (FLARE OUT WIDE IN SUNSHINE) ── */}
        <g transform={`rotate(${-lowerAngle}) scale(${petalScaleX * 0.92}, ${petalScaleY})`}>
          <BotanicalLotusPetal width={34} height={54} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>
        <g transform={`rotate(${lowerAngle}) scale(${petalScaleX * 0.92}, ${petalScaleY})`}>
          <BotanicalLotusPetal width={34} height={54} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>

        {/* ── 6. TIER 4: FRONT CUPPED PETALS (CRADLE THE CENTRAL RECEPTACLE) ── */}
        <g transform={`translate(${-13 * bloom}, ${-3 * bloom}) rotate(${-12 * bloom}) scale(${0.72 + 0.18 * bloom})`}>
          <BotanicalLotusPetal width={38} height={46} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>
        <g transform={`translate(${13 * bloom}, ${-3 * bloom}) rotate(${12 * bloom}) scale(${0.72 + 0.18 * bloom})`}>
          <BotanicalLotusPetal width={38} height={46} stroke={isNight ? '#f472b6' : '#d81b60'} />
        </g>

        {/* ── 7. GOLDEN SEED POD RECEPTACLE & STAMENS (UNVEILED BY SUNSHINE) ── */}
        <g opacity={podOpacity}>
          <path
            d="M -18 0 C -18 10, 18 10, 18 0 C 12 -4, -12 -4, -18 0 Z"
            fill="url(#lotusCoreGrad)"
            stroke="#b45309"
            strokeWidth="1.2"
          />
          {[-12, -8, -4, 0, 4, 8, 12].map((dotX, idx) => (
            <circle key={`dot-${idx}`} cx={dotX} cy={1.5} r={1.5} fill="#fef08a" stroke="#d97706" strokeWidth="0.5" />
          ))}
        </g>

        {/* ── 8. SLEEPING BUD SHELL ENVELOPE (EXACT MATCH TO RIGHT OF USER REF 63b0c510.png) ── */}
        {budCoverOpacity > 0.01 && (
          <g opacity={budCoverOpacity}>
            {/* Outer Oval Shell */}
            <ellipse
              cx="0"
              cy="-28"
              rx={16 + 4 * (1 - bloom)}
              ry={28 + 4 * (1 - bloom)}
              fill="url(#lotusPetalGrad)"
              stroke="#d81b60"
              strokeWidth="1.4"
            />
            {/* Inner lighter pink triangular petal cleft */}
            <polygon points="0,-52 -9,-15 9,-15" fill="#fbcfe8" opacity="0.88" />
            <line x1="0" y1="-52" x2="0" y2="-15" stroke="#ec4899" strokeWidth="1" opacity="0.7" />
          </g>
        )}

        {/* ── 9. GOLDEN BASE RECEPTACLE NODE ── */}
        <circle cx="0" cy="0" r={variant === 'center' ? 8 : 6.5} fill="url(#lotusCoreGrad)" stroke="#b45309" strokeWidth="1.2" />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌻 DYNAMIC HELIOTROPIC SUNFLOWER (NYCTINASTY & SOLAR TRACKING)
   - Day: Flowerhead lifts, ray florets unfurl outward, tracks the sun!
   - Night: Head nods down toward earth, petals fold inward into resting involucre!
══════════════════════════════════════════════════════════════════ */


function FloatingWaterLily({ cx = 700, cy = 680, bloom = 1.0, onInspect }) {
  const lilyRadius = 5 + 16 * bloom
  return (
    <g
      transform={`translate(${cx}, ${cy})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect('waterlily')}
      title="Tap to inspect Nymphaea alba (European White Water Lily)"
    >
      {/* 10 Star Petals */}
      {Array.from({ length: 10 }).map((_, idx) => {
        const rot = (idx / 10) * 360
        return (
          <ellipse
            key={`lily-p-${idx}`}
            cx={0}
            cy={-lilyRadius * 0.65}
            rx={3.5 + 3.5 * bloom}
            ry={6 + 10 * bloom}
            transform={`rotate(${rot})`}
            fill="#ffffff"
            stroke="#f472b6"
            strokeWidth="0.8"
            opacity={0.92}
          />
        )
      })}
      {/* Golden Center Anther Mound */}
      <circle cx="0" cy="0" r={3 + 4 * bloom} fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   ☁️ REALISTIC PAINTERLY CUMULUS CLOUDS (PARALLAX & SLOW DRIFT)
   - Multi-tiered volumetric billowing cumulus lobes
   - Sun-lit silver highlight crests & atmospheric ambient underbelly
   - Gentle, realistic slow drifting across the mountain valley
   - Seamless wrap-around cycling across 1600px canvas
   - Sunset warm peach & nocturnal silver-blue color morphing
══════════════════════════════════════════════════════════════════ */


function FloatingLotuses({ bloom = 1.0, isNight, onInspect }) {
  const bloomFactor = bloom
  const handleInspect = onInspect
  return (
    <g id="floating-aquatic-lotuses">
        {/* ── 15. FLOATING LILY PADS (ORGANIC PELTATE LEAVES RESTING FLAT ON WATER) ── */}
        {[
          { cx: 640, cy: 660, rx: 36, ry: 10 },
          { cx: 700, cy: 685, rx: 42, ry: 12 },
          { cx: 900, cy: 655, rx: 38, ry: 11 },
          { cx: 960, cy: 678, rx: 44, ry: 13 },
          { cx: 1040, cy: 695, rx: 34, ry: 9.5 },
          { cx: 570, cy: 680, rx: 30, ry: 9 },
          { cx: 830, cy: 700, rx: 46, ry: 13.5 },
        ].map((pad, idx) => (
          <g key={`pad-${idx}`}>
            <ellipse cx={pad.cx} cy={pad.cy} rx={pad.rx + 6} ry={pad.ry + 3} fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />
            <ellipse cx={pad.cx} cy={pad.cy} rx={pad.rx} ry={pad.ry} fill="url(#lilyPadGrad)" stroke="#143e2b" strokeWidth="1.2" />
            <line x1={pad.cx} y1={pad.cy} x2={pad.cx - pad.rx * 0.6} y2={pad.cy - pad.ry * 0.4} stroke="#40916c" strokeWidth="0.8" opacity="0.5" />
            <line x1={pad.cx} y1={pad.cy} x2={pad.cx + pad.rx * 0.6} y2={pad.cy - pad.ry * 0.3} stroke="#40916c" strokeWidth="0.8" opacity="0.5" />
            <circle cx={pad.cx + 8} cy={pad.cy - 2} r="2.4" fill="#ffffff" opacity="0.88" />
          </g>
        ))}

        {/* Floating Star Water Lilies on Pads (Bloom with Sun, Close into Cones at Night!) */}
        <FloatingWaterLily cx={570} cy={678} bloom={bloomFactor} onInspect={handleInspect} />
        <FloatingWaterLily cx={1040} cy={693} bloom={bloomFactor} onInspect={handleInspect} />

        {/* ── 16. THE THREE SACRED LOTUSES (DYNAMIC ORGANIC BLOOMING ENGINE) ── */}
        {/* Left Sister Lotus (Awakens & Blooms from Bud into Radiant Blossom) */}
        <RealisticBloomingLotus
          x={710}
          y={585}
          stemH={90}
          scale={1.06}
          bloom={bloomFactor}
          isNight={isNight}
          variant="sister"
          onInspect={handleInspect}
        />

        {/* Center Grand Multi-Tiered Sacred Lotus (The Masterpiece Centerpiece!) */}
        <RealisticBloomingLotus
          x={840}
          y={575}
          stemH={105}
          scale={1.25}
          bloom={bloomFactor}
          isNight={isNight}
          variant="center"
          onInspect={handleInspect}
        />

        {/* Right Tender Morning Lotus (Opens from Slender Bud into Fresh Bloom) */}
        <RealisticBloomingLotus
          x={980}
          y={595}
          stemH={85}
          scale={0.96}
          bloom={bloomFactor}
          isNight={isNight}
          variant="budding"
          onInspect={handleInspect}
        />


    </g>
  )
}

export default React.memo(FloatingLotuses, (prev, next) => {
  return (
    prev.isNight === next.isNight &&
    Math.abs((prev.bloom || 0) - (next.bloom || 0)) < 0.05
  )
})
export { RealisticBloomingLotus, FloatingWaterLily, BotanicalLotusPetal }
