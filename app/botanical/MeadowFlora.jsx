'use client'

import React, { useMemo } from 'react'

function RealisticLeftMeadowHill({ isNight, sunsetFactor, directSunFactor }) {
  // Realistic natural pebble clusters inside coves and around headland
  const shorelinePebbles = [
    // Bridge promontory base
    { cx: 388, cy: 538, rx: 6.5, ry: 4.0, rot: 15, grad: 1 },
    // Willow Cove pebble beach deposit
    { cx: 332, cy: 618, rx: 5.5, ry: 3.5, rot: -20, grad: 2 },
    { cx: 326, cy: 642, rx: 8.5, ry: 5.2, rot: 35, grad: 1 },
    { cx: 334, cy: 668, rx: 6.0, ry: 3.8, rot: -10, grad: 2 },
    { cx: 348, cy: 698, rx: 7.2, ry: 4.6, rot: 25, grad: 1 },
    // Flower headland outcrop
    { cx: 395, cy: 755, rx: 11.5, ry: 7.2, rot: -18, grad: 1 },
    { cx: 418, cy: 785, rx: 9.0, ry: 5.8, rot: 30, grad: 2 },
    // Foreground shoreline shelf
    { cx: 426, cy: 835, rx: 12.0, ry: 7.5, rot: 12, grad: 1 },
    { cx: 432, cy: 880, rx: 8.5, ry: 5.5, rot: -25, grad: 2 },
  ]

  // Varied non-curved natural landscape contour
  const leftRidgePath = "M -400 390 C -150 410, 50 430, 180 470 C 235 490, 280 502, 330 508 C 365 512, 392 520, 396 534 C 388 560, 345 585, 335 620 C 325 650, 332 680, 350 710 C 375 745, 410 765, 420 788 C 435 825, 418 865, 435 900 L -400 900 Z"
  const leftCrestPath = "M -400 390 C -150 410, 50 430, 180 470 C 235 490, 280 502, 330 508 C 365 512, 392 520, 396 534 C 388 560, 345 585, 335 620 C 325 650, 332 680, 350 710 C 375 745, 410 765, 420 788 C 435 825, 418 865, 435 900"

  return (
    <g id="realistic-left-meadow-hill">
      {/* ── 1. BACKGROUND ROLLING MEADOW RIDGE (TIER 1) ── */}
      <path d={leftRidgePath} fill="url(#hillBackMeadowGrad)" />
      {/* Sunlit Ridge Crest Highlight */}
      <path
        d={leftCrestPath}
        fill="none"
        stroke="url(#hillRidgeSunlitGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* ── 2. MIDGROUND ROLLING MEADOW BERM & SWALE (TIER 2) ── */}
      <path
        d="M -400 460 C -120 480, 70 510, 170 560 C 230 600, 275 640, 295 700 C 320 755, 360 805, 385 860 C 400 880, 405 890, 415 900 L -400 900 Z"
        fill="url(#hillForeMeadowGrad)"
        opacity="0.9"
      />
      {/* Gentle Valley Swale Shadow between knolls */}
      <ellipse cx="160" cy="565" rx="150" ry="42" fill="url(#hillSwaleShadowGrad)" />
      {/* Cove ambient depression shadow */}
      <ellipse cx="320" cy="635" rx="35" ry="16" fill="url(#hillSwaleShadowGrad)" opacity="0.7" />

      {/* ── 3. FOREGROUND TREE BASE ROLLING KNOLL (TIER 3) ── */}
      <path
        d="M -400 550 C -130 570, 30 600, 130 655 C 185 695, 225 750, 250 810 C 270 855, 285 880, 305 900 L -400 900 Z"
        fill={isNight ? "#0d2919" : sunsetFactor > 0.3 ? "#543818" : "#2d6b3e"}
        opacity="0.7"
      />

      {/* ── 4. MOIST SHORELINE LOAM & WET SILT BANK ── */}
      {/* Follows natural headland, cove, and flower promontory */}
      <path
        d="M 330 508 C 365 512, 392 520, 396 534 C 388 560, 345 585, 335 620 C 325 650, 332 680, 350 710 C 375 745, 410 765, 420 788 C 435 825, 418 865, 435 900 L 418 900 C 400 865, 418 825, 404 788 C 394 765, 360 745, 336 710 C 318 680, 310 650, 320 620 C 330 585, 372 560, 380 534 C 376 520, 350 512, 320 508 Z"
        fill="url(#shorelineMoistEarthGrad)"
      />
      {/* Dark wet mud margin along water contact */}
      <path
        d="M 396 534 C 388 560, 345 585, 335 620 C 325 650, 332 680, 350 710 C 375 745, 410 765, 420 788 C 435 825, 418 865, 435 900"
        fill="none"
        stroke={isNight ? "#050b07" : "#121711"}
        strokeWidth="3.0"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* ── 5. GENTLE SHORELINE WATER-LAPPING FOAM & WET SHIMMER RIM ── */}
      <path
        d="M 396 534 C 388 560, 345 585, 335 620 C 325 650, 332 680, 350 710 C 375 745, 410 765, 420 788 C 435 825, 418 865, 435 900"
        fill="none"
        stroke="url(#shorelineLappingGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* ── 6. 3D ROUNDED WATER-SMOOTHED RIVER PEBBLES ALONG SHORELINE ── */}
      {shorelinePebbles.map((p, idx) => (
        <g key={`left-pebble-${idx}`} transform={`translate(${p.cx}, ${p.cy}) rotate(${p.rot})`}>
          {/* Wet contact shadow beneath pebble */}
          <ellipse cx="0.8" cy="1.2" rx={p.rx + 1} ry={p.ry + 0.8} fill="#050a07" opacity="0.5" filter="blur(1.5px)" />
          {/* 3D stone body */}
          <ellipse cx="0" cy="0" rx={p.rx} ry={p.ry} fill={p.grad === 1 ? "url(#riverStoneGrad1)" : "url(#riverStoneGrad2)"} />
          {/* Specular top highlight */}
          <ellipse cx={-p.rx * 0.25} cy={-p.ry * 0.3} rx={p.rx * 0.45} ry={p.ry * 0.35} fill="#ffffff" opacity={isNight ? 0.2 : 0.45} />
        </g>
      ))}

      {/* ── 7. 3D TREE BASE ROOT FLARE MOUND & VELVETY MOSS CUSHIONS ── */}
      <g id="tree-ground-turf-anchor">
        {/* Organic root knoll mound */}
        <ellipse cx="170" cy="745" rx="140" ry="42" fill="url(#treeRootMoundGrad)" opacity="0.9" />
        <ellipse cx="150" cy="735" rx="95" ry="28" fill={isNight ? "#071c11" : "#1c4a2a"} opacity="0.7" filter="blur(6px)" />
        {/* Velvety moss cushions around root flares */}
        <ellipse cx="120" cy="728" rx="35" ry="14" fill={isNight ? "#0b2618" : "#226338"} opacity="0.65" filter="blur(2px)" />
        <ellipse cx="165" cy="752" rx="42" ry="16" fill={isNight ? "#0e3320" : "#2d7a46"} opacity="0.6" filter="blur(2.5px)" />
        <ellipse cx="215" cy="738" rx="30" ry="12" fill={isNight ? "#0b2618" : "#1f5c34"} opacity="0.55" filter="blur(2px)" />
        {/* Deep ambient occlusion root shadows where Catmull-Rom roots enter soil */}
        <ellipse cx="140" cy="730" rx="45" ry="12" fill="#030805" opacity="0.5" filter="blur(3px)" />
        <ellipse cx="195" cy="755" rx="38" ry="10" fill="#030805" opacity="0.45" filter="blur(3px)" />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🦌 REALISTIC RIGHT BOTANICAL MEADOW HILLSIDE & DEER PASTURE
   - Varied realistic terrain (NOT a single curve): Promontory, Cove & Terrace
   - Right Bridge Pier Promontory anchoring footbridge into stone bedrock
   - Deer Drinking Cove: peaceful lakeside inlet where deer drink
   - Rocky Meadow Point: elevated grassy knoll for wildflowers
   - Sculpted rolling pasture shelf for mother deer and baby fawn
══════════════════════════════════════════════════════════════════ */


function RealisticRightMeadowHill({ isNight, sunsetFactor, directSunFactor, sunPos }) {
  // Realistic natural pebble clusters inside coves and around rocky point
  const shorelinePebbles = [
    // Bridge promontory base
    { cx: 1192, cy: 538, rx: 6.5, ry: 4.0, rot: -15, grad: 1 },
    // Deer Drinking Cove pebble beach deposit
    { cx: 1248, cy: 618, rx: 5.5, ry: 3.5, rot: 20, grad: 2 },
    { cx: 1256, cy: 642, rx: 8.5, ry: 5.2, rot: -35, grad: 1 },
    { cx: 1246, cy: 668, rx: 6.0, ry: 3.8, rot: 10, grad: 2 },
    { cx: 1232, cy: 698, rx: 7.2, ry: 4.6, rot: -25, grad: 1 },
    // Rocky meadow point outcrop
    { cx: 1185, cy: 755, rx: 11.5, ry: 7.2, rot: 18, grad: 1 },
    { cx: 1162, cy: 785, rx: 9.0, ry: 5.8, rot: -30, grad: 2 },
    // Foreground shoreline shelf
    { cx: 1154, cy: 835, rx: 12.0, ry: 7.5, rot: -12, grad: 1 },
    { cx: 1148, cy: 880, rx: 8.5, ry: 5.5, rot: 25, grad: 2 },
  ]

  // Directional sun shadow offset
  const sunDirX = !isNight && sunPos ? (1400 - sunPos.x) * 0.05 : 0

  // Varied non-curved natural landscape contour
  const rightRidgePath = "M 2000 400 C 1750 420, 1530 450, 1400 480 C 1345 490, 1300 502, 1250 508 C 1215 512, 1188 520, 1184 534 C 1192 560, 1235 585, 1245 620 C 1255 650, 1248 680, 1230 710 C 1205 745, 1170 765, 1160 788 C 1145 825, 1162 865, 1148 900 L 2000 900 Z"
  const rightCrestPath = "M 2000 400 C 1750 420, 1530 450, 1400 480 C 1345 490, 1300 502, 1250 508 C 1215 512, 1188 520, 1184 534 C 1192 560, 1235 585, 1245 620 C 1255 650, 1248 680, 1230 710 C 1205 745, 1170 765, 1160 788 C 1145 825, 1162 865, 1148 900"

  return (
    <g id="realistic-right-meadow-hill">
      {/* ── 1. BACKGROUND ROLLING MEADOW RIDGE (TIER 1) ── */}
      <path d={rightRidgePath} fill="url(#hillBackMeadowGrad)" />
      {/* Sunlit Ridge Crest Highlight */}
      <path
        d={rightCrestPath}
        fill="none"
        stroke="url(#hillRidgeSunlitGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* ── 2. MIDGROUND DEER PASTURE SHELF & ROLLING BERM (TIER 2) ── */}
      <path
        d="M 2000 480 C 1760 500, 1550 530, 1420 580 C 1350 610, 1305 650, 1285 710 C 1260 765, 1220 815, 1195 870 C 1180 890, 1175 895, 1165 900 L 2000 900 Z"
        fill="url(#hillForeMeadowGrad)"
        opacity="0.9"
      />
      {/* Soft rolling swale shadow below pasture shelf */}
      <ellipse cx="1440" cy="575" rx="150" ry="40" fill="url(#hillSwaleShadowGrad)" />
      {/* Drinking cove ambient shadow */}
      <ellipse cx="1260" cy="635" rx="35" ry="16" fill="url(#hillSwaleShadowGrad)" opacity="0.7" />

      {/* ── 3. FOREGROUND SHORELINE KNOLL (TIER 3) ── */}
      <path
        d="M 2000 560 C 1780 580, 1590 615, 1480 670 C 1410 710, 1360 765, 1320 825 C 1290 865, 1265 885, 1245 900 L 2000 900 Z"
        fill={isNight ? "#0d2919" : sunsetFactor > 0.3 ? "#543818" : "#2d6b3e"}
        opacity="0.65"
      />

      {/* ── 4. MOIST SHORELINE LOAM & WET SILT BANK ── */}
      {/* Follows natural headland, cove, and rocky point */}
      <path
        d="M 1250 508 C 1215 512, 1188 520, 1184 534 C 1192 560, 1235 585, 1245 620 C 1255 650, 1248 680, 1230 710 C 1205 745, 1170 765, 1160 788 C 1145 825, 1162 865, 1148 900 L 1165 900 C 1179 865, 1162 825, 1176 788 C 1186 765, 1220 745, 1244 710 C 1262 680, 1270 650, 1260 620 C 1250 585, 1208 560, 1200 534 C 1204 520, 1230 512, 1260 508 Z"
        fill="url(#shorelineMoistEarthGrad)"
      />
      {/* Dark wet mud margin along water contact */}
      <path
        d="M 1184 534 C 1192 560, 1235 585, 1245 620 C 1255 650, 1248 680, 1230 710 C 1205 745, 1170 765, 1160 788 C 1145 825, 1162 865, 1148 900"
        fill="none"
        stroke={isNight ? "#050b07" : "#121711"}
        strokeWidth="3.0"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* ── 5. GENTLE SHORELINE WATER-LAPPING FOAM & WET SHIMMER RIM ── */}
      <path
        d="M 1184 534 C 1192 560, 1235 585, 1245 620 C 1255 650, 1248 680, 1230 710 C 1205 745, 1170 765, 1160 788 C 1145 825, 1162 865, 1148 900"
        fill="none"
        stroke="url(#shorelineLappingGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* ── 6. 3D ROUNDED WATER-SMOOTHED RIVER PEBBLES ALONG SHORELINE ── */}
      {shorelinePebbles.map((p, idx) => (
        <g key={`right-pebble-${idx}`} transform={`translate(${p.cx}, ${p.cy}) rotate(${p.rot})`}>
          {/* Wet contact shadow beneath pebble */}
          <ellipse cx="0.8" cy="1.2" rx={p.rx + 1} ry={p.ry + 0.8} fill="#050a07" opacity="0.5" filter="blur(1.5px)" />
          {/* 3D stone body */}
          <ellipse cx="0" cy="0" rx={p.rx} ry={p.ry} fill={p.grad === 1 ? "url(#riverStoneGrad1)" : "url(#riverStoneGrad2)"} />
          {/* Specular top highlight */}
          <ellipse cx={-p.rx * 0.25} cy={-p.ry * 0.3} rx={p.rx * 0.45} ry={p.ry * 0.35} fill="#ffffff" opacity={isNight ? 0.2 : 0.45} />
        </g>
      ))}

      {/* ── 7. NATURAL SUNLIT PASTURE SHELF BENEATH DEER FAMILY ── */}
      <g id="deer-pasture-ground-anchors">
        {/* Grassy pasture knoll shelf */}
        <ellipse
          cx="1400"
          cy="640"
          rx="125"
          ry="30"
          fill={isNight ? "#0d2618" : sunsetFactor > 0.3 ? "#6d471b" : "#449158"}
          opacity="0.55"
          filter="blur(8px)"
        />
        {/* Soft directional sunlight cast shadow for deer family */}
        <ellipse
          cx={1360 + sunDirX}
          cy="642"
          rx="52"
          ry="12"
          fill="#05120a"
          opacity={isNight ? 0.25 : 0.42}
          filter="blur(5px)"
        />
        <ellipse
          cx={1448 + sunDirX}
          cy="646"
          rx="30"
          ry="7"
          fill="#05120a"
          opacity={isNight ? 0.2 : 0.38}
          filter="blur(3.5px)"
        />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌄 MAIN COMPONENT: FULL-BLEED BOTANICAL VALLEY SANCTUARY
   100% Screen Filling (NO BLACK BARS!), Continuous Opening & Closing Animations!
══════════════════════════════════════════════════════════════════ */


function RealisticSunflower({
  x = 240,
  y = 600,
  h = 110,
  scale = 1.0,
  sunflowerAngle = 0,
  bloom = 1.0,
  onInspect,
}) {
  // Flowerhead nods downward at night (nyctinastic drooping)
  const currentAngle = sunflowerAngle * bloom + (1 - bloom) * 32
  // Radial petal elongation from closed bud (0.35) to full open (1.0)
  const petalFlare = 0.35 + 0.65 * bloom

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Root contact shadow & soil mound at base */}
      <ellipse cx="0" cy="1" rx={12 * scale} ry={4 * scale} fill="#051c0e" opacity="0.45" filter="blur(1.5px)" />
      <ellipse cx="0" cy="0" rx={7 * scale} ry={2.5 * scale} fill="#143820" opacity="0.6" />
      <path d={`M ${-4 * scale} 0 L ${-7 * scale} ${-9 * scale} L ${-2 * scale} 0 Z`} fill="#15803d" />
      <path d={`M ${2 * scale} 0 L ${6 * scale} ${-10 * scale} L ${4 * scale} 0 Z`} fill="#16a34a" />
      {/* Organic Curved Stem */}
      <path
        d={`M 0 0 Q ${currentAngle * 0.4} ${-h * 0.5} ${currentAngle * 0.68} ${-h}`}
        fill="none"
        stroke="#15803d"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Large Cordate Leaves */}
      <path
        d={`M 0 ${-h * 0.38} C -18 ${-h * 0.46}, -38 ${-h * 0.34}, -42 ${-h * 0.16} C -28 ${-h * 0.14}, -12 ${-h * 0.26}, 0 ${-h * 0.38} Z`}
        fill="#16a34a"
        stroke="#14532d"
        strokeWidth="1"
      />
      <path
        d={`M 0 ${-h * 0.65} C 18 ${-h * 0.72}, 38 ${-h * 0.6}, 42 ${-h * 0.42} C 28 ${-h * 0.4}, 12 ${-h * 0.52}, 0 ${-h * 0.65} Z`}
        fill="#15803d"
        stroke="#14532d"
        strokeWidth="1"
      />

      {/* Dynamic Rotating Flowerhead */}
      <g
        transform={`translate(${currentAngle * 0.68}, ${-h}) rotate(${currentAngle}) scale(${scale})`}
        style={{ cursor: 'pointer' }}
        onClick={() => onInspect('sunflower')}
        title="Tap to inspect Helianthus annuus (Sunflower)"
      >
        {/* Outer Ring of 20 Golden Ray Florets */}
        {Array.from({ length: 20 }).map((_, pIdx) => {
          const rot = (pIdx / 20) * 360
          return (
            <path
              key={`sf-petal-${pIdx}`}
              d={`M 0 0 C ${-6 * petalFlare} ${-12 * petalFlare}, ${-7 * petalFlare} ${-28 * petalFlare}, 0 ${-36 * petalFlare} C ${7 * petalFlare} ${-28 * petalFlare}, ${6 * petalFlare} ${-12 * petalFlare}, 0 0 Z`}
              transform={`rotate(${rot})`}
              fill="url(#sunflowerPetalGrad)"
              stroke="#b45309"
              strokeWidth="0.8"
            />
          )
        })}

        {/* Inner Ring of 16 Staggered Ray Florets */}
        {Array.from({ length: 16 }).map((_, pIdx) => {
          const rot = (pIdx / 16) * 360 + 11.25
          return (
            <path
              key={`sf-inpetal-${pIdx}`}
              d={`M 0 0 C ${-4.5 * petalFlare} ${-10 * petalFlare}, ${-5 * petalFlare} ${-22 * petalFlare}, 0 ${-28 * petalFlare} C ${5 * petalFlare} ${-22 * petalFlare}, ${4.5 * petalFlare} ${-10 * petalFlare}, 0 0 Z`}
              transform={`rotate(${rot})`}
              fill="#fbbf24"
              opacity="0.9"
            />
          )
        })}

        {/* Central Fertile Disc Florets (Fibonacci Center) */}
        <circle cx="0" cy="0" r={16} fill="url(#sunflowerDiscGrad)" stroke="#270e02" strokeWidth="1.5" />
        <circle cx="0" cy="0" r={12} fill="none" stroke="#b45309" strokeWidth="1.2" strokeDasharray="2.5 2" />
        <circle cx="0" cy="0" r={6} fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="1.5 1.5" />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌸 FLOATING STAR WATER LILY (NYMPHAEA ALBA)
   Resting directly on lily pads: blooms open in sunlight, folds into cone bud at night!
══════════════════════════════════════════════════════════════════ */


function GrassClump({ x, y, scale = 1, isNight }) {
  const c1 = isNight ? '#0a2615' : '#1e7b39'
  const c2 = isNight ? '#0e331c' : '#2db352'
  const c3 = isNight ? '#144527' : '#4ade80'
  const cDeep = isNight ? '#05140b' : '#14532d'
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none">
      {/* Root cluster base shadow */}
      <ellipse cx="0" cy="1" rx="9" ry="2.2" fill={cDeep} opacity="0.4" />
      {/* Back layer blades */}
      <path d="M 0 0 C -6 -12, -14 -20, -20 -25 C -15 -18, -8 -10, 0 0 Z" fill={c1} />
      <path d="M 0 0 C 6 -12, 14 -20, 20 -25 C 15 -18, 8 -10, 0 0 Z" fill={c1} />
      {/* Mid layer blades */}
      <path d="M 0 0 C -4 -15, -7 -28, -8 -36 C -4 -22, -1 -11, 0 0 Z" fill={c2} />
      <path d="M 0 0 C 4 -14, 8 -26, 12 -33 C 7 -22, 2 -11, 0 0 Z" fill={c2} />
      {/* Central tall sunlit blades */}
      <path d="M 0 0 C -1 -16, -1 -30, 0 -38 C 2 -25, 2 -12, 0 0 Z" fill={c3} />
      <path d="M 0 0 C 2 -15, 4 -28, 5 -35 C 4 -23, 2 -12, 0 0 Z" fill={c2} />
      {/* Foreground lateral arching blades */}
      <path d="M 0 0 C -3 -9, -10 -15, -16 -18 C -11 -12, -5 -6, 0 0 Z" fill={c2} />
      <path d="M 0 0 C 3 -9, 9 -14, 15 -17 C 10 -11, 5 -6, 0 0 Z" fill={c3} />
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌾 SHORELINE REED & SEDGE TUFT (LIVING WATER MARGIN)
   - Graceful arching wetland sedges that overhang the water's edge
══════════════════════════════════════════════════════════════════ */
function ShorelineSedge({ x, y, scale = 1, isNight, mirror = false }) {
  const c1 = isNight ? '#0b2619' : '#276738'
  const c2 = isNight ? '#103823' : '#3da358'
  const c3 = isNight ? '#164d30' : '#68d391'
  const flip = mirror ? -1 : 1
  return (
    <g transform={`translate(${x}, ${y}) scale(${flip * scale}, ${scale})`} pointerEvents="none">
      <ellipse cx="0" cy="1" rx="8" ry="2.5" fill={isNight ? "#040e08" : "#17231a"} opacity="0.5" />
      <path d="M 0 0 C 6 -10, 16 -16, 26 -18 C 18 -13, 10 -7, 0 0 Z" fill={c1} />
      <path d="M 0 0 C 8 -14, 22 -22, 34 -20 C 24 -17, 12 -9, 0 0 Z" fill={c2} />
      <path d="M 0 0 C 5 -18, 14 -30, 24 -36 C 16 -26, 8 -14, 0 0 Z" fill={c3} />
      <path d="M 0 0 C -2 -14, -4 -25, -5 -32 C -2 -20, 0 -10, 0 0 Z" fill={c2} />
      <path d="M 0 0 C -4 -10, -11 -18, -18 -22 C -12 -15, -6 -8, 0 0 Z" fill={c1} />
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🍀 RICH BOTANICAL CLOVER / TREFOIL WITH BLOSSOMS
   - Heart-shaped leaflets with white crescent chevrons & clover heads
══════════════════════════════════════════════════════════════════ */
function RichCloverPatch({ x, y, scale = 1, isNight }) {
  const leafColor = isNight ? '#0f3820' : '#22c55e'
  const strokeColor = isNight ? '#0a2415' : '#15803d'
  const chevronColor = isNight ? '#1e5434' : '#86efac'
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none">
      {[
        { dx: -8, dy: -3, rot: -20, s: 0.95 },
        { dx: 4, dy: -6, rot: 15, s: 1.0 },
        { dx: -2, dy: 5, rot: 80, s: 0.88 },
        { dx: 9, dy: 4, rot: -40, s: 0.85 },
      ].map((clover, idx) => (
        <g key={`clover-${idx}`} transform={`translate(${clover.dx}, ${clover.dy}) rotate(${clover.rot}) scale(${clover.s})`}>
          <path d="M 0 8 Q 1 4 0 0" stroke={strokeColor} strokeWidth="0.8" fill="none" />
          {[0, 120, 240].map((ang) => (
            <g key={`leaf-${ang}`} transform={`rotate(${ang}) translate(0, -5)`}>
              <path
                d="M 0 5 C -3.5 3.5, -5 1.5, -5 -1.5 C -5 -3.8, -2.8 -4.8, 0 -2.8 C 2.8 -4.8, 5 -3.8, 5 -1.5 C 5 1.5, 3.5 3.5, 0 5 Z"
                fill={leafColor}
                stroke={strokeColor}
                strokeWidth="0.5"
              />
              <path d="M -2 -0.8 Q 0 -2.2 2 -0.8" stroke={chevronColor} strokeWidth="0.7" fill="none" opacity="0.65" />
            </g>
          ))}
        </g>
      ))}
      {/* Spherical Flowering Clover Head */}
      {!isNight && (
        <g transform="translate(1, -12)">
          <path d="M 0 12 Q 1 6 0 0" stroke={strokeColor} strokeWidth="1.0" fill="none" />
          <ellipse cx="0" cy="0" rx="4.5" ry="5.5" fill="url(#cloverHeadGrad)" stroke="#be123c" strokeWidth="0.4" />
          {[-3, -1.5, 0, 1.5, 3].map((fx, i) => (
            <ellipse key={`floret-${i}`} cx={fx} cy={-2 + Math.abs(fx) * 0.8} rx="0.9" ry="2.2" fill="#ffffff" opacity="0.9" />
          ))}
        </g>
      )}
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌼 REALISTIC ENGLISH LAWN DAISY & CHAMOMILE
   - Multi-tiered ray florets with translucent shading & 3D button disc
══════════════════════════════════════════════════════════════════ */
function RealisticLawnDaisy({ x, y, scale = 1, bloom = 1.0, onInspect, isNight }) {
  const outerPetals = 16
  const innerPetals = 12
  const closedFlare = 0.35 + 0.65 * bloom
  const petalStroke = isNight ? '#94a3b8' : '#e2e8f0'
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect?.('daisy')}
      title="Tap to inspect Bellis perennis (English Lawn Daisy)"
    >
      <path d="M 0 0 Q -4 -16 -2 -34" fill="none" stroke={isNight ? '#0f3a22' : '#15803d'} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M -3 -15 C -10 -20, -14 -16, -12 -10 C -10 -7, -5 -11, -3 -15 Z" fill={isNight ? '#0b2617' : '#16a34a'} />
      <g transform={`translate(-2, -34) scale(${closedFlare})`}>
        <circle cx="0" cy="0" r="14" fill="#05140b" opacity="0.18" filter="blur(2px)" />
        {Array.from({ length: outerPetals }).map((_, i) => (
          <ellipse
            key={`daisy-out-${i}`}
            cx="0"
            cy={-14}
            rx="3.4"
            ry="9.5"
            transform={`rotate(${(i / outerPetals) * 360})`}
            fill="url(#daisyRayGrad)"
            stroke={petalStroke}
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: innerPetals }).map((_, i) => (
          <ellipse
            key={`daisy-in-${i}`}
            cx="0"
            cy={-11.5}
            rx="3.0"
            ry="8.0"
            transform={`rotate(${(i / innerPetals) * 360 + 15})`}
            fill="#ffffff"
            stroke={petalStroke}
            strokeWidth="0.4"
            opacity="0.95"
          />
        ))}
        <circle cx="0" cy="0" r="7.5" fill="#d97706" />
        <circle cx="0" cy="0" r="6.5" fill="#f59e0b" />
        <circle cx="0" cy="0" r="4.2" fill="#fbbf24" />
        <circle cx="0" cy="0" r="2.2" fill="#fef08a" />
        <circle cx="0" cy="0" r="5.2" fill="none" stroke="#b45309" strokeWidth="0.8" strokeDasharray="1.2 1.2" />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🔔 REALISTIC ALPINE BLUEBELL / HAREBELL (CAMPANULA)
   - Arching stem with nodding fluted bell corollas & protruding stigma
══════════════════════════════════════════════════════════════════ */
function RealisticAlpineBluebell({ x, y, scale = 1, bloom = 1.0, onInspect, isNight }) {
  const nodAngle = -14 + 14 * (1 - bloom)
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect?.('bluebell')}
      title="Tap to inspect Campanula rotundifolia (Alpine Bluebell)"
    >
      <path d="M 0 0 Q -10 -24 -16 -48" fill="none" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="2.0" strokeLinecap="round" />
      <path d="M 8 2 Q 2 -18 2 -38" fill="none" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M -8 -20 C -16 -24, -20 -20, -16 -16 C -12 -13, -8 -17, -8 -20 Z" fill={isNight ? '#0b2617' : '#16a34a'} />
      {/* Primary Nodding Bell */}
      <g transform={`translate(-16, -48) rotate(${nodAngle}) scale(${0.62 + 0.38 * bloom})`}>
        <path d="M -2 0 L -6 -6 M 0 0 L 0 -8 M 2 0 L 6 -6" stroke={isNight ? '#0b2617' : '#16a34a'} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 0 0 C -9 12, -14 26, -7 32 C 0 35, 7 35, 14 26 C 16 12, 9 0, 0 0 Z" fill="#4f46e5" stroke="#3730a3" strokeWidth="1" />
        <path d="M -5 14 Q 0 32 5 14" fill="none" stroke="#818cf8" strokeWidth="1.4" opacity="0.75" />
        <path d="M -7 32 Q -10 36 -6 38 Q -2 36 -3 32" fill="#6366f1" />
        <path d="M -1 34 Q 0 40 4 39 Q 3 34 1 34" fill="#818cf8" />
        <path d="M 7 32 Q 11 36 7 38 Q 3 36 4 32" fill="#6366f1" />
        <line x1="0" y1="28" x2="0" y2="42" stroke="#e0e7ff" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="0" cy="43" r="1.2" fill="#ffffff" />
      </g>
      {/* Secondary Companion Bud */}
      <g transform={`translate(2, -38) rotate(${12 - 12 * (1 - bloom)}) scale(${0.54 + 0.36 * bloom})`}>
        <path d="M 0 0 C -7 9, -11 20, -5 25 C 0 27, 5 27, 10 20 C 12 9, 7 0, 0 0 Z" fill="#4338ca" stroke="#312e81" strokeWidth="0.8" />
        <path d="M -3 10 Q 0 24 3 10" fill="none" stroke="#6366f1" strokeWidth="1.1" opacity="0.6" />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌺 WILD MOUNTAIN POPPY (PAPAVER ALPINUM)
   - Delicate crinkled silky scarlet-orange petals with dark center & star stigma
══════════════════════════════════════════════════════════════════ */
function WildMountainPoppy({ x, y, scale = 1, bloom = 1.0, onInspect, isNight }) {
  const openScale = 0.45 + 0.55 * bloom
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect?.('poppy')}
      title="Tap to inspect Papaver alpinum (Alpine Mountain Poppy)"
    >
      <path d="M 0 0 Q -5 -18 -1 -38" fill="none" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M -2 -16 Q -10 -22 -12 -28" fill="none" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="1.3" />
      <ellipse cx="-12" cy="-28" rx="3.5" ry="5.5" transform="rotate(-25 -12 -28)" fill={isNight ? '#0f3820' : '#16a34a'} stroke="#15803d" strokeWidth="0.6" />
      <path d="M -1 -8 C -12 -12, -18 -8, -16 -4 C -12 -2, -6 -6, -1 -8 Z" fill={isNight ? '#0b2617' : '#16a34a'} />
      <g transform={`translate(-1, -38) scale(${openScale})`}>
        <ellipse cx="0" cy="2" rx="16" ry="6" fill="#040c06" opacity="0.25" filter="blur(2.5px)" />
        {/* 4 Large Overlapping Crinkled Silky Petals */}
        <path
          d="M -16 -6 C -20 -18, 0 -24, 16 -18 C 22 -6, 12 0, 0 0 C -12 0, -18 -2, -16 -6 Z"
          fill="url(#poppyPetalGrad)"
          stroke="#991b1b"
          strokeWidth="0.8"
        />
        <path
          d="M 0 0 C -14 4, -24 -6, -22 -18 C -18 -24, -8 -16, 0 0 Z"
          fill="url(#poppyPetalGrad)"
          stroke="#991b1b"
          strokeWidth="0.8"
        />
        <path
          d="M 0 0 C 14 4, 24 -6, 22 -18 C 18 -24, 8 -16, 0 0 Z"
          fill="url(#poppyPetalGrad)"
          stroke="#991b1b"
          strokeWidth="0.8"
        />
        <path
          d="M -15 -8 C -12 8, 12 8, 15 -8 C 8 -12, -8 -12, -15 -8 Z"
          fill="url(#poppyPetalGrad)"
          stroke="#b91c1c"
          strokeWidth="0.9"
        />
        {/* Velvety Purple-Black Basal Eye */}
        <ellipse cx="0" cy="-4" rx="6.5" ry="5.5" fill="#18080f" />
        {/* Ring of golden stamens */}
        {Array.from({ length: 12 }).map((_, sIdx) => {
          const ang = (sIdx / 12) * Math.PI * 2
          const sx = Math.cos(ang) * 5.2
          const sy = Math.sin(ang) * 4.2 - 4
          return (
            <circle key={`stamen-${sIdx}`} cx={sx} cy={sy} r="0.9" fill="#fde047" stroke="#b45309" strokeWidth="0.3" />
          )
        })}
        {/* Central green seed capsule with star stigma */}
        <circle cx="0" cy="-4" r="3.2" fill="#15803d" />
        <path d="M -2 -4 L 2 -4 M 0 -6 L 0 -2 M -1.5 -5.5 L 1.5 -2.5 M -1.5 -2.5 L 1.5 -5.5" stroke="#d97706" strokeWidth="0.8" />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🪻 STATELY ALPINE LUPINE / BLUEBONNET SPIRE (LUPINUS)
   - Tiered spiraled racemes with royal purple to lavender pea blossoms
══════════════════════════════════════════════════════════════════ */
function AlpineLupineSpire({ x, y, scale = 1, bloom = 1.0, onInspect, isNight }) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect?.('lupine')}
      title="Tap to inspect Lupinus polyphyllus (Alpine Lupine)"
    >
      <line x1="0" y1="0" x2="0" y2="-52" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="2.4" strokeLinecap="round" />
      {[-45, -25, 0, 25, 45].map((rot, lIdx) => (
        <path
          key={`lup-leaf-${lIdx}`}
          d="M 0 -6 C -3 -12, -4 -22, 0 -26 C 4 -22, 3 -12, 0 -6 Z"
          transform={`rotate(${rot} 0 -6)`}
          fill={isNight ? '#0b2617' : '#16a34a'}
          stroke="#15803d"
          strokeWidth="0.5"
        />
      ))}
      {[
        { y: -16, rx: 7.5, ry: 4.8, c1: '#4c1d95', c2: '#6d28d9' },
        { y: -23, rx: 7.0, ry: 4.5, c1: '#581c87', c2: '#7c3aed' },
        { y: -30, rx: 6.2, ry: 4.2, c1: '#6b21a8', c2: '#8b5cf6' },
        { y: -37, rx: 5.5, ry: 3.8, c1: '#7e22ce', c2: '#a855f7' },
        { y: -44, rx: 4.6, ry: 3.2, c1: '#9333ea', c2: '#c084fc' },
        { y: -49, rx: 3.6, ry: 2.6, c1: '#a855f7', c2: '#d8b4fe' },
        { y: -53, rx: 2.5, ry: 2.0, c1: '#c084fc', c2: '#f3e8ff' },
      ].map((tier, tIdx) => (
        <g key={`lup-tier-${tIdx}`} transform={`translate(0, ${tier.y})`}>
          <ellipse cx={-tier.rx * 0.55} cy="0" rx={tier.rx * 0.55} ry={tier.ry} fill={tier.c1} stroke="#3b0764" strokeWidth="0.4" />
          <ellipse cx={tier.rx * 0.55} cy="0" rx={tier.rx * 0.55} ry={tier.ry} fill={tier.c1} stroke="#3b0764" strokeWidth="0.4" />
          <ellipse cx="0" cy="-1.5" rx={tier.rx * 0.45} ry={tier.ry * 0.9} fill={tier.c2} />
          <ellipse cx="0" cy="-1" rx={tier.rx * 0.22} ry={tier.ry * 0.45} fill="#f3e8ff" />
        </g>
      ))}
      <circle cx="0" cy="-56" r="1.8" fill="#86efac" stroke="#15803d" strokeWidth="0.5" />
      <circle cx="0" cy="-59" r="1.3" fill="#86efac" />
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   💠 ALPINE FORGET-ME-NOT (MYOSOTIS ALPESTRIS)
   - Vivid azure blue 5-lobed florets with yellow & white pentagonal eyes
══════════════════════════════════════════════════════════════════ */
function AlpineForgetMeNot({ x, y, scale = 1, bloom = 1.0, onInspect, isNight }) {
  const flowers = [
    { dx: -10, dy: -28, s: 0.9 },
    { dx: 4, dy: -32, s: 1.0 },
    { dx: 14, dy: -24, s: 0.85 },
    { dx: -6, dy: -18, s: 0.95 },
    { dx: 8, dy: -14, s: 0.8 },
  ]
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect?.('forgetmenot')}
      title="Tap to inspect Myosotis alpestris (Alpine Forget-Me-Not)"
    >
      <path d="M 0 0 Q -2 -14 -6 -18 Q -10 -24 -10 -28" fill="none" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="1.5" />
      <path d="M -4 -16 Q 2 -24 4 -32" fill="none" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="1.3" />
      <path d="M 2 -22 Q 10 -20 14 -24" fill="none" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="1.2" />
      <path d="M 0 -8 Q 6 -12 8 -14" fill="none" stroke={isNight ? '#0b2617' : '#15803d'} strokeWidth="1.1" />
      <path d="M -2 -10 C -8 -13, -12 -11, -8 -8 C -5 -6, -2 -8, -2 -10 Z" fill={isNight ? '#0b2617' : '#16a34a'} />
      <path d="M 1 -14 C 7 -17, 11 -15, 7 -12 C 4 -10, 1 -12, 1 -14 Z" fill={isNight ? '#0b2617' : '#16a34a'} />
      {flowers.map((fl, fIdx) => (
        <g key={`fmn-${fIdx}`} transform={`translate(${fl.dx}, ${fl.dy}) scale(${fl.s * (0.4 + 0.6 * bloom)})`}>
          {[0, 72, 144, 216, 288].map((ang) => (
            <ellipse
              key={`fmn-petal-${ang}`}
              cx="0"
              cy="-3.6"
              rx="2.4"
              ry="3.6"
              transform={`rotate(${ang})`}
              fill="url(#forgetMeNotGrad)"
              stroke="#0369a1"
              strokeWidth="0.3"
            />
          ))}
          <circle cx="0" cy="0" r="1.8" fill="#ffffff" />
          <circle cx="0" cy="0" r="1.1" fill="#facc15" stroke="#ca8a04" strokeWidth="0.25" />
        </g>
      ))}
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   ⭐ ALPINE EDELWEISS (LEONTOPODIUM NIVALE)
   - Woolly silvery-cream velvet star bracts with golden button florets
══════════════════════════════════════════════════════════════════ */
function AlpineEdelweiss({ x, y, scale = 1, bloom = 1.0, onInspect, isNight }) {
  const bracts = 9
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect?.('edelweiss')}
      title="Tap to inspect Leontopodium nivale (Alpine Edelweiss)"
    >
      <path d="M 0 0 Q -2 -10 -1 -22" fill="none" stroke={isNight ? '#1e293b' : '#64748b'} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M -1 -8 C -8 -10, -12 -8, -8 -5 C -4 -4, -1 -6, -1 -8 Z" fill={isNight ? '#334155' : '#94a3b8'} />
      <path d="M 0 -12 C 8 -14, 12 -12, 8 -9 C 4 -8, 0 -10, 0 -12 Z" fill={isNight ? '#334155' : '#94a3b8'} />
      <g transform={`translate(-1, -22) scale(${0.5 + 0.5 * bloom})`}>
        <circle cx="0" cy="0" r="14" fill="#040b12" opacity="0.2" filter="blur(2px)" />
        {Array.from({ length: bracts }).map((_, bIdx) => {
          const rot = (bIdx / bracts) * 360
          const lengthVar = bIdx % 2 === 0 ? 15 : 12.5
          return (
            <path
              key={`edel-bract-${bIdx}`}
              d={`M 0 0 C -3 -5, -4 -${lengthVar - 3}, 0 -${lengthVar} C 4 -${lengthVar - 3}, 3 -5, 0 0 Z`}
              transform={`rotate(${rot})`}
              fill="url(#edelweissBractGrad)"
              stroke="#94a3b8"
              strokeWidth="0.5"
            />
          )
        })}
        <circle cx="0" cy="0" r="2.2" fill="#ca8a04" stroke="#78350f" strokeWidth="0.4" />
        {[0, 72, 144, 216, 288].map((ang) => {
          const rad = (ang * Math.PI) / 180
          const cx = Math.cos(rad) * 3.2
          const cy = Math.sin(rad) * 3.2
          return <circle key={`ed-btn-${ang}`} cx={cx} cy={cy} r="1.6" fill="#eab308" stroke="#ca8a04" strokeWidth="0.3" />
        })}
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌼 REALISTIC MEADOW BUTTERCUP (RANUNCULUS ACRIS)
   - Glossy varnished golden petals with dense stamens & green carpel dome
══════════════════════════════════════════════════════════════════ */
function RealisticAlpineButtercup({ x, y, scale = 1, bloom = 1.0, onInspect, isNight }) {
  if (isNight) return null
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      style={{ cursor: 'pointer' }}
      onClick={() => onInspect?.('buttercup')}
      title="Tap to inspect Ranunculus acris (Meadow Buttercup)"
    >
      <path d="M 0 0 Q -3 -10 -1 -22" fill="none" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M -1 -9 C -7 -13, -11 -10, -7 -7 C -4 -5, -1 -7, -1 -9 Z" fill="#16a34a" />
      <g transform={`translate(-1, -22) scale(${0.45 + 0.55 * bloom})`}>
        {[0, 72, 144, 216, 288].map((ang) => (
          <path
            key={`bc-petal-${ang}`}
            d="M 0 0 C -4 -4, -6 -11, 0 -14 C 6 -11, 4 -4, 0 0 Z"
            transform={`rotate(${ang})`}
            fill="url(#buttercupGlossGrad)"
            stroke="#ca8a04"
            strokeWidth="0.4"
          />
        ))}
        <circle cx="0" cy="0" r="2.6" fill="#15803d" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((sAng) => {
          const sRad = (sAng * Math.PI) / 180
          return <circle key={`bc-stamen-${sAng}`} cx={Math.cos(sRad) * 3.4} cy={Math.sin(sRad) * 3.4} r="0.8" fill="#fef08a" />
        })}
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌾 FEATHERED TURF MEADOW GRASS CLUSTER WITH WHEAT SEEDHEADS
══════════════════════════════════════════════════════════════════ */
function FeatheredMeadowGrass({ x, y, scale = 1, isNight }) {
  const g1 = isNight ? '#0b2617' : '#15803d'
  const g2 = isNight ? '#0f3820' : '#16a34a'
  const g3 = isNight ? '#164d30' : '#4ade80'
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none">
      <ellipse cx="0" cy="1" rx="8" ry="2.5" fill={isNight ? "#040e08" : "#17231a"} opacity="0.35" />
      <path d="M 0 0 C -4 -12, -12 -22, -22 -26 C -14 -18, -6 -10, 0 0 Z" fill={g1} />
      <path d="M 0 0 C -2 -14, -6 -26, -14 -32 C -8 -22, -2 -12, 0 0 Z" fill={g2} />
      <path d="M 0 0 C 0 -18, -2 -32, -4 -38 C 0 -26, 2 -14, 0 0 Z" fill={g3} />
      <path d="M 0 0 C 4 -18, 6 -30, 4 -36 C 2 -25, 0 -14, 0 0 Z" fill={g2} />
      <path d="M 0 0 C 6 -14, 14 -24, 20 -28 C 12 -20, 5 -11, 0 0 Z" fill={g1} />
      <path d="M 0 0 C 8 -10, 18 -18, 28 -20 C 18 -14, 9 -8, 0 0 Z" fill={g2} />
      <path d="M 0 0 Q 3 -22 8 -42" fill="none" stroke={g1} strokeWidth="1.2" />
      <ellipse cx="8" cy="-42" rx="2.5" ry="6.5" transform="rotate(18 8 -42)" fill={isNight ? "#78350f" : "#d97706"} opacity="0.85" />
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌸 GLORIOUS COMPLETE ALPINE BOTANICAL WILDFLOWER MEADOW
   - Blankets both hillsides: Upper Ridge, Midground Slopes & Foreground Shores
   - Zero plain areas: Poppies, Lupines, Forget-Me-Nots, Daisies, Bluebells,
     Edelweiss, Buttercups, Clovers & Feathered Grasses!
══════════════════════════════════════════════════════════════════ */
function AlpineMeadowFlora({ bloom = 1.0, isNight, onInspect }) {
  return (
    <g id="alpine-meadow-flora">
      {/* ─────────────────────────────────────────────────────────────
          🏔️ LEFT MEADOW HILLSIDE FLORA (DENSE BOTANICAL CARPET, ZERO-OVERLAP)
          - Lush, vibrant floral tapestry across knolls, slopes, and shoreline
          - Rich distribution of Alpine Wildflowers, Sedges & Feathered Grasses
      ───────────────────────────────────────────────────────────── */}
      {/* ── Tier 1: Left Upper Mountain Ridge ($Y = 460..540$) ── */}
      <AlpineLupineSpire x={55} y={465} scale={0.72} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <FeatheredMeadowGrass x={75} y={470} scale={0.75} isNight={isNight} />
      <WildMountainPoppy x={95} y={478} scale={0.74} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={135} y={482} scale={0.72} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <FeatheredMeadowGrass x={155} y={488} scale={0.76} isNight={isNight} />
      <AlpineForgetMeNot x={175} y={492} scale={0.74} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={215} y={505} scale={0.72} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <FeatheredMeadowGrass x={235} y={508} scale={0.78} isNight={isNight} />
      <RealisticAlpineBluebell x={255} y={512} scale={0.75} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={295} y={518} scale={0.74} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={335} y={524} scale={0.76} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={375} y={530} scale={0.75} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* ── Tier 2: Left Midground Slopes around Tree & Knoll ($Y = 560..680$) ── */}
      {/* Row A ($Y \approx 570..610$) */}
      <RealisticAlpineButtercup x={105} y={580} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={145} y={585} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={185} y={590} scale={0.78} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={225} y={585} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={265} y={590} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={305} y={595} scale={0.80} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={345} y={602} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Row B ($Y \approx 625..665$) */}
      <AlpineForgetMeNot x={45} y={640} scale={0.78} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={65} y={655} scale={0.85} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <FeatheredMeadowGrass x={95} y={648} scale={0.85} isNight={isNight} />
      <RealisticLawnDaisy x={125} y={635} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={165} y={642} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={205} y={650} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={245} y={645} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={285} y={655} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineLupineSpire x={325} y={650} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Midground Clovers & Grass Clumps */}
      <RichCloverPatch x={105} y={615} scale={0.92} isNight={isNight} />
      <RichCloverPatch x={175} y={620} scale={0.95} isNight={isNight} />
      <RichCloverPatch x={255} y={622} scale={0.92} isNight={isNight} />
      <RichCloverPatch x={135} y={662} scale={0.95} isNight={isNight} />
      <RichCloverPatch x={220} y={668} scale={0.94} isNight={isNight} />
      <FeatheredMeadowGrass x={150} y={630} scale={0.88} isNight={isNight} />
      <FeatheredMeadowGrass x={230} y={635} scale={0.88} isNight={isNight} />
      <FeatheredMeadowGrass x={290} y={640} scale={0.86} isNight={isNight} />

      {/* ── Tier 3: Left Lower Terraces & Shoreline Margins ($Y = 700..885$) ── */}
      {/* Row A ($Y \approx 710..745$) */}
      <RealisticAlpineButtercup x={40} y={715} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={80} y={715} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={120} y={722} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={160} y={726} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={200} y={720} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={290} y={725} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={330} y={732} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={370} y={738} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Row B ($Y \approx 760..795$) */}
      <AlpineForgetMeNot x={55} y={775} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={95} y={770} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={135} y={765} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={175} y={760} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={215} y={765} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={265} y={770} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={305} y={775} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={345} y={765} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={385} y={772} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Row C ($Y \approx 810..845$) */}
      <RealisticLawnDaisy x={45} y={820} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={85} y={815} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={125} y={820} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={165} y={825} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={205} y={820} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={245} y={825} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={285} y={815} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={325} y={822} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineLupineSpire x={365} y={828} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Row D ($Y \approx 855..885$) */}
      <WildMountainPoppy x={60} y={865} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={100} y={860} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineLupineSpire x={135} y={852} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={175} y={865} scale={0.94} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={215} y={858} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={255} y={868} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={295} y={862} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={340} y={865} scale={0.94} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={380} y={860} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Lower Terraces Clovers, Grass & Shoreline Sedges */}
      <RichCloverPatch x={65} y={740} scale={0.92} isNight={isNight} />
      <RichCloverPatch x={145} y={745} scale={0.95} isNight={isNight} />
      <RichCloverPatch x={185} y={735} scale={0.95} isNight={isNight} />
      <RichCloverPatch x={285} y={750} scale={0.94} isNight={isNight} />
      <RichCloverPatch x={105} y={840} scale={0.95} isNight={isNight} />
      <RichCloverPatch x={195} y={845} scale={0.96} isNight={isNight} />
      <RichCloverPatch x={295} y={845} scale={0.94} isNight={isNight} />
      <FeatheredMeadowGrass x={90} y={735} scale={0.88} isNight={isNight} />
      <FeatheredMeadowGrass x={170} y={740} scale={0.90} isNight={isNight} />
      <FeatheredMeadowGrass x={220} y={755} scale={0.90} isNight={isNight} />
      <FeatheredMeadowGrass x={310} y={755} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={75} y={835} scale={0.90} isNight={isNight} />
      <FeatheredMeadowGrass x={160} y={840} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={250} y={840} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={335} y={845} scale={0.94} isNight={isNight} />
      <ShorelineSedge x={386} y={536} scale={0.82} isNight={isNight} />
      <ShorelineSedge x={330} y={625} scale={0.92} isNight={isNight} />
      <ShorelineSedge x={342} y={680} scale={0.95} isNight={isNight} />
      <ShorelineSedge x={412} y={770} scale={0.88} isNight={isNight} />
      <ShorelineSedge x={425} y={830} scale={0.90} isNight={isNight} />

      {/* ─────────────────────────────────────────────────────────────
          🏔️ RIGHT MEADOW HILLSIDE FLORA (POISSON DISK DENSE CARPET)
          - Deer family 100% unobstructed (no tall flowers in deer box!)
          - Soft turf clover & fine grass grounding deer hooves ($Y = 640..655$)
          - Upper crest, western cove slope, eastern flank, and lower slope
            fully populated with rich alpine wildflowers, eliminating all voids!
      ───────────────────────────────────────────────────────────── */}
      {/* ── Tier 1: Right Upper Mountain Crest above Deer ($Y = 450..535$) ── */}
      <AlpineForgetMeNot x={1195} y={528} scale={0.72} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <FeatheredMeadowGrass x={1215} y={512} scale={0.75} isNight={isNight} />
      <RealisticLawnDaisy x={1235} y={518} scale={0.70} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={1255} y={525} scale={0.70} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1280} y={498} scale={0.72} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1315} y={488} scale={0.72} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1325} y={515} scale={0.72} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={1365} y={462} scale={0.72} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1400} y={458} scale={0.75} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineLupineSpire x={1440} y={452} scale={0.74} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      {/* Soft Ground Clover & Fine Turf Grass Grounding Cow & Calf Hooves */}
      <RichCloverPatch x={1355} y={526} scale={0.78} isNight={isNight} />
      <RichCloverPatch x={1425} y={524} scale={0.75} isNight={isNight} />
      <FeatheredMeadowGrass x={1385} y={528} scale={0.78} isNight={isNight} />
      <FeatheredMeadowGrass x={1445} y={526} scale={0.74} isNight={isNight} />
      <WildMountainPoppy x={1475} y={476} scale={0.74} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <FeatheredMeadowGrass x={1495} y={492} scale={0.78} isNight={isNight} />
      <AlpineLupineSpire x={1518} y={462} scale={0.76} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1555} y={482} scale={0.74} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* ── Tier 2: Right Western Cove Slope (West of Deer, $X \le 1285, Y = 540..660$) ── */}
      <AlpineForgetMeNot x={1215} y={552} scale={0.76} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1255} y={558} scale={0.78} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RichCloverPatch x={1240} y={572} scale={0.85} isNight={isNight} />
      <RealisticLawnDaisy x={1220} y={592} scale={0.80} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1265} y={596} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <FeatheredMeadowGrass x={1200} y={612} scale={0.80} isNight={isNight} />
      <AlpineEdelweiss x={1212} y={632} scale={0.80} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RichCloverPatch x={1270} y={618} scale={0.88} isNight={isNight} />
      <WildMountainPoppy x={1250} y={638} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1282} y={646} scale={0.78} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* ── Tier 3: Right Eastern Flank (East of Deer, $X \ge 1480, Y = 530..660$) ── */}
      <AlpineForgetMeNot x={1490} y={546} scale={0.76} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1530} y={542} scale={0.78} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RichCloverPatch x={1505} y={566} scale={0.85} isNight={isNight} />
      <RealisticLawnDaisy x={1482} y={592} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1522} y={596} scale={0.78} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RichCloverPatch x={1555} y={582} scale={0.88} isNight={isNight} />
      <WildMountainPoppy x={1490} y={636} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1535} y={632} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineLupineSpire x={1575} y={626} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <FeatheredMeadowGrass x={1515} y={652} scale={0.82} isNight={isNight} />
      <FeatheredMeadowGrass x={1565} y={656} scale={0.85} isNight={isNight} />

      {/* ── Tier 4: Soft Ground Pasture at Deer Hooves ($Y = 640..655$) ── */}
      {/* Low turf clover & fine grass only: grounds the deer naturally with zero occlusion */}
      <RichCloverPatch x={1345} y={642} scale={0.95} isNight={isNight} />
      <RichCloverPatch x={1395} y={640} scale={1.0} isNight={isNight} />
      <RichCloverPatch x={1445} y={645} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={1340} y={648} scale={0.88} isNight={isNight} />
      <FeatheredMeadowGrass x={1435} y={650} scale={0.88} isNight={isNight} />

      {/* ── Tier 5: Midground Rolling Slopes ($Y = 665..775$) ── */}
      {/* Row A ($Y \approx 670..705$) */}
      <RealisticAlpineButtercup x={1215} y={676} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={1255} y={672} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1295} y={666} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1335} y={676} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1375} y={682} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={1415} y={688} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1455} y={696} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1495} y={702} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1535} y={692} scale={0.85} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineLupineSpire x={1575} y={702} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Row B ($Y \approx 715..740$) */}
      <AlpineForgetMeNot x={1200} y={716} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineLupineSpire x={1240} y={722} scale={0.82} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1280} y={716} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={1320} y={722} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={1360} y={716} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1400} y={722} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1440} y={726} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1480} y={732} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={1520} y={726} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1565} y={732} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Row C ($Y \approx 750..775$) */}
      <RealisticAlpineButtercup x={1185} y={756} scale={0.85} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1225} y={756} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={1265} y={750} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1305} y={756} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1345} y={752} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1385} y={756} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1425} y={758} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={1465} y={762} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1500} y={766} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1575} y={762} scale={0.84} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Midground Clovers & Feathery Grasses */}
      <RichCloverPatch x={1235} y={780} scale={0.92} isNight={isNight} />
      <RichCloverPatch x={1350} y={785} scale={0.95} isNight={isNight} />
      <RichCloverPatch x={1475} y={785} scale={0.94} isNight={isNight} />
      <FeatheredMeadowGrass x={1190} y={780} scale={0.88} isNight={isNight} />
      <FeatheredMeadowGrass x={1310} y={770} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={1430} y={785} scale={0.90} isNight={isNight} />

      {/* ── Tier 6: Foreground Lower Slope & Shoreline ($Y = 790..885$) ── */}
      {/* Row A ($Y \approx 795..830$) */}
      <RealisticAlpineButtercup x={1175} y={806} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1215} y={802} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1255} y={806} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={1295} y={806} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={1335} y={812} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1375} y={812} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1415} y={816} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1455} y={818} scale={0.94} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1495} y={812} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={1535} y={816} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineLupineSpire x={1575} y={816} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Row B ($Y \approx 840..880$) */}
      <AlpineForgetMeNot x={1165} y={856} scale={0.86} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1205} y={852} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1245} y={856} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <WildMountainPoppy x={1285} y={852} scale={0.94} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineEdelweiss x={1325} y={856} scale={0.90} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1365} y={862} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1405} y={866} scale={0.94} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticLawnDaisy x={1445} y={862} scale={0.95} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <AlpineForgetMeNot x={1485} y={866} scale={0.88} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineBluebell x={1525} y={862} scale={0.92} bloom={bloom} onInspect={onInspect} isNight={isNight} />
      <RealisticAlpineButtercup x={1565} y={866} scale={0.94} bloom={bloom} onInspect={onInspect} isNight={isNight} />

      {/* Foreground Clovers, Grass & Shoreline Sedges */}
      <RichCloverPatch x={1270} y={836} scale={0.95} isNight={isNight} />
      <RichCloverPatch x={1390} y={842} scale={0.96} isNight={isNight} />
      <RichCloverPatch x={1510} y={842} scale={0.95} isNight={isNight} />
      <FeatheredMeadowGrass x={1220} y={832} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={1340} y={836} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={1460} y={842} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={1490} y={805} scale={0.92} isNight={isNight} />
      <FeatheredMeadowGrass x={1530} y={850} scale={0.95} isNight={isNight} />
      <FeatheredMeadowGrass x={1550} y={846} scale={0.94} isNight={isNight} />
      <ShorelineSedge x={1190} y={536} scale={0.84} isNight={isNight} mirror={true} />
      <ShorelineSedge x={1255} y={625} scale={0.92} isNight={isNight} mirror={true} />
      <ShorelineSedge x={1245} y={680} scale={0.95} isNight={isNight} mirror={true} />
      <ShorelineSedge x={1165} y={770} scale={0.88} isNight={isNight} mirror={true} />
      <ShorelineSedge x={1150} y={830} scale={0.90} isNight={isNight} mirror={true} />
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🐄 REALISTIC SWISS ALPINE COW & CALF (UPPER PASTURE SHELF)
   - Authentic Swiss Simmental / Braunvieh mountain cattle
   - Sculpted bovine anatomy: withers, dewlap, udder, curved alpine horns
   - Traditional Swiss brass cowbell with leather strap & gold buckle
   - Gentle mother cow grazing on mountain herbs with sweet calf resting beside
   - Day / Night circadian states: eyes open and alert by day, sleeping under stars at night
   - Fully interactive tap target with sound & Ecology Database inspection
