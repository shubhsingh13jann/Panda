'use client'

import { useEffect, useRef, useState } from 'react'

const heartPoint = (t) => {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y = -(
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  )
  return { x, y }
}

export default function RealisticCurtainStage({ onStart, onFinish }) {
  const canvasRef = useRef(null)
  const [opened, setOpened] = useState(false)
  const [isOpeningState, setIsOpeningState] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  // Smooth entrance transition on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setFadeIn(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Use refs for callbacks so parent re-renders never tear down or restart the animation
  const onStartRef = useRef(onStart)
  const onFinishRef = useRef(onFinish)
  useEffect(() => {
    onStartRef.current = onStart
    onFinishRef.current = onFinish
  })

  const isOpeningRef = useRef(false)
  const openStartTsRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf = 0
    let running = true

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let scale = 1

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Screen-specific sizing: guarantees heart fits vertically (max 84% height)
      // and horizontally (max 720px / 90% width) with comfortable margins on any screen
      const stageW = Math.min(width * 0.90, 720)
      const stageH = height
      const maxHeartHeight = stageH * 0.84
      const maxHeartWidth = stageW

      scale = Math.min(
        maxHeartWidth / 32,
        maxHeartHeight / 28.923
      )

      cx = width / 2
      // Center vertically at 50% viewport height, offset by 2.538*scale for symmetry
      cy = stageH * 0.50 - 2.538 * scale
    }

    resize()
    window.addEventListener('resize', resize)

    // Palette
    const GOLD = { r: 251, g: 191, b: 36 }
    const SAKURA_PINK = { r: 244, g: 114, b: 182 }

    const OPEN_DURATION = 3800 // 3.8s smooth, stately unveiling
    let progress = 0
    let crestTriggered = false

    const trailingSparks = []
    const shockwaves = []
    const driftingPetals = []

    // Helper: Spawn trailing stardust spark from the peel tips
    const spawnTipSparks = (sx, sy, count = 2) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2
        const spd = Math.random() * 2.2 + 0.6
        trailingSparks.push({
          x: sx,
          y: sy,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd + 0.3,
          size: Math.random() * 2.8 + 1.2,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          color: Math.random() > 0.4 ? GOLD : SAKURA_PINK,
        })
      }
    }

    // Immediate single-touch/click handler
    const triggerPeel = () => {
      if (isOpeningRef.current) return
      isOpeningRef.current = true
      openStartTsRef.current = performance.now()
      setIsOpeningState(true)
      if (onStartRef.current) onStartRef.current()

      // Initial spark burst at the bottom apex
      const apexY = cy + 17 * scale
      for (let i = 0; i < 28; i++) {
        const a = Math.random() * Math.PI * 2
        const spd = Math.random() * 3.8 + 1
        trailingSparks.push({
          x: cx,
          y: apexY,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd - 0.5,
          size: Math.random() * 2.8 + 1.4,
          life: 1,
          decay: 0.018 + Math.random() * 0.015,
          color: Math.random() > 0.35 ? GOLD : SAKURA_PINK,
        })
      }
    }

    // Bind listeners to guarantee immediate first-touch activation
    canvas.addEventListener('click', triggerPeel)
    canvas.addEventListener('pointerdown', triggerPeel)
    window.addEventListener('pointerdown', triggerPeel, { once: true })
    window.addEventListener('click', triggerPeel, { once: true })

    // Generate falling sakura petals for post-completion
    for (let i = 0; i < 24; i++) {
      driftingPetals.push({
        x: Math.random() * (width || 800),
        y: Math.random() * (height || 800),
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.6 + 0.4,
        size: Math.random() * 3.5 + 3,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.016 + Math.random() * 0.012,
        opacity: Math.random() * 0.4 + 0.5,
      })
    }

    // Render loop
    const render = (now) => {
      if (!running) return

      if (isOpeningRef.current) {
        const elapsed = now - openStartTsRef.current
        progress = Math.min(1, elapsed / OPEN_DURATION)

        if (progress >= 1 && !crestTriggered) {
          crestTriggered = true
          const topY = cy - 5 * scale
          shockwaves.push({
            x: cx,
            y: topY,
            radius: 8,
            maxRadius: 260,
            growth: 5.5,
            opacity: 0.9,
            decay: 0.014,
            color: GOLD,
          })
          shockwaves.push({
            x: cx,
            y: topY,
            radius: 4,
            maxRadius: 180,
            growth: 4.2,
            opacity: 0.8,
            decay: 0.016,
            color: SAKURA_PINK,
          })

          // Curtain has shrunk away completely; dismiss cleanly after 1.2s
          setTimeout(() => {
            setOpened(true)
            if (onFinishRef.current) onFinishRef.current()
          }, 1200)
        }
      }

      ctx.clearRect(0, 0, width, height)

      // Smooth cosine ease: 0 -> 1
      const p = 0.5 - 0.5 * Math.cos(progress * Math.PI)

      // ── 1. PARAMETRIC PEEL COORDINATES ──
      // Right branch peels from bottom tip (t = PI) down towards top notch (t = 0)
      const tRight = Math.PI - p * Math.PI
      // Left branch peels from bottom tip (t = PI) up towards top notch (t = 2*PI)
      const tLeft = Math.PI + p * Math.PI

      const ptR = heartPoint(tRight)
      const ptL = heartPoint(tLeft)
      const xr = cx + ptR.x * scale
      const yr = cy + ptR.y * scale
      const xl = cx + ptL.x * scale
      const yl = cy + ptL.y * scale

      // Peak of parting seam along center line
      const yPeak = (cy + 17 * scale) - p * (22 * scale)

      // Curtain shrink factor: As the heart opens, outer curtains shrink and fade away
      // so by progress >= 0.85, the curtain is completely gone, leaving ONLY Image 2!
      const drapeAlpha = Math.max(0, 1 - Math.pow(p, 1.2))
      const valanceAlpha = Math.max(0, 1 - Math.pow(p, 1.3))

      // ── 2. CLIP & DRAW VELVET DRAPES (WHILE SHRINKING) ──
      if (drapeAlpha > 0.01) {
        ctx.save()
        ctx.globalAlpha = drapeAlpha

        ctx.beginPath()
        ctx.rect(0, 0, width, height)

        if (p > 0.002) {
          ctx.moveTo(xr, yr)
          const steps = 60
          for (let i = 1; i <= steps; i++) {
            const t = tRight + (Math.PI - tRight) * (i / steps)
            const pt = heartPoint(t)
            ctx.lineTo(cx + pt.x * scale, cy + pt.y * scale)
          }
          for (let i = 1; i <= steps; i++) {
            const t = Math.PI + (tLeft - Math.PI) * (i / steps)
            const pt = heartPoint(t)
            ctx.lineTo(cx + pt.x * scale, cy + pt.y * scale)
          }
          if (p < 0.99) {
            ctx.quadraticCurveTo(cx - (cx - xl) * 0.35, yPeak, cx, yPeak)
            ctx.quadraticCurveTo(cx + (xr - cx) * 0.35, yPeak, xr, yr)
          } else {
            ctx.lineTo(cx, cy - 5 * scale)
            ctx.lineTo(xr, yr)
          }
        }
        ctx.closePath()
        ctx.clip('evenodd')

        // Velvet Pleats
        const PLEATS = 36
        const pleatW = width / PLEATS
        for (let i = 0; i < PLEATS; i++) {
          const x0 = i * pleatW
          const x1 = (i + 1) * pleatW

          const lighting = 0.52 + 0.48 * Math.cos(i * 0.75)
          const r = Math.round(2 + 8 * lighting)
          const g = Math.round(36 + 110 * lighting)
          const b = Math.round(22 + 75 * lighting)

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
          ctx.fillRect(x0, 0, x1 - x0 + 0.5, height)

          if (lighting > 0.72) {
            ctx.fillStyle = 'rgba(110, 231, 183, 0.12)'
            ctx.fillRect(x0 + (x1 - x0) * 0.35, 0, (x1 - x0) * 0.3, height)
          }
        }

        // Center seam
        if (p < 0.95) {
          ctx.strokeStyle = 'rgba(0, 20, 10, 0.65)'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(cx, 0)
          ctx.lineTo(cx, yPeak)
          ctx.stroke()

          ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)'
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(cx, 0)
          ctx.lineTo(cx, yPeak)
          ctx.stroke()
        }

        ctx.restore() // Exit drape clip
      }

      // ── 3. TOP BRASS ROD & SCALLOPED VALANCE (FADES OUT AS CURTAIN SHRINKS) ──
      if (valanceAlpha > 0.01) {
        ctx.save()
        ctx.globalAlpha = valanceAlpha

        const rodGrad = ctx.createLinearGradient(0, 0, 0, 16)
        rodGrad.addColorStop(0, '#fef08a')
        rodGrad.addColorStop(0.5, '#fbbf24')
        rodGrad.addColorStop(1, '#92400e')
        ctx.fillStyle = rodGrad
        ctx.fillRect(0, 0, width, 16)

        const pleatW = width / 36
        ctx.fillStyle = '#fde047'
        for (let rx = pleatW / 2; rx < width; rx += pleatW) {
          ctx.beginPath()
          ctx.arc(rx, 8, 4.5, 0, Math.PI * 2)
          ctx.fill()
        }

        const SCALLOPS = Math.max(8, Math.round(width / 75))
        const scW = width / SCALLOPS
        const valanceH = 36
        for (let s = 0; s < SCALLOPS; s++) {
          const sx = s * scW
          ctx.fillStyle = '#022c22'
          ctx.beginPath()
          ctx.moveTo(sx, 16)
          ctx.quadraticCurveTo(sx + scW / 2, 16 + valanceH, sx + scW, 16)
          ctx.fill()

          ctx.strokeStyle = '#fbbf24'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(sx, 16)
          ctx.quadraticCurveTo(sx + scW / 2, 16 + valanceH, sx + scW, 16)
          ctx.stroke()
        }
        ctx.restore()
      }

      // ── 4. UPPER PARTING HEM & TRAVELING TIPS (Curtain peeling to reveal Rainbow Heart) ──
      if (p > 0.005 && p < 0.99 && drapeAlpha > 0.05) {
        ctx.save()
        ctx.globalAlpha = drapeAlpha

        const traceUpperHem = () => {
          ctx.beginPath()
          ctx.moveTo(xl, yl)
          ctx.quadraticCurveTo(cx - (cx - xl) * 0.35, yPeak, cx, yPeak)
          ctx.quadraticCurveTo(cx + (xr - cx) * 0.35, yPeak, xr, yr)
        }

        ctx.strokeStyle = 'rgba(0, 15, 8, 0.45)'
        ctx.lineWidth = 5
        traceUpperHem()
        ctx.stroke()

        ctx.strokeStyle = '#047857'
        ctx.lineWidth = 3
        traceUpperHem()
        ctx.stroke()

        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 1.6
        traceUpperHem()
        ctx.stroke()

        ctx.restore()

        // Trailing sparks along the unzipping tips
        spawnTipSparks(xr, yr, 2)
        spawnTipSparks(xl, yl, 2)
      }

      // ── 5. RENDER APEX SHOCKWAVES ──
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i]
        sw.radius += sw.growth
        sw.opacity -= sw.decay

        if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.strokeStyle = `rgba(${sw.color.r}, ${sw.color.g}, ${sw.color.b}, ${sw.opacity})`
        ctx.lineWidth = 2.4
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // ── 7. RENDER TRAILING STARDUST SPARKS ──
      for (let i = trailingSparks.length - 1; i >= 0; i--) {
        const sp = trailingSparks[i]
        sp.x += sp.vx
        sp.y += sp.vy
        sp.life -= sp.decay

        if (sp.life <= 0) {
          trailingSparks.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.fillStyle = `rgba(${sp.color.r}, ${sp.color.g}, ${sp.color.b}, ${sp.life})`
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // ── 8. RENDER DRIFTING SAKURA PETALS ──
      if (p > 0.35) {
        const petalAlpha = Math.min(1, (p - 0.35) * 2)
        driftingPetals.forEach((petal) => {
          petal.swayPhase += petal.swaySpeed
          petal.x += Math.sin(petal.swayPhase) * 0.7 + petal.vx
          petal.y += petal.vy
          petal.rot += petal.rotSpeed

          if (petal.y > height + 20) {
            petal.y = -20
            petal.x = Math.random() * width
          }

          ctx.save()
          ctx.translate(petal.x, petal.y)
          ctx.rotate(petal.rot)
          ctx.globalAlpha = petal.opacity * petalAlpha

          const s = petal.size
          const petalGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, s)
          petalGrad.addColorStop(0, '#fde2ec')
          petalGrad.addColorStop(0.65, '#f472b6')
          petalGrad.addColorStop(1, '#fda4af')

          ctx.fillStyle = petalGrad
          ctx.beginPath()
          ctx.ellipse(0, 0, s * 0.55, s, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })
      }

      // ── 9. INTERACTIVE TOUCH CUE (Before Opening) ──
      if (!isOpeningRef.current && progress === 0) {
        const pulse = 1 + 0.05 * Math.sin(now * 0.003)
        const promptY = cy + 2.538 * scale

        ctx.save()
        ctx.translate(cx, promptY)
        ctx.scale(pulse, pulse)

        const badgeW = 210
        const badgeH = 44
        const r = 22

        const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, 110)
        glow.addColorStop(0, 'rgba(251, 191, 36, 0.4)')
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(0, 0, 110, 0, Math.PI * 2)
        ctx.fill()

        const pillGrad = ctx.createLinearGradient(0, -badgeH / 2, 0, badgeH / 2)
        pillGrad.addColorStop(0, 'rgba(6, 78, 59, 0.95)')
        pillGrad.addColorStop(1, 'rgba(2, 44, 34, 0.95)')
        ctx.fillStyle = pillGrad
        ctx.beginPath()
        ctx.roundRect(-badgeW / 2, -badgeH / 2, badgeW, badgeH, r)
        ctx.fill()

        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.roundRect(-badgeW / 2, -badgeH / 2, badgeW, badgeH, r)
        ctx.stroke()

        ctx.font = '600 15px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#fef08a'
        ctx.fillText('✨ Touch to Unveil ✨', 0, 1)

        ctx.restore()
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      canvas.removeEventListener('click', triggerPeel)
      canvas.removeEventListener('pointerdown', triggerPeel)
      window.removeEventListener('pointerdown', triggerPeel)
      window.removeEventListener('click', triggerPeel)
      window.removeEventListener('resize', resize)
    }
  }, []) // Empty dependency array: NEVER re-initializes or cancels on parent re-render!

  return (
    <div
      onClick={() => {
        if (!isOpeningRef.current) {
          isOpeningRef.current = true
          openStartTsRef.current = performance.now()
          setIsOpeningState(true)
          if (onStartRef.current) onStartRef.current()
        }
      }}
      onPointerDown={() => {
        if (!isOpeningRef.current) {
          isOpeningRef.current = true
          openStartTsRef.current = performance.now()
          setIsOpeningState(true)
          if (onStartRef.current) onStartRef.current()
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        // Solid emerald before click: 100% ZERO glimpse of next page
        background: isOpeningState ? 'transparent' : '#011c15',
        pointerEvents: opened ? 'none' : 'auto',
        opacity: opened ? 0 : (fadeIn ? 1 : 0),
        transition: opened ? 'opacity 1s ease-out' : 'opacity 0.85s ease-out',
        cursor: opened ? 'default' : 'pointer',
      }}
      aria-label="Realistic Curtain Stage"
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
