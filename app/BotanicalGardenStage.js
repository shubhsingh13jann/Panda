'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ECOLOGY_DATABASE } from './botanical/ecologyData'
import PandaOrientationBillboard from './botanical/PandaOrientationBillboard'
import BotanicalDefs from './botanical/BotanicalDefs'
import CelestialSky from './botanical/CelestialSky'
import AlpineMountains, { getMountainRidgeY } from './botanical/AlpineMountains'
import AlpineLakeBridge from './botanical/AlpineLakeBridge'
import ThreeDAppleTree from './botanical/ThreeDAppleTree'
import MeadowFlora from './botanical/MeadowFlora'
import AlpineFauna from './botanical/AlpineFauna'
import FloatingLotuses from './botanical/FloatingLotuses'
import AmbientFauna from './botanical/AmbientFauna'
import EcologyModal from './botanical/EcologyModal'

export default function BotanicalGardenStage({ sw, sh, onComplete }) {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false)
  const [orientationDismissed, setOrientationDismissed] = useState(false)

  // ── CELESTIAL FREE 2D POSITIONS IN 1600x900 MASTER CANVAS ──
  // User can drag the Sun or Moon freely in 2D anywhere in the sky bi-directionally!
  const [sunPos, setSunPos] = useState({ x: 380, y: 145 })
  const [moonPos, setMoonPos] = useState({ x: 380, y: 155 })
  const [isNightMode, setIsNightMode] = useState(false)
  const [isDraggingSun, setIsDraggingSun] = useState(false)
  const [isDraggingMoon, setIsDraggingMoon] = useState(false)
  const [activeSpecimen, setActiveSpecimen] = useState(null)
  const [bloomingGift, setBloomingGift] = useState(false)
  const [waterRipples, setWaterRipples] = useState([])
  const [showInfoBanner, setShowInfoBanner] = useState(true)
  const infoTimeoutRef = useRef(null)

  const sunPosRef = useRef({ x: 380, y: 145 })
  const moonPosRef = useRef({ x: 380, y: 155 })
  const isNightModeRef = useRef(false)
  const isPortraitMobileRef = useRef(false)

  const svgRef = useRef(null)
  const sunElRef = useRef(null)
  const moonElRef = useRef(null)
  const topTouchTargetRef = useRef(null)

  const draggingRef = useRef(null) // null | 'sun' | 'moon'
  const dragOffsetRef = useRef({ dx: 0, dy: 0 })
  const nextCelestialPosRef = useRef(null)
  const celestialRafRef = useRef(null)

  // Auto-dismiss top guide message after 4.5 seconds on page open
  useEffect(() => {
    infoTimeoutRef.current = setTimeout(() => {
      setShowInfoBanner(false)
    }, 4500)
    return () => {
      if (infoTimeoutRef.current) clearTimeout(infoTimeoutRef.current)
    }
  }, [])

  const handleInfoButtonClick = useCallback(() => {
    if (infoTimeoutRef.current) clearTimeout(infoTimeoutRef.current)
    setShowInfoBanner(true)
    infoTimeoutRef.current = setTimeout(() => {
      setShowInfoBanner(false)
    }, 4500)
  }, [])

  // Secondary continuous tick for water ripples, animal breathing, drinking motion
  const [simTick, setSimTick] = useState(0)

  // Sync refs with latest state
  useEffect(() => {
    sunPosRef.current = sunPos
  }, [sunPos])

  useEffect(() => {
    moonPosRef.current = moonPos
  }, [moonPos])

  useEffect(() => {
    isNightModeRef.current = isNightMode
  }, [isNightMode])

  useEffect(() => {
    isPortraitMobileRef.current = isPortraitMobile
  }, [isPortraitMobile])

  // Butter-smooth 60fps / 120fps requestAnimationFrame update batcher
  const scheduleCelestialUpdate = useCallback((type, x, y) => {
    nextCelestialPosRef.current = { type, x, y }
    if (celestialRafRef.current == null) {
      celestialRafRef.current = requestAnimationFrame(() => {
        celestialRafRef.current = null
        if (!nextCelestialPosRef.current) return
        const { type: t, x: px, y: py } = nextCelestialPosRef.current
        nextCelestialPosRef.current = null
        if (t === 'sun') {
          sunPosRef.current = { x: px, y: py }
          setSunPos({ x: px, y: py })
        } else {
          moonPosRef.current = { x: px, y: py }
          setMoonPos({ x: px, y: py })
        }
      })
    }
  }, [])

  useEffect(() => {
    const evaluateOrientation = () => {
      const isMobile = window.innerWidth < 850
      const isPortrait = window.innerHeight > window.innerWidth
      setIsPortraitMobile(isMobile && isPortrait)
    }

    evaluateOrientation()
    window.addEventListener('resize', evaluateOrientation)
    window.addEventListener('orientationchange', evaluateOrientation)
    return () => {
      window.removeEventListener('resize', evaluateOrientation)
      window.removeEventListener('orientationchange', evaluateOrientation)
    }
  }, [])

  // ── CONTINUOUS TICK FOR WATER RIPPLES, WINGS & WILDLIFE ──
  useEffect(() => {
    let animId
    let lastStamp = performance.now()
    let accum = 0

    const step = (now) => {
      const delta = (now - lastStamp) / 1000
      lastStamp = now

      // Pause ambient re-renders during active celestial drag for locked 60/120 FPS
      if (!draggingRef.current) {
        accum += delta
        // Throttle ambient wildlife animations to ~25 FPS (0.04s) to eliminate background re-render churn
        if (accum >= 0.04) {
          setSimTick((prev) => prev + accum)
          accum = 0
        }
      }
      animId = requestAnimationFrame(step)
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [])

  // ── ENVIRONMENTAL WEIGHTS DERIVED FROM 2D CELESTIAL POSITION ──
  // isNight is cleanly governed by isNightMode without spurious drag threshold glitches
  const isNight = isNightMode

  // ── REAL-PHYSICS MOUNTAIN OCCLUSION & DIRECT SOLAR IRRADIANCE ──
  const mountainRidgeY = useMemo(() => getMountainRidgeY(sunPos.x), [sunPos.x])

  // mountainOcclusion: 0.0 = completely in open sky, 1.0 = completely behind mountain rock
  const mountainOcclusion = useMemo(() => {
    if (isNight) return 0
    // Sun core radius is 46px, with rays ~65px
    // When sunPos.y is 65px above ridge, 0% occluded (clear unobstructed sky)
    // When sunPos.y is 45px below ridge, 100% occluded (solid rock blocking direct beam)
    const clearY = mountainRidgeY - 65
    const hiddenY = mountainRidgeY + 45
    return Math.max(0, Math.min(1, (sunPos.y - clearY) / (hiddenY - clearY)))
  }, [isNight, mountainRidgeY, sunPos.y])

  // Direct solar irradiance factor (1.0 = full direct sunlight, 0.0 = completely occluded by mountain)
  const directSunFactor = useMemo(() => 1.0 - mountainOcclusion, [mountainOcclusion])

  const timeT = useMemo(() => {
    if (!isNight) {
      // 0.02 (Dawn) -> 0.35 (Noon) -> 0.65 (Sunset) as sunPos.x moves 100 -> 1440
      const p = Math.max(0, Math.min(1, (sunPos.x - 100) / 1340))
      return 0.02 + p * 0.63
    } else {
      // In night mode, timeT reflects nocturnal cycle (0.75 -> 1.0)
      const p = Math.max(0, Math.min(1, (moonPos.x - 100) / 1340))
      return 0.75 + p * 0.25
    }
  }, [isNight, sunPos.x, moonPos.x])

  const sunsetFactor = useMemo(() => {
    if (isNight) return 0
    return Math.max(0, Math.min(1, (sunPos.x - 1040) / 360))
  }, [isNight, sunPos.x])

  const nightFactor = useMemo(() => {
    if (isNight) return 1.0
    // Soft twilight transition as the sun approaches the horizon
    return Math.max(0, Math.min(1, (sunPos.x - 1380) / 80))
  }, [isNight, sunPos.x])

  // ── CONTINUOUS FLOWER BLOOM FACTOR (1.0 = FULL DAY BLOOM, 0.0 = NIGHT CLOSED BUD) ──
  // Bidirectional opening & closing: moves continuously whether dragged left-to-right or right-to-left
  // Real Physics: When mountain occludes direct sunlight, blooms fold partially into resting state
  const bloomFactor = useMemo(() => {
    if (!isNight) {
      let base = 1.0
      if (sunPos.x <= 480) {
        // Dawn opening as sun rises on the left
        const p = Math.max(0, Math.min(1, (sunPos.x - 120) / 360))
        base = p * p * (3 - 2 * p)
      } else if (sunPos.x <= 1180) {
        // Full peak midday bloom
        base = 1.0
      } else {
        // Sunset closing as sun moves towards the right (and re-opens if dragged back left!)
        const p = Math.max(0, Math.min(1, (sunPos.x - 1180) / 260))
        base = 1 - p * p * (3 - 2 * p)
      }
      return base * (0.35 + 0.65 * directSunFactor)
    } else {
      // Deep night: sleeping buds
      return 0.0
    }
  }, [isNight, sunPos.x, directSunFactor])

  const bloom = bloomFactor

  // Sunflower heliotropic solar tracking: 2D angle pointing directly at the active sun/moon
  const getSunflowerAngle = useCallback((flowX, flowY) => {
    const targetX = isNight ? moonPos.x : sunPos.x
    const targetY = isNight ? moonPos.y : sunPos.y
    const dx = targetX - flowX
    const dy = targetY - flowY
    const rawAngle = Math.atan2(dx, -dy) * (180 / Math.PI)
    const clampedAngle = Math.max(-46, Math.min(46, rawAngle))
    return (1 - bloomFactor) * 22 + bloomFactor * clampedAngle
  }, [isNight, moonPos.x, moonPos.y, sunPos.x, sunPos.y, bloomFactor])

  // Deer gentle drinking oscillation in daytime
  const deerDrinkPhase = Math.sin(simTick * 0.6)
  const isDeerDrinking = !isNight && deerDrinkPhase > 0.4

  const [owlAwakeUntil, setOwlAwakeUntil] = useState(0)

  const handleInspect = useCallback((key) => {
    if (key === 'owl') {
      setOwlAwakeUntil(Date.now() + 5000)
    }
    if (ECOLOGY_DATABASE[key]) {
      setActiveSpecimen(ECOLOGY_DATABASE[key])
    }
  }, [])

  // ── PRECISE COORDINATE MAPPING FROM VIEWPORT PIXELS TO 1600x900 SVG SPACE ──
  // Bulletproof on mobile portrait & landscape (CTM-aware with exact mathematical slice/meet fallback)
  const getSvgPoint = useCallback((clientX, clientY) => {
    if (!svgRef.current || typeof clientX !== 'number' || typeof clientY !== 'number') {
      return { x: 380, y: 150 }
    }
    try {
      const ctm = svgRef.current.getScreenCTM()
      if (ctm) {
        const pt = svgRef.current.createSVGPoint()
        pt.x = clientX
        pt.y = clientY
        const transformed = pt.matrixTransform(ctm.inverse())
        if (Number.isFinite(transformed.x) && Number.isFinite(transformed.y)) {
          return { x: transformed.x, y: transformed.y }
        }
      }
    } catch (_) {}

    // Robust mathematical fallback for preserveAspectRatio
    const rect = svgRef.current.getBoundingClientRect()
    const w = rect.width || (typeof window !== 'undefined' ? window.innerWidth : 1600)
    const h = rect.height || (typeof window !== 'undefined' ? window.innerHeight : 900)
    const isPortrait = isPortraitMobileRef.current
    const scale = isPortrait ? Math.min(w / 1600, h / 900) : Math.max(w / 1600, h / 900)
    const offsetX = (w - 1600 * scale) / 2
    const offsetY = (h - 900 * scale) / 2
    const relX = clientX - rect.left
    const relY = clientY - rect.top
    return {
      x: (relX - offsetX) / scale,
      y: (relY - offsetY) / scale,
    }
  }, [])

  // Unified touch/pointer coordinate extractor
  const extractCoords = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY }
    }
    return { clientX: e.clientX, clientY: e.clientY }
  }

  // ── SUN & MOON BI-DIRECTIONAL DRAG CORE ENGINE ──
  const startCelestialDrag = useCallback(
    (clientX, clientY, e) => {
      // Don't intercept UI buttons (billboard orientation, gift button, modal inspects)
      if (e?.target && (e.target.closest('button') || e.target.closest('[role="dialog"]'))) {
        return false
      }
      const pt = getSvgPoint(clientX, clientY)
      const targetPos = isNightModeRef.current ? moonPosRef.current : sunPosRef.current
      const targetType = isNightModeRef.current ? 'moon' : 'sun'
      const dist = Math.hypot(pt.x - targetPos.x, pt.y - targetPos.y)

      // Generous 180px hit radius ensures instant, effortless grab on phone screens & desktop alike
      if (dist <= 180) {
        if (e?.cancelable) e.preventDefault()
        if (e?.stopPropagation) e.stopPropagation()
        dragOffsetRef.current = {
          dx: pt.x - targetPos.x,
          dy: pt.y - targetPos.y,
        }
        draggingRef.current = targetType
        if (targetType === 'sun') setIsDraggingSun(true)
        else setIsDraggingMoon(true)

        if (e?.pointerId != null && e?.target?.setPointerCapture) {
          try {
            e.target.setPointerCapture(e.pointerId)
          } catch (_) {}
        }
        return true
      }
      return false
    },
    [getSvgPoint]
  )

  const moveCelestialDrag = useCallback(
    (clientX, clientY, e) => {
      if (!draggingRef.current) return
      if (e?.cancelable) e.preventDefault()
      if (e?.stopPropagation) e.stopPropagation()
      const target = draggingRef.current
      const pt = getSvgPoint(clientX, clientY)
      const rawX = pt.x - dragOffsetRef.current.dx
      const newY = Math.max(20, Math.min(560, pt.y - dragOffsetRef.current.dy))
      const safeX = Number.isFinite(rawX) ? rawX : 380
      const safeY = Number.isFinite(newY) ? newY : 150

      // Instant hardware-accelerated DOM transform for 0ms lag-free tracking!
      if (target === 'sun') {
        sunPosRef.current = { x: safeX, y: safeY }
        if (sunElRef.current) {
          sunElRef.current.setAttribute('transform', `translate(${safeX}, ${safeY})`)
        }
      } else if (target === 'moon') {
        moonPosRef.current = { x: safeX, y: safeY }
        if (moonElRef.current) {
          moonElRef.current.setAttribute('transform', `translate(${safeX}, ${safeY})`)
        }
      }
      if (topTouchTargetRef.current) {
        topTouchTargetRef.current.setAttribute('cx', safeX)
        topTouchTargetRef.current.setAttribute('cy', safeY)
      }

      // Only transition when reaching actual valley scene edges (safeX >= 1520 or safeX <= 80)
      // Removing clientX bezel triggers completely prevents accidental drag drops on mobile!
      const isOffRightScene = safeX >= 1520
      const isOffLeftScene = safeX <= 80

      if (target === 'sun') {
        // Forward: Dragging Sun off right screen (Sunset -> Nightfall)
        if (isOffRightScene) {
          setIsNightMode(true)
          isNightModeRef.current = true
          const newMoon = { x: 180, y: 160 }
          const newSun = { x: 180, y: 200 }
          moonPosRef.current = newMoon
          sunPosRef.current = newSun
          setMoonPos(newMoon)
          setSunPos(newSun)
          draggingRef.current = null
          setIsDraggingSun(false)
        }
        // Backward / Opposite Direction: Dragging Sun off left screen (Rewind past dawn -> Previous Night)
        else if (isOffLeftScene) {
          setIsNightMode(true)
          isNightModeRef.current = true
          const newMoon = { x: 1380, y: 160 }
          const newSun = { x: 1380, y: 200 }
          moonPosRef.current = newMoon
          sunPosRef.current = newSun
          setMoonPos(newMoon)
          setSunPos(newSun)
          draggingRef.current = null
          setIsDraggingSun(false)
        }
        // Normal dragging in sky (Left-to-Right or Right-to-Left, fully bidirectional & smooth)
        else {
          scheduleCelestialUpdate('sun', safeX, safeY)
        }
      } else if (target === 'moon') {
        // Forward: Dragging Moon off right screen (End of Night -> Sunrise / Dawn)
        if (isOffRightScene) {
          setIsNightMode(false)
          isNightModeRef.current = false
          const newSun = { x: 180, y: 220 }
          const newMoon = { x: 180, y: 160 }
          sunPosRef.current = newSun
          moonPosRef.current = newMoon
          setSunPos(newSun)
          setMoonPos(newMoon)
          draggingRef.current = null
          setIsDraggingMoon(false)
        }
        // Backward / Opposite Direction: Dragging Moon off left screen (Rewind night -> Golden Sunset!)
        else if (isOffLeftScene) {
          setIsNightMode(false)
          isNightModeRef.current = false
          const newSun = { x: 1380, y: 200 }
          const newMoon = { x: 1380, y: 160 }
          sunPosRef.current = newSun
          moonPosRef.current = newMoon
          setSunPos(newSun)
          setMoonPos(newMoon)
          draggingRef.current = null
          setIsDraggingMoon(false)
        }
        // Normal dragging in sky (Left-to-Right or Right-to-Left, fully bidirectional & smooth)
        else {
          scheduleCelestialUpdate('moon', safeX, safeY)
        }
      }
    },
    [getSvgPoint, scheduleCelestialUpdate]
  )

  const endCelestialDrag = useCallback((e) => {
    if (e?.pointerId != null && e?.target?.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId)
      } catch (_) {}
    }
    if (draggingRef.current) {
      const target = draggingRef.current
      draggingRef.current = null
      setIsDraggingSun(false)
      setIsDraggingMoon(false)
      // Flush final position synchronously on release so React state is 100% in sync!
      if (target === 'sun') {
        setSunPos({ ...sunPosRef.current })
      } else if (target === 'moon') {
        setMoonPos({ ...moonPosRef.current })
      }
    }
  }, [])

  const handleSunPointerDown = (e) => {
    const c = extractCoords(e)
    startCelestialDrag(c.clientX, c.clientY, e)
  }

  const handleMoonPointerDown = (e) => {
    const c = extractCoords(e)
    startCelestialDrag(c.clientX, c.clientY, e)
  }

  const handleLakePointerDown = (e) => {
    const c = extractCoords(e)
    const pt = getSvgPoint(c.clientX, c.clientY)
    if (pt.y >= 520 && pt.y <= 880) {
      setWaterRipples((prev) => [
        ...prev.slice(-4),
        { id: Date.now(), x: pt.x, y: pt.y },
      ])
    }
  }

  // ── GLOBAL BULLETPROOF BI-DIRECTIONAL WINDOW POINTER & TOUCH LISTENER ──
  // Window-level capture listener guarantees 100% effortless touch grab anywhere,
  // with passive: false to prevent browser gesture cancellations on mobile devices!
  useEffect(() => {
    const onPointerDown = (e) => {
      const c = extractCoords(e)
      startCelestialDrag(c.clientX, c.clientY, e)
    }

    const onPointerMove = (e) => {
      if (!draggingRef.current) return
      const c = extractCoords(e)
      moveCelestialDrag(c.clientX, c.clientY, e)
    }

    const onPointerUp = (e) => {
      endCelestialDrag(e)
    }

    window.addEventListener('pointerdown', onPointerDown, { passive: false })
    window.addEventListener('pointermove', onPointerMove, { passive: false })
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    // Touchmove preventDefault only when actively dragging to eliminate scroll interference
    const onTouchMove = (e) => {
      if (draggingRef.current && e.cancelable) {
        e.preventDefault()
      }
    }
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      window.removeEventListener('touchmove', onTouchMove)
      if (celestialRafRef.current) {
        cancelAnimationFrame(celestialRafRef.current)
      }
    }
  }, [startCelestialDrag, moveCelestialDrag, endCelestialDrag])

  const handlePluckLotus = () => {
    setBloomingGift(true)
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 1200)
  }

  if (isPortraitMobile && !orientationDismissed) {
    return <PandaOrientationBillboard onProceed={() => setOrientationDismissed(true)} />
  }

  return (
    <section
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 50,
        overflow: 'hidden',
        userSelect: 'none',
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        background: isNight ? '#060d1a' : '#4178c7',
        transition: 'background 0.8s ease',
      }}
    >
      {/* ══════════════════════════════════════════════════════════════
          TOP SLEEK COMPACT INSTRUCTION PILL (Matching Image 2 & 3)
          Visible for few seconds on page open & re-triggered by top-right 'i' button
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showInfoBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 'clamp(6px, 1.4vh, 14px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 40,
              pointerEvents: 'none',
              textAlign: 'center',
              width: 'min(92vw, 560px)',
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '9999px',
                padding: 'clamp(4px, 0.9vh, 7px) clamp(14px, 2vw, 20px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <div
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(0.82rem, 1.8vw, 0.94rem)',
                  fontWeight: 600,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '0.2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{isNight ? '🌙' : '☼'}</span>
                <span>
                  {isNight
                    ? 'Drag the moon across the sky — guide the night or move left to bring sunset'
                    : 'Drag the sun across the sky — the valley wakes and sleeps with it'}
                </span>
              </div>
              <div
                style={{
                  color: '#94a3b8',
                  fontSize: 'clamp(0.64rem, 1.3vw, 0.72rem)',
                  fontWeight: 700,
                  letterSpacing: '1.4px',
                  textTransform: 'uppercase',
                }}
              >
                TAP THE DEER, BEES, LOTUS & FLOWERS FOR BOTANICAL FIELD NOTES
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          TOP RIGHT 'i' INFO TOGGLE BUTTON
      ══════════════════════════════════════════════════════════════ */}
      <motion.button
        onClick={handleInfoButtonClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        title="Botanical Valley Guide & Instructions"
        aria-label="Toggle valley guide"
        style={{
          position: 'absolute',
          top: 'clamp(8px, 1.6vh, 16px)',
          right: 'clamp(12px, 2vw, 20px)',
          zIndex: 60,
          width: 'clamp(34px, 4.2vw, 40px)',
          height: 'clamp(34px, 4.2vw, 40px)',
          borderRadius: '50%',
          background: showInfoBanner
            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(217, 119, 6, 0.95) 100%)'
            : 'rgba(15, 23, 42, 0.80)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(254, 240, 138, 0.7)',
          boxShadow: showInfoBanner
            ? '0 0 16px rgba(245, 158, 11, 0.55), 0 4px 14px rgba(0,0,0,0.45)'
            : '0 4px 14px rgba(0, 0, 0, 0.45)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontFamily: 'Georgia, Cambria, serif',
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          fontWeight: 800,
          fontStyle: 'italic',
          padding: 0,
          outline: 'none',
          transition: 'background 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        i
      </motion.button>

      {/* ── Subtle orientation hint pill for mobile portrait users ── */}
      {isPortraitMobile && (
        <div
          style={{
            position: 'absolute',
            top: 'clamp(54px, 10vh, 70px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 42,
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(251, 191, 36, 0.45)',
            borderRadius: '9999px',
            padding: '4px 14px',
            color: '#fef3c7',
            fontSize: '0.74rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span>📱</span>
          <span>Rotate phone sideways for panoramic valley view</span>
          <span>🔄</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MASTER BOTANICAL SVG CANVAS (1600x900 NATIVE DESIGN SPACE)
      ══════════════════════════════════════════════════════════════ */}
      <svg
        ref={svgRef}
        viewBox="0 0 1600 900"
        preserveAspectRatio={isPortraitMobile ? 'xMidYMid meet' : 'xMidYMid slice'}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          userSelect: 'none',
          touchAction: 'none',
        }}
        onPointerUp={endCelestialDrag}
        onPointerCancel={endCelestialDrag}
        onPointerLeave={endCelestialDrag}
        onClick={handleLakePointerDown}
      >
        {/* ── Master SVG Gradients & Filters ── */}
        <BotanicalDefs isNight={isNight} sunsetFactor={sunsetFactor} />

        {/* ── 1, 2, 3b, 4: Celestial Sky, Sun with Smiling Face, Moon & God Rays ── */}
        <CelestialSky
          isNight={isNight}
          nightFactor={nightFactor}
          sunsetFactor={sunsetFactor}
          directSunFactor={directSunFactor}
          sunPos={sunPos}
          moonPos={moonPos}
          isDraggingSun={isDraggingSun}
          isDraggingMoon={isDraggingMoon}
          simTick={simTick}
          handleSunPointerDown={handleSunPointerDown}
          handleMoonPointerDown={handleMoonPointerDown}
          sunElRef={sunElRef}
          moonElRef={moonElRef}
        />

        {/* ── 5, 6, 7 & 8: Realistic Alpine Mountain Range & Coniferous Forest ── */}
        <AlpineMountains
          isNight={isNight}
          directSunFactor={directSunFactor}
          sunsetFactor={sunsetFactor}
          nightFactor={nightFactor}
          sunPos={sunPos}
          mountainOcclusion={mountainOcclusion}
          mountainRidgeY={mountainRidgeY}
          simTick={simTick}
        />

        {/* ── 9, 10, 10b: Alpine Lake, Specular Glade & 3D Arched Footbridge ── */}
        <AlpineLakeBridge
          isNight={isNight}
          sunsetFactor={sunsetFactor}
          directSunFactor={directSunFactor}
          nightFactor={nightFactor}
          sunPos={sunPos}
          moonPos={moonPos}
          simTick={simTick}
          onInspect={handleInspect}
          waterRipples={waterRipples}
          onLakeClick={handleLakePointerDown}
        />

        {/* ── 11, 12, 13, 14: Rolling Meadow Hills, Sunflowers & Wildflowers ── */}
        <MeadowFlora
          isNight={isNight}
          sunsetFactor={sunsetFactor}
          directSunFactor={directSunFactor}
          bloom={bloom}
          onInspect={handleInspect}
        />

        {/* ── 14b, 14c: Alpine Fauna (Swiss Cows & Calf, Red Deer Stag & Fawn) ── */}
        <AlpineFauna
          isNight={isNight}
          isDeerDrinking={isDeerDrinking}
          onInspect={handleInspect}
        />

        {/* ── 15 & 16: Floating Lily Pads & Three Sacred Lotuses ── */}
        <FloatingLotuses
          bloom={bloom}
          isNight={isNight}
          onInspect={handleInspect}
        />

        {/* ── 17 & 3: Ambient Fauna (Clouds, Birds, Butterflies, Bees, Fireflies) ── */}
        <AmbientFauna
          simTick={simTick}
          isNight={isNight}
          sunsetFactor={sunsetFactor}
          nightFactor={nightFactor}
          bloomFactor={bloomFactor}
          onInspect={handleInspect}
        />

        {/* ── 20. Top-Level Interactive Celestial Touch Target ── */}
        <circle
          ref={topTouchTargetRef}
          cx={isNight ? moonPos.x : sunPos.x}
          cy={isNight ? moonPos.y : sunPos.y}
          r="180"
          fill="#ffffff"
          opacity="0.0001"
          style={{ cursor: (isNight ? isDraggingMoon : isDraggingSun) ? 'grabbing' : 'grab', touchAction: 'none' }}
          pointerEvents="all"
          onPointerDown={isNight ? handleMoonPointerDown : handleSunPointerDown}
          onTouchStart={isNight ? handleMoonPointerDown : handleSunPointerDown}
        />
      </svg>

      {/* ── 3D Living Botanical Apple Tree (Three.js & Perched Owl) ── */}
      <ThreeDAppleTree
        timeT={timeT}
        sunPos={isNight ? moonPos : sunPos}
        isNight={isNight}
        sunsetFactor={sunsetFactor}
        directSunFactor={directSunFactor}
        isOwlAwakened={Date.now() < owlAwakeUntil}
        onInspect={handleInspect}
        isPortraitMobile={isPortraitMobile}
      />

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM ACTION BUTTON PILL (Exact Match with Image 2 & 3)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(14px, 2.8vh, 24px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          pointerEvents: 'auto',
          textAlign: 'center',
        }}
      >
        <motion.button
          onClick={handlePluckLotus}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          animate={{
            boxShadow: [
              '0 4px 18px rgba(217, 119, 6, 0.45)',
              '0 8px 28px rgba(245, 158, 11, 0.65)',
              '0 4px 18px rgba(217, 119, 6, 0.45)',
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
            border: '1.5px solid rgba(254, 240, 138, 0.7)',
            borderRadius: '9999px',
            padding: '8px 24px',
            color: '#fef3c7',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(0.85rem, 1.8vw, 0.94rem)',
            fontWeight: 700,
            letterSpacing: '0.4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 18px rgba(217, 119, 6, 0.45)',
          }}
        >
          <span style={{ fontSize: '15px' }}>🪷</span>
          <span>Pluck the lotus to open your gift</span>
        </motion.button>
      </div>

      {/* ── Botanical & Ecological Specimen Modal ── */}
      <EcologyModal
        activeSpecimen={activeSpecimen}
        onClose={() => setActiveSpecimen(null)}
      />

      {/* Floating Petal Transition Effect on Pluck */}
      {bloomingGift && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 130,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={`petal-burst-${i}`}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.4, 0.8],
                x: (Math.random() - 0.5) * 900,
                y: (Math.random() - 0.5) * 700,
                opacity: [1, 1, 0],
                rotate: Math.random() * 720,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                fontSize: `${22 + Math.random() * 26}px`,
              }}
            >
              {i % 3 === 0 ? '🪷' : i % 3 === 1 ? '✨' : '🌸'}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}

