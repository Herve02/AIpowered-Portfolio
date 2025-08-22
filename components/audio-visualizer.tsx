"use client"

import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  audioLevel: number
  isActive: boolean
  size?: number
}

export function AudioVisualizer({ audioLevel, isActive, size = 80 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const baseRadius = 20
    const maxRadius = 35

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (isActive) {
      // Draw pulsing circles based on audio level
      const currentRadius = baseRadius + audioLevel * (maxRadius - baseRadius)

      // Outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, currentRadius + 10)
      gradient.addColorStop(0, `rgba(249, 115, 22, ${0.3 + audioLevel * 0.4})`)
      gradient.addColorStop(0.7, `rgba(249, 115, 22, ${0.1 + audioLevel * 0.2})`)
      gradient.addColorStop(1, "rgba(249, 115, 22, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius + 10, 0, Math.PI * 2)
      ctx.fill()

      // Main circle
      ctx.fillStyle = `rgba(249, 115, 22, ${0.6 + audioLevel * 0.4})`
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
      ctx.fill()

      // Inner highlight
      ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + audioLevel * 0.3})`
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius * 0.6, 0, Math.PI * 2)
      ctx.fill()

      // Draw sound waves
      for (let i = 0; i < 3; i++) {
        const waveRadius = currentRadius + 15 + i * 8
        const opacity = audioLevel * 0.4 - i * 0.1

        if (opacity > 0) {
          ctx.strokeStyle = `rgba(249, 115, 22, ${opacity})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    } else {
      // Static state - simple circle
      ctx.fillStyle = "rgba(249, 115, 22, 0.3)"
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [audioLevel, isActive])

  return (
    <canvas ref={canvasRef} width={size} height={size} className="rounded-full" style={{ width: size, height: size }} />
  )
}
