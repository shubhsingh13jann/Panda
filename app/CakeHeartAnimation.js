'use client'

import { useEffect, useRef } from 'react'

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

const HEART_BOUNDS = (() => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (let i = 0; i <= 720; i++) {
    const { x, y } = heartPoint((i / 720) * Math.PI * 2)
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  }
})()

const OVERFLOW = 180

// Generate 16 Botanical Nodes along the Heart (alternating Sakura Blossoms & Bamboo Shoots)
const BOTANICAL_NODES_CONFIG = (() => {
  const list = []
  // 8 nodes on the right lobe (ascending from t = PI towards t = 0)
  for (let i = 0; i < 8; i++) {
    const frac = (i + 1) / 9
    const t = Math.PI - frac * Math.PI
    list.push({
      id: i,
      t,
      isRight: true,
      isSakura: i % 2 === 0,
      size: i % 2 === 0 ? 11 : 14,
      baseAngle: (Math.PI / 4) + (i * 0.15),
    })
  }
  // 8 nodes on the left lobe (ascending from t = PI towards t = 2*PI)
  for (let i = 0; i < 8; i++) {
    const frac = (i + 1) / 9
    const t = Math.PI + frac * Math.PI
    list.push({
      id: i + 8,
      t,
      isRight: false,
      isSakura: i % 2 === 0,
      size: i % 2 === 0 ? 11 : 14,
      baseAngle: -(Math.PI / 4) - (i * 0.15),
    })
  }
  return list
})()

