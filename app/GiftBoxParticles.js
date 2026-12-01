'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 1500
const HEART_WIDTH = 32
const HEART_HEIGHT = 28.6

function Particles({ heartScale }) {
  const { viewport } = useThree()
  const mesh = useRef()
  const glow = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)

    const spreadX = viewport.width / 2
    const spreadY = viewport.height / 2

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const edge = Math.floor(Math.random() * 4)

      let x
      let y

      if (edge === 0) {
        x = -spreadX
        y = (Math.random() - 0.5) * spreadY
      } else if (edge === 1) {
        x = spreadX
        y = (Math.random() - 0.5) * spreadY
      } else if (edge === 2) {
        x = (Math.random() - 0.5) * spreadX
        y = spreadY
      } else {
        x = (Math.random() - 0.5) * spreadX
        y = -spreadY
      }

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2
    }

    return pos
  }, [viewport.height, viewport.width])

  const glowPositions = useMemo(() => new Float32Array(positions), [positions])

  useFrame((state) => {
    if (!mesh.current || !glow.current) return

    const time = state.clock.getElapsedTime()
    const geometry = mesh.current.geometry
    const pos = geometry.attributes.position.array
    const glowPos = glow.current.geometry.attributes.position.array

    const duration = 15
    const delay = 0.5
    const raw = (time - delay) / duration
    const clamped = Math.min(Math.max(raw, 0), 1)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const progress = easeOutCubic(clamped)
    const visibleCount = Math.floor(progress * PARTICLE_COUNT)
    const maxW = (viewport.width * 0.9) / HEART_WIDTH
    const maxH = (viewport.height * 0.82) / HEART_HEIGHT
    const effectiveScale = Math.min(heartScale, maxW, maxH)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const index = i * 3

      if (i > visibleCount) {
        pos[index + 2] = 5
        glowPos[index + 2] = 5
        continue
      }

      const t = (i / PARTICLE_COUNT) * Math.PI * 2

      const x = 16 * Math.pow(Math.sin(t), 3)
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)

      const targetX = x * effectiveScale
      const targetY = y * effectiveScale
      const factor = 0.08

      pos[index] += (targetX - pos[index]) * factor
      pos[index + 1] += (targetY - pos[index + 1]) * factor
      pos[index + 2] = 0

      glowPos[index] += (targetX - glowPos[index]) * (factor * 0.75)
      glowPos[index + 1] += (targetY - glowPos[index + 1]) * (factor * 0.75)
      glowPos[index + 2] = 0

      if (progress === 1) {
        pos[index] = targetX
        pos[index + 1] = targetY
        glowPos[index] = targetX
        glowPos[index + 1] = targetY
      }
    }

    geometry.attributes.position.needsUpdate = true
    glow.current.geometry.attributes.position.needsUpdate = true

    if (progress === 1) {
      const pulse = 1 + Math.sin(time * 2) * 0.05
      mesh.current.scale.setScalar(pulse)
      glow.current.scale.setScalar(pulse)
    }
  })

  return (
    <>
      <points ref={glow}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={glowPositions.length / 3}
            array={glowPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#10b981"
          transparent
          opacity={0.28}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.05}
          color="#34d399"
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

export default function GiftBoxParticles({ heartScale = 0.1, style = {} }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <Particles heartScale={heartScale} />
        </Suspense>
      </Canvas>
    </div>
  )
}
