'use client'
import { useMemo, useRef, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

const PARTICLE_COUNT = 1500

function getHeartPosition(t) {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t)
  return new THREE.Vector3(x, y, 0)
}

const HEART_WIDTH  = 32
const HEART_HEIGHT = 28.6

const PALETTE = [
  [0.063, 0.725, 0.506], // emerald #10b981
  [0.2, 0.85, 0.6],      // mint
  [0.98, 0.75, 0.15],    // gold #fbbf24
  [0.02, 0.59, 0.41],    // deep emerald #059669
  [0.96, 0.45, 0.71],    // blush pink
  [0.65, 0.95, 0.82],    // light sage
]

function Particles({ heartScale }) {
  const { viewport } = useThree()
  const mainRef = useRef()
  const glowRef = useRef()

  const { positions, glowPositions, targets, colors } = useMemo(() => {
    const pos = []
    const tar = []
    const col = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      const t = (i / PARTICLE_COUNT) * Math.PI * 2
      const heart = getHeartPosition(t)
      tar.push(heart.x, heart.y, heart.z)
      const c = PALETTE[i % PALETTE.length]
      col.push(c[0], c[1], c[2])
    }
    return {
      positions:     new Float32Array(pos),
      glowPositions: new Float32Array(pos),
      targets:       new Float32Array(tar),
      colors:        new Float32Array(col),
    }
  }, [])

  useFrame(({ clock }) => {
    if (!mainRef.current) return
    const time = clock.getElapsedTime()

    const maxW = (viewport.width  * 0.88) / HEART_WIDTH
    const maxH = (viewport.height * 0.85) / HEART_HEIGHT
    const effectiveScale = Math.min(heartScale, maxW, maxH)

    const pos = mainRef.current.geometry.attributes.position.array
    const col = mainRef.current.geometry.attributes.color.array

    for (let i = 0; i < pos.length; i += 3) {
      pos[i]     += (targets[i]     * effectiveScale - pos[i])     * 0.02
      pos[i + 1] += (targets[i + 1] * effectiveScale - pos[i + 1]) * 0.02
      pos[i + 2] += (targets[i + 2] * effectiveScale - pos[i + 2]) * 0.02
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const base  = PALETTE[i % PALETTE.length]
      const pulse = 0.75 + 0.25 * Math.sin(time * 1.8 + i * 0.02)
      col[i * 3]     = base[0] * pulse
      col[i * 3 + 1] = base[1] * pulse
      col[i * 3 + 2] = base[2] * pulse
    }

    mainRef.current.geometry.attributes.position.needsUpdate = true
    mainRef.current.geometry.attributes.color.needsUpdate    = true

    const pulse = 1 + Math.sin(time * 2) * 0.05
    mainRef.current.scale.setScalar(pulse)

    if (glowRef.current) {
      glowRef.current.geometry.attributes.position.array.set(pos)
      glowRef.current.geometry.attributes.position.needsUpdate = true
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <>
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={glowPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.22} color="#10b981" transparent opacity={0.05} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <points ref={mainRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions}  itemSize={3} />
          <bufferAttribute attach="attributes-color"    count={PARTICLE_COUNT} array={colors}     itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.045} vertexColors transparent opacity={0.65} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  )
}

export default function HeartParticles({ heartScale = 0.25, style = {} }) {
  const [webgl, setWebgl] = useState(null)

  useEffect(() => {
    setWebgl(hasWebGL())
  }, [])

  if (webgl !== true) return null

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      ...style,
    }}>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: false }}
        onCreated={({ gl }) => {
          if (!gl) setWebgl(false)
        }}
      >
        <Suspense fallback={null}>
          <Particles heartScale={heartScale} />
        </Suspense>
      </Canvas>
    </div>
  )
}
