"use client"

import { gsap }       from 'gsap'
import * as THREE     from 'three'
import { Curves }     from 'three/examples/jsm/curves/CurveExtras'
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils'

import { useEffect, useRef, useState } from 'react'


function WormholeCurved({startAnimation = false}) {
  const mountRef = useRef(null)
  const [wormholeIsAnimated, setWormholeIsAnimated] = useState(startAnimation)

  useEffect(() => {
    if (startAnimation && !wormholeIsAnimated) setWormholeIsAnimated(true)
  }, [startAnimation])

  useEffect(() => {
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const library = {
      textures: {
        wormhole: {
          galaxy: [
            new THREE.TextureLoader().load('/images/wormhole/galaxy1.jpg'),
            new THREE.TextureLoader().load('/images/wormhole/galaxy2.jpg'),
            new THREE.TextureLoader().load('/images/wormhole/galaxy3.jpg'),
            new THREE.TextureLoader().load('/images/wormhole/galaxy4.jpg'),
            new THREE.TextureLoader().load('/images/wormhole/galaxy5.jpg'),
          ],
        },
      },
    }

    const parameters = {
      camera: {
        fov:  100,
        near: 0.1,
        far:  60000,

        defaultRotation: 0.00015,
        defaultForward:  0.5,
      },
      wormhole: {
        speed: 0.00001, // speed controlled by gsap.timeline()

        wireframeStarsSpeeder: { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        auraSpeeder:           { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        nebulaSpeeder:         { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        starsSpeeder:          { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        clusterSpeeder:        { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()

        tubeSegments: 242.0,
        tubeRadius:   6,
        tubeLength:   42.0,
      },
    }

    const camera = new THREE.PerspectiveCamera(
      parameters.camera.fov,
      window.innerWidth / window.innerHeight,
      parameters.camera.near,
      parameters.camera.far,
    )
    camera.position.z = 10

    // Create the wormhole shape, assign textures to 5 different materials that we'll use
    // to stylize the wormhole
    const shape = new Curves.TorusKnot(parameters.wormhole.tubeLength)

    library.textures.wormhole.galaxy[0].wrapS = THREE.RepeatWrapping
    library.textures.wormhole.galaxy[0].wrapT = THREE.MirroredRepeatWrapping
    library.textures.wormhole.galaxy[0].repeat.set(40, 2)
    const infinityMirrorStarsSpeederMaterial = new THREE.MeshBasicMaterial({
      map: library.textures.wormhole.galaxy[0],
      transparent: false,
      opacity: parameters.wormhole.wireframeStarsSpeeder.material.opacity,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      wireframe: false,  // required to show upcoming wormhole trail
    })

    library.textures.wormhole.galaxy[1].wrapS = THREE.RepeatWrapping
    library.textures.wormhole.galaxy[1].wrapT = THREE.MirroredRepeatWrapping
    library.textures.wormhole.galaxy[1].repeat.set(1, 2)
    const yellowAuraSpeederMaterial = new THREE.MeshBasicMaterial({
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
    const sparseStarsSpeederMaterial = new THREE.MeshBasicMaterial({
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
      shape,
      parameters.wormhole.tubeSegments,
      parameters.wormhole.tubeRadius,
      parameters.wormhole.tubeSegments,
      true,
    )
    const wormholeTubeMesh = SceneUtils.createMultiMaterialObject(wormholeGeometry, [
      infinityMirrorStarsSpeederMaterial,
      yellowAuraSpeederMaterial,
      nebulaSpeederMaterial,
      sparseStarsSpeederMaterial,
      clusterSpeederMaterial,
    ])

    scene.add(wormholeTubeMesh)

    // Animate camera along the path
    let cameraPosition = 0

    const animate = () => {
      requestAnimationFrame(animate)

      cameraPosition += parameters.wormhole.speed
      if (cameraPosition > 1) cameraPosition = 0 // Reset progress to loop the animation

      const point = shape.getPointAt(cameraPosition)
      const tangent = shape.getTangentAt(cameraPosition)

      camera.position.copy(point)
      camera.lookAt(point.clone().add(tangent))

      renderer.render(scene, camera)
    }
    if (startAnimation) animate()

    // GSAP sequencing, load different materials at different times, then loop back to start
    // const wormholeTimeline = gsap.timeline({ paused: false })
    const wormholeTimeline = gsap.timeline()
    wormholeTimeline
      .to(sparseStarsSpeederMaterial,         { duration: 1.5, opacity: 0.2                      }, 0)
      .to(infinityMirrorStarsSpeederMaterial, { duration: 1.5, opacity: 0.1                      }, 0)
      .to(yellowAuraSpeederMaterial,          { duration: 4.0, opacity: 1.0,     ease: 'expo.in' }, 0)
      .to(parameters.wormhole,                { duration: 1.5, speed:   0.00085, ease: 'expo.in' }, 0)
      .to(nebulaSpeederMaterial,              { duration: 4,   opacity: 1,       ease: 'expo.in' }, 3)
      .to(yellowAuraSpeederMaterial,          { duration: 3,   opacity: 0                        }, 4)
      .to(clusterSpeederMaterial,             { duration: 2,   opacity: 1                        }, 5)
      .to(nebulaSpeederMaterial,              { duration: 2,   opacity: 0                        }, 7)
      .to(yellowAuraSpeederMaterial,          { duration: 5,   opacity: 1                        }, 7)
      .to(sparseStarsSpeederMaterial,         { duration: 3.0, opacity: 1,                       }, 9)
      .to(infinityMirrorStarsSpeederMaterial, { duration: 3.0, opacity: 1,                       }, 9)
      .to(yellowAuraSpeederMaterial,          { duration: 3.0, opacity: 1,                       }, 9)
      .to(clusterSpeederMaterial,             { duration: 3.0, opacity: 1,                       }, 9)
      .to(nebulaSpeederMaterial,              { duration: 3.0, opacity: 1,                       }, 9)
      .to(parameters.wormhole,                { duration: 1.5, speed:   0.00065                  }, 9)
      .restart(false)

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
  }, [wormholeIsAnimated])

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
}

export default WormholeCurved
