'use client'

import React, { useMemo } from 'react'

function RealisticAlpineCows({ isNight, onInspect }) {
  return (
    <g
      id="alpine-cows-pasture"
      style={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation()
        onInspect?.('cow')
      }}
      title="Tap to inspect Swiss Alpine Cow & Calf (Bos taurus)"
    >
      {/* ── 1. 🐄 REALISTIC SWISS BRAUNVIEH MOTHER COW ── */}
      <g
        transform="translate(1368, 498) scale(0.66)"
        style={{
          filter: isNight ? 'brightness(0.55) contrast(0.95)' : 'none',
          transition: 'filter 1.5s ease-in-out',
        }}
      >
        {/* Soft Ambient Contact Ground Shadow on Alpine Grass */}
        <ellipse cx="6" cy="46" rx="44" ry="7.5" fill="#04120a" opacity="0.32" filter="blur(3.5px)" />
        {/* Hoof Contact Ambient Occlusion Shadows */}
        <ellipse cx="-25" cy="48" rx="4.5" ry="1.8" fill="#020804" opacity="0.45" filter="blur(1px)" />
        <ellipse cx="-17" cy="48" rx="4.5" ry="1.8" fill="#020804" opacity="0.55" filter="blur(1px)" />
        <ellipse cx="20" cy="48" rx="4.5" ry="1.8" fill="#020804" opacity="0.45" filter="blur(1px)" />
        <ellipse cx="26" cy="48" rx="4.5" ry="1.8" fill="#020804" opacity="0.55" filter="blur(1px)" />

        {/* ── FAR LEGS (In Perspective & Shaded Depth) ── */}
        {/* Far Hind Leg: stifle, hock & cloven hoof */}
        <g id="cow-far-hind-leg">
          <path
            d="M 16 12 
               C 19 20, 22 26, 22 32 
               C 22 36, 21 42, 21 46 
               C 21 48, 17 48, 17 46 
               C 17 42, 18 36, 17 32 
               C 16 26, 13 20, 11 12 Z"
            fill="#421d0a"
          />
          {/* Dark Cloven Hoof */}
          <path d="M 17 44 L 16 48 L 22 48 L 21 44 Z" fill="#180e07" />
        </g>

        {/* Far Foreleg: shoulder, knee & cloven hoof */}
        <g id="cow-far-fore-leg">
          <path
            d="M -26 10 
               C -24 18, -24 26, -25 32 
               C -25 38, -25 44, -25 46 
               C -25 48, -29 48, -29 46 
               C -29 44, -29 38, -28 32 
               C -28 26, -28 18, -30 10 Z"
            fill="#421d0a"
          />
          <path d="M -29 44 L -30 48 L -24 48 L -25 44 Z" fill="#180e07" />
        </g>

        {/* ── ANATOMICAL UDDER (Tucked naturally between hind legs) ── */}
        <path
          d="M 8 18 
             C 8 26, 11 31, 16 31 
             C 21 31, 23 26, 23 18 Z"
          fill="#fce7d2"
          stroke="#fed7aa"
          strokeWidth="0.8"
        />
        {/* Teats */}
        <path d="M 12 30 L 11 34.5 L 13 34.5 Z" fill="#f472b6" opacity="0.9" />
        <path d="M 17 30 L 16 34.5 L 18 34.5 Z" fill="#f472b6" opacity="0.9" />

        {/* ── NEAR HIND LEG (Muscular Stifle, Defined Hock & Split Hoof) ── */}
        <g id="cow-near-hind-leg">
          <path
            d="M 10 10 
               C 17 15, 23 21, 27 25 
               C 29 27, 29 31, 27 35 
               C 26 39, 26 44, 26 46 
               C 26 48, 21 48, 21 46 
               C 21 42, 22 37, 23 33 
               C 21 29, 17 25, 12 19 
               C 7 15, 5 12, 5 10 Z"
            fill="url(#cowCoatGrad)"
            stroke="#592911"
            strokeWidth="0.8"
          />
          {/* Hock tendon highlight */}
          <path d="M 27 27 C 28 30, 27 34, 25 38" fill="none" stroke="#a85222" strokeWidth="0.8" opacity="0.5" />
          {/* Cloven Dark Hoof with split slit */}
          <path d="M 21 44 L 20 48 L 27 48 L 26 44 Z" fill="#1c1109" />
          <line x1="23.5" y1="44" x2="23.5" y2="48" stroke="#0d0704" strokeWidth="0.8" />
        </g>

        {/* ── NEAR FORELEG (Muscular Scapula, Carpus Knee & Fetlock) ── */}
        <g id="cow-near-fore-leg">
          <path
            d="M -17 8 
               C -13 14, -13 22, -15 28 
               C -16 32, -16 42, -16 46 
               C -16 48, -21 48, -21 46 
               C -21 42, -20 32, -19 28 
               C -20 22, -20 14, -24 8 Z"
            fill="url(#cowCoatGrad)"
            stroke="#592911"
            strokeWidth="0.8"
          />
          {/* Knee joint definition */}
          <ellipse cx="-17" cy="28" rx="2.5" ry="1.5" fill="#a85222" opacity="0.45" />
          {/* Cloven Hoof */}
          <path d="M -21 44 L -22 48 L -15 48 L -16 44 Z" fill="#1c1109" />
          <line x1="-18.5" y1="44" x2="-18.5" y2="48" stroke="#0d0704" strokeWidth="0.8" />
        </g>

        {/* ── BOVINE TORSO (Anatomical Withers, Loin Dip, Hook Bone & Deep Barrel) ── */}
        <path
          d="M -24 6 
             C -20 -10, -10 -16, 2 -12 
             C 14 -12, 22 -15, 30 -14 
             C 36 -12, 40 -8, 40 -4 
             C 41 2, 40 10, 36 18 
             C 30 26, 20 28, 8 28 
             C -6 28, -16 26, -22 18 
             C -26 14, -26 10, -24 6 Z"
          fill="url(#cowCoatGrad)"
          stroke="#4a200a"
          strokeWidth="1.2"
        />

        {/* Subtle Dorsal Eel-Stripe (Golden-tan highlight along spine) */}
        <path
          d="M -16 -14 C -4 -13, 14 -13, 30 -13 C 34 -12, 38 -7, 39 -4"
          fill="none"
          stroke="url(#cowDorsalGrad)"
          strokeWidth="2.2"
          opacity="0.65"
          strokeLinecap="round"
        />

        {/* Muscular Ribcage & Shoulder Shading */}
        <ellipse cx="-16" cy="4" rx="8" ry="12" fill="#a85222" opacity="0.28" transform="rotate(-15 -16 4)" />
        <ellipse cx="24" cy="6" rx="10" ry="14" fill="#a85222" opacity="0.25" transform="rotate(12 24 6)" />

        {/* Natural Soft Cream Underbelly Contour */}
        <path
          d="M -16 21 C -6 27, 8 27, 20 22 C 14 27.5, -4 28, -16 21 Z"
          fill="#fef3c7"
          opacity="0.5"
        />

        {/* ── REALISTIC SLENDER TAIL & DARK FEATHERED SWITCH ── */}
        <path
          d="M 39 -4 C 42 8, 39 22, 40 34"
          fill="none"
          stroke="#592911"
          strokeWidth="2.0"
          strokeLinecap="round"
        />
        {/* Bushy dark hair switch */}
        <path
          d="M 40 33 
             C 44 36, 44 44, 41 46 
             C 38 44, 38 37, 40 33 Z"
          fill="#1c1109"
        />

        {/* ── MUSCULAR NECK & LOOSE DEWLAP SKIN FOLDS ── */}
        <path
          d="M -20 4 
             C -26 -6, -34 -12, -42 -14 
             C -48 -14, -50 -8, -48 2 
             C -42 14, -32 20, -22 18 Z"
          fill="url(#cowCoatGrad)"
          stroke="#4a200a"
          strokeWidth="0.8"
        />
        {/* Dewlap folds hanging under throat */}
        <path
          d="M -44 0 C -38 11, -30 17, -20 15"
          fill="none"
          stroke="#3d1808"
          strokeWidth="1.2"
          opacity="0.65"
          strokeLinecap="round"
        />
        <path
          d="M -40 6 C -35 14, -27 18, -21 16"
          fill="none"
          stroke="#a85222"
          strokeWidth="0.8"
          opacity="0.45"
          strokeLinecap="round"
        />

        {/* ── TRADITIONAL SWISS ALP-GLOCKE (HAMMERED BRASS BELL & STITCHED COLLAR) ── */}
        <g id="swiss-cowbell-realistic">
          {/* Stitched Dark Leather Collar */}
          <path
            d="M -38 -8 C -32 4, -26 12, -22 16"
            stroke="#1c0b03"
            strokeWidth="4.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -38 -8 C -32 4, -26 12, -22 16"
            stroke="#3d1606"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Forged Brass Buckle */}
          <line x1="-31" y1="6" x2="-28" y2="10" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />

          {/* Authentic Flared Brass Treichel Bell */}
          <path
            d="M -32 9 L -26 10 L -24 22 L -34 21 Z"
            fill="url(#cowbellGrad)"
            stroke="#592911"
            strokeWidth="0.8"
          />
          {/* Sound Rim Bevel */}
          <line x1="-34" y1="20.5" x2="-24" y2="21.5" stroke="#fef08a" strokeWidth="1.0" />
          {/* Iron Clapper */}
          <circle cx="-29" cy="22.5" r="1.5" fill="#180e07" />
        </g>

        {/* ── REALISTIC BOVINE HEAD & FACIAL ANATOMY ── */}
        <g id="cow-head-realistic">
          {/* Skull mass: broad poll, brow ridge, tapering to snout */}
          <path
            d="M -40 -14 
               C -46 -18, -52 -16, -58 -10 
               C -64 -4, -68 2, -66 8 
               C -64 12, -58 12, -52 10 
               C -46 8, -40 2, -40 -14 Z"
            fill="url(#cowCoatGrad)"
            stroke="#4a200a"
            strokeWidth="0.8"
          />

          {/* ── SIGNATURE SWISS "MEALY MOUTH" (Light Buff Ring encircling Muzzle) ── */}
          <path
            d="M -60 1 
               C -66 -1, -70 3, -68 9 
               C -64 13, -56 12, -54 8 Z"
            fill="#fef3c7"
            opacity="0.95"
          />

          {/* Dark Leathery Slate-Grey Muzzle Pad */}
          <path
            d="M -62 2 
               C -67 1, -70 4, -68 8 
               C -65 11, -58 10, -56 7 Z"
            fill="url(#cowMuzzleGrad)"
            stroke="#1a1513"
            strokeWidth="0.6"
          />
          {/* Realistic Comma Nostril Slit */}
          <path
            d="M -66 4 C -67 4.5, -67 6, -65 6.5"
            fill="none"
            stroke="#0a0705"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Clean Lower Jaw Line */}
          <path
            d="M -66 7.5 C -64 9, -58 9, -56 7.5"
            fill="none"
            stroke="#140d08"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* ── REALISTIC SOULFUL BOVINE EYE ── */}
          {!isNight ? (
            <g id="cow-eye-realistic-day">
              {/* Lighter Buff Orbital Eye Ring */}
              <ellipse cx="-50" cy="-8" rx="4.5" ry="3.5" fill="#fef3c7" opacity="0.6" transform="rotate(-10 -50 -8)" />
              {/* Deep Brown Socket */}
              <ellipse cx="-50" cy="-8" rx="3.2" ry="2.4" fill="#140c06" transform="rotate(-10 -50 -8)" />
              {/* Dark Iris */}
              <ellipse cx="-50" cy="-8" rx="2.5" ry="1.9" fill="#291408" transform="rotate(-10 -50 -8)" />
              {/* Pinpoint Specular Glint */}
              <circle cx="-51" cy="-8.8" r="0.8" fill="#ffffff" />
              {/* Supraorbital Brow Shadow */}
              <path d="M -54 -11 C -50 -12, -46 -10, -45 -8" fill="none" stroke="#2b1104" strokeWidth="1.0" />
            </g>
          ) : (
            <g id="cow-eye-realistic-night">
              {/* Peaceful curved sleeping eyelid */}
              <path d="M -53 -7.5 Q -50 -5.5 -47 -7.5" stroke="#140c06" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* ── HORIZONTAL BOVINE EARS ── */}
          <path
            d="M -38 -12 C -32 -16, -24 -14, -28 -7 C -32 -3, -36 -6, -38 -12 Z"
            fill="url(#cowCoatGrad)"
            stroke="#4a200a"
            strokeWidth="0.8"
          />
          {/* Soft peachy-buff inner ear cavity */}
          <path
            d="M -36 -11 C -32 -14, -26 -13, -29 -8 C -32 -5, -35 -7, -36 -11 Z"
            fill="#e2a893"
            opacity="0.8"
          />

          {/* ── REALISTIC CURVED ALPINE HORNS (Ivory Base to Slate Tip) ── */}
          {/* Left / Fore horn */}
          <path
            d="M -46 -15 
               C -46 -24, -51 -28, -55 -25 
               C -51 -23, -49 -20, -48 -14 Z"
            fill="url(#cowHornGrad)"
            stroke="#1c1917"
            strokeWidth="0.8"
          />
          {/* Right / Back horn */}
          <path
            d="M -42 -15 
               C -41 -23, -45 -26, -48 -23 
               C -45 -21, -44 -19, -44 -14 Z"
            fill="url(#cowHornGrad)"
            stroke="#1c1917"
            strokeWidth="0.8"
          />
        </g>
      </g>

      {/* ── 2. 🐮 REALISTIC ADORABLE BABY ALPINE CALF ── */}
      <g
        transform="translate(1435, 510) scale(0.42)"
        style={{
          filter: isNight ? 'brightness(0.55) contrast(0.95)' : 'none',
          transition: 'filter 1.5s ease-in-out',
        }}
      >
        {/* Soft Ambient Shadow under Calf Hooves */}
        <ellipse cx="4" cy="42" rx="28" ry="5.5" fill="#04120a" opacity="0.30" filter="blur(2.5px)" />
        <ellipse cx="-16" cy="44" rx="3.5" ry="1.5" fill="#020804" opacity="0.45" filter="blur(1px)" />
        <ellipse cx="-10" cy="44" rx="3.5" ry="1.5" fill="#020804" opacity="0.55" filter="blur(1px)" />
        <ellipse cx="14" cy="44" rx="3.5" ry="1.5" fill="#020804" opacity="0.45" filter="blur(1px)" />
        <ellipse cx="19" cy="44" rx="3.5" ry="1.5" fill="#020804" opacity="0.55" filter="blur(1px)" />

        {/* Far Hind Leg */}
        <path d="M 12 10 C 14 18, 16 26, 15 34 C 15 38, 15 42, 15 44 C 13 44.5, 11 44.5, 11 44 C 11 40, 12 36, 12 32 C 11 26, 9 18, 7 10 Z" fill="#421d0a" />
        <path d="M 11 41 L 10 44 L 16 44 L 15 41 Z" fill="#180e07" />

        {/* Far Foreleg */}
        <path d="M -18 8 C -16 16, -16 24, -17 32 C -17 38, -17 42, -17 44 C -19 44.5, -22 44.5, -22 44 C -21 40, -21 34, -20 30 C -20 24, -20 16, -22 8 Z" fill="#421d0a" />
        <path d="M -22 41 L -23 44 L -16 44 L -17 41 Z" fill="#180e07" />

        {/* Near Hind Leg: Youthful slender stifle & hock */}
        <path
          d="M 8 8 
             C 13 14, 17 20, 19 25 
             C 21 27, 21 31, 20 35 
             C 19 39, 19 42, 19 44 
             C 17 44.5, 15 44.5, 15 44 
             C 15 41, 16 37, 17 33 
             C 15 29, 12 24, 8 18 Z"
          fill="url(#cowCoatGrad)"
          stroke="#4a200a"
          strokeWidth="0.6"
        />
        <path d="M 15 41 L 14 44 L 20 44 L 19 41 Z" fill="#1c1109" />

        {/* Near Foreleg */}
        <path
          d="M -12 6 
             C -9 12, -9 20, -10 26 
             C -11 32, -11 38, -11 44 
             C -13 44.5, -16 44.5, -16 44 
             C -15 38, -15 32, -14 26 C -14 20, -14 12, -17 6 Z"
          fill="url(#cowCoatGrad)"
          stroke="#4a200a"
          strokeWidth="0.6"
        />
        <path d="M -16 41 L -17 44 L -10 44 L -11 41 Z" fill="#1c1109" />

        {/* Baby Calf Torso */}
        <path
          d="M -18 4 
             C -14 -8, -6 -12, 4 -9 
             C 12 -9, 18 -11, 24 -6 
             C 28 0, 27 10, 24 16 
             C 18 22, 10 23, 2 23 
             C -8 23, -14 21, -17 14 Z"
          fill="url(#cowCoatGrad)"
          stroke="#4a200a"
          strokeWidth="0.8"
        />

        {/* Soft belly lighter cream tone */}
        <path
          d="M -12 16 C -4 21, 6 21, 14 17 C 8 22, -4 22, -12 16 Z"
          fill="#fef3c7"
          opacity="0.45"
        />

        {/* Petite Swishing Tail */}
        <path
          d="M 24 -4 C 27 4, 25 14, 27 22"
          fill="none"
          stroke="#592911"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="27.5" cy="23" rx="2" ry="3.5" fill="#1c1109" />

        {/* Calf Neck & Head Looking lovingly toward Mom */}
        <path
          d="M -14 0 
             C -18 -8, -24 -12, -30 -10 
             C -34 -8, -36 0, -32 6 
             C -28 10, -22 12, -14 8 Z"
          fill="url(#cowCoatGrad)"
          stroke="#4a200a"
          strokeWidth="0.6"
        />

        {/* Head */}
        <path
          d="M -26 -10 
             C -31 -14, -36 -12, -41 -8 
             C -45 -2, -43 4, -38 6 
             C -34 6, -30 2, -26 -10 Z"
          fill="url(#cowCoatGrad)"
          stroke="#4a200a"
          strokeWidth="0.6"
        />

        {/* Natural White Star Marking on Forehead */}
        <polygon
          points="-34,-11 -32,-9 -29,-9 -31,-7 -30,-4 -34,-6 -37,-4 -36,-7 -38,-9 -35,-9"
          fill="#ffffff"
          opacity="0.95"
        />

        {/* Muzzle with Cream Mealy Ring & Dark Pad */}
        <ellipse cx="-40" cy="1" rx="4.5" ry="3.5" fill="#fef3c7" opacity="0.9" />
        <ellipse cx="-41" cy="1.2" rx="3.5" ry="2.6" fill="url(#cowMuzzleGrad)" />
        <circle cx="-42" cy="1.2" r="0.8" fill="#0a0705" />

        {/* Large Sweet Inquisitive Calf Eye */}
        {!isNight ? (
          <g id="calf-eye-realistic-day">
            <ellipse cx="-33" cy="-5" rx="3.0" ry="2.2" fill="#fef3c7" opacity="0.5" transform="rotate(-10 -33 -5)" />
            <circle cx="-33" cy="-5" r="2.0" fill="#140c06" />
            <circle cx="-33.8" cy="-5.8" r="0.7" fill="#ffffff" />
          </g>
        ) : (
          <path d="M -35 -4.5 Q -33 -2.5 -31 -4.5" stroke="#140c06" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        )}

        {/* Soft Perky Ears */}
        <path d="M -24 -11 C -20 -15, -16 -13, -19 -7 Z" fill="url(#cowCoatGrad)" />
        <path d="M -23 -10 C -20 -13, -17 -12, -19 -8 Z" fill="#e2a893" opacity="0.8" />

        {/* Soft Budding Horn Nubs */}
        <ellipse cx="-28" cy="-12" rx="1.2" ry="1.5" fill="#fef9c3" stroke="#292524" strokeWidth="0.5" />
      </g>
    </g>
  )
}

