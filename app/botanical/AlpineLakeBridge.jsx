'use client'

import React, { useMemo } from 'react'

function getRipplePath(cx, cy, w, h) {
  const halfW = w / 2
  const p1 = `${(cx - halfW).toFixed(1)},${cy.toFixed(1)}`
  const p2 = `${cx.toFixed(1)},${(cy - h).toFixed(1)}`
  const p3 = `${(cx + halfW).toFixed(1)},${cy.toFixed(1)}`
  const p4 = `${cx.toFixed(1)},${(cy + h).toFixed(1)}`
  return `M ${p1} Q ${p2} ${p3} Q ${p4} ${p1} Z`
}

const SPREADING_WAVELETS = (() => {
  const count = 58
  const items = []
  for (let i = 0; i < count; i++) {
    // Deterministic pseudo-random numbers
    const rand1 = Math.abs((Math.sin(i * 17.123 + 29.456) * 43758.5453) % 1)
    const rand2 = Math.abs((Math.sin((i + 31) * 31.876 + 53.234) * 43758.5453) % 1)
    const rand3 = Math.abs((Math.sin((i + 67) * 43.451 + 79.129) * 43758.5453) % 1)

    const p = i / (count - 1)
    // Perspective vertical distribution from horizon (478) to foreground (718)
    const y = 478 + Math.pow(p, 1.18) * 238
    // Wide spreading fan matching the sun rays: spreads from 75px near horizon to 560px in foreground!
    const spreadW = 75 + p * 485
    // Random horizontal dispersal across the fan with gentle center weighting
    const normX = ((rand1 + rand2) - 1.0) * 0.92
    const offsetX = normX * (spreadW / 2)
    // Wavelet dimensions
    const w = (22 + p * 75) * (0.65 + rand3 * 0.7)
    const h = 1.0 + p * 2.2
    const speed = 1.1 + rand2 * 1.3
    const amp = 6 + p * 15
    const phase = i * 0.82 + rand1 * 2.8

    items.push({
      i,
      p: +p.toFixed(2),
      y: Math.round(y),
      offsetX: Math.round(offsetX),
      w: Math.round(w),
      h: +h.toFixed(1),
      speed: +speed.toFixed(2),
      amp: Math.round(amp),
      phase: +phase.toFixed(2),
    })
  }
  return items
})()

const SPREADING_SPARKLES = [
  { p: 0.10, dx: -25, speed: 3.2, phase: 0.0 },
  { p: 0.15, dx: 28, speed: 2.8, phase: 1.4 },
  { p: 0.22, dx: -45, speed: 3.5, phase: 2.8 },
  { p: 0.28, dx: 38, speed: 2.6, phase: 0.9 },
  { p: 0.35, dx: -70, speed: 3.8, phase: 3.7 },
  { p: 0.40, dx: 65, speed: 2.9, phase: 1.8 },
  { p: 0.48, dx: -95, speed: 3.4, phase: 4.5 },
  { p: 0.54, dx: 80, speed: 3.1, phase: 2.3 },
  { p: 0.60, dx: -125, speed: 2.7, phase: 5.1 },
  { p: 0.66, dx: 110, speed: 3.6, phase: 1.2 },
  { p: 0.72, dx: -140, speed: 3.3, phase: 3.9 },
  { p: 0.78, dx: 135, speed: 2.5, phase: 0.4 },
  { p: 0.84, dx: -165, speed: 3.7, phase: 2.1 },
  { p: 0.90, dx: 155, speed: 3.0, phase: 4.8 },
  { p: 0.94, dx: -75, speed: 2.8, phase: 1.6 },
  { p: 0.97, dx: 90, speed: 3.4, phase: 3.3 },
]