══════════════════════════════════════════════════════════════════ */


function MeadowFlora({
  isNight,
  sunsetFactor,
  directSunFactor,
  sunPos,
  bloom = 1.0,
  onInspect,
}) {
  return (
    <g id="meadow-hills-and-flora">
      {/* Left Rolling Green Hillside & Shoreline */}
      <RealisticLeftMeadowHill
        isNight={isNight}
        sunsetFactor={sunsetFactor}
        directSunFactor={directSunFactor}
      />

      {/* Right Rolling Green Hillside & Pasture */}
      <RealisticRightMeadowHill
        isNight={isNight}
        sunsetFactor={sunsetFactor}
        directSunFactor={directSunFactor}
        sunPos={sunPos}
      />

      {/* Sunflowers firmly rooted on meadows */}
      <g id="sunflower-grove" style={{ display: "none" }}>
        <RealisticSunflower x={1520} y={560} scale={0.66} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={1620} y={550} scale={0.70} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={1720} y={565} scale={0.68} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={1580} y={640} scale={0.85} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={1690} y={635} scale={0.88} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={1780} y={660} scale={0.80} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={1640} y={735} scale={1.00} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={1770} y={745} scale={0.95} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={380} y={710} scale={0.92} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
        <RealisticSunflower x={290} y={735} scale={0.96} sunPos={sunPos} isNight={isNight} onInspect={onInspect} />
      </g>

      {/* Rich Alpine Meadow Wildflowers & Turf Grasses */}
      <AlpineMeadowFlora bloom={bloom} isNight={isNight} onInspect={onInspect} />
    </g>
  )
}

export default React.memo(MeadowFlora)
export { RealisticLeftMeadowHill, RealisticRightMeadowHill, AlpineMeadowFlora, RealisticSunflower }