/* ══════════════════════════════════════════════════════════════════
   🌳 3D REALISTIC BOTANICAL TREE (POWERED BY THREE.JS & FRAMER MOTION)
   - Real-time 3D tube trunk with organic Catmull-Rom bark curves & deep roots
   - Volumetric multi-tiered 3D foliage canopies with organic leaf clumping
   - Generous top headroom (100% visible canopy with zero clipping)
   - Continuous deep roots reaching down into ground (zero floating)
   - Mountain wind sway physics & harmonic foliage flutter in useFrame
   - Real-time solar lighting responding directly to the draggable Sun/Moon
   - Perched 3D Eurasian Eagle-Owl with golden nocturnal eyes
   - Gentle floating leaf & dandelion breeze particles
══════════════════════════════════════════════════════════════════ */

/* ── 14b. 🦌 SCULPTED RED DEER STAG & BABY FAWN (FOREGROUND: 100% UNOBSTRUCTED!) ── */
/* Features royal branching antlers ("sing"), grounded 4-legged stance by day, and true bedded repose by night! */
function RedDeerFamily({ isNight, isDeerDrinking, onInspect }) {
  return (
    <g
          id="deer-family-foreground"
          transform="translate(1360, 565)"
          style={{ cursor: 'pointer' }}
          onClick={() => onInspect('deer')}
          title="Tap to inspect Red Deer Stag & Fawn (Cervus elaphus)"
        >
          {!isNight ? (
            /* ── DAYTIME STANDING STAG (ROYAL ANTLERS, ALERT & MAJESTIC) ── */
            <g id="daytime-deer-family">
              {/* Soft Ambient Ground Shadow under Hooves */}
              <ellipse cx="0" cy="74" rx="44" ry="7.5" fill="#061f12" opacity="0.35" filter="blur(4px)" />
              <ellipse cx="-22" cy="74" rx="4.5" ry="1.8" fill="#020804" opacity="0.45" filter="blur(1px)" />
              <ellipse cx="-6" cy="74" rx="4.5" ry="1.8" fill="#020804" opacity="0.45" filter="blur(1px)" />
              <ellipse cx="12" cy="74" rx="4.5" ry="1.8" fill="#020804" opacity="0.45" filter="blur(1px)" />
              <ellipse cx="20" cy="74" rx="4.5" ry="1.8" fill="#020804" opacity="0.45" filter="blur(1px)" />

              {/* Far Hind Leg: in perspective shadow with defined hock */}
              <g id="deer-far-hind-leg">
                <path
                  d="M 14 18 
                     C 18 28, 22 38, 20 48 
                     C 19 54, 18 64, 18 71 
                     C 18 73, 14 73, 14 71 
                     C 14 64, 15 54, 15 48 
                     C 16 38, 12 28, 8 18 Z"
                  fill="#65280b"
                />
                <path d="M 14 68 L 13 73 L 18 73 L 18 68 Z" fill="#180c05" />
              </g>

              {/* Far Foreleg: in perspective shadow with defined knee */}
              <g id="deer-far-fore-leg">
                <path
                  d="M -12 20 
                     C -10 32, -9 44, -11 54 
                     C -12 60, -12 66, -12 71 
                     C -12 73, -16 73, -16 71 
                     C -16 66, -16 60, -15 54 
                     C -13 44, -14 32, -18 20 Z"
                  fill="#65280b"
                />
                <path d="M -16 68 L -17 73 L -12 73 L -12 68 Z" fill="#180c05" />
              </g>

              {/* Near Hind Leg: Muscular gaskin, angled hock & cloven hoof */}
              <g id="deer-near-hind-leg">
                <path
                  d="M 10 16 
                     C 16 26, 22 36, 24 44 
                     C 25 48, 24 56, 23 66 
                     C 22 70, 22 73, 22 74 
                     C 22 75.5, 17 75.5, 17 74 
                     C 17 70, 18 64, 19 56 
                     C 19 48, 18 42, 16 36 
                     C 12 28, 8 22, 4 16 Z"
                  fill="url(#deerCoatGrad)"
                  stroke="#78350f"
                  strokeWidth="0.8"
                />
                {/* Cloven dark hoof with split slit */}
                <path d="M 17 70 L 16 74 L 23 74 L 22 70 Z" fill="#1c0f07" />
                <line x1="19.5" y1="70" x2="19.5" y2="74" stroke="#0a0502" strokeWidth="0.8" />
              </g>

              {/* Near Foreleg: Slender shoulder, carpus knee & cloven hoof */}
              <g id="deer-near-fore-leg">
                <path
                  d="M -18 18 
                     C -16 28, -16 38, -18 46 
                     C -19 52, -20 62, -20 72 
                     C -20 74, -25 74, -25 72 
                     C -25 62, -24 52, -22 46 
                     C -21 38, -21 28, -24 18 Z"
                  fill="url(#deerCoatGrad)"
                  stroke="#78350f"
                  strokeWidth="0.8"
                />
                <ellipse cx="-20" cy="46" rx="2.5" ry="1.5" fill="#b45309" opacity="0.5" />
                <path d="M -25 70 L -26 74 L -19 74 L -20 70 Z" fill="#1c0f07" />
                <line x1="-22.5" y1="70" x2="-22.5" y2="74" stroke="#0a0502" strokeWidth="0.8" />
              </g>

              {/* Sculpted Deer Torso: withers, backline, waist & flank */}
              <path
                d="M -34 6 
                   C -20 -8, 15 -10, 36 2 
                   C 44 8, 44 20, 36 28 
                   C 20 38, -15 36, -30 24 
                   C -38 18, -40 10, -34 6 Z"
                fill="url(#deerCoatGrad)"
                stroke="#78350f"
                strokeWidth="1.2"
              />

              {/* Soft Cream Belly Contour */}
              <path
                d="M -28 14 C -15 28, 10 30, 24 20 C 14 34, -18 32, -28 14 Z"
                fill="url(#deerBellyGrad)"
                opacity="0.85"
              />

              {/* Fluffy Pure White Caudal Disk / Rump Patch (Tail Mirror) */}
              <ellipse cx="38" cy="8" rx="8" ry="6" fill="#ffffff" />
              <path d="M 39 4 C 42 8, 41 12, 38 14" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />

              {/* Grounded Meadow Blades overlapping hooves for natural earth connection */}
              <path d="M -27 75 Q -25 68 -22 66 Q -21 71 -20 75 Z" fill="#2d6b3e" />
              <path d="M -8 75 Q -5 67 -2 65 Q -3 71 -5 75 Z" fill="#1e4e2b" />
              <path d="M 15 75 Q 18 67 21 65 Q 20 71 18 75 Z" fill="#2d6b3e" />

              {/* Neck, Head & Royal Branching Antlers ("Sing"): Oscillates downward when drinking! */}
              <g
                transform={`rotate(${isDeerDrinking ? 24 : 0} -28 12)`}
                style={{ transition: 'transform 0.8s ease-in-out' }}
              >
                {/* 🦌 FAR ANTLER (Rising behind head with branching tines) */}
                <g id="stag-far-antler" opacity="0.85">
                  {/* Main Beam */}
                  <path
                    d="M -48 -28 
                       C -45 -45, -36 -62, -26 -78 
                       C -22 -85, -17 -92, -14 -100 
                       C -12 -100, -14 -98, -16 -96 
                       C -22 -84, -30 -72, -38 -58 
                       C -44 -46, -50 -36, -50 -28 Z"
                    fill="url(#antlerFarBoneGrad)"
                  />
                  {/* Brow Tine */}
                  <path
                    d="M -48 -32 C -54 -38, -62 -42, -70 -40 C -72 -40, -71 -38, -68 -37 C -60 -36, -52 -35, -46 -30 Z"
                    fill="url(#antlerFarBoneGrad)"
                  />
                  {/* Bay / Bez Tine */}
                  <path
                    d="M -40 -50 C -46 -58, -52 -62, -58 -61 C -60 -61, -59 -59, -56 -58 C -48 -56, -42 -52, -37 -46 Z"
                    fill="url(#antlerFarBoneGrad)"
                  />
                  {/* Trez Tine */}
                  <path
                    d="M -32 -66 C -38 -76, -44 -82, -49 -82 C -50 -82, -49 -80, -47 -79 C -42 -77, -36 -71, -30 -62 Z"
                    fill="url(#antlerFarBoneGrad)"
                  />
                  {/* Crown Fork */}
                  <path
                    d="M -22 -82 C -23 -90, -27 -98, -32 -104 C -33 -104, -32 -102, -30 -100 C -25 -94, -21 -88, -20 -80 Z"
                    fill="url(#antlerFarBoneGrad)"
                  />
                  <path
                    d="M -14 -100 C -12 -108, -8 -114, -5 -118 C -4 -118, -5 -116, -7 -112 C -10 -106, -12 -102, -13 -98 Z"
                    fill="url(#antlerFarBoneGrad)"
                  />
                </g>

                {/* Muscular Stag Neck with Darker Throat Dewlap / Mane */}
                <path
                  d="M -26 10 
                     C -32 -2, -42 -18, -48 -24 
                     C -54 -28, -62 -22, -64 -18 
                     C -60 -12, -46 4, -36 18 Z"
                  fill="url(#deerCoatGrad)"
                />
                {/* Throat mane / winter ruff */}
                <path
                  d="M -36 18 C -46 8, -56 -4, -62 -14 C -60 -10, -50 4, -42 16 Z"
                  fill="#6d2e14"
                  opacity="0.8"
                />

                {/* Far Ear */}
                <path d="M -48 -28 C -50 -44, -40 -46, -42 -30 Z" fill="#9a3412" stroke="#78350f" strokeWidth="0.8" />

                {/* Chiseled Stag Head & Snout */}
                <path
                  d="M -46 -24 
                     C -52 -32, -66 -28, -72 -20 
                     C -74 -16, -68 -10, -60 -12 
                     C -54 -14, -48 -18, -46 -24 Z"
                  fill="url(#deerCoatGrad)"
                  stroke="#78350f"
                  strokeWidth="0.8"
                />
                {/* Black leathery nose & nostrils */}
                <ellipse cx="-72" cy="-18" rx="2.5" ry="2" fill="#090d16" />
                <ellipse cx="-73" cy="-17.5" rx="1.0" ry="0.6" fill="#000000" />
                {/* White chin patch */}
                <path d="M -70 -14 C -66 -11, -60 -11, -56 -13" fill="#fef3c7" opacity="0.85" />
                {/* Soulful dark almond eye with specular highlight */}
                <ellipse cx="-58" cy="-24" rx="2.8" ry="3.5" fill="#0f172a" />
                <circle cx="-59" cy="-25" r="1.1" fill="#ffffff" />

                {/* Near Ear with Soft Velvet Interior */}
                <path d="M -44 -26 C -40 -40, -32 -42, -36 -28 Z" fill="#b45309" stroke="#78350f" strokeWidth="0.8" />
                <path d="M -43 -28 C -40 -38, -34 -39, -37 -29 Z" fill="#fef3c7" opacity="0.6" />

                {/* 🦌 NEAR ANTLER ("Sing" / Royal Branching 12-Pointer Crown) */}
                <g id="stag-near-antler">
                  {/* Coronet / Burr ring at skull pedicle */}
                  <ellipse cx="-44" cy="-26" rx="3.5" ry="2" fill="#451a03" stroke="#290f02" strokeWidth="0.8" />
                  
                  {/* Main Beam: Sweeping back, up, and curving inward */}
                  <path
                    d="M -43 -27 
                       C -40 -44, -28 -62, -18 -78 
                       C -11 -88, -4 -96, 2 -104 
                       C 3 -106, 1 -106, -1 -103 
                       C -8 -92, -18 -80, -28 -64 
                       C -35 -52, -44 -40, -46 -27 Z"
                    fill="url(#antlerBoneGrad)"
                    stroke="#78350f"
                    strokeWidth="0.8"
                  />
                  {/* Pearling / Ridges on beam base */}
                  <line x1="-42" y1="-32" x2="-45" y2="-31" stroke="#451a03" strokeWidth="1" />
                  <line x1="-39" y1="-38" x2="-43" y2="-37" stroke="#451a03" strokeWidth="1" />
                  <line x1="-35" y1="-46" x2="-39" y2="-45" stroke="#451a03" strokeWidth="1" />

                  {/* Brow Tine: Powerful forward-curving spear over forehead */}
                  <path
                    d="M -44 -32 
                       C -52 -38, -64 -42, -74 -40 
                       C -76 -40, -75 -38, -72 -37 
                       C -63 -36, -53 -34, -45 -29 Z"
                    fill="url(#antlerBoneGrad)"
                    stroke="#78350f"
                    strokeWidth="0.8"
                  />
                  {/* Polished Ivory tip on Brow Tine */}
                  <polygon points="-74,-40 -76,-40 -72,-37" fill="#ffffff" />

                  {/* Bay / Bez Tine: Secondary forward tine */}
                  <path
                    d="M -37 -48 
                       C -45 -56, -54 -60, -63 -59 
                       C -65 -59, -64 -57, -61 -56 
                       C -53 -54, -44 -51, -36 -44 Z"
                    fill="url(#antlerBoneGrad)"
                    stroke="#78350f"
                    strokeWidth="0.8"
                  />
                  <polygon points="-63,-59 -65,-59 -61,-56" fill="#ffffff" />

                  {/* Trez / Tray Tine: Mid-beam tine pointing up & forward */}
                  <path
                    d="M -28 -66 
                       C -34 -76, -42 -84, -49 -86 
                       C -51 -86, -50 -84, -47 -83 
                       C -40 -80, -32 -73, -26 -62 Z"
                    fill="url(#antlerBoneGrad)"
                    stroke="#78350f"
                    strokeWidth="0.8"
                  />
                  <polygon points="-49,-86 -51,-86 -47,-83" fill="#ffffff" />

                  {/* Royal Crown Fork: Backward tine */}
                  <path
                    d="M -16 -82 
                       C -16 -92, -20 -100, -26 -106 
                       C -27 -106, -26 -104, -24 -102 
                       C -18 -96, -14 -88, -13 -80 Z"
                    fill="url(#antlerBoneGrad)"
                    stroke="#78350f"
                    strokeWidth="0.8"
                  />
                  <polygon points="-26,-106 -27,-106 -24,-102" fill="#ffffff" />

                  {/* Royal Crown Fork: Terminal Summit Tine */}
                  <path
                    d="M 2 -104 
                       C 5 -112, 10 -120, 14 -126 
                       C 15 -127, 14 -128, 12 -126 
                       C 7 -120, 3 -112, -1 -102 Z"
                    fill="url(#antlerBoneGrad)"
                    stroke="#78350f"
                    strokeWidth="0.8"
                  />
                  <polygon points="14,-126 15,-127 12,-126" fill="#ffffff" />
                </g>
              </g>
            </g>
          ) : (
            /* ── NIGHTTIME BEDDED STAG (STERNAL RECUMBENCY FIRMLY ON GROUND, VISIBLE FOLDED LEGS & MOONLIT ANTLERS) ── */
            <g id="nighttime-bedded-stag">
              {/* Soft Ambient Ground Contact Shadow: Anchors the entire resting deer solidly to the turf */}
              <ellipse cx="6" cy="74" rx="52" ry="7.5" fill="#020804" opacity="0.65" filter="blur(3.5px)" />
              <ellipse cx="14" cy="74" rx="26" ry="5.0" fill="#010402" opacity="0.75" filter="blur(2px)" />

              {/* Bedded Torso: Sits firmly on the grass line (brisket & belly at cy=72-74) */}
              <path
                d="M -24 30 
                   C -18 22, 6 20, 26 24 
                   C 36 26, 42 32, 42 42 
                   C 43 54, 40 64, 34 72 
                   C 24 75, -12 75, -24 73 
                   C -34 70, -36 52, -32 40 
                   C -30 34, -28 32, -24 30 Z"
                fill="url(#deerCoatNightGrad)"
                stroke="#220b03"
                strokeWidth="1.2"
              />

              {/* Cool Silver Moonlit Rim Highlight tracing the Spine */}
              <path
                d="M -24 30 C -18 22, 6 20, 26 24 C 36 26, 42 32, 42 42"
                fill="none"
                stroke="url(#deerMoonlitRimGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* Fluffy White Rump Mirror glowing in moonlight */}
              <ellipse cx="38" cy="44" rx="7" ry="5.5" fill="#f1f5f9" opacity="0.85" />
              <path d="M 39 40 C 42 44, 41 48, 38 52" fill="none" stroke="#3d1607" strokeWidth="2.0" strokeLinecap="round" />

              {/* 🦵 VISIBLE FOLDED HIND LEG: Clearly sculpted along flank and resting ON the turf */}
              <g id="night-folded-hind-leg">
                <path
                  d="M 22 36 
                     C 28 42, 34 50, 34 60 
                     C 34 66, 30 72, 22 73 
                     C 16 73, 14 74, 10 74 
                     C 8 74, 8 71, 12 70 
                     C 18 69, 22 66, 24 58 
                     C 25 50, 20 42, 16 38 Z"
                  fill="url(#deerCoatNightGrad)"
                  stroke="#220b03"
                  strokeWidth="0.8"
                />
                {/* Lunar highlight along upper curve of folded hind leg */}
                <path
                  d="M 22 38 C 28 44, 33 52, 32 60 C 31 66, 26 71, 18 72"
                  fill="none"
                  stroke="url(#deerMoonlitRimGrad)"
                  strokeWidth="1.0"
                  opacity="0.65"
                />
                {/* Dark cloven hind hoof resting solidly on meadow turf */}
                <path d="M 8 71 L 13 71 L 14 75 L 7 75 Z" fill="#120904" />
                <line x1="10.5" y1="71" x2="10.5" y2="75" stroke="#000000" strokeWidth="0.6" />
              </g>

              {/* 🦵 VISIBLE FOLDED FORELEG: Carpus knee bent forward, hoof resting ON the turf */}
              <g id="night-folded-fore-leg">
                <path
                  d="M -26 44 
                     C -22 52, -18 60, -14 66 
                     C -12 69, -6 72, 0 73 
                     C 3 73, 4 75, 1 75 
                     C -5 75, -12 73, -16 68 
                     C -20 62, -26 54, -28 46 Z"
                  fill="url(#deerCoatNightGrad)"
                  stroke="#220b03"
                  strokeWidth="0.8"
                />
                {/* Lunar highlight along carpal knee */}
                <path
                  d="M -24 48 C -20 54, -16 62, -13 67 C -10 70, -4 72, 0 73"
                  fill="none"
                  stroke="url(#deerMoonlitRimGrad)"
                  strokeWidth="1.0"
                  opacity="0.65"
                />
                {/* Dark cloven front hoof resting solidly on meadow turf */}
                <path d="M 0 72 L 4 72 L 3 75 L -1 75 Z" fill="#120904" />
                <line x1="1.5" y1="72" x2="1.5" y2="75" stroke="#000000" strokeWidth="0.6" />
              </g>

              {/* Graceful Muscular Neck & Head in Peaceful Repose */}
              <path
                d="M -24 30 
                   C -30 20, -38 12, -44 4 
                   C -48 2, -50 8, -48 16 
                   C -40 30, -32 38, -26 44 Z"
                fill="url(#deerCoatNightGrad)"
              />
              {/* Dark throat dewlap / winter ruff */}
              <path
                d="M -26 44 C -34 32, -42 20, -48 14 C -44 24, -38 36, -30 46 Z"
                fill="#220b03"
                opacity="0.75"
              />

              {/* 🦌 FAR NIGHT ANTLER (Rising gracefully behind head under the stars) */}
              <g id="stag-far-antler-night" opacity="0.85">
                <path
                  d="M -46 6 C -42 -12, -32 -28, -22 -44 C -18 -52, -12 -60, -8 -68 C -6 -68, -8 -66, -10 -64 C -16 -54, -24 -42, -32 -28 C -38 -16, -44 -6, -48 6 Z"
                  fill="url(#antlerFarNightGrad)"
                />
                <path
                  d="M -46 2 C -52 -4, -60 -8, -66 -6 C -68 -6, -67 -4, -64 -3 C -58 -3, -50 -1, -44 4 Z"
                  fill="url(#antlerFarNightGrad)"
                />
                <path
                  d="M -38 -16 C -44 -24, -50 -28, -55 -27 C -56 -27, -55 -25, -53 -24 C -46 -22, -40 -19, -36 -14 Z"
                  fill="url(#antlerFarNightGrad)"
                />
                <path
                  d="M -30 -32 C -36 -42, -42 -48, -47 -48 C -48 -48, -47 -46, -45 -45 C -40 -43, -34 -37, -28 -28 Z"
                  fill="url(#antlerFarNightGrad)"
                />
                <path
                  d="M -18 -48 C -20 -56, -24 -62, -28 -68 C -29 -68, -28 -66, -26 -64 C -22 -59, -18 -54, -16 -46 Z"
                  fill="url(#antlerFarNightGrad)"
                />
                <path
                  d="M -8 -68 C -6 -76, -2 -82, 1 -86 C 2 -86, 1 -84, -1 -80 C -4 -74, -6 -70, -7 -66 Z"
                  fill="url(#antlerFarNightGrad)"
                />
              </g>

              {/* Head with delicate snout */}
              <path
                d="M -42 8 
                   C -48 0, -58 4, -66 12 
                   C -72 18, -74 24, -70 28 
                   C -66 31, -56 29, -48 24 
                   C -42 20, -40 14, -42 8 Z"
                fill="url(#deerCoatNightGrad)"
                stroke="#220b03"
                strokeWidth="0.8"
              />
              {/* Leathery nose & nostrils */}
              <ellipse cx="-70" cy="26" rx="2.5" ry="1.8" fill="#140c08" />
              <ellipse cx="-71" cy="26.5" rx="1.0" ry="0.6" fill="#080402" />
              {/* White chin patch */}
              <path d="M -68 28 C -64 30.5, -57 30.5, -53 28" fill="#f8fafc" opacity="0.8" />

              {/* Peaceful Closed Sleeping Eye (Gentle crescent with lashes) */}
              <path d="M -54 16 Q -50 19 -46 16" stroke="#100603" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <line x1="-54.5" y1="15" x2="-53.5" y2="17" stroke="#100603" strokeWidth="0.8" />

              {/* Velvety Cupped Ears in relaxed resting posture */}
              <path d="M -44 4 C -40 -8, -30 -6, -34 4 Z" fill="url(#deerCoatNightGrad)" stroke="#220b03" strokeWidth="0.8" />
              <path d="M -42 5 C -39 -4, -32 -3, -35 5 Z" fill="#fbcfe8" opacity="0.3" />

              {/* 🦌 NEAR NIGHT ANTLER ("Sing" with Moonlight Gleams on Tines) */}
              <g id="stag-near-antler-night">
                {/* Pedicle Burr */}
                <ellipse cx="-44" cy="6" rx="3.5" ry="2" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
                {/* Main Beam */}
                <path
                  d="M -43 5 
                     C -39 -14, -27 -32, -16 -48 
                     C -9 -58, -2 -66, 4 -74 
                     C 5 -76, 3 -76, 1 -73 
                     C -6 -62, -16 -50, -26 -34 
                     C -34 -22, -42 -10, -45 5 Z"
                  fill="url(#antlerNightGrad)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                {/* Moonlit Silver Rim tracing beam */}
                <path
                  d="M -43 4 C -39 -14, -27 -32, -16 -48 C -9 -58, -2 -66, 4 -74"
                  fill="none"
                  stroke="url(#deerMoonlitRimGrad)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Brow Tine curving forward over forehead */}
                <path
                  d="M -44 0 C -52 -6, -62 -10, -72 -8 C -74 -8, -73 -6, -70 -5 C -62 -4, -52 -2, -45 3 Z"
                  fill="url(#antlerNightGrad)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                <polygon points="-72,-8 -74,-8 -70,-5" fill="#f8fafc" />
                {/* Bay / Bez Tine */}
                <path
                  d="M -36 -16 C -44 -24, -53 -28, -62 -27 C -64 -27, -63 -25, -60 -24 C -52 -22, -43 -19, -35 -12 Z"
                  fill="url(#antlerNightGrad)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                <polygon points="-62,-27 -64,-27 -60,-24" fill="#f8fafc" />
                {/* Trez Tine */}
                <path
                  d="M -26 -34 C -32 -44, -40 -52, -47 -54 C -49 -54, -48 -52, -45 -51 C -38 -48, -30 -41, -24 -30 Z"
                  fill="url(#antlerNightGrad)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                <polygon points="-47,-54 -49,-54 -45,-51" fill="#f8fafc" />
                {/* Royal Crown Fork - Backward Tine */}
                <path
                  d="M -14 -50 C -14 -60, -18 -68, -24 -74 C -25 -74, -24 -72, -22 -70 C -16 -64, -12 -56, -11 -48 Z"
                  fill="url(#antlerNightGrad)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                <polygon points="-24,-74 -25,-74 -22,-70" fill="#f8fafc" />
                {/* Royal Crown Fork - Terminal Summit Tine */}
                <path
                  d="M 4 -74 C 7 -82, 12 -90, 16 -96 C 17 -97, 16 -98, 14 -96 C 9 -90, 5 -82, 1 -72 Z"
                  fill="url(#antlerNightGrad)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                <polygon points="16,-96 17,-97 14,-96" fill="#f8fafc" />
              </g>

              {/* 🌿 Lush Alpine Meadow Blades & Clover overlapping resting deer base (Completely prevents floating!) */}
              <path d="M -32 76 Q -30 65 -26 63 Q -24 69 -23 76 Z" fill="#0d3a22" />
              <path d="M -20 76 Q -17 61 -12 59 Q -11 68 -13 76 Z" fill="#14532d" />
              <circle cx="-16" cy="73" r="3.2" fill="#15803d" />
              <circle cx="-13" cy="71" r="3.0" fill="#22c55e" opacity="0.8" />
              <path d="M 4 76 Q 8 63 12 61 Q 11 69 10 76 Z" fill="#166534" />
              <circle cx="16" cy="73" r="3.2" fill="#15803d" />
              <path d="M 22 76 Q 26 64 30 62 Q 28 70 26 76 Z" fill="#0d3a22" />
            </g>
          )}

          {/* Baby Fawn */}
          {!isNight ? (
            /* ── DAYTIME STANDING BABY FAWN (SPOTTED & CURIOUS) ── */
            <g transform="translate(88, 22) scale(0.62)">
              <ellipse cx="0" cy="58" rx="26" ry="5" fill="#061f12" opacity="0.3" filter="blur(3px)" />
              {/* Far Legs */}
              <path d="M 6 12 C 10 24, 10 42, 10 58 C 8 59, 5 59, 5 58 C 5 42, 6 28, 2 12 Z" fill="#783110" />
              <path d="M -10 12 C -8 24, -8 42, -8 58 C -10 59, -13 59, -13 58 C -13 42, -12 28, -15 12 Z" fill="#783110" />
              {/* Near Legs */}
              <path d="M 12 10 C 14 24, 12 42, 14 58 C 12 59, 8 59, 8 58 C 8 42, 9 28, 4 12 Z" fill="#8f451b" />
              <path d="M -6 10 C -4 24, -6 42, -4 58 C -6 59, -10 59, -10 58 C -10 42, -9 28, -14 12 Z" fill="#8f451b" />
              {/* Fawn Torso */}
              <path
                d="M -24 4 C -14 -6, 10 -6, 24 2 C 30 8, 30 16, 24 22 C 14 28, -10 26, -20 18 C -26 14, -28 8, -24 4 Z"
                fill="url(#deerCoatGrad)"
                stroke="#78350f"
                strokeWidth="1"
              />
              {/* Double Row of White Spots */}
              <circle cx="-6" cy="6" r="2.2" fill="#ffffff" opacity="0.9" />
              <circle cx="4" cy="5" r="2.2" fill="#ffffff" opacity="0.9" />
              <circle cx="14" cy="8" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="20" cy="12" r="1.8" fill="#ffffff" opacity="0.9" />
              <circle cx="-1" cy="12" r="1.8" fill="#ffffff" opacity="0.9" />
              <circle cx="8" cy="11" r="1.8" fill="#ffffff" opacity="0.9" />
              <circle cx="24" cy="6" r="4" fill="#ffffff" />
              {/* Fawn Neck & Head */}
              <path d="M -18 6 C -24 -2, -32 -14, -36 -18 C -40 -20, -46 -16, -48 -12 C -44 -8, -34 2, -26 12 Z" fill="url(#deerCoatGrad)" />
              <ellipse cx="-44" cy="-15" rx="8" ry="6" fill="url(#deerCoatGrad)" stroke="#78350f" strokeWidth="0.8" />
              <circle cx="-50" cy="-14" r="2.2" fill="#090d16" />
              <circle cx="-42" cy="-18" r="2.2" fill="#0f172a" />
              <circle cx="-43" cy="-19" r="0.8" fill="#ffffff" />
              <path d="M -38 -20 C -40 -30, -32 -32, -34 -22 Z" fill="#b45309" />
            </g>
          ) : (
            /* ── NIGHTTIME BEDDED BABY FAWN (COZY & GROUNDED ON TURF BESIDE STAG) ── */
            <g id="nighttime-bedded-fawn" style={{ display: "none" }}" transform="translate(70, 52) scale(0.60)">
              {/* Soft Ambient Ground Shadow under Fawn: Anchors firmly to cy=74 */}
              <ellipse cx="2" cy="35" rx="28" ry="6" fill="#020804" opacity="0.60" filter="blur(2.5px)" />
              {/* Curled Body in Sternal Repose */}
              <path
                d="M -16 8 
                   C -12 -2, 4 -4, 16 4 
                   C 26 10, 26 24, 20 32 
                   C 14 36, -2 36, -12 33 
                   C -20 28, -22 18, -16 8 Z"
                fill="url(#deerCoatNightGrad)"
                stroke="#220b03"
                strokeWidth="0.8"
              />
              {/* Double row of soft white spots glowing in moonlight */}
              <circle cx="-4" cy="12" r="1.8" fill="#f8fafc" opacity="0.85" />
              <circle cx="3" cy="11" r="1.8" fill="#f8fafc" opacity="0.85" />
              <circle cx="10" cy="13" r="1.7" fill="#f8fafc" opacity="0.85" />
              <circle cx="16" cy="18" r="1.6" fill="#f8fafc" opacity="0.85" />
              <circle cx="-2" cy="19" r="1.7" fill="#f8fafc" opacity="0.85" />
              <circle cx="5" cy="18" r="1.7" fill="#f8fafc" opacity="0.85" />
              <circle cx="12" cy="22" r="1.6" fill="#f8fafc" opacity="0.85" />
              {/* Folded little legs resting on grass */}
              <path d="M -8 26 C -2 33, 6 34, 12 33" fill="none" stroke="#220b03" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="33" r="1.8" fill="#120904" />
              {/* Sweet sleeping fawn head nestled against chest */}
              <path
                d="M -14 10 
                   C -18 2, -26 0, -30 4 
                   C -34 9, -31 15, -24 16 
                   C -18 16, -14 13, -14 10 Z"
                fill="url(#deerCoatNightGrad)"
              />
              {/* Black tiny nose */}
              <circle cx="-29" cy="8" r="1.2" fill="#140c08" />
              {/* Sleeping eye */}
              <path d="M -24 6 Q -22 8.5 -20 6" stroke="#100603" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              {/* Ears folded back */}
              <path d="M -20 1 C -16 -4, -11 -2, -15 3 Z" fill="url(#deerCoatNightGrad)" />
              {/* Ground grass blades overlapping fawn */}
              <path d="M -16 36 Q -14 28 -11 26 Q -10 32 -9 36 Z" fill="#0d3a22" />
              <path d="M 6 36 Q 9 29 12 28 Q 11 33 10 36 Z" fill="#14532d" />
            </g>
          )}
        </g>
  )
}

function AlpineFauna({ isNight, isDeerDrinking, onInspect }) {
  return (
    <g id="alpine-meadow-fauna">
      {/* Swiss Alpine Cow & Calf on Upper Pasture Shelf */}
      <RealisticAlpineCows isNight={isNight} onInspect={onInspect} />

      {/* Red Deer Stag with Royal Antlers & Baby Fawn */}
      <RedDeerFamily isNight={isNight} isDeerDrinking={isDeerDrinking} onInspect={onInspect} />
    </g>
  )
}

export default React.memo(AlpineFauna)
export { RealisticAlpineCows, RedDeerFamily }