export default function CakeHeartAnimation({ scaleMultiplier = 1, started = true, style = {} }) {
  const canvasRef = useRef(null)

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
    let stageW = 0
    let stageH = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      stageW = Math.max(1, width - OVERFLOW * 2)
      stageH = Math.max(1, height - OVERFLOW * 2)

      const maxHeartHeight = stageH * 0.84
      const maxHeartWidth = Math.min(stageW * 0.90, 720)

      scale = Math.min(
        maxHeartWidth / HEART_BOUNDS.width,
        maxHeartHeight / HEART_BOUNDS.height
      ) * (scaleMultiplier || 1)

      cx = width / 2 - ((HEART_BOUNDS.minX + HEART_BOUNDS.maxX) / 2) * scale
      cy = OVERFLOW + stageH * 0.50 - ((HEART_BOUNDS.minY + HEART_BOUNDS.maxY) / 2) * scale
    }

    resize()
    window.addEventListener('resize', resize)

    // Palette: Gold Filigree, Cherry Blossom Pink & Jade Bamboo
    const GOLD = { r: 251, g: 191, b: 36 }
    const AMBER = { r: 217, g: 119, b: 6 }
    const JADE = { r: 16, g: 185, b: 129 }
    const MINT = { r: 110, g: 231, b: 183 }
    const SAKURA_PINK = { r: 244, g: 114, b: 182 }
    const SAKURA_LIGHT = { r: 253, g: 226, b: 236 }

    // Initialize Botanical Nodes
    const botanicalNodes = BOTANICAL_NODES_CONFIG.map((cfg) => ({
      ...cfg,
      bloom: 0,
      targetBloom: 0,
      flare: 0,
      swayOffset: Math.random() * Math.PI * 2,
    }))

    const DURATION = 3800 // 3.8s smooth botanical vine growth (synced with curtain)
    let startTs = 0
    let crestBloomed = false

    const vinePollen = []
    const fallingPetals = []
    const shockwaveRings = []

    // Helper: Draw Procedural 5-Petal Sakura Blossom
    const drawSakuraFlower = (x, y, size, bloomProgress, rotation = 0) => {
      if (bloomProgress <= 0.02) return
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      const s = size * Math.min(bloomProgress, 1)

      // 5 Soft Petals
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5
        ctx.save()
        ctx.rotate(angle)

        const grad = ctx.createRadialGradient(0, -s * 0.5, 0, 0, -s * 0.5, s * 0.9)
        grad.addColorStop(0, '#fde2ec')
        grad.addColorStop(0.55, '#f472b6')
        grad.addColorStop(1, '#ec4899')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.bezierCurveTo(-s * 0.42, -s * 0.45, -s * 0.42, -s * 0.95, 0, -s)
        ctx.bezierCurveTo(s * 0.42, -s * 0.95, s * 0.42, -s * 0.45, 0, 0)
        ctx.fill()
        ctx.restore()
      }

      // Golden Stamen Center
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.24, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Helper: Draw Elegant 3-Leaf Bamboo Shoot Cluster
    const drawBambooCluster = (x, y, size, bloomProgress, rotation = 0) => {
      if (bloomProgress <= 0.02) return
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      const s = size * Math.min(bloomProgress, 1)

      const leafAngles = [-0.38, 0.05, 0.48]
      const leafLens = [s * 0.85, s * 1.15, s * 0.92]

      leafAngles.forEach((a, idx) => {
        ctx.save()
        ctx.rotate(a)
        const len = leafLens[idx]
        const w = len * 0.24

        const grad = ctx.createLinearGradient(0, 0, 0, -len)
        grad.addColorStop(0, '#047857')
        grad.addColorStop(0.5, '#10b981')
        grad.addColorStop(1, '#a7f3d0')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(-w, -len * 0.48, 0, -len)
        ctx.quadraticCurveTo(w, -len * 0.48, 0, 0)
        ctx.fill()
        ctx.restore()
      })

      // Bamboo joint ring
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.16, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Helper: Spawn gentle golden pollen around growing vine tips
    const spawnPollen = (x, y, count = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 1.4 + 0.3
        vinePollen.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.3,
          size: Math.random() * 1.8 + 0.8,
          alpha: 1,
          decay: 0.02 + Math.random() * 0.015,
          color: Math.random() > 0.4 ? GOLD : SAKURA_PINK,
        })
      }
    }

    // Trigger Crowning Royal Crest & Falling Petal Rain
    const triggerRoyalCrest = (apexX, apexY) => {
      shockwaveRings.push({
        x: apexX,
        y: apexY,
        radius: 6,
        maxRadius: 200,
        growth: 4.5,
        opacity: 0.85,
        decay: 0.018,
        color: SAKURA_PINK,
      })
      shockwaveRings.push({
        x: apexX,
        y: apexY,
        radius: 12,
        maxRadius: 260,
        growth: 5.8,
        opacity: 0.75,
        decay: 0.014,
        color: GOLD,
      })

      // Spawn 24 drifting sakura petals that gently rain across the cake stage
      for (let i = 0; i < 24; i++) {
        fallingPetals.push({
          x: cx + (Math.random() - 0.5) * (stageW * 0.85),
          y: cy - (Math.random() * (stageH * 0.4)),
          vx: (Math.random() - 0.5) * 0.6,
          vy: Math.random() * 0.8 + 0.5,
          size: Math.random() * 4 + 3.5,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.03,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.02 + Math.random() * 0.015,
          opacity: Math.random() * 0.4 + 0.55,
        })
      }
    }

    const frame = (now) => {
      if (!running) return

      if (!started) {
        ctx.clearRect(0, 0, width, height)
        raf = requestAnimationFrame(frame)
        return
      }

      if (startTs === 0) startTs = now
      const elapsed = now - startTs
      const progress = Math.min(elapsed / DURATION, 1)

      // Botanical gentle breathing factor
      let breathe = 1
      if (progress >= 1) {
        breathe = 1 + 0.015 * Math.sin((elapsed - DURATION) * 0.002)
      }
      const curScale = scale * breathe

      ctx.clearRect(0, 0, width, height)

      // Trajectories:
      // Right Vine: from t = PI down to t = 0
      const tRight = Math.PI - progress * Math.PI
      // Left Vine: from t = PI up to t = 2*PI
      const tLeft = Math.PI + progress * Math.PI

      const ptRight = heartPoint(tRight)
      const ptLeft = heartPoint(tLeft)

      const rx = cx + ptRight.x * curScale
      const ry = cy + ptRight.y * curScale
      const lx = cx + ptLeft.x * curScale
      const ly = cy + ptLeft.y * curScale

      // Trigger flower blooming when growing vine tip arrives
      botanicalNodes.forEach((node) => {
        if (node.isRight) {
          if (node.t >= tRight) node.targetBloom = 1
        } else {
          if (node.t <= tLeft) node.targetBloom = 1
        }
        // Smooth bloom interpolation
        if (node.targetBloom > node.bloom) {
          node.bloom = Math.min(1, node.bloom + 0.045)
          if (node.bloom > 0.8 && node.flare === 0) {
            node.flare = 1
            spawnPollen(
              cx + heartPoint(node.t).x * curScale,
              cy + heartPoint(node.t).y * curScale,
              4
            )
          }
        }
      })

      // ── 1. DRAW GROWING ENCHANTED VINES (Gold Filigree & Jade Tendril) ──
      const STEPS = 120
      const stepsCount = Math.floor(STEPS * progress)

      if (stepsCount > 1) {
        // Pass A: Golden Filigree Main Stem
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        // Outer warm botanical glow
        ctx.lineWidth = 10 * breathe
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.22)'
        ctx.shadowColor = 'rgba(217, 119, 6, 0.65)'
        ctx.shadowBlur = 12

        // Right vine outer glow
        ctx.beginPath()
        for (let s = 0; s <= stepsCount; s++) {
          const t = Math.PI - (s / STEPS) * Math.PI
          const hp = heartPoint(t)
          const x = cx + hp.x * curScale
          const y = cy + hp.y * curScale
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Left vine outer glow
        ctx.beginPath()
        for (let s = 0; s <= stepsCount; s++) {
          const t = Math.PI + (s / STEPS) * Math.PI
          const hp = heartPoint(t)
          const x = cx + hp.x * curScale
          const y = cy + hp.y * curScale
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Mid Golden Stem
        ctx.lineWidth = 4 * breathe
        ctx.strokeStyle = '#d97706'
        ctx.shadowBlur = 0

        ctx.beginPath()
        for (let s = 0; s <= stepsCount; s++) {
          const t = Math.PI - (s / STEPS) * Math.PI
          const hp = heartPoint(t)
          const x = cx + hp.x * curScale
          const y = cy + hp.y * curScale
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        ctx.beginPath()
        for (let s = 0; s <= stepsCount; s++) {
          const t = Math.PI + (s / STEPS) * Math.PI
          const hp = heartPoint(t)
          const x = cx + hp.x * curScale
          const y = cy + hp.y * curScale
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Core Gilded Highlight
        ctx.lineWidth = 1.6 * breathe
        ctx.strokeStyle = '#fef08a'

        ctx.beginPath()
        for (let s = 0; s <= stepsCount; s++) {
          const t = Math.PI - (s / STEPS) * Math.PI
          const hp = heartPoint(t)
          const x = cx + hp.x * curScale
          const y = cy + hp.y * curScale
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        ctx.beginPath()
        for (let s = 0; s <= stepsCount; s++) {
          const t = Math.PI + (s / STEPS) * Math.PI
          const hp = heartPoint(t)
          const x = cx + hp.x * curScale
          const y = cy + hp.y * curScale
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Pass B: Emerald Bamboo Spiral Tendril
        ctx.lineWidth = 2.0 * breathe
        ctx.strokeStyle = '#10b981'

        ctx.beginPath()
        for (let s = 0; s <= stepsCount; s++) {
          const t = Math.PI - (s / STEPS) * Math.PI
          const hp = heartPoint(t)
          // gentle spiral wave offset
          const offset = Math.sin(t * 14) * 3.5
          const x = cx + hp.x * curScale + (hp.x >= 0 ? offset : -offset)
          const y = cy + hp.y * curScale
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        ctx.beginPath()
        for (let s = 0; s <= stepsCount; s++) {
          const t = Math.PI + (s / STEPS) * Math.PI
          const hp = heartPoint(t)
          const offset = Math.sin(t * 14) * 3.5
          const x = cx + hp.x * curScale + (hp.x >= 0 ? offset : -offset)
          const y = cy + hp.y * curScale
          if (s === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
        ctx.restore()
      }

      // ── 2. GROWING VINE BUDS & POLLEN SPARKLES ──
      if (progress < 1) {
        spawnPollen(rx, ry, 2)
        spawnPollen(lx, ly, 2)

        // Growing Right Sprout Bud (Golden Cherry Blossom Bud)
        ctx.save()
        const radR = ctx.createRadialGradient(rx, ry, 0, rx, ry, 22)
        radR.addColorStop(0, '#ffffff')
        radR.addColorStop(0.4, '#fbbf24')
        radR.addColorStop(1, 'rgba(217, 119, 6, 0)')
        ctx.fillStyle = radR
        ctx.beginPath()
        ctx.arc(rx, ry, 22, 0, Math.PI * 2)
        ctx.fill()
        drawSakuraFlower(rx, ry, 7, 0.7, now * 0.003)
        ctx.restore()

        // Growing Left Sprout Bud (Emerald Bamboo Leaf Bud)
        ctx.save()
        const radL = ctx.createRadialGradient(lx, ly, 0, lx, ly, 22)
        radL.addColorStop(0, '#ffffff')
        radL.addColorStop(0.4, '#34d399')
        radL.addColorStop(1, 'rgba(16, 185, 129, 0)')
        ctx.fillStyle = radL
        ctx.beginPath()
        ctx.arc(lx, ly, 22, 0, Math.PI * 2)
        ctx.fill()
        drawBambooCluster(lx, ly, 8, 0.7, -now * 0.003)
        ctx.restore()
      } else if (!crestBloomed) {
        // Vines meet at top apex: Bloom Royal Crowning Crest!
        const apexPt = heartPoint(0)
        const apexX = cx + apexPt.x * curScale
        const apexY = cy + apexPt.y * curScale
        triggerRoyalCrest(apexX, apexY)
        crestBloomed = true
      }

      // ── 3. DRAW BLOOMED BOTANICAL NODES (Sakura & Bamboo) ──
      botanicalNodes.forEach((node) => {
        if (node.bloom <= 0) return

        const hp = heartPoint(node.t)
        const nx = cx + hp.x * curScale
        const ny = cy + hp.y * curScale

        // Gentle botanical sway
        const sway = Math.sin(now * 0.0018 + node.swayOffset) * 0.08
        const finalAngle = node.baseAngle + sway

        if (node.isSakura) {
          drawSakuraFlower(nx, ny, node.size * breathe, node.bloom, finalAngle)
        } else {
          drawBambooCluster(nx, ny, node.size * breathe, node.bloom, finalAngle)
        }
      })

      // ── 4. DRAW CROWNING ROYAL SAKURA-BAMBOO CREST (At Top Apex) ──
      if (progress >= 1) {
        const apexPt = heartPoint(0)
        const apexX = cx + apexPt.x * curScale
        const apexY = cy + apexPt.y * curScale

        // Golden halo behind crest
        const halo = ctx.createRadialGradient(apexX, apexY, 0, apexX, apexY, 32 * breathe)
        halo.addColorStop(0, 'rgba(254, 240, 138, 0.85)')
        halo.addColorStop(0.5, 'rgba(251, 191, 36, 0.4)')
        halo.addColorStop(1, 'rgba(251, 191, 36, 0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(apexX, apexY, 32 * breathe, 0, Math.PI * 2)
        ctx.fill()

        // Central blooming royal sakura blossom
        drawSakuraFlower(apexX, apexY, 15 * breathe, 1, Math.sin(now * 0.0015) * 0.05)

        // Flanking bamboo shoots
        drawBambooCluster(apexX - 16 * breathe, apexY + 2, 10 * breathe, 1, -0.6)
        drawBambooCluster(apexX + 16 * breathe, apexY + 2, 10 * breathe, 1, 0.6)
      }

      // ── 5. RENDER EXPANDING APEX SHOCKWAVES ──
      for (let i = shockwaveRings.length - 1; i >= 0; i--) {
        const sw = shockwaveRings[i]
        sw.radius += sw.growth
        sw.opacity -= sw.decay

        if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
          shockwaveRings.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${sw.color.r}, ${sw.color.g}, ${sw.color.b}, ${Math.max(0, sw.opacity)})`
        ctx.lineWidth = 2.4
        ctx.shadowColor = `rgba(${sw.color.r}, ${sw.color.g}, ${sw.color.b}, 0.7)`
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.restore()
      }

      // ── 6. RENDER FLOATING GOLDEN POLLEN MOTES ──
      for (let i = vinePollen.length - 1; i >= 0; i--) {
        const p = vinePollen[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.97
        p.vy *= 0.97
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          vinePollen.splice(i, 1)
          continue
        }

        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── 7. RENDER DRIFTING SAKURA PETAL RAIN ──
      if (fallingPetals.length > 0) {
        fallingPetals.forEach((petal) => {
          petal.swayPhase += petal.swaySpeed
          petal.x += Math.sin(petal.swayPhase) * 0.75 + petal.vx
          petal.y += petal.vy
          petal.rotation += petal.rotSpeed

          // Loop petals back to top when reaching bottom
          if (petal.y > height + 20) {
            petal.y = -20
            petal.x = cx + (Math.random() - 0.5) * (stageW * 0.9)
          }

          ctx.save()
          ctx.translate(petal.x, petal.y)
          ctx.rotate(petal.rotation)
          ctx.globalAlpha = petal.opacity

          // Draw delicate single sakura petal
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

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [scaleMultiplier, started])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: `-${OVERFLOW}px`,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
