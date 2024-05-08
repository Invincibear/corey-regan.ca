"use client"

import Star                  from "@/lib/starfield"
import { useRef, useEffect } from "react"
import invariant             from "tiny-invariant"

const COUNT = 800
const SPEED = 0.1

function Starfield() {
  const canvasRef    = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    invariant(canvas,    "Canvas should not be null")
    invariant(container, "Container should not be null")

    const ctx            = canvas.getContext('2d')
    const resizeObserver = new ResizeObserver(setup)
    resizeObserver.observe(container)

    const stars = Array.from({ length: COUNT }, () => new Star(0, 0, 0))
    let   rafId = 0

    function setup() {
      invariant(ctx, "Canvas context should not be null")
      rafId > 0 && cancelAnimationFrame(rafId)

      const { clientWidth: width, clientHeight: height } = container
      const dpr = window.devicePixelRatio || 1

      canvas.width        = width  * dpr
      canvas.height       = height * dpr
      canvas.style.width  = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      for (const star of stars) {
        star.x = Math.random() * width  - width  / 2
        star.y = Math.random() * height - height / 2
        star.z = 0
      }

      ctx.translate(width / 2, height / 2)
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
      ctx.strokeStyle = "white"
      rafId = requestAnimationFrame(frame)
    }

    function frame() {
      invariant(ctx, "Canvas context should not be null")
      const { clientWidth: width, clientHeight: height } = container

      ctx.fillRect(-width / 2, -height / 2, width, height)

      for (const star of stars) {
        star.update(width, height, SPEED)
        star.draw(ctx)
      }

      rafId = requestAnimationFrame(frame)
    }

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])


  return (
    <div ref={containerRef} id="starfield" className="absolute inset-0">
      <canvas ref={canvasRef} id="starfield-canvas"></canvas>
    </div>
  )
}

export default Starfield
