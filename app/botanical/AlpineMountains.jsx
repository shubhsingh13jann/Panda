'use client'

import React, { useMemo } from 'react'

const PINE_FOREST_TREES = (() => {
  const trees = []
  let x = -410
  let i = 0
  while (x < 2030) {
    const rand1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453
    const r1 = rand1 - Math.floor(rand1)
    const rand2 = Math.sin((i + 31) * 23.1415 + 19.827) * 43758.5453
    const r2 = rand2 - Math.floor(rand2)
    const rand3 = Math.sin((i + 77) * 37.719 + 43.123) * 43758.5453
    const r3 = rand3 - Math.floor(rand3)

    const step = 15 + r1 * 16
    x += step
    const height = 22 + r2 * 24
    const width = height * (0.38 + r3 * 0.16)
    const layer = r3 > 0.45 ? 'front' : 'back'
    trees.push({
      cx: Math.round(x),
      baseY: 472,
      h: Math.round(height),
      w: Math.round(width),
      layer,
    })
    i++
  }
  return trees
})()

function getPineBoughPath(cx, baseY, h, w) {
  const halfW = w / 2
  const p1 = `${cx},${baseY - h}`
  const p2 = `${(cx - halfW * 0.5).toFixed(1)},${(baseY - h * 0.68).toFixed(1)}`
  const p3 = `${(cx - halfW * 0.35).toFixed(1)},${(baseY - h * 0.66).toFixed(1)}`
  const p4 = `${(cx - halfW * 0.8).toFixed(1)},${(baseY - h * 0.36).toFixed(1)}`
  const p5 = `${(cx - halfW * 0.55).toFixed(1)},${(baseY - h * 0.34).toFixed(1)}`
  const p6 = `${(cx - halfW).toFixed(1)},${baseY}`
  const p7 = `${(cx + halfW).toFixed(1)},${baseY}`
  const p8 = `${(cx + halfW * 0.55).toFixed(1)},${(baseY - h * 0.34).toFixed(1)}`
  const p9 = `${(cx + halfW * 0.8).toFixed(1)},${(baseY - h * 0.36).toFixed(1)}`
  const p10 = `${(cx + halfW * 0.35).toFixed(1)},${(baseY - h * 0.66).toFixed(1)}`
  const p11 = `${(cx + halfW * 0.5).toFixed(1)},${(baseY - h * 0.68).toFixed(1)}`
  return `M ${p1} L ${p2} L ${p3} L ${p4} L ${p5} L ${p6} L ${p7} L ${p8} L ${p9} L ${p10} L ${p11} Z`
}

const PINE_FOREST_BACK_PATH = PINE_FOREST_TREES
  .filter((t) => t.layer === 'back')
  .map((t) => getPineBoughPath(t.cx, t.baseY, t.h, t.w))
  .join(' ')

const PINE_FOREST_FRONT_PATH = PINE_FOREST_TREES
  .filter((t) => t.layer === 'front')
  .map((t) => getPineBoughPath(t.cx, t.baseY, t.h, t.w))
  .join(' ')



function getMountainRidgeY(x) {
  if (x <= -100) {
    return 470
  } else if (x <= 340) {
    // Peak 1 left flank: rises from (-100, 470) to (340, 275)
    const p = (x - (-100)) / (340 - (-100))
    return 470 - p * (470 - 275)
  } else if (x <= 475) {
    // Peak 1 right flank down to waterfall saddle (475, 425)
    const p = (x - 340) / (475 - 340)
    return 275 + p * (425 - 275)
  } else if (x <= 620) {
    // Waterfall saddle up to Peak 2 (620, 355)
    const p = (x - 475) / (620 - 475)
    return 425 - p * (425 - 355)
  } else if (x <= 810) {
    // Peak 2 down to central valley (810, 465)
    const p = (x - 620) / (810 - 620)
    return 355 + p * (465 - 355)
  } else if (x <= 980) {
    // Central valley up to Peak 3 (980, 355)
    const p = (x - 810) / (980 - 810)
    return 465 - p * (465 - 355)
  } else if (x <= 1155) {
    // Peak 3 down to right saddle (1155, 465)
    const p = (x - 980) / (1155 - 980)
    return 355 + p * (465 - 355)
  } else if (x <= 1260) {
    // Right saddle up to Peak 4 (1260, 265)
    const p = (x - 1155) / (1260 - 1155)
    return 465 - p * (465 - 265)
  } else if (x <= 1800) {
    // Peak 4 down to eastern horizon (1800, 472)
    const p = (x - 1260) / (1800 - 1260)
    return 265 + p * (472 - 265)
  } else {
    return 472
  }
}

