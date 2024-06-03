import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {ImprovedNoise} from "three/addons/math/ImprovedNoise";

function Wormhole({ isVisible, scrollProgress, zoomScrollSpeed }) {
  const mountRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const zoomSpeedRef = useRef(zoomScrollSpeed); // Use ref to track zoom speed

  // Camera movement sequence
  const zoomStartPosition  = 90
  const zoomEndPosition    = 5    // Closer to the wormhole
  // const zoomSpeed       = .3   // Was used for manual test animation
  // const zoomScrollSpeed = 3.69 // Speed of scroll-linked zoom

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0.5, 0.5, 90); // Initial position
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Animation or scroll event handler
    const updateCameraPosition = () => {
      if (cameraRef.current) {
        cameraRef.current.position.z = 90 - (85 * scrollProgress.get() * zoomSpeedRef.current); // Adjust formula as needed
      }
    };

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
    scene.add(points)

    // Animation
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      /*!// Rotate the wormhole
      if (isVisible) points.rotation.y += 0.005

      // Perform zoom by moving camera closer
      if (isVisible && camera.position.z > zoomEnd) camera.position.z -= zoomSpeed*/

      // Dynamic zoom based on scroll progress
      if (isVisible) camera.position.z = zoomStartPosition

      rendererRef.current.render(scene, camera)
    }
    animate()

    // scrollProgress.on("change", updateCameraPosition); // Assuming scrollProgress has an onChange method

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []); // Setup only once



  useEffect(() => {
    // Animation or scroll event handler
    const updateCameraPosition = () => {
      if (cameraRef.current) {
        cameraRef.current.position.z = 90 - (85 * scrollProgress.get() * zoomSpeedRef.current); // Adjust formula as needed
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      if (isVisible && cameraRef.current) {
        // Use zoomSpeedRef.current in your calculations to apply changes
        cameraRef.current.position.z = zoomStartPosition
          - (zoomStartPosition - zoomEndPosition)
          * scrollProgress.get()
          * zoomSpeedRef.current
      }
    };
    animate();
    scrollProgress.on("change", updateCameraPosition); // Assuming scrollProgress has an onChange method
  }, []);  // Run this when visibility changes, but it doesn't need to re-run for zoom speed changes


  // Handles changes to scroll speed
  useEffect(() => {
    zoomSpeedRef.current = zoomScrollSpeed; // Update ref whenever zoom speed changes
    console.debug("new zoom scroll speed useEffect")
  }, [zoomScrollSpeed]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
}

export default Wormhole
