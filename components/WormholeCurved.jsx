"use client"

import { useEffect, useRef } from 'react'

import * as THREE from 'three'
import { TorusKnot } from "three/examples/jsm/curves/CurveExtras"
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils'
import { gsap } from 'gsap'


function WormholeCurved({ isVisible, scrollProgress, zoomScrollSpeed }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    const library = {
      textures: {
        wormhole: {
          galaxy: [
            new THREE.TextureLoader().load('/images/wormhole/galaxy1.jpg'),
            new THREE.TextureLoader().load('/images/wormhole/galaxy2.jpg'),
            new THREE.TextureLoader().load('/images/wormhole/galaxy3.jpg'),
            new THREE.TextureLoader().load('/images/wormhole/galaxy4.jpg'),
            new THREE.TextureLoader().load('/images/wormhole/galaxy5.jpg'),
          ]
        }
      }
    }

    const parameters = {
      wormhole: {
        speed: 0.000042069,                                  // speed controlled by gsap.timeline()
        wireframeStarsSpeeder: { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        auraSpeeder: { material: { opacity: 0 } },           // opacity controlled by gsap.timeline()
        nebulaSpeeder: { material: { opacity: 0 } },         // opacity controlled by gsap.timeline()
        starsSpeeder: { material: { opacity: 0 } },          // opacity controlled by gsap.timeline()
        clusterSpeeder: { material: { opacity: 0 } },        // opacity controlled by gsap.timeline()
        tubeSegments: 500,
        tubeRadius: 5,
        tubeLength: 69,
      }
    }

    // Wormhole specific code
    const path = new THREE.CurvePath()
    path.add(new TorusKnot(parameters.wormhole.tubeLength))

    library.textures.wormhole.galaxy[0].wrapS = THREE.RepeatWrapping
    library.textures.wormhole.galaxy[0].wrapT = THREE.MirroredRepeatWrapping
    library.textures.wormhole.galaxy[0].repeat.set(40, 2)

    const wireframeStarsSpeederMaterial = new THREE.MeshBasicMaterial({
      map: library.textures.wormhole.galaxy[0],
      transparent: false,
      opacity: parameters.wormhole.wireframeStarsSpeeder.material.opacity,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      wireframe: true,
    })

    library.textures.wormhole.galaxy[1].wrapS = THREE.RepeatWrapping
    library.textures.wormhole.galaxy[1].wrapT = THREE.MirroredRepeatWrapping
    library.textures.wormhole.galaxy[1].repeat.set(1, 2)

    const auraSpeederMaterial = new THREE.MeshBasicMaterial({
      map: library.textures.wormhole.galaxy[1],
      transparent: false,
      opacity: parameters.wormhole.auraSpeeder.material.opacity,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })

    library.textures.wormhole.galaxy[2].wrapS = THREE.RepeatWrapping
    library.textures.wormhole.galaxy[2].wrapT = THREE.MirroredRepeatWrapping
    library.textures.wormhole.galaxy[2].repeat.set(20, 2)

    const nebulaSpeederMaterial = new THREE.MeshBasicMaterial({
      map: library.textures.wormhole.galaxy[2],
      transparent: false,
      opacity: parameters.wormhole.nebulaSpeeder.material.opacity,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })

    library.textures.wormhole.galaxy[3].wrapS = THREE.RepeatWrapping
    library.textures.wormhole.galaxy[3].wrapT = THREE.MirroredRepeatWrapping
    library.textures.wormhole.galaxy[3].repeat.set(10, 2)

    const starsSpeederMaterial = new THREE.MeshBasicMaterial({
      map: library.textures.wormhole.galaxy[3],
      transparent: false,
      opacity: parameters.wormhole.starsSpeeder.material.opacity,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })

    library.textures.wormhole.galaxy[4].wrapS = THREE.RepeatWrapping
    library.textures.wormhole.galaxy[4].wrapT = THREE.MirroredRepeatWrapping
    library.textures.wormhole.galaxy[4].repeat.set(20, 2)

    const clusterSpeederMaterial = new THREE.MeshBasicMaterial({
      map: library.textures.wormhole.galaxy[4],
      transparent: false,
      opacity: parameters.wormhole.clusterSpeeder.material.opacity,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })

    const wormholeGeometry = new THREE.TubeGeometry(
      path,
      parameters.wormhole.tubeSegments,
      parameters.wormhole.tubeRadius,
      parameters.wormhole.tubeSegments,
      true,
    )
    const wormholeTubeMesh = createMultiMaterialObject(wormholeGeometry, [
      wireframeStarsSpeederMaterial,
      auraSpeederMaterial,
      nebulaSpeederMaterial,
      starsSpeederMaterial,
      clusterSpeederMaterial,
    ])

    scene.add(wormholeTubeMesh)

    // Animate camera along the path
    let progress = 0

    const animate = () => {
      requestAnimationFrame(animate)

      progress += parameters.wormhole.speed
      if (progress > 1) progress = 0 // Reset progress to loop the animation

      const point = path.getPointAt(progress)
      const tangent = path.getTangentAt(progress)

      camera.position.copy(point)
      camera.lookAt(point.clone().add(tangent))

      renderer.render(scene, camera)
    }

    animate()

    // GSAP animations
    const wormholeTimeline = gsap.timeline()

    // Initial massive boost at wormhole enter
    wormholeTimeline
      .to(starsSpeederMaterial, { duration: 3, opacity: 1 }, 0)
      .to(wireframeStarsSpeederMaterial, { duration: 3, ease: 'expo.out', opacity: 1 }, 0)
      .to(auraSpeederMaterial, { duration: 3, ease: 'expo.out', opacity: 1 }, 0)
      .to(parameters.wormhole, { duration: 3, ease: 'expo.out', speed: 0.00025 }, 0)

    // Adding speed and noises
    wormholeTimeline
      .to(clusterSpeederMaterial, { duration: 1, opacity: 1 }, 3)
      .to(auraSpeederMaterial, { duration: 1, opacity: 0 }, 3)
      .to(parameters.wormhole, { duration: 1, speed: 0.0002 }, 3)

    // Adding speed and nebula distorted
    wormholeTimeline
      .to(nebulaSpeederMaterial, { duration: 1, opacity: 1 }, 7)
      .to(clusterSpeederMaterial, { duration: 1, opacity: 0 }, 7)
      .to(auraSpeederMaterial, { duration: 1, opacity: 0.7 }, 7)
      .to(parameters.wormhole, { duration: 1, speed: 0.00018 }, 7)

    // Arrival
    wormholeTimeline
      .to(nebulaSpeederMaterial, { duration: 2, opacity: 1 }, 10)
      .to(clusterSpeederMaterial, { duration: 2, opacity: 1 }, 10)
      .to(auraSpeederMaterial, { duration: 2, opacity: 1 }, 10)
      .to(parameters.wormhole, { duration: 3, speed: 0.0000069 }, 10)

    const handleResize = () => {
      const { innerWidth, innerHeight } = window

      renderer.setSize(innerWidth, innerHeight)
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
}

export default WormholeCurved