/* ══════════════════════════════════════════════════════════════════
   🌉 3D PERSPECTIVE BOTANICAL ARCHED FOOTBRIDGE (TRUE DEPTH & VOLUME)
   - Seen from ~18° elevation looking down across the lake
   - Full 3D architecture: Visible walking deck surface with individual cross-planks!
   - Dual Railings: Distant Far Railing and Foreground Near Railing
   - Visible 3D fascia beam with light top lip and shaded underbelly
   - 4 Heavy timber bent trestles with front & back pilings and diagonal X-braces
   - Cylindrical 3D newel posts with chamfered pyramid caps casting shadows on deck
   - 3D Hexagonal Heritage Lanterns with multiple glass facets & warm light cones
   - Interactive tap target for botanical field notes
══════════════════════════════════════════════════════════════════ */


function RealisticMountainRange({
  isNight,
  directSunFactor,
  sunsetFactor,
  nightFactor,
  sunPos,
  mountainOcclusion,
  mountainRidgeY,
  simTick,
}) {
  const mtnLight = useMemo(() => {
    if (isNight) {
      return {
        farRange: '#111c2e',
        midWest: '#1a273b',
        midEast: '#0f1826',
        midSnow: '#64748b',
        foreWest: '#1e2b40',
        foreWestHigh: '#273852',
        foreEast: '#111c2a',
        foreEastDeep: '#0b131e',
        snowSunlit: '#94a3b8',
        snowShadow: '#475569',
        mist: '#0b1626',
        forestBack: '#07101c',
        forestFront: '#0b1724',
        strata: '#334155',
      }
    }

    if (sunsetFactor > 0.15) {
      const s = Math.min(1, (sunsetFactor - 0.15) / 0.7)
      return {
        farRange: s > 0.5 ? '#4a2545' : '#5b4a68',
        midWest: s > 0.5 ? '#9a3412' : '#7c3aed',
        midEast: s > 0.5 ? '#311042' : '#2e1065',
        midSnow: s > 0.5 ? '#fbcfe8' : '#e0e7ff',
        foreWest: s > 0.5 ? '#c2410c' : '#713f12',
        foreWestHigh: s > 0.5 ? '#ea580c' : '#a16207',
        foreEast: s > 0.5 ? '#3b0764' : '#2e1065',
        foreEastDeep: s > 0.5 ? '#1f0438' : '#1e1b4b',
        snowSunlit: s > 0.5 ? '#fed7aa' : '#fef08a',
        snowShadow: s > 0.5 ? '#c084fc' : '#a5b4fc',
        mist: s > 0.5 ? '#701a75' : '#475569',
        forestBack: '#16281e',
        forestFront: '#1c3826',
        strata: '#fdba74',
      }
    }

    // Daytime Natural Alpine Palette
    return {
      farRange: '#7692b0',
      midWest: '#5f7c9e',
      midEast: '#384d64',
      midSnow: '#e2e8f0',
      foreWest: directSunFactor < 0.25 ? '#3b4e64' : '#577293',
      foreWestHigh: directSunFactor < 0.25 ? '#4b617b' : '#6b89ae',
      foreEast: directSunFactor < 0.25 ? '#243242' : '#33475d',
      foreEastDeep: directSunFactor < 0.25 ? '#1a2532' : '#233243',
      snowSunlit: directSunFactor < 0.25 ? '#cbd5e1' : '#ffffff',
      snowShadow: directSunFactor < 0.25 ? '#94a3b8' : '#cbd5e1',
      mist: '#bfdbfe',
      forestBack: '#183025',
      forestFront: '#1e3d2f',
      strata: '#8da5c4',
    }
  }, [isNight, sunsetFactor, directSunFactor])

  return (
    <g id="realistic-alpine-mountain-system">
      {/* ── 1. FAR DISTANT ALPINE RIDGE (ATMOSPHERIC AERIAL PERSPECTIVE) ── */}
      <path
        d="M -400 472 L -360 410 L -280 375 L -190 420 L -90 350 L 10 405 L 120 330 L 230 380 L 320 345 L 420 395 L 530 325 L 660 385 L 770 335 L 890 380 L 990 315 L 1100 370 L 1220 325 L 1340 375 L 1460 305 L 1580 365 L 1710 320 L 1840 380 L 2000 340 L 2000 475 L -400 475 Z"
        fill="url(#mtnDistantHazeGrad)"
        opacity="0.88"
      />

      {/* Far Distant Snow Crests */}
      <polygon points="110,336 120,330 132,337" fill={mtnLight.midSnow} opacity="0.65" />
      <polygon points="522,331 530,325 540,332" fill={mtnLight.midSnow} opacity="0.65" />
      <polygon points="982,321 990,315 1000,322" fill={mtnLight.midSnow} opacity="0.65" />
      <polygon points="1450,312 1460,305 1472,314" fill={mtnLight.midSnow} opacity="0.65" />
      <polygon points="1702,326 1710,320 1720,328" fill={mtnLight.midSnow} opacity="0.65" />

      {/* Atmospheric Valley Mist (Layer 1.5) */}
      <rect x="-400" y="420" width="2400" height="55" fill="url(#mtnValleyMistGrad)" opacity="0.65" />

      {/* ── 2. MIDGROUND MOUNTAIN MASSIFS (RISING IN SADDLES & VALLEYS) ── */}
      <g id="midground-mountain-massifs" opacity="0.92">
        {/* Mid Peak 1 (West Saddle Flank: Peak at 110, 330) */}
        <polygon points="-80,472 110,330 110,472" fill={mtnLight.midWest} />
        <polygon points="110,330 260,455 110,472" fill={mtnLight.midEast} />
        <polygon points="95,342 110,330 122,342" fill={mtnLight.midSnow} />

        {/* Mid Peak 2 (Waterfall Saddle Col: Peak at 480, 325) */}
        <polygon points="360,450 480,325 480,450" fill={mtnLight.midWest} />
        <polygon points="480,325 590,445 480,450" fill={mtnLight.midEast} />
        <polygon points="465,340 480,325 496,340" fill={mtnLight.midSnow} />

        {/* Mid Peak 3 (Central Valley Massif: Peak at 810, 330) */}
        <polygon points="690,460 810,330 810,460" fill={mtnLight.midWest} />
        <polygon points="810,330 920,455 810,460" fill={mtnLight.midEast} />
        <polygon points="795,344 810,330 826,344" fill={mtnLight.midSnow} />

        {/* Mid Peak 4 (East Saddle Col: Peak at 1130, 320) */}
        <polygon points="1030,455 1130,320 1130,455" fill={mtnLight.midWest} />
        <polygon points="1130,320 1220,450 1130,455" fill={mtnLight.midEast} />
        <polygon points="1115,335 1130,320 1145,335" fill={mtnLight.midSnow} />

        {/* Mid Peak 5 (Far East Massif: Peak at 1520, 310) */}
        <polygon points="1370,455 1520,310 1520,455" fill={mtnLight.midWest} />
        <polygon points="1520,310 1730,465 1520,455" fill={mtnLight.midEast} />
        <polygon points="1505,324 1520,310 1538,326" fill={mtnLight.midSnow} />
      </g>

      {/* Mountain Ridge Rim Light (Backlight scattering when Sun ducks behind ridge) */}
      {!isNight && mountainOcclusion > 0.05 && (
        <ellipse
          cx={sunPos.x}
          cy={mountainRidgeY}
          rx={90 + 35 * mountainOcclusion}
          ry={22 + 10 * mountainOcclusion}
          fill="#fef08a"
          opacity={mountainOcclusion * 0.55 * (1 - nightFactor)}
          filter="blur(14px)"
          pointerEvents="none"
        />
      )}

      {/* ── 3. HERO FOREGROUND ALPINE MASSIFS (ORGANIC CRAGS, FACETS & SNOWPACK) ── */}
      <g id="hero-foreground-alpine-massifs">
        {/* ── MASSIF 1: WESTERN ALPINE HORN (Apex at 340, 275) ── */}
        <g id="massif-1-western-horn">
          {/* Main Sunlit West Face with Natural Arête */}
          <path
            d="M -150 472 L -70 435 L 20 405 L 110 370 L 180 340 L 250 310 L 292 298 L 326 281 L 340 275 L 344 298 L 346 320 L 343 345 L 348 395 L 342 445 L 345 472 L -150 472 Z"
            fill={mtnLight.foreWest}
          />
          {/* Elevated Sunlit Crag Shoulder Buttress */}
          <path
            d="M 230 325 L 292 298 L 326 281 L 340 275 L 344 298 L 312 345 L 230 325 Z"
            fill={mtnLight.foreWestHigh}
          />
          {/* Main Shadow East Face */}
          <path
            d="M 340 275 L 358 285 L 375 298 L 415 335 L 450 380 L 475 425 L 475 472 L 345 472 L 342 445 L 348 395 L 343 345 L 346 320 L 344 298 L 340 275 Z"
            fill={mtnLight.foreEast}
          />
          {/* Deep Shadowed Cirque Crevasse Couloir */}
          <path
            d="M 344 315 L 395 345 L 425 395 L 385 435 L 342 445 L 348 395 L 343 345 Z"
            fill={mtnLight.foreEastDeep}
          />

          {/* Geological Rock Strata & Cleavage Fractures */}
          <line x1="270" y1="316" x2="310" y2="340" stroke={mtnLight.strata} strokeWidth="1.2" opacity="0.32" />
          <line x1="210" y1="346" x2="260" y2="375" stroke={mtnLight.strata} strokeWidth="1.2" opacity="0.25" />
          <line x1="140" y1="382" x2="190" y2="410" stroke={mtnLight.strata} strokeWidth="1.2" opacity="0.22" />
          <line x1="365" y1="310" x2="395" y2="330" stroke={mtnLight.foreEastDeep} strokeWidth="1.2" opacity="0.45" />
          <line x1="390" y1="350" x2="430" y2="375" stroke={mtnLight.foreEastDeep} strokeWidth="1.2" opacity="0.45" />

          {/* Organic Alpine Summit Snow Mantle & Couloir Chutes */}
          {/* Sunlit Summit Snow Mantle with natural couloir fingers */}
          <path
            d="M 340 275 L 326 281 L 310 289 L 292 298 L 275 308 L 282 315 L 290 312 L 298 325 L 305 320 L 316 342 L 324 336 L 332 355 L 340 348 L 343 345 L 346 320 L 344 298 Z"
            fill={mtnLight.snowSunlit}
          />
          {/* Shadowed Couloir Snowpack with natural crevasse drifts */}
          <path
            d="M 340 275 L 344 298 L 346 320 L 343 345 L 340 348 L 345 365 L 354 360 L 362 345 L 370 348 L 382 332 L 378 322 L 392 310 L 375 298 L 358 285 Z"
            fill={mtnLight.snowShadow}
          />
        </g>

        {/* ── MASSIF 2: CENTER-WEST MASSIF (Apex at 620, 355) ── */}
        <g id="massif-2-center-west">
          {/* Sunlit West Face */}
          <path
            d="M 475 425 L 515 405 L 565 380 L 620 355 L 615 385 L 628 425 L 622 472 L 475 472 Z"
            fill={mtnLight.foreWest}
          />
          <polygon points="565,380 620,355 615,385 580,395" fill={mtnLight.foreWestHigh} />
          {/* Shadow East Face */}
          <path
            d="M 620 355 L 665 375 L 715 405 L 765 435 L 810 465 L 810 472 L 622 472 L 628 425 L 615 385 Z"
            fill={mtnLight.foreEast}
          />
          {/* Shaded Cirque Crevasse */}
          <polygon points="620,370 650,390 685,435 635,445 628,425" fill={mtnLight.foreEastDeep} />

          {/* Geological Strata */}
          <line x1="535" y1="398" x2="575" y2="422" stroke={mtnLight.strata} strokeWidth="1.2" opacity="0.3" />
          <line x1="650" y1="385" x2="690" y2="410" stroke={mtnLight.foreEastDeep} strokeWidth="1.2" opacity="0.45" />

          {/* Snow Mantle */}
          <path d="M 580 372 L 620 355 L 615 380 L 600 385 L 592 376 Z" fill={mtnLight.snowSunlit} />
          <path d="M 620 355 L 645 368 L 655 395 L 638 410 L 625 385 L 615 380 Z" fill={mtnLight.snowShadow} />
        </g>

        {/* ── MASSIF 3: CENTER-EAST TWIN-TOWER MASSIF (Main Summit 980, 355; Spire 945, 370) ── */}
        <g id="massif-3-twin-towers">
          {/* Sunlit West Face & Spire */}
          <path
            d="M 810 465 L 855 435 L 905 395 L 945 370 L 960 375 L 980 355 L 975 390 L 988 430 L 982 472 L 810 472 Z"
            fill={mtnLight.foreWest}
          />
          <polygon points="905,395 945,370 960,375 930,405" fill={mtnLight.foreWestHigh} />
          <polygon points="960,375 980,355 975,390 965,395" fill={mtnLight.foreWestHigh} />
          {/* Shadow East Face */}
          <path
            d="M 980 355 L 1025 375 L 1075 405 L 1125 435 L 1155 465 L 1155 472 L 982 472 L 988 430 L 975 390 Z"
            fill={mtnLight.foreEast}
          />
          {/* Shaded Cleft */}
          <polygon points="980,370 1015,392 1050,440 998,445 988,430" fill={mtnLight.foreEastDeep} />

          {/* Geological Strata */}
          <line x1="875" y1="422" x2="915" y2="445" stroke={mtnLight.strata} strokeWidth="1.2" opacity="0.3" />
          <line x1="1010" y1="385" x2="1050" y2="410" stroke={mtnLight.foreEastDeep} strokeWidth="1.2" opacity="0.45" />

          {/* Snow Mantle & Notch Couloir Ribbon */}
          <path d="M 932 376 L 945 370 L 955 374 L 945 385 Z" fill={mtnLight.snowSunlit} />
          <path d="M 960 375 L 980 355 L 975 380 L 968 385 Z" fill={mtnLight.snowSunlit} />
          <path d="M 980 355 L 1005 368 L 1018 395 L 1000 408 L 986 385 L 975 380 Z" fill={mtnLight.snowShadow} />
        </g>

        {/* ── MASSIF 4: EASTERN GRAND ALPINE MASSIF (Apex at 1260, 265) ── */}
        <g id="massif-4-eastern-grand-massif">
          {/* Main Sunlit West Face with Razor Arête */}
          <path
            d="M 1155 465 L 1175 420 L 1205 360 L 1235 310 L 1260 265 L 1255 305 L 1270 355 L 1258 410 L 1266 472 L 1155 472 Z"
            fill={mtnLight.foreWest}
          />
          {/* Upper West Cliff Buttress */}
          <path
            d="M 1205 360 L 1235 310 L 1260 265 L 1255 305 L 1230 350 Z"
            fill={mtnLight.foreWestHigh}
          />
          {/* Main Shadow East Face Sweeping to Horizon */}
          <path
            d="M 1260 265 L 1310 285 L 1375 320 L 1455 365 L 1550 405 L 1660 445 L 1800 472 L 1266 472 L 1258 410 L 1270 355 L 1255 305 Z"
            fill={mtnLight.foreEast}
          />
          {/* Deep Shadowed Glacial Cirque Wall */}
          <path
            d="M 1265 310 L 1320 335 L 1370 390 L 1315 440 L 1258 410 L 1270 355 Z"
            fill={mtnLight.foreEastDeep}
          />

          {/* Geological Rock Strata */}
          <line x1="1200" y1="375" x2="1240" y2="400" stroke={mtnLight.strata} strokeWidth="1.2" opacity="0.32" />
          <line x1="1170" y1="430" x2="1215" y2="455" stroke={mtnLight.strata} strokeWidth="1.2" opacity="0.25" />
          <line x1="1285" y1="300" x2="1325" y2="325" stroke={mtnLight.foreEastDeep} strokeWidth="1.2" opacity="0.45" />
          <line x1="1340" y1="340" x2="1395" y2="370" stroke={mtnLight.foreEastDeep} strokeWidth="1.2" opacity="0.45" />
          <line x1="1420" y1="385" x2="1485" y2="420" stroke={mtnLight.foreEastDeep} strokeWidth="1.2" opacity="0.45" />

          {/* Organic Alpine Summit Snow Mantle & Couloir Chutes */}
          {/* Sunlit Summit Snow Mantle with natural couloir fingers */}
          <path
            d="M 1260 265 L 1248 285 L 1235 305 L 1220 320 L 1228 326 L 1236 322 L 1244 338 L 1252 332 L 1258 348 L 1260 350 L 1265 320 L 1257 290 Z"
            fill={mtnLight.snowSunlit}
          />
          {/* Deep Eastern Couloir Snow Chute */}
          <path
            d="M 1260 265 L 1257 290 L 1265 320 L 1260 350 L 1268 375 L 1278 370 L 1285 352 L 1296 356 L 1312 338 L 1324 342 L 1338 320 L 1320 308 L 1295 288 L 1275 274 Z"
            fill={mtnLight.snowShadow}
          />
        </g>
      </g>

      {/* ── 4. ALPINE WATERFALL IN MOUNTAIN RAVINE (X: 440-456, Y: 432-475) ── */}
      <g id="mountain-waterfall-ravine">
        {/* Rocky gorge cleft */}
        <polygon points="436,474 442,434 456,434 462,474" fill={mtnLight.foreEastDeep} />
        {/* Cascading whitewater stream */}
        <path
          d="M 444 435 Q 443 452 444 474 L 452 474 Q 454 452 452 435 Z"
          fill="url(#waterfallStreamGrad)"
        />
        {/* Animated shimmering highlights */}
        <path
          d={`M ${446 + Math.sin(simTick * 8) * 1.5} 438 L ${446 + Math.sin(simTick * 8 + 1) * 1.5} 472`}
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d={`M ${449 + Math.cos(simTick * 7) * 1.2} 442 L ${449 + Math.cos(simTick * 7 + 1) * 1.2} 473`}
          stroke="#dbeafe"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.75"
        />
        {/* Frothing spray plume at lake waterline */}
        <ellipse cx="448" cy="474" rx="14" ry="4" fill="#ffffff" opacity="0.85" filter="blur(1px)" />
        <ellipse
          cx="448"
          cy="475"
          rx={18 + Math.sin(simTick * 4) * 4}
          ry={5 + Math.sin(simTick * 4) * 1.5}
          fill="none"
          stroke="#bfdbfe"
          strokeWidth="1.2"
          opacity="0.6"
        />
      </g>

      {/* ── 5. ORGANIC CONIFEROUS SHORELINE PINE FOREST BELT ── */}
      <g id="coniferous-shoreline-forest">
        {/* Shoreline Foothill Earthen Bank */}
        <path
          d="M -400 466 Q 0 468 400 467 Q 800 469 1200 467 Q 1600 469 2000 466 L 2000 476 L -400 476 Z"
          fill="url(#shorelineBankGrad)"
        />

        {/* Back Tier Pine Trees (Atmospheric Deep Forest) */}
        <path d={PINE_FOREST_BACK_PATH} fill={mtnLight.forestBack} />

        {/* Front Tier Pine Trees (Dense 3-Tier Stepped Conifers) */}
        <path d={PINE_FOREST_FRONT_PATH} fill={mtnLight.forestFront} />

        {/* Subtle Shoreline Water Reflection under Pines */}
        <path
          d="M -400 476 Q 0 479 400 477 Q 800 480 1200 477 Q 1600 480 2000 476 L 2000 484 L -400 484 Z"
          fill={mtnLight.forestBack}
          opacity="0.32"
          filter="blur(2px)"
        />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌊 REALISTIC WATER SPECULAR GLADE & RANDOMLY SPREADING WAVELETS
   - Wide, organic spreading light fan matching the atmospheric sun rays!
   - Stochastic wave scatter: wavelets naturally dispersed across a wide bell-curve field
   - Multi-tiered perspective: fine ripples near shore expanding widely towards foreground
   - Liquid current undulation: sinusoidal 2D drift and caustic shimmer
   - Delicate diamond sparkle pinpricks randomly scattered across the water
   - Real-physics alpenglow, moonlit silver shimmer & mountain occlusion dimming
══════════════════════════════════════════════════════════════════ */


export default React.memo(RealisticMountainRange, (prev, next) => {
  return (
    prev.isNight === next.isNight &&
    Math.abs((prev.sunsetFactor || 0) - (next.sunsetFactor || 0)) < 0.08 &&
    Math.abs((prev.directSunFactor || 0) - (next.directSunFactor || 0)) < 0.08 &&
    Math.abs((prev.mountainOcclusion || 0) - (next.mountainOcclusion || 0)) < 0.08
  )
})
export { getMountainRidgeY }
