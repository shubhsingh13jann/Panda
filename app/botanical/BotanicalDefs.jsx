'use client'

import React from 'react'

function BotanicalDefs({ isNight = false, sunsetFactor = 0 }) {
  return (
    <defs>
      {/* Realistic Volumetric Cloud Gradients & Soft Filters */}
      <linearGradient id="cloudBodyDayGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
        <stop offset="45%" stopColor="#f8fafc" stopOpacity="0.95" />
        <stop offset="80%" stopColor="#e2e8f0" stopOpacity="0.92" />
        <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.88" />
      </linearGradient>

      <linearGradient id="cloudUnderbellyDayGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94a3b8" stopOpacity="0" />
        <stop offset="55%" stopColor="#64748b" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#475569" stopOpacity="0.38" />
      </linearGradient>

      <linearGradient id="cloudHighlightGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

      {/* Sunset Cloud Gradients (Warm Golden Peach & Dusky Coral) */}
      <linearGradient id="cloudBodySunsetGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.98" />
        <stop offset="35%" stopColor="#fed7aa" stopOpacity="0.95" />
        <stop offset="70%" stopColor="#f472b6" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.85" />
      </linearGradient>

      <linearGradient id="cloudUnderbellySunsetGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7c2d12" stopOpacity="0" />
        <stop offset="65%" stopColor="#7c2d12" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.45" />
      </linearGradient>

      {/* Night Cloud Gradients (Silver-Blue Moonlit Cirrus) */}
      <linearGradient id="cloudBodyNightGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.42" />
        <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#334155" stopOpacity="0.18" />
      </linearGradient>

      <filter id="cloudUnderShadow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" />
      </filter>
      <filter id="cloudSoftEdge" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
      </filter>

      {/* Smiling Sun Gradients & Corona (Image 3 Style!) */}
      <radialGradient id="sunOuterCorona" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="35%" stopColor="#fef08a" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="sunMidCorona" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="55%" stopColor="#fef08a" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="sunDiscGrad" cx="42%" cy="38%" r="58%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#fef9c3" />
        <stop offset="70%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#f59e0b" />
      </radialGradient>

      <linearGradient id="sunRayGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#fef08a" />
      </linearGradient>

      {/* Crepuscular God Rays Streaming Downward into Valley */}
      <linearGradient id="godRayGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.32" />
        <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.18" />
        <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
      </linearGradient>

      {/* Vertical Specular Light Column Washes */}
      <linearGradient id="sunColumnWash" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
        <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.25" />
        <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
      </linearGradient>

      <linearGradient id="mountainRimGlowGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="45%" stopColor="#fef08a" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </linearGradient>

      {/* Atmospheric Lake Specular Column Gradient */}
      <linearGradient id="lakeSunSpecularGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="15%" stopColor="#fef08a" stopOpacity="0.75" />
        <stop offset="45%" stopColor="#fde047" stopOpacity="0.4" />
        <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
      </linearGradient>

      {/* Moonlit Night Gradients */}
      <radialGradient id="moonOuterHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.7" />
        <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="moonDiscGrad" cx="38%" cy="32%" r="62%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="45%" stopColor="#f1f5f9" />
        <stop offset="85%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#94a3b8" />
      </radialGradient>

      <linearGradient id="lakeMoonSpecularGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
        <stop offset="30%" stopColor="#bae6fd" stopOpacity="0.45" />
        <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
      </linearGradient>

      {/* Water & Landscape Linear Gradients */}
      <linearGradient id="lakeDepthGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0c2340" />
        <stop offset="25%" stopColor="#0a2b4c" />
        <stop offset="65%" stopColor="#0c3d5e" />
        <stop offset="100%" stopColor="#0d4d6e" />
      </linearGradient>

      <linearGradient id="lakeNightDepthGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#020817" />
        <stop offset="35%" stopColor="#031128" />
        <stop offset="75%" stopColor="#051c38" />
        <stop offset="100%" stopColor="#072445" />
      </linearGradient>

            <linearGradient id="hillForeMeadowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={isNight ? "#123824" : sunsetFactor > 0.3 ? "#9a5b1f" : "#5aa66b"} />
        <stop offset="30%" stopColor={isNight ? "#0e2d1d" : sunsetFactor > 0.3 ? "#6d4a1c" : "#428d54"} />
        <stop offset="70%" stopColor={isNight ? "#092014" : sunsetFactor > 0.3 ? "#364623" : "#2e6d40"} />
        <stop offset="100%" stopColor={isNight ? "#05150c" : sunsetFactor > 0.3 ? "#1f2a17" : "#1f4e2c"} />
      </linearGradient>

      <linearGradient id="hillLeftMeadowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="35%" stopColor="#22c55e" />
        <stop offset="70%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>

      <linearGradient id="sunflowerPetalGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="40%" stopColor="#f59e0b" />
        <stop offset="85%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#fef08a" />
      </linearGradient>

      <radialGradient id="sunflowerCoreGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1c0a00" />
        <stop offset="40%" stopColor="#3d1800" />
        <stop offset="70%" stopColor="#5c2602" />
        <stop offset="85%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </radialGradient>

      <linearGradient id="sunflowerLeafGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="45%" stopColor="#16a34a" />
        <stop offset="85%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>

      {/* Lotus Gradients (Reference 63b0c510.png: Pure White Base -> Pink/Magenta Tip) */}
      <linearGradient id="lotusPetalGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#fbcfe8" />
        <stop offset="80%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>

      <linearGradient id="lotusPetalDeepGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#f9a8d4" />
        <stop offset="75%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>

      <radialGradient id="lotusCarpelGrad" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </radialGradient>

      <radialGradient id="lilyPadGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#2d6a4f" />
        <stop offset="45%" stopColor="#1b4332" />
        <stop offset="75%" stopColor="#1b4332" />
        <stop offset="100%" stopColor="#081c15" />
      </radialGradient>

      {/* Red Deer Coat Gradient */}
      <linearGradient id="deerCoatGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="50%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>

      <linearGradient id="deerBellyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#fef3c7" />
      </linearGradient>

      {/* Nocturnal Red Deer Bedded Coat Gradient (Deep velvety chestnut in moonlight) */}
      <linearGradient id="deerCoatNightGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6d2e14" />
        <stop offset="35%" stopColor="#54210c" />
        <stop offset="70%" stopColor="#3d1607" />
        <stop offset="100%" stopColor="#220b03" />
      </linearGradient>

      {/* Nocturnal Moonlit Fur Rim Highlight */}
      <linearGradient id="deerMoonlitRimGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
      </linearGradient>

      {/* Majestic Red Deer Stag Antler Gradients (Daytime Bone & Ivory, Nighttime Moonlit Horn) */}
      <linearGradient id="antlerBoneGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="25%" stopColor="#92400e" />
        <stop offset="60%" stopColor="#d97706" />
        <stop offset="85%" stopColor="#fef3c7" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>

      <linearGradient id="antlerFarBoneGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#451a03" />
        <stop offset="40%" stopColor="#78350f" />
        <stop offset="80%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#fef3c7" />
      </linearGradient>

      <linearGradient id="antlerNightGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="40%" stopColor="#334155" />
        <stop offset="75%" stopColor="#64748b" />
        <stop offset="90%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#f8fafc" />
      </linearGradient>

      <linearGradient id="antlerFarNightGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="85%" stopColor="#475569" />
        <stop offset="100%" stopColor="#94a3b8" />
      </linearGradient>

      {/* Swiss Alpine Cow Coat Gradient */}
      <linearGradient id="cowCoatGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8d4924" />
        <stop offset="28%" stopColor="#753919" />
        <stop offset="68%" stopColor="#592911" />
        <stop offset="100%" stopColor="#351506" />
      </linearGradient>

      {/* Swiss Alpine Cow Dorsal Highlight Gradient */}
      <linearGradient id="cowHighlightGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c26e38" />
        <stop offset="50%" stopColor="#8d4924" />
        <stop offset="100%" stopColor="#592911" />
      </linearGradient>

      {/* Swiss Alpine Cow Muzzle Meal Gradient */}
      <radialGradient id="cowMuzzleGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffedd5" />
        <stop offset="55%" stopColor="#fed7aa" />
        <stop offset="85%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#ea580c" />
      </radialGradient>

      {/* Swiss Treichel Brass Cowbell Gradient */}
      <linearGradient id="cowbellBrassGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="18%" stopColor="#d97706" />
        <stop offset="42%" stopColor="#fde047" />
        <stop offset="70%" stopColor="#f59e0b" />
        <stop offset="90%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>

      {/* Swiss Alpine Calf Coat Gradient */}
      <linearGradient id="cowCalfCoatGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a35427" />
        <stop offset="40%" stopColor="#8d4924" />
        <stop offset="100%" stopColor="#592911" />
      </linearGradient>

      {/* Swiss Alpine Cow Night Coat Gradient */}
      <linearGradient id="cowNightCoatGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a220e" />
        <stop offset="45%" stopColor="#351506" />
        <stop offset="100%" stopColor="#1a0802" />
      </linearGradient>

      {/* ── BOTANICAL ARCHED FOOTBRIDGE 3D PERSPECTIVE GRADIENTS ── */}
      {/* 1. 3D Walking Deck Floor (Perspective Plank Floor) */}
      <linearGradient id="bridgeDeckFloorGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={isNight ? "#160c07" : sunsetFactor > 0.3 ? "#6d3009" : "#7c3f15"} />
        <stop offset="45%" stopColor={isNight ? "#24130b" : sunsetFactor > 0.3 ? "#a1480d" : "#b46d24"} />
        <stop offset="100%" stopColor={isNight ? "#1a0e08" : sunsetFactor > 0.3 ? "#853b0b" : "#945318"} />
      </linearGradient>

      {/* 2. Front Arch Fascia Beam (Vertical 3D Face) */}
      <linearGradient id="bridgeFasciaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={isNight ? "#2c170d" : sunsetFactor > 0.3 ? "#853b0b" : "#a1591f"} />
        <stop offset="70%" stopColor={isNight ? "#1a0d07" : sunsetFactor > 0.3 ? "#542409" : "#6c350f"} />
        <stop offset="100%" stopColor={isNight ? "#0d0603" : sunsetFactor > 0.3 ? "#361605" : "#421f08"} />
      </linearGradient>

      {/* 3. Under-Arch Deep Ceiling Shadow */}
      <linearGradient id="bridgeUnderArchShadowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#050302" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#0c0704" stopOpacity="0.3" />
      </linearGradient>

      {/* 4. Far / Back Railing (Atmospheric Distance Plane) */}
      <linearGradient id="bridgeBackRailGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={isNight ? "#130a05" : sunsetFactor > 0.3 ? "#4d1d04" : "#4e270e"} />
        <stop offset="100%" stopColor={isNight ? "#0a0502" : sunsetFactor > 0.3 ? "#2d1002" : "#321707"} />
      </linearGradient>

      {/* 5. Near / Front Railing (Foreground Plane with Sunlit Lip) */}
      <linearGradient id="bridgeFrontRailGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={isNight ? "#381f12" : sunsetFactor > 0.3 ? "#a8470e" : "#c6752c"} />
        <stop offset="50%" stopColor={isNight ? "#25140b" : sunsetFactor > 0.3 ? "#7c3208" : "#8f4917"} />
        <stop offset="100%" stopColor={isNight ? "#140a05" : sunsetFactor > 0.3 ? "#4a1c04" : "#56270a"} />
      </linearGradient>

      {/* 6. Cylindrical 3D Newel Post Gradient */}
      <linearGradient id="bridgeCylindricalPostGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={isNight ? "#381f12" : sunsetFactor > 0.3 ? "#b45309" : "#d97706"} />
        <stop offset="35%" stopColor={isNight ? "#24130b" : sunsetFactor > 0.3 ? "#853b0b" : "#a1591f"} />
        <stop offset="100%" stopColor={isNight ? "#0d0603" : sunsetFactor > 0.3 ? "#3d1704" : "#47220a"} />
      </linearGradient>

      {/* 7. Cylindrical Timber Piling Gradient (Legs in Water) */}
      <linearGradient id="bridgePilingCylinderGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={isNight ? "#24150d" : sunsetFactor > 0.3 ? "#783b12" : "#85491f"} />
        <stop offset="40%" stopColor={isNight ? "#180d07" : sunsetFactor > 0.3 ? "#542509" : "#613112"} />
        <stop offset="100%" stopColor={isNight ? "#090402" : sunsetFactor > 0.3 ? "#2b1003" : "#301606"} />
      </linearGradient>

      {/* 8. Dressed Masonry Stone Abutment Piers */}
      <linearGradient id="bridgeStonePierGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={isNight ? "#334155" : sunsetFactor > 0.3 ? "#786958" : "#64748b"} />
        <stop offset="55%" stopColor={isNight ? "#1e293b" : sunsetFactor > 0.3 ? "#54463a" : "#475569"} />
        <stop offset="100%" stopColor={isNight ? "#0f172a" : sunsetFactor > 0.3 ? "#332820" : "#334155"} />
      </linearGradient>

      {/* 9. Warm Lantern Luminous Glow */}
      <radialGradient id="bridgeLanternGlowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="25%" stopColor="#fef08a" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
      </radialGradient>

      {/* 10. Shimmering Water Reflection under Bridge Arch */}
      <linearGradient id="bridgeWaterReflectionGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={isNight ? "#38bdf8" : sunsetFactor > 0.3 ? "#ea580c" : "#ca8a04"} stopOpacity="0.35" />
        <stop offset="50%" stopColor={isNight ? "#0284c7" : sunsetFactor > 0.3 ? "#9a3412" : "#854d0e"} stopOpacity="0.18" />
        <stop offset="100%" stopColor={isNight ? "#0f172a" : sunsetFactor > 0.3 ? "#431407" : "#365314"} stopOpacity="0" />
      </linearGradient>
    
      {/* ── RECOVERED LAND, CELESTIAL, MOUNTAIN & FLORA GRADIENTS ── */}
      <radialGradient id="moonGlowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="40%" stopColor="#e2e8f0" stopOpacity="0.75" />
                  <stop offset="70%" stopColor="#cbd5e1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                </radialGradient>

      <linearGradient id="skyDayGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4178c7" />
                  <stop offset="40%" stopColor="#679be0" />
                  <stop offset="75%" stopColor="#9fc1ed" />
                  <stop offset="100%" stopColor="#d5e3f7" />
                </linearGradient>

      <linearGradient id="skyNightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#060b18" />
                  <stop offset="45%" stopColor="#0b152b" />
                  <stop offset="80%" stopColor="#12203d" />
                  <stop offset="100%" stopColor="#18294a" />
                </linearGradient>

      <linearGradient id="skySunsetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2e1065" />
                  <stop offset="35%" stopColor="#7c2d12" />
                  <stop offset="65%" stopColor="#c2410c" />
                  <stop offset="100%" stopColor="#fed7aa" />
                </linearGradient>

      <radialGradient id="sunGlowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="30%" stopColor="#fef08a" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>

      <radialGradient id="lotusCoreGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </radialGradient>

      <radialGradient id="sunflowerDiscGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="65%" stopColor="#451a03" />
                  <stop offset="100%" stopColor="#1c0a00" />
                </radialGradient>

      <linearGradient id="mtnDistantHazeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? "#09121f" : sunsetFactor > 0.25 ? "#581c87" : "#5b7696"} stopOpacity="0.85" />
                  <stop offset="60%" stopColor={isNight ? "#0b1728" : sunsetFactor > 0.25 ? "#701a75" : "#718ea8"} stopOpacity="0.65" />
                  <stop offset="100%" stopColor={isNight ? "#0e1d33" : sunsetFactor > 0.25 ? "#9d174d" : "#8eaac2"} stopOpacity="0.35" />
                </linearGradient>

      <linearGradient id="mtnValleyMistGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? "#0a1424" : sunsetFactor > 0.25 ? "#831843" : "#dbeafe"} stopOpacity="0" />
                  <stop offset="50%" stopColor={isNight ? "#0d1a2d" : sunsetFactor > 0.25 ? "#9d174d" : "#bfdbfe"} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={isNight ? "#09121f" : sunsetFactor > 0.25 ? "#701a75" : "#93c5fd"} stopOpacity="0.1" />
                </linearGradient>

      <linearGradient id="shorelineBankGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? "#0a1320" : "#1a2c3d"} />
                  <stop offset="65%" stopColor={isNight ? "#070e17" : "#142230"} />
                  <stop offset="100%" stopColor={isNight ? "#04080e" : "#0d1620"} />
                </linearGradient>

      <linearGradient id="waterfallStreamGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.98" />
                </linearGradient>

      <radialGradient id="lunarWaveGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#e0f2fe" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#7dd3fc" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>

      <linearGradient id="moonColumnWash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
                  <stop offset="35%" stopColor="#bae6fd" stopOpacity="0.28" />
                  <stop offset="70%" stopColor="#7dd3fc" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>

      <radialGradient id="solarWaveGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#fef08a" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </radialGradient>

      <linearGradient id="sunsetColumnWash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.55" />
                  <stop offset="35%" stopColor="#fb923c" stopOpacity="0.42" />
                  <stop offset="70%" stopColor="#ea580c" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#9a3412" stopOpacity="0.0" />
                </linearGradient>

      <radialGradient id="sunsetWaveGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#fed7aa" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#ea580c" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#9a3412" stopOpacity="0" />
                </radialGradient>

      {/* Hardware-accelerated soft lake light diffusion (Zero blur convolution cost!) */}
      <radialGradient id="lakeAmbientGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.55" />
        <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.30" />
        <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.10" />
        <stop offset="100%" stopColor="#d97706" stopOpacity="0.0" />
      </radialGradient>
      <radialGradient id="lakeSunsetGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.65" />
        <stop offset="35%" stopColor="#fb923c" stopOpacity="0.38" />
        <stop offset="70%" stopColor="#ea580c" stopOpacity="0.14" />
        <stop offset="100%" stopColor="#9a3412" stopOpacity="0.0" />
      </radialGradient>
      <radialGradient id="lakeMoonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="35%" stopColor="#bae6fd" stopOpacity="0.25" />
        <stop offset="70%" stopColor="#7dd3fc" stopOpacity="0.09" />
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
      </radialGradient>

      <linearGradient id="hillBackMeadowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? "#0d2618" : sunsetFactor > 0.3 ? "#784b1b" : "#4e8c5c"} />
                  <stop offset="40%" stopColor={isNight ? "#0a1f13" : sunsetFactor > 0.3 ? "#543d1a" : "#3b7a4a"} />
                  <stop offset="80%" stopColor={isNight ? "#07170e" : sunsetFactor > 0.3 ? "#2d3d22" : "#2d633b"} />
                  <stop offset="100%" stopColor={isNight ? "#05120b" : sunsetFactor > 0.3 ? "#1e2e18" : "#224f2f"} />
                </linearGradient>

      <linearGradient id="hillRidgeSunlitGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={isNight ? "#1e402c" : sunsetFactor > 0.35 ? "#f59e0b" : "#86efac"} stopOpacity={isNight ? "0.4" : "0.85"} />
                  <stop offset="50%" stopColor={isNight ? "#153322" : sunsetFactor > 0.35 ? "#d97706" : "#4ade80"} stopOpacity={isNight ? "0.2" : "0.6"} />
                  <stop offset="100%" stopColor={isNight ? "#0a2215" : sunsetFactor > 0.35 ? "#92400e" : "#22c55e"} stopOpacity="0" />
                </linearGradient>

      <radialGradient id="hillSwaleShadowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={isNight ? "#030a06" : "#0d2b17"} stopOpacity="0.55" />
                  <stop offset="60%" stopColor={isNight ? "#05140b" : "#143d22"} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={isNight ? "#082012" : "#1d522e"} stopOpacity="0" />
                </radialGradient>

      <radialGradient id="riverStoneGrad1" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={isNight ? "#475569" : sunsetFactor > 0.3 ? "#a89984" : "#94a3b8"} />
                  <stop offset="45%" stopColor={isNight ? "#334155" : sunsetFactor > 0.3 ? "#786958" : "#64748b"} />
                  <stop offset="85%" stopColor={isNight ? "#1e293b" : sunsetFactor > 0.3 ? "#4d4135" : "#475569"} />
                  <stop offset="100%" stopColor={isNight ? "#0f172a" : sunsetFactor > 0.3 ? "#292119" : "#334155"} />
                </radialGradient>

      <radialGradient id="riverStoneGrad2" cx="38%" cy="28%" r="68%">
                  <stop offset="0%" stopColor={isNight ? "#64748b" : sunsetFactor > 0.3 ? "#b8a896" : "#cbd5e1"} />
                  <stop offset="50%" stopColor={isNight ? "#475569" : sunsetFactor > 0.3 ? "#8a7a6b" : "#94a3b8"} />
                  <stop offset="90%" stopColor={isNight ? "#334155" : sunsetFactor > 0.3 ? "#54463a" : "#64748b"} />
                  <stop offset="100%" stopColor={isNight ? "#1e293b" : sunsetFactor > 0.3 ? "#2d241c" : "#475569"} />
                </radialGradient>

      <linearGradient id="shorelineLappingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? "#38bdf8" : sunsetFactor > 0.3 ? "#fed7aa" : "#e0f2fe"} stopOpacity="0.75" />
                  <stop offset="60%" stopColor={isNight ? "#0284c7" : sunsetFactor > 0.3 ? "#fb923c" : "#bae6fd"} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={isNight ? "#0369a1" : sunsetFactor > 0.3 ? "#c2410c" : "#93c5fd"} stopOpacity="0" />
                </linearGradient>

      <linearGradient id="shorelineMoistEarthGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={isNight ? "#162017" : "#444030"} />
                  <stop offset="45%" stopColor={isNight ? "#101711" : "#2f2d22"} />
                  <stop offset="80%" stopColor={isNight ? "#0b100c" : "#1e1d17"} />
                  <stop offset="100%" stopColor={isNight ? "#060907" : "#121410"} />
                </linearGradient>

      <radialGradient id="treeRootMoundGrad" cx="45%" cy="35%" r="65%">
                  <stop offset="0%" stopColor={isNight ? "#123824" : "#326e45"} />
                  <stop offset="45%" stopColor={isNight ? "#0b2618" : "#225232"} />
                  <stop offset="80%" stopColor={isNight ? "#06180f" : "#153a22"} />
                  <stop offset="100%" stopColor={isNight ? "#030c08" : "#0d2616"} />
                </radialGradient>

      <linearGradient id="buttercupGlossGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="40%" stopColor="#eab308" />
                  <stop offset="85%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>

      <linearGradient id="cloverHeadGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="60%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#fbcfe8" />
                </linearGradient>

      <linearGradient id="daisyRayGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="25%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

      <linearGradient id="edelweissBractGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="45%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

      <linearGradient id="forgetMeNotGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#0369a1" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>

      <linearGradient id="poppyPetalGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#b91c1c" />
                  <stop offset="35%" stopColor="#dc2626" />
                  <stop offset="75%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>

      <linearGradient id="cowHornGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#292524" />
                  <stop offset="35%" stopColor="#57534e" />
                  <stop offset="70%" stopColor="#e7e5e4" />
                  <stop offset="100%" stopColor="#fef9c3" />
                </linearGradient>

      <linearGradient id="cowbellGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="40%" stopColor="#eab308" />
                  <stop offset="85%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>

      <linearGradient id="cowDorsalGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a85222" />
                  <stop offset="50%" stopColor="#ca6b33" />
                  <stop offset="100%" stopColor="#a85222" />
                </linearGradient>

    </defs>
  )
}

export default React.memo(BotanicalDefs)
export { BotanicalDefs }