function RealisticWaterGlade({
  isNight,
  sunPos,
  moonPos,
  directSunFactor = 1,
  sunsetFactor = 0,
  nightFactor = 0,
  simTick = 0,
}) {
  const targetX = isNight ? (moonPos?.x ?? 380) : (sunPos?.x ?? 380)
  const diffuseFill = isNight
    ? 'url(#lakeMoonGlow)'
    : sunsetFactor > 0.25
    ? 'url(#lakeSunsetGlow)'
    : 'url(#lakeAmbientGlow)'
  const columnFill = isNight
    ? 'url(#moonColumnWash)'
    : sunsetFactor > 0.25
    ? 'url(#sunsetColumnWash)'
    : 'url(#sunColumnWash)'
  const waveFill = isNight
    ? 'url(#lunarWaveGrad)'
    : sunsetFactor > 0.25
    ? 'url(#sunsetWaveGrad)'
    : 'url(#solarWaveGrad)'
  const baseOpacity = isNight ? 0.85 : Math.max(0.12, 0.15 + 0.85 * directSunFactor)

  return (
    <g id="realistic-water-glade" pointerEvents="none" opacity={baseOpacity}>
      {/* 1. Wide Ambient Water Light Diffusion (Hardware accelerated radial gradient glow!) */}
      <ellipse
        cx={targetX}
        cy="590"
        rx="340"
        ry="135"
        fill={diffuseFill}
        opacity={isNight ? 0.65 : 0.85}
      />

      {/* 2. Wide Spreading Caustic Light Fan (Soft gradient column wash) */}
      <polygon
        points={`${targetX - 45},476 ${targetX + 45},476 ${targetX + 320},720 ${targetX - 320},720`}
        fill={columnFill}
        opacity={isNight ? 0.22 : 0.35}
      />

      {/* 3. Randomly Spreading Organic Wavelets Across the Wide Fan */}
      {SPREADING_WAVELETS.map((wave) => {
        const drift = Math.sin(simTick * wave.speed + wave.phase) * wave.amp
        const cx = targetX + wave.offsetX + drift
        const undulate = 0.5 + 0.5 * Math.sin(simTick * 2.4 + wave.phase)
        const opacity = (0.35 + 0.5 * undulate) * (1 - wave.p * 0.2)

        const path = getRipplePath(cx, wave.y, wave.w, wave.h)

        return (
          <path
            key={`spreading-wave-${wave.i}`}
            d={path}
            fill={waveFill}
            opacity={opacity}
          />
        )
      })}

      {/* 4. Sparkling Specular Highlights Scattered Randomly Across the Water */}
      {SPREADING_SPARKLES.map((spk, idx) => {
        const y = 482 + Math.pow(spk.p, 1.22) * 228
        const sway = Math.sin(simTick * 1.8 + idx) * 10
        const x = targetX + spk.dx + sway
        const twinkle = Math.max(0, Math.sin(simTick * spk.speed + spk.phase))
        if (twinkle < 0.05) return null

        const sparkColor = isNight ? '#bae6fd' : sunsetFactor > 0.25 ? '#fed7aa' : '#fef08a'

        return (
          <g
            key={`glade-spark-${idx}`}
            transform={`translate(${x}, ${y}) scale(${0.4 + twinkle * 0.85})`}
            opacity={twinkle * (isNight ? 0.75 : 0.95)}
          >
            {/* Luminous Specular Pinprick Core */}
            <circle cx="0" cy="0" r="1.6" fill="#ffffff" />
            {/* Soft Radiant Halo */}
            <ellipse cx="0" cy="0" rx="5.5" ry="1.8" fill={sparkColor} opacity="0.75" filter="blur(0.8px)" />
            {/* Fine Micro-Streak Flare */}
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
          </g>
        )
      })}
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌿 REALISTIC MULTI-BLADE BOTANICAL TURF GRASS CLUMP
   - Multi-tiered blades with organic curvature and sunlit blade highlights
══════════════════════════════════════════════════════════════════ */


function BotanicalArchedBridge({ isNight, sunsetFactor, directSunFactor, onInspect }) {
  const leftX = 360
  const rightX = 1220
  const span = rightX - leftX // 860
  const midX = (leftX + rightX) / 2 // 790
  const rise = 24 // Arch crown rise

  // Helper parametric arch function
  const getArchOffset = (x) => {
    const p = Math.max(0, Math.min(1, (x - leftX) / span))
    return rise * 4 * p * (1 - p)
  }

  // 1. Generate ~60 cross-planks for the 3D walking deck floor
  const deckPlanks = []
  const plankSpacing = 14
  for (let px = leftX + 8; px <= rightX - 8; px += plankSpacing) {
    const archY = getArchOffset(px)
    const yFront = 522 - archY
    const yBack = yFront - 15
    // Small perspective tilt: back edge slightly offset towards vanishing center
    const tilt = (px - midX) * 0.012
    deckPlanks.push({
      x: px,
      x1: px - tilt,
      y1: yBack,
      x2: px + tilt,
      y2: yFront,
      toneVariation: ((px * 17) % 7) / 10,
    })
  }

  // 2. Generate Balusters for Back (Far) Railing
  const backBalusters = []
  for (let bx = leftX + 22; bx <= rightX - 22; bx += 26) {
    const archY = getArchOffset(bx)
    const yBackDeck = 507 - archY
    const yBackRail = yBackDeck - 18
    backBalusters.push({ x: bx, y1: yBackRail + 2, y2: yBackDeck - 1 })
  }

  // 3. Generate Balusters for Front (Near) Railing
  const frontBalusters = []
  for (let fx = leftX + 16; fx <= rightX - 16; fx += 26) {
    const archY = getArchOffset(fx)
    const yFrontDeck = 522 - archY
    const yFrontRail = yFrontDeck - 20
    frontBalusters.push({ x: fx, y1: yFrontRail + 2, y2: yFrontDeck - 1 })
  }

  // 4. Timber Piling Bents (4 bents across the span)
  const bents = [510, 690, 890, 1070].map((bx) => {
    const archY = getArchOffset(bx)
    return {
      x: bx,
      yFrontDeck: 522 - archY,
      yBackDeck: 507 - archY,
      yArchBottom: 532 - archY,
    }
  })

  // Lantern glow intensity
  const lanternGlow = isNight ? 0.95 : sunsetFactor > 0.3 ? 0.8 : 0.45

  return (
    <g
      id="botanical-arched-footbridge-3d"
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect?.('bridge')}
      title="Tap to inspect Alpine Timber Arched Footbridge"
    >
      {/* ── 1. AMBIENT SHADOW & WATER REFLECTION UNDER BRIDGE ── */}
      {/* Soft dark contact shadow cast onto lake water */}
      <path
        d={`M ${leftX - 10} 534 Q ${midX} 514 ${rightX + 10} 534 L ${rightX + 20} 558 Q ${midX} 578 ${leftX - 20} 558 Z`}
        fill="#050e18"
        opacity={isNight ? 0.7 : 0.45}
        filter="blur(5px)"
      />
      {/* Mirrored shimmering reflection of the 3D arch in lake water */}
      <path
        d={`M ${leftX + 20} 536 Q ${midX} 570 ${rightX - 20} 536 Q ${midX} 550 ${leftX + 20} 536 Z`}
        fill="url(#bridgeWaterReflectionGrad)"
      />
      {/* Surface wavelets breaking up the reflection */}
      {[540, 546, 552, 558].map((ry, idx) => (
        <line
          key={`bridge-rip-${idx}`}
          x1={leftX + 80 + idx * 45}
          y1={ry}
          x2={rightX - 80 - idx * 45}
          y2={ry}
          stroke={isNight ? '#38bdf8' : sunsetFactor > 0.3 ? '#fed7aa' : '#bae6fd'}
          strokeWidth="1.2"
          strokeDasharray="20, 14, 34, 12, 26, 16"
          opacity={0.35}
        />
      ))}

      {/* ── 2. STONE MASONRY ABUTMENT PIERS (ANCHORS ON BOTH BANKS) ── */}
      {/* Left Stone Pier (Anchored into Left Promontory) */}
      <g id="bridge-left-stone-pier-3d">
        <ellipse cx="362" cy="542" rx="28" ry="7" fill="#040b12" opacity="0.65" filter="blur(2px)" />
        {/* Pier front face */}
        <polygon points="340,510 384,510 388,540 336,540" fill="url(#bridgeStonePierGrad)" stroke="#1e293b" strokeWidth="1" />
        {/* Pier top coping slab */}
        <polygon points="338,508 386,508 384,512 336,512" fill={isNight ? "#475569" : "#94a3b8"} />
        {/* Mortar joints */}
        <line x1="339" y1="520" x2="385" y2="520" stroke="#0f172a" strokeWidth="1" opacity="0.8" />
        <line x1="337" y1="530" x2="387" y2="530" stroke="#0f172a" strokeWidth="1" opacity="0.8" />
        <line x1="360" y1="510" x2="360" y2="520" stroke="#0f172a" strokeWidth="0.8" opacity="0.7" />
        <line x1="372" y1="520" x2="372" y2="530" stroke="#0f172a" strokeWidth="0.8" opacity="0.7" />
        <line x1="352" y1="530" x2="352" y2="540" stroke="#0f172a" strokeWidth="0.8" opacity="0.7" />
        <ellipse cx="362" cy="540" rx="25" ry="4.5" fill="none" stroke="url(#shorelineLappingGrad)" strokeWidth="1.5" />
      </g>

      {/* Right Stone Pier (Anchored into Right Promontory) */}
      <g id="bridge-right-stone-pier-3d">
        <ellipse cx="1218" cy="542" rx="28" ry="7" fill="#040b12" opacity="0.65" filter="blur(2px)" />
        {/* Pier front face */}
        <polygon points="1196,510 1240,510 1244,540 1192,540" fill="url(#bridgeStonePierGrad)" stroke="#1e293b" strokeWidth="1" />
        {/* Pier top coping slab */}
        <polygon points="1194,508 1242,508 1240,512 1192,512" fill={isNight ? "#475569" : "#94a3b8"} />
        {/* Mortar joints */}
        <line x1="1195" y1="520" x2="1241" y2="520" stroke="#0f172a" strokeWidth="1" opacity="0.8" />
        <line x1="1193" y1="530" x2="1243" y2="530" stroke="#0f172a" strokeWidth="1" opacity="0.8" />
        <line x1="1216" y1="510" x2="1216" y2="520" stroke="#0f172a" strokeWidth="0.8" opacity="0.7" />
        <line x1="1205" y1="520" x2="1205" y2="530" stroke="#0f172a" strokeWidth="0.8" opacity="0.7" />
        <line x1="1228" y1="530" x2="1228" y2="540" stroke="#0f172a" strokeWidth="0.8" opacity="0.7" />
        <ellipse cx="1218" cy="540" rx="25" ry="4.5" fill="none" stroke="url(#shorelineLappingGrad)" strokeWidth="1.5" />
      </g>

      {/* ── 3. TIMBER BENT PILINGS IN LAKE WATER (3D TRESTLES & X-BRACES) ── */}
      {bents.map((b, idx) => (
        <g key={`bent-${idx}`}>
          {/* Back Piling (Receding into background water) */}
          <ellipse cx={b.x - 5} cy="537" rx="5" ry="2" fill="#050e18" opacity="0.6" />
          <line
            x1={b.x - 5}
            y1={b.yBackDeck + 6}
            x2={b.x - 5}
            y2="537"
            stroke="url(#bridgePilingCylinderGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Back Piling water contact ripple */}
          <ellipse cx={b.x - 5} cy="537" rx="6.5" ry="2" fill="none" stroke="url(#shorelineLappingGrad)" strokeWidth="1" opacity="0.6" />

          {/* Timber Cross-Bracing (Diagonal X-Tie between pilings) */}
          <line
            x1={b.x - 4}
            y1={b.yArchBottom}
            x2={b.x + 4}
            y2="538"
            stroke="#1a0d07"
            strokeWidth="2.4"
          />
          <line
            x1={b.x + 4}
            y1={b.yArchBottom}
            x2={b.x - 4}
            y2="538"
            stroke="#120804"
            strokeWidth="2.4"
          />
          {/* Central bolt joint */}
          <circle cx={b.x} cy={(b.yArchBottom + 538) / 2} r="1.5" fill="#3b2010" />

          {/* Front Piling (Foreground plane closer to camera) */}
          <ellipse cx={b.x + 5} cy="546" rx="6" ry="2.2" fill="#050e18" opacity="0.7" />
          <line
            x1={b.x + 5}
            y1={b.yArchBottom - 2}
            x2={b.x + 5}
            y2="546"
            stroke="url(#bridgePilingCylinderGrad)"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          {/* Wet waterline stain at base of front piling */}
          <line x1={b.x + 2} y1="544" x2={b.x + 8} y2="544" stroke="#080402" strokeWidth="2.5" />
          {/* Front Piling water contact ripple */}
          <ellipse cx={b.x + 5} cy="546" rx="8" ry="2.5" fill="none" stroke="url(#shorelineLappingGrad)" strokeWidth="1.2" />
        </g>
      ))}

      {/* ── 4. UNDER-ARCH CEILING RIBBON & REVERSED BEVEL ── */}
      <path
        d={`M ${leftX} 528 Q ${midX} 504 ${rightX} 528 L ${rightX} 534 Q ${midX} 510 ${leftX} 534 Z`}
        fill="url(#bridgeUnderArchShadowGrad)"
      />

      {/* ── 5. FAR / BACK RAILING (RECEDED IN SPACE) ── */}
      {/* Back Balusters */}
      {backBalusters.map((bb, idx) => (
        <line
          key={`b-bal-${idx}`}
          x1={bb.x}
          y1={bb.y1}
          x2={bb.x}
          y2={bb.y2}
          stroke="url(#bridgeBackRailGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}
      {/* Back Mid-Rail */}
      <path
        d={`M ${leftX + 4} 498 Q ${midX} 474 ${rightX - 4} 498`}
        fill="none"
        stroke="url(#bridgeBackRailGrad)"
        strokeWidth="2.0"
      />
      {/* Back Top Handrail */}
      <path
        d={`M ${leftX} 489 Q ${midX} 465 ${rightX} 489`}
        fill="none"
        stroke="url(#bridgeBackRailGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* ── 6. THE 3D WALKING DECK FLOOR (PERSPECTIVE TIMBER PLANKS) ── */}
      {/* Solid continuous deck floor slab */}
      <path
        d={`M ${leftX} 507 Q ${midX} 483 ${rightX} 507 L ${rightX} 522 Q ${midX} 498 ${leftX} 522 Z`}
        fill="url(#bridgeDeckFloorGrad)"
      />
      {/* Individual perspective cross-planks across the deck */}
      {deckPlanks.map((pl, idx) => (
        <g key={`plank-${idx}`}>
          {/* Plank joint groove */}
          <line
            x1={pl.x1}
            y1={pl.y1}
            x2={pl.x2}
            y2={pl.y2}
            stroke="#140a05"
            strokeWidth="1.1"
            opacity={0.65}
          />
          {/* Sunlit plank highlight line */}
          <line
            x1={pl.x1 + 0.8}
            y1={pl.y1}
            x2={pl.x2 + 0.8}
            y2={pl.y2}
            stroke={isNight ? "#2c170d" : sunsetFactor > 0.3 ? "#d97706" : "#fde047"}
            strokeWidth="0.7"
            opacity={isNight ? 0.2 : 0.45}
          />
        </g>
      ))}

      {/* ── 7. NEAR ARCH FASCIA BEAM (VERTICAL 3D FACE) ── */}
      {/* Vertical front beam face */}
      <path
        d={`M ${leftX} 522 Q ${midX} 498 ${rightX} 522 L ${rightX} 532 Q ${midX} 508 ${leftX} 532 Z`}
        fill="url(#bridgeFasciaGrad)"
        stroke="#1a0d07"
        strokeWidth="0.8"
      />
      {/* Top sunlit bevel lip of front deck edge */}
      <path
        d={`M ${leftX} 522 Q ${midX} 498 ${rightX} 522`}
        fill="none"
        stroke={isNight ? "#475569" : sunsetFactor > 0.3 ? "#fed7aa" : "#ffffff"}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity={isNight ? 0.35 : 0.85}
      />
      {/* Bottom shadow lip of front beam */}
      <path
        d={`M ${leftX} 532 Q ${midX} 508 ${rightX} 532`}
        fill="none"
        stroke="#0d0502"
        strokeWidth="1.4"
      />

      {/* ── 8. FOREGROUND / NEAR RAILING (IN FRONT OF DECK) ── */}
      {/* Front Balusters (Viewed in the foreground, with deck visible behind them!) */}
      {frontBalusters.map((fb, idx) => (
        <g key={`f-bal-${idx}`}>
          {/* Baluster body */}
          <line
            x1={fb.x}
            y1={fb.y1}
            x2={fb.x}
            y2={fb.y2}
            stroke="url(#bridgeFrontRailGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Sunward edge highlight */}
          <line
            x1={fb.x - 0.6}
            y1={fb.y1}
            x2={fb.x - 0.6}
            y2={fb.y2}
            stroke={isNight ? "#381f12" : sunsetFactor > 0.3 ? "#fed7aa" : "#fef08a"}
            strokeWidth="0.8"
            opacity={isNight ? 0.3 : 0.6}
          />
        </g>
      ))}

      {/* Front Intermediate Rail */}
      <path
        d={`M ${leftX + 2} 512 Q ${midX} 488 ${rightX - 2} 512`}
        fill="none"
        stroke="url(#bridgeFrontRailGrad)"
        strokeWidth="2.6"
      />
      {/* Front Top Rounded Balustrade Handrail */}
      <path
        d={`M ${leftX - 4} 502 Q ${midX} 478 ${rightX + 4} 502`}
        fill="none"
        stroke="url(#bridgeFrontRailGrad)"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      {/* Brilliant sunlit top handrail highlight */}
      <path
        d={`M ${leftX - 4} 500 Q ${midX} 476 ${rightX + 4} 500`}
        fill="none"
        stroke={isNight ? "#64748b" : sunsetFactor > 0.3 ? "#fef08a" : "#ffffff"}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity={isNight ? 0.4 : 0.9}
      />

      {/* ── 9. 3D CYLINDRICAL NEWEL POSTS WITH FACETED PYRAMID CAPS ── */}
      {[
        { x: 368, yDeck: 522, isLeft: true },
        { x: 575, yDeck: 504, hasLantern: 'left' },
        { x: 1005, yDeck: 504, hasLantern: 'right' },
        { x: 1212, yDeck: 522, isRight: true },
      ].map((post, idx) => {
        const postH = 26
        const topY = post.yDeck - postH
        return (
          <g key={`post-3d-${idx}`}>
            {/* Cast shadow of post onto deck */}
            <ellipse cx={post.x + 3} cy={post.yDeck} rx="4" ry="1.5" fill="#080402" opacity="0.6" />
            {/* Cylindrical Post Shaft */}
            <rect
              x={post.x - 4}
              y={topY}
              width="8"
              height={postH + 10}
              fill="url(#bridgeCylindricalPostGrad)"
              stroke="#1a0d07"
              strokeWidth="0.8"
              rx="1"
            />
            {/* Sunlit edge highlight */}
            <line x1={post.x - 3} y1={topY} x2={post.x - 3} y2={post.yDeck + 10} stroke="#fde047" strokeWidth="0.8" opacity={isNight ? 0.2 : 0.6} />
            {/* 3D Faceted Pyramid Finial Cap */}
            <polygon points={`${post.x - 4.5},${topY} ${post.x},${topY - 5} ${post.x},${topY} ${post.x - 4.5},${topY}`} fill="#d97706" />
            <polygon points={`${post.x},${topY - 5} ${post.x + 4.5},${topY} ${post.x},${topY}`} fill="#542409" />
          </g>
        )
      })}

      {/* ── 10. TWIN 3D HEXAGONAL HERITAGE LANTERNS & WARM LIGHT CONES ── */}
      {/* Lantern 1: Mounted on Post X = 575 */}
      <g transform="translate(575, 482)">
        {/* Soft 3D radial light halo */}
        <circle cx="0" cy="12" r="32" fill="url(#bridgeLanternGlowGrad)" opacity={lanternGlow} filter="blur(6px)" />
        {/* 3D Light Cone cast downward onto walking deck */}
        <ellipse cx="0" cy="22" rx="20" ry="6" fill="#fef08a" opacity={lanternGlow * 0.45} filter="blur(4px)" />
        {/* Ornamental Wrought-Iron Curved Bracket */}
        <path d="M 0 -8 C 8 -16, 14 -14, 14 -4 L 14 6" fill="none" stroke="#090d16" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="14" cy="6" r="1.5" fill="#78350f" />
        {/* Hanging loop */}
        <ellipse cx="14" cy="7" rx="1.8" ry="2.2" fill="none" stroke="#090d16" strokeWidth="0.8" />
        {/* 3D Hexagonal Copper Roof with Overhang Eaves */}
        <polygon points="7,9 21,9 14,4" fill={isNight ? "#78350f" : "#b45309"} stroke="#090d16" strokeWidth="0.8" />
        <polygon points="7,9 14,9 14,4" fill="#d97706" opacity="0.6" />
        {/* 3 Visible 3D Glass Facets */}
        {/* Left Facet (Light angle) */}
        <polygon points="7,9 12,9 11,20 8,20" fill={isNight ? "#fde047" : "#fef08a"} stroke="#090d16" strokeWidth="0.6" opacity="0.9" />
        {/* Center Facet */}
        <polygon points="12,9 16,9 16,20 11,20" fill="#ffffff" stroke="#090d16" strokeWidth="0.6" opacity="0.95" />
        {/* Right Facet (Shaded angle) */}
        <polygon points="16,9 21,9 20,20 16,20" fill={isNight ? "#eab308" : "#f59e0b"} stroke="#090d16" strokeWidth="0.6" opacity="0.85" />
        {/* Glowing internal incandescent flame */}
        <circle cx="14" cy="14.5" r="2.5" fill="#ffffff" />
        <ellipse cx="14" cy="14.5" rx="4" ry="4.5" fill="#f59e0b" opacity="0.6" />
      </g>

      {/* Lantern 2: Mounted on Post X = 1005 */}
      <g transform="translate(1005, 482)">
        {/* Soft 3D radial light halo */}
        <circle cx="0" cy="12" r="32" fill="url(#bridgeLanternGlowGrad)" opacity={lanternGlow} filter="blur(6px)" />
        {/* 3D Light Cone cast downward onto walking deck */}
        <ellipse cx="0" cy="22" rx="20" ry="6" fill="#fef08a" opacity={lanternGlow * 0.45} filter="blur(4px)" />
        {/* Ornamental Wrought-Iron Curved Bracket (Mirror) */}
        <path d="M 0 -8 C -8 -16, -14 -14, -14 -4 L -14 6" fill="none" stroke="#090d16" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="-14" cy="6" r="1.5" fill="#78350f" />
        {/* Hanging loop */}
        <ellipse cx="-14" cy="7" rx="1.8" ry="2.2" fill="none" stroke="#090d16" strokeWidth="0.8" />
        {/* 3D Hexagonal Copper Roof with Overhang Eaves */}
        <polygon points="-21,9 -7,9 -14,4" fill={isNight ? "#78350f" : "#b45309"} stroke="#090d16" strokeWidth="0.8" />
        <polygon points="-14,9 -7,9 -14,4" fill="#78350f" opacity="0.6" />
        {/* 3 Visible 3D Glass Facets */}
        {/* Left Facet */}
        <polygon points="-21,9 -16,9 -16,20 -20,20" fill={isNight ? "#fde047" : "#fef08a"} stroke="#090d16" strokeWidth="0.6" opacity="0.9" />
        {/* Center Facet */}
        <polygon points="-16,9 -12,9 -11,20 -16,20" fill="#ffffff" stroke="#090d16" strokeWidth="0.6" opacity="0.95" />
        {/* Right Facet */}
        <polygon points="-12,9 -7,9 -8,20 -11,20" fill={isNight ? "#eab308" : "#f59e0b"} stroke="#090d16" strokeWidth="0.6" opacity="0.85" />
        {/* Glowing internal incandescent flame */}
        <circle cx="-14" cy="14.5" r="2.5" fill="#ffffff" />
        <ellipse cx="-14" cy="14.5" rx="4" ry="4.5" fill="#f59e0b" opacity="0.6" />
      </g>

      {/* Shimmering Lantern light reflections in lake water */}
      <g opacity={lanternGlow * 0.75}>
        <ellipse cx="589" cy="548" rx="12" ry="4.5" fill="#f59e0b" filter="blur(2.5px)" />
        <ellipse cx="991" cy="548" rx="12" ry="4.5" fill="#f59e0b" filter="blur(2.5px)" />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🏔️ REALISTIC LEFT BOTANICAL MEADOW HILLSIDE & SHORELINE
   - Varied realistic terrain (NOT a single curve): Promontory, Cove & Terrace
   - Left Bridge Pier Promontory anchoring footbridge into stone bedrock
   - Willow Cove: gentle natural lake inlet where pebbles deposit
   - Flower Headland: elevated grassy knoll for sunflowers and daisies
   - Organic mossy root knoll for the Three.js tree embedding
══════════════════════════════════════════════════════════════════ */


function AlpineLakeBridge({
  isNight,
  sunsetFactor,
  directSunFactor,
  nightFactor = 0,
  sunPos,
  moonPos,
  simTick,
  onInspect,
  waterRipples = [],
  onLakeClick,
}) {
  return (
    <g id="alpine-lake-and-bridge">
      {/* Calm Deep Blue Lake Water Basin (Wide Bleed) */}
      <rect
        x="-400"
        y="460"
        width="2400"
        height="440"
        fill={isNight ? 'url(#lakeNightDepthGrad)' : 'url(#lakeDepthGrad)'}
        onClick={onLakeClick}
        style={{ cursor: 'pointer' }}
      />

      {/* Water Specular Reflection Glade & Caustic Wavelets */}
      <RealisticWaterGlade
        isNight={isNight}
        sunsetFactor={sunsetFactor}
        directSunFactor={directSunFactor}
        nightFactor={nightFactor}
        sunPos={sunPos}
        moonPos={moonPos}
        simTick={simTick}
        waterRipples={waterRipples}
      />

      {/* 3D Botanical Arched Footbridge */}
      <BotanicalArchedBridge
        isNight={isNight}
        sunsetFactor={sunsetFactor}
        directSunFactor={directSunFactor}
        onInspect={onInspect}
      />
    </g>
  )
}

export default React.memo(AlpineLakeBridge)
export { RealisticWaterGlade, BotanicalArchedBridge }
