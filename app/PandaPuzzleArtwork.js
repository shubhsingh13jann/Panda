'use client'

import React from 'react'

/**
 * High-definition, fully vector Queen Panda Birthday Portrait.
 * Canvas resolution: 600 x 400 (3 columns of 200px, 2 rows of 200px).
 * Master artwork containing character vector assets, royal crown, cake, and bamboo framing.
 */
export function PandaArtworkContent() {
  return (
    <g id="panda-master-artwork">
      <defs>
        {/* Background Gradients */}
        <radialGradient id="art-bg-glow" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="50%" stopColor="#022c22" />
          <stop offset="100%" stopColor="#011611" />
        </radialGradient>

        <linearGradient id="art-gold-crown" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#fbbf24" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        <linearGradient id="art-bamboo-stem" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="45%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        <linearGradient id="art-sakura" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>

        <linearGradient id="art-cake-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>

        <linearGradient id="art-cake-strawberry" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>

        <radialGradient id="art-flame" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#fde047" />
          <stop offset="75%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="art-cheek-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="art-ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* ── 1. BACKGROUND SKY & GLOW ── */}
      <rect x="0" y="0" width="600" height="400" fill="url(#art-bg-glow)" />

      {/* Bokeh circles */}
      <circle cx="80" cy="90" r="45" fill="#10b981" opacity="0.12" filter="blur(10px)" />
      <circle cx="520" cy="110" r="55" fill="#fbbf24" opacity="0.14" filter="blur(12px)" />
      <circle cx="300" cy="210" r="140" fill="#34d399" opacity="0.18" filter="blur(20px)" />
      <circle cx="160" cy="320" r="60" fill="#f472b6" opacity="0.12" filter="blur(14px)" />
      <circle cx="470" cy="330" r="65" fill="#38bdf8" opacity="0.12" filter="blur(15px)" />

      {/* ── 2. BAMBOO STALKS (LEFT & RIGHT EDGES) ── */}
      <g opacity="0.85">
        <rect x="24" y="0" width="18" height="400" rx="3" fill="url(#art-bamboo-stem)" />
        <line x1="24" y1="80" x2="42" y2="80" stroke="#064e3b" strokeWidth="2.5" />
        <line x1="24" y1="170" x2="42" y2="170" stroke="#064e3b" strokeWidth="2.5" />
        <line x1="24" y1="265" x2="42" y2="265" stroke="#064e3b" strokeWidth="2.5" />
        <line x1="24" y1="355" x2="42" y2="355" stroke="#064e3b" strokeWidth="2.5" />
        <path d="M 42 80 C 65 72, 85 90, 100 86 C 85 96, 60 92, 42 84 Z" fill="#34d399" />
        <path d="M 42 170 C 70 160, 95 180, 115 174 C 95 186, 68 182, 42 174 Z" fill="#10b981" />
        <path d="M 24 265 C 5 255, -15 275, -30 270 C -15 282, 5 276, 24 268 Z" fill="#34d399" />
      </g>

      <g opacity="0.85">
        <rect x="558" y="0" width="18" height="400" rx="3" fill="url(#art-bamboo-stem)" />
        <line x1="558" y1="75" x2="576" y2="75" stroke="#064e3b" strokeWidth="2.5" />
        <line x1="558" y1="165" x2="576" y2="165" stroke="#064e3b" strokeWidth="2.5" />
        <line x1="558" y1="260" x2="576" y2="260" stroke="#064e3b" strokeWidth="2.5" />
        <line x1="558" y1="350" x2="576" y2="350" stroke="#064e3b" strokeWidth="2.5" />
        <path d="M 558 75 C 530 65, 505 85, 485 80 C 505 92, 532 87, 558 79 Z" fill="#34d399" />
        <path d="M 558 165 C 525 152, 498 174, 475 167 C 498 180, 528 175, 558 169 Z" fill="#10b981" />
        <path d="M 576 260 C 600 250, 620 270, 635 264 C 620 276, 595 271, 576 263 Z" fill="#34d399" />
      </g>

      {/* ── 3. FESTIVE BUNTING GARLAND (TOP ROW) ── */}
      <path d="M 30 28 Q 160 55 300 36 Q 440 55 570 28" fill="none" stroke="#fde68a" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
      {[
        { x: 60,  y: 33, c: '#f43f5e', t: 'H' },
        { x: 100, y: 40, c: '#fbbf24', t: 'A' },
        { x: 140, y: 45, c: '#10b981', t: 'P' },
        { x: 180, y: 47, c: '#38bdf8', t: 'P' },
        { x: 220, y: 44, c: '#a855f7', t: 'Y' },
        { x: 260, y: 39, c: '#f472b6', t: '★' },
        { x: 300, y: 36, c: '#fbbf24', t: 'B' },
        { x: 340, y: 39, c: '#10b981', t: '★' },
        { x: 380, y: 44, c: '#38bdf8', t: 'G' },
        { x: 420, y: 47, c: '#f43f5e', t: 'G' },
        { x: 460, y: 45, c: '#fbbf24', t: '🐼' },
        { x: 500, y: 40, c: '#a855f7', t: '♥' },
        { x: 540, y: 33, c: '#10b981', t: '✨' },
      ].map((flag, idx) => (
        <g key={idx}>
          <polygon points={`${flag.x - 13},${flag.y} ${flag.x + 13},${flag.y} ${flag.x},${flag.y + 24}`} fill={flag.c} opacity="0.9" />
          <text x={flag.x} y={flag.y + 14} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="sans-serif">
            {flag.t}
          </text>
        </g>
      ))}

      {/* Floating Sparkles & Sakura Petals in Background */}
      {[
        { cx: 120, cy: 110, s: 12 },
        { cx: 480, cy: 120, s: 14 },
        { cx: 90,  cy: 230, s: 10 },
        { cx: 510, cy: 240, s: 11 },
        { cx: 150, cy: 360, s: 13 },
        { cx: 460, cy: 365, s: 12 },
      ].map((p, i) => (
        <path
          key={`petal-${i}`}
          d={`M ${p.cx} ${p.cy} C ${p.cx - p.s} ${p.cy - p.s * 0.5}, ${p.cx - p.s * 0.8} ${p.cy - p.s * 1.5}, ${p.cx} ${p.cy - p.s * 1.3} C ${p.cx + p.s * 0.8} ${p.cy - p.s * 1.5}, ${p.cx + p.s} ${p.cy - p.s * 0.5}, ${p.cx} ${p.cy} Z`}
          fill="url(#art-sakura)"
          opacity="0.85"
          transform={`rotate(${i * 45} ${p.cx} ${p.cy})`}
        />
      ))}

      {/* Golden stars */}
      {[
        { x: 170, y: 105, r: 4 },
        { x: 430, y: 95,  r: 4.5 },
        { x: 200, y: 190, r: 3 },
        { x: 400, y: 185, r: 3.5 },
        { x: 80,  cy: 160, r: 3 },
        { x: 530, y: 190, r: 3.5 },
      ].map((star, i) => (
        <circle key={`star-${i}`} cx={star.x} cy={star.y} r={star.r} fill="#fde047" opacity="0.9" filter="drop-shadow(0 0 4px #fbbf24)" />
      ))}

      {/* ── 4. CHUBBY PANDA BODY & ARMS ── */}
      <ellipse cx="300" cy="295" rx="135" ry="100" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2.5" />
      <ellipse cx="300" cy="305" rx="95" ry="68" fill="#f8fafc" />

      {/* Left Arm holding Fresh Bamboo Shoot */}
      <g>
        <rect x="178" y="210" width="14" height="110" rx="3" transform="rotate(-25 185 265)" fill="url(#art-bamboo-stem)" stroke="#064e3b" strokeWidth="1" />
        <line x1="172" y1="235" x2="190" y2="230" stroke="#064e3b" strokeWidth="2" />
        <line x1="180" y1="280" x2="198" y2="275" stroke="#064e3b" strokeWidth="2" />
        <path d="M 172 232 C 145 220, 130 235, 115 230 C 130 242, 150 240, 172 236 Z" fill="#34d399" />
        <ellipse cx="195" cy="272" rx="34" ry="46" transform="rotate(22 195 272)" fill="#1e293b" />
        <ellipse cx="198" cy="285" rx="10" ry="8" fill="#f472b6" opacity="0.65" />
      </g>

      {/* Right Arm waving hello */}
      <g>
        <ellipse cx="405" cy="255" rx="34" ry="44" transform="rotate(-32 405 255)" fill="#1e293b" />
        <ellipse cx="414" cy="242" rx="11" ry="9" fill="#f472b6" opacity="0.8" />
        <circle cx="404" cy="230" r="3.5" fill="#f472b6" opacity="0.75" />
        <circle cx="414" cy="227" r="3.5" fill="#f472b6" opacity="0.75" />
        <circle cx="424" cy="230" r="3.5" fill="#f472b6" opacity="0.75" />
      </g>

      {/* Royal Gold Sister Medallion */}
      <path d="M 270 242 Q 300 258 330 242" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <circle cx="300" cy="260" r="14" fill="url(#art-gold-crown)" stroke="#d97706" strokeWidth="1.5" />
      <text x="300" y="264" textAnchor="middle" fontSize="10" fontWeight="900" fill="#78350f">
        Gg
      </text>

      {/* ── 5. PANDA HEAD & EARS ── */}
      <ellipse cx="212" cy="112" rx="38" ry="34" transform="rotate(-15 212 112)" fill="#1e293b" />
      <ellipse cx="212" cy="112" rx="20" ry="17" fill="#f472b6" opacity="0.5" />
      <g transform="translate(230, 130)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={i} cx="0" cy="0" rx="6" ry="11" transform={`rotate(${deg}) translate(0, -9)`} fill="url(#art-sakura)" />
        ))}
        <circle cx="0" cy="0" r="5" fill="#fbbf24" />
      </g>

      <ellipse cx="388" cy="112" rx="38" ry="34" transform="rotate(15 388 112)" fill="#1e293b" />
      <ellipse cx="388" cy="112" rx="20" ry="17" fill="#f472b6" opacity="0.5" />

      <ellipse cx="300" cy="178" rx="118" ry="94" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />

      {/* ── 6. ROYAL PRINCESS GOLDEN CROWN ── */}
      <g transform="translate(300, 84)">
        <path d="M -42 16 Q 0 24 42 16 L 38 7 Q 0 14 -38 7 Z" fill="url(#art-gold-crown)" stroke="#92400e" strokeWidth="1" />
        <polygon points="-38,7 -48,-18 -26,-2 -15,-28 0,-6" fill="url(#art-gold-crown)" stroke="#92400e" strokeWidth="1" />
        <polygon points="38,7 48,-18 26,-2 15,-28 0,-6" fill="url(#art-gold-crown)" stroke="#92400e" strokeWidth="1" />
        <polygon points="-16,-4 0,-36 16,-4" fill="url(#art-gold-crown)" stroke="#92400e" strokeWidth="1" />
        <circle cx="0" cy="-36" r="4.5" fill="#ef4444" stroke="#fff" strokeWidth="1" />
        <circle cx="-48" cy="-18" r="3.5" fill="#10b981" stroke="#fff" strokeWidth="0.8" />
        <circle cx="48" cy="-18" r="3.5" fill="#10b981" stroke="#fff" strokeWidth="0.8" />
        <circle cx="-15" cy="-28" r="3.5" fill="#3b82f6" stroke="#fff" strokeWidth="0.8" />
        <circle cx="15" cy="-28" r="3.5" fill="#3b82f6" stroke="#fff" strokeWidth="0.8" />
        <circle cx="-24" cy="12" r="2.8" fill="#ef4444" />
        <circle cx="0" cy="15" r="3.5" fill="#10b981" />
        <circle cx="24" cy="12" r="2.8" fill="#ef4444" />
        <path d="M 0 -46 L 2 -38 L 10 -36 L 2 -34 L 0 -26 L -2 -34 L -10 -36 L -2 -38 Z" fill="#ffffff" opacity="0.95" />
      </g>

      {/* ── 7. PANDA FACE FEATURES ── */}
      <ellipse cx="248" cy="172" rx="27" ry="34" transform="rotate(-16 248 172)" fill="#1e293b" />
      <circle cx="251" cy="169" r="14" fill="#090d16" />
      <circle cx="249" cy="164" r="5.5" fill="#ffffff" />
      <circle cx="256" cy="174" r="2.5" fill="#ffffff" />
      <circle cx="254" cy="167" r="1.5" fill="#fbcfe8" />

      <ellipse cx="352" cy="172" rx="27" ry="34" transform="rotate(16 352 172)" fill="#1e293b" />
      <circle cx="349" cy="169" r="14" fill="#090d16" />
      <circle cx="347" cy="164" r="5.5" fill="#ffffff" />
      <circle cx="354" cy="174" r="2.5" fill="#ffffff" />
      <circle cx="352" cy="167" r="1.5" fill="#fbcfe8" />

      <circle cx="225" cy="198" r="18" fill="url(#art-cheek-blush)" />
      <circle cx="375" cy="198" r="18" fill="url(#art-cheek-blush)" />

      <ellipse cx="300" cy="192" rx="11" ry="8" fill="#0f172a" />
      <ellipse cx="298" cy="190" rx="3.5" ry="2" fill="#ffffff" opacity="0.8" />

      <path d="M 292 201 Q 296 208 300 203 Q 304 208 308 201" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 296 206 Q 300 213 304 206 Z" fill="#f472b6" opacity="0.9" />

      {/* ── 8. BIRTHDAY CAKE IN FRONT ── */}
      <g transform="translate(300, 328)">
        <ellipse cx="0" cy="38" rx="64" ry="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
        <ellipse cx="0" cy="36" rx="58" ry="10" fill="#f8fafc" />

        <rect x="-48" y="10" width="96" height="26" rx="6" fill="url(#art-bamboo-stem)" stroke="#064e3b" strokeWidth="1" />
        <ellipse cx="0" cy="10" rx="48" ry="9" fill="#6ee7b7" />
        <path d="M -48 10 Q -40 18 -32 10 Q -24 20 -16 10 Q -8 18 0 10 Q 8 20 16 10 Q 24 18 32 10 Q 40 20 48 10" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

        <rect x="-32" y="-10" width="64" height="20" rx="5" fill="url(#art-cake-strawberry)" stroke="#be123c" strokeWidth="0.8" />
        <ellipse cx="0" cy="-10" rx="32" ry="7" fill="url(#art-cake-top)" />

        <circle cx="-16" cy="-11" r="4.5" fill="#e11d48" />
        <circle cx="16" cy="-11" r="4.5" fill="#e11d48" />

        <rect x="-3" y="-28" width="6" height="18" rx="1.5" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        <line x1="0" y1="-28" x2="0" y2="-32" stroke="#475569" strokeWidth="1.5" />

        <circle cx="0" cy="-38" r="10" fill="#fbbf24" opacity="0.3" filter="blur(4px)" />
        <path d="M 0 -48 C -4 -42, -5 -36, 0 -32 C 5 -36, 4 -42, 0 -48 Z" fill="url(#art-flame)" filter="drop-shadow(0 0 3px #f59e0b)" />
      </g>

      {/* ── 9. BOTTOM CELEBRATION RIBBON BANNER ── */}
      <g transform="translate(300, 384)">
        <path d="M -160 0 Q 0 -6 160 0 L 150 14 Q 0 8 -150 14 Z" fill="url(#art-ribbon)" stroke="#d97706" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
        <text x="0" y="10" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="900" letterSpacing="1.5" fontFamily="sans-serif">
          👑 QUEEN GG 🐼 WORLD'S BEST SISTER 💖
        </text>
      </g>
    </g>
  )
}
