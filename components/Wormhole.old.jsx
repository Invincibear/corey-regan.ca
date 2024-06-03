"use client"

import { useEffect, useRef } from "react"
import * as THREE            from "three"
import { ImprovedNoise }     from "three/addons/math/ImprovedNoise.js"
// import { OrbitControls }  from "three/addons/controls/OrbitControls.js"


// https://www.youtube.com/watch?v=Il_GKGFggWY
// https://github.com/bobbyroe/wormhole-effect
export default function Wormhole(
  {
    isVisible       = false,
    scrollProgress,
    zoomScrollSpeed = 0.3,
  }
) {
  const mountRef     = useRef(null)
  const cameraRef    = useRef(null)
  // const constrolsRef = useRef(null)
  const rendererRef  = useRef(null)
  const sceneRef     = useRef(null)
  const zoomSpeedRef = useRef(zoomScrollSpeed)

  // Camera movement sequence
  const zoomStartPosition  = 90
  const zoomEndPosition    = 5    // Closer to the wormhole
  // const zoomSpeed       = .3   // Was used for manual test animation
  // const zoomScrollSpeed = 3.69 // Speed of scroll-linked zoom

  useEffect(() => {
    // Canvas dimensions
    const width  = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight


    if (!rendererRef.current) {  // Only initialize once
      // Renderer
      const renderer = new THREE.WebGLRenderer({antialias: true})
      renderer.setSize(width, height)
      mountRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Scene
      const scene      = new THREE.Scene()
      scene.fog        = new THREE.FogExp2(0x000000, 0.025)
      sceneRef.current = scene

      // Camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000)
      camera.position.set(0.5, 0.5, zoomStartPosition)
      cameraRef.current = camera

      // Controls
      // const controls = new OrbitControls(camera, renderer.domElement)
      // controls.update()
      // controlsRef.current = controls
    }

    // Wormhole Geometry and Materials
    const radius     = 3
    const tubeLength = 200
    const tubeGeo    = new THREE.CylinderGeometry(radius, radius, tubeLength, 128, 4096, true)
    const tubeVerts  = tubeGeo.attributes.position
    const colors     = []

    const noise        = new ImprovedNoise()
    const noiseFreq    = .69 // how not-straight are the lines
    const noiseAmp     = 0.3 // how tall are the ripples
    const color        = new THREE.Color()
    const hueNoiseFreq = 0.005

    for (let i = 0; i < tubeVerts.count; i++) {
      let p           = new THREE.Vector3().fromBufferAttribute(tubeVerts, i)
      let v3          = p.clone()
      let vertexNoise = noise.noise(
        v3.x * noiseFreq,
        v3.y * noiseFreq,
        v3.z,
      )

      v3.addScaledVector(p, vertexNoise * noiseAmp)
      tubeVerts.setXYZ(i, v3.x, p.y, v3.z)

      let colorNoise = noise.noise(v3.x * hueNoiseFreq, v3.y * hueNoiseFreq, i * 0.001 * hueNoiseFreq)

      color.setHSL(0.5 - colorNoise, 1, 0.5);
      colors.push(color.r, color.g, color.b);
    }

    tubeGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    const mat    = new THREE.PointsMaterial({ size: 0.03, vertexColors: true })
    const points = new THREE.Points(tubeGeo, mat)

    points.rotation.x = Math.PI * 0.5
    sceneRef.current.add(points)

    // Animation
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      /*// Rotate the wormhole
      if (isVisible) points.rotation.y += 0.005

      // Perform zoom by moving camera closer
      if (isVisible && camera.position.z > zoomEnd) camera.position.z -= zoomSpeed*/

      // Dynamic zoom based on scroll progress
      if (isVisible) {
/*        cameraRef.current.position.z =
          zoomStartPosition
          - (zoomStartPosition - zoomEndPosition)
          * scrollProgress.get()
          * zoomScrollSpeed*/
        cameraRef.current.position.z =
          zoomStartPosition
          - (zoomStartPosition - zoomEndPosition)
          * scrollProgress.get()
          * zoomScrollSpeed
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }
    animate()

    // Handle Resize
    const handleResize = () => {
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()

      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      // if (mountRef.current && rendererRef.current) mountRef.current.removeChild(rendererRef.current.domElement)  // throws all kinds of errors
    }
  }, [isVisible, scrollProgress, zoomScrollSpeed])

  // commenting this out improves responsiveness, is it useless?
/*  useEffect(() => {
    const handleScroll = () => {
      if (cameraRef.current) {
        // const zoomStartPosition = 15
        // const zoomEndPosition   = 5

        cameraRef.current.position.z =
          zoomStartPosition
          - (zoomStartPosition - zoomEndPosition)
          * scrollProgress.get()
          * zoomScrollSpeed
      }
    }

    scrollProgress.on("change", handleScroll)

    return () => scrollProgress.on("change", () => {})
  }, [scrollProgress, zoomScrollSpeed])*/

  // return <div ref={mountRef} id="wormhole" className="min-w-full h-svh" />
  return <div ref={mountRef} id="wormhole" className="min-w-full h-full" />
}
