'use client'

import React from 'react'

function CelestialSky({
  isNight,
  nightFactor,
  sunsetFactor,
  directSunFactor,
  sunPos,
  moonPos,
  isDraggingSun,
  isDraggingMoon,
  simTick = 0,
  handleSunPointerDown,
  handleMoonPointerDown,
}) {
  return (
    <g id="celestial-sky-layer">
        {/* ── 1. SKY BACKGROUND (WIDE BLEED: X: -400 to 2000) ── */}
        <rect x="-400" y="0" width="2400" height="560" fill="url(#skyDayGrad)" />
        <rect
          x="-400"
          y="0"
          width="2400"
          height="560"
          fill="url(#skySunsetGrad)"
          opacity={sunsetFactor * (1 - nightFactor)}
        />
        <rect x="-400" y="0" width="2400" height="560" fill="url(#skyNightGrad)" opacity={nightFactor} />

        {/* ── 2. NIGHT STARS ── */}
        {isNight && (
          <g opacity={nightFactor}>
            {[
              { cx: 80, cy: 90, r: 1.5, o: 0.9 },
              { cx: 160, cy: 150, r: 1.2, o: 0.7 },
              { cx: 260, cy: 75, r: 1.8, o: 0.8 },
              { cx: 440, cy: 110, r: 1.4, o: 0.9 },
              { cx: 560, cy: 60, r: 2.0, o: 0.85 },
              { cx: 680, cy: 140, r: 1.2, o: 0.6 },
              { cx: 780, cy: 80, r: 1.6, o: 0.9 },
              { cx: 890, cy: 50, r: 1.5, o: 0.75 },
              { cx: 990, cy: 120, r: 2.2, o: 0.95 },
              { cx: 1110, cy: 70, r: 1.4, o: 0.8 },
              { cx: 1230, cy: 140, r: 1.8, o: 0.85 },
              { cx: 1350, cy: 85, r: 1.3, o: 0.7 },
              { cx: 1460, cy: 60, r: 1.6, o: 0.9 },
              { cx: 1540, cy: 130, r: 1.2, o: 0.6 },
            ].map((star, idx) => (
              <motion.circle
                key={`star-${idx}`}
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                fill="#ffffff"
                opacity={star.o}
                animate={{ opacity: [star.o * 0.4, star.o, star.o * 0.4] }}
                transition={{ duration: 2.5 + (idx % 3), repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </g>
        )}

        {/* ── 3. REALISTIC VOLUMETRIC DRIFTING CLOUDS & FLOCK OF VALLEY BIRDS ── */}
        <DriftingClouds
          simTick={simTick}
          sunsetFactor={sunsetFactor}
          isNight={isNight}
          nightFactor={nightFactor}
        />

        {/* Dynamic flock of flying birds with realistic wing flapping! */}
        <FlyingBirds simTick={simTick} isNight={isNight} />

        {/* ── 3b. CREPUSCULAR GOD RAYS (STREAMING DOWN FROM SUN INTO VALLEY) ── */}
        {!isNight && (
          <g opacity={(1 - nightFactor) * 0.24 * (directSunFactor * directSunFactor)} pointerEvents="none">
            <polygon
              points={`${sunPos.x},${sunPos.y} ${sunPos.x - 420},900 ${sunPos.x - 220},900`}
              fill="url(#godRayGrad)"
            />
            <polygon
              points={`${sunPos.x},${sunPos.y} ${sunPos.x - 120},900 ${sunPos.x + 80},900`}
              fill="url(#godRayGrad)"
            />
            <polygon
              points={`${sunPos.x},${sunPos.y} ${sunPos.x + 180},900 ${sunPos.x + 400},900`}
              fill="url(#godRayGrad)"
            />
            <polygon
              points={`${sunPos.x},${sunPos.y} ${sunPos.x + 500},900 ${sunPos.x + 750},900`}
              fill="url(#godRayGrad)"
            />
          </g>
        )}

        {/* ── 4. CELESTIAL SUN & MOON (PERSISTENT & 100% DRAGGABLE BI-DIRECTIONALLY) ── */}
        <g
          id="celestial-sun"
          transform={`translate(${sunPos.x}, ${sunPos.y})`}
          style={{
            cursor: isDraggingSun ? 'grabbing' : 'grab',
            touchAction: 'none',
            display: isNight ? 'none' : 'block',
          }}
          onPointerDown={handleSunPointerDown}
        >
          {/* Giant invisible grab area for 100% easy touch/mouse grab on ALL portions */}
          <circle cx="0" cy="0" r="150" fill="#ffffff" opacity="0.001" pointerEvents="all" />

          {/* Multi-tier soft glowing warm golden corona - dims realistically behind mountains */}
          <circle cx="0" cy="0" r="95" fill="url(#sunOuterCorona)" opacity={0.12 + 0.33 * directSunFactor} filter="blur(16px)" />
          <circle cx="0" cy="0" r="68" fill="url(#sunMidCorona)" opacity={0.20 + 0.45 * directSunFactor} filter="blur(8px)" />

          {/* 12 Radiant Golden Triangular Sunray Petals */}
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={`sun-ray-${i}`}
              d="M -7 -44 L 0 -72 L 7 -44 Z"
              transform={`rotate(${(i / 12) * 360 + simTick * 3})`}
              fill="url(#sunRayGrad)"
              filter="drop-shadow(0 0 4px rgba(245, 158, 11, 0.5))"
            />
          ))}

          {/* Golden Sun Core Disc */}
          <circle cx="0" cy="0" r="46" fill="url(#sunDiscGrad)" stroke="#f59e0b" strokeWidth="2.5" />

          {/* Adorable Sweet Smiling Face from Image 3! */}
          {/* Sparkling Dark Chocolate Eyes */}
          <circle cx="-13" cy="-4" r="3.2" fill="#78350f" />
          <circle cx="-14" cy="-5" r="1.2" fill="#ffffff" />
          <circle cx="13" cy="-4" r="3.2" fill="#78350f" />
          <circle cx="12" cy="-5" r="1.2" fill="#ffffff" />

          {/* Rosy Blushing Cheeks */}
          <ellipse cx="-19" cy="4" rx="5.5" ry="4" fill="#f472b6" opacity="0.65" filter="blur(1px)" />
          <ellipse cx="19" cy="4" rx="5.5" ry="4" fill="#f472b6" opacity="0.65" filter="blur(1px)" />

          {/* Cheerful Curved Smile */}
          <path
            d="M -10 6 Q 0 16 10 6"
            fill="none"
            stroke="#78350f"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </g>

        <g
          id="celestial-moon"
          transform={`translate(${moonPos.x}, ${moonPos.y})`}
          style={{
            cursor: isDraggingMoon ? 'grabbing' : 'grab',
            touchAction: 'none',
            display: isNight ? 'block' : 'none',
          }}
          onPointerDown={handleMoonPointerDown}
        >
          {/* Giant invisible grab area for moon */}
          <circle cx="0" cy="0" r="115" fill="#ffffff" opacity="0.001" pointerEvents="all" />

          {/* Soft Luminous Lunar Corona */}
          <circle cx="0" cy="0" r="75" fill="url(#moonGlowGrad)" opacity="0.65" filter="blur(12px)" />
          <circle cx="0" cy="0" r="44" fill="#ffffff" opacity="0.95" />
          <circle cx="0" cy="0" r="42" fill="#f8fafc" />

          {/* Lunar Maria Craters */}
          <circle cx="-12" cy="-8" r="7" fill="#e2e8f0" opacity="0.75" />
          <circle cx="14" cy="11" r="6" fill="#e2e8f0" opacity="0.65" />
          <circle cx="-8" cy="15" r="5" fill="#e2e8f0" opacity="0.6" />
          <circle cx="6" cy="-14" r="4" fill="#e2e8f0" opacity="0.55" />

          {/* Gentle Peaceful Sleeping Moon Face */}
          <path d="M -15 -2 Q -10 -7 -5 -2" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 5 -2 Q 10 -7 15 -2" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M -6 8 Q 0 14 6 8" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </g>


    </g>
  )
}

export default React.memo(CelestialSky)
