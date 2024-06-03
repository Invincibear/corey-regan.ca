"use client"

import { gsap }              from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE            from 'three'
import { Curves }            from 'three/examples/jsm/curves/CurveExtras'
import { SceneUtils }        from 'three/examples/jsm/utils/SceneUtils'


function WormholeCurved() {
  const mountRef = useRef(null)

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
        speed: 0.0002, // speed controlled by gsap.timeline()

        wireframeStarsSpeeder: { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        auraSpeeder:           { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        nebulaSpeeder:         { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        starsSpeeder:          { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        clusterSpeeder:        { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()

        tubeSegments: 500,
        tubeRadius:   5,
        tubeLength:   500,
      },
    }

    const camera = new THREE.PerspectiveCamera(
      parameters.camera.fov,
      window.innerWidth / window.innerHeight,
      parameters.camera.near,
      parameters.camera.far,
    )
    camera.position.z = 5

    // Create the wormhole shape, assign textures to 5 different materials that we'll use
    // to stylize the wormhole
    const shape = new Curves.TorusKnot(parameters.wormhole.tubeLength)

    library.textures.wormhole.galaxy[0].wrapS = THREE.RepeatWrapping
    library.textures.wormhole.galaxy[0].wrapT = THREE.MirroredRepeatWrapping
    library.textures.wormhole.galaxy[0].repeat.set(40, 2)
    const wireframeStarsSpeederMaterial = new THREE.MeshBasicMaterial({
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
      shape,
      parameters.wormhole.tubeSegments,
      parameters.wormhole.tubeRadius,
      parameters.wormhole.tubeSegments,
      true,
    )
    const wormholeTubeMesh = SceneUtils.createMultiMaterialObject(wormholeGeometry, [
      wireframeStarsSpeederMaterial,
      auraSpeederMaterial,
      nebulaSpeederMaterial,
      starsSpeederMaterial,
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
    animate()

    // GSAP animations
    const wormholeTimeline = gsap.timeline()

    // All the params to play with
/*    wormholeTimeline
      .to(starsSpeederMaterial,          { duration: 3, opacity: 0 }, 0)
      .to(wireframeStarsSpeederMaterial, { duration: 3, opacity: 0 }, 0)
      .to(auraSpeederMaterial,           { duration: 3, opacity: 0 }, 0)
      .to(clusterSpeederMaterial,        { duration: 3, opacity: 0 }, 0)
      .to(nebulaSpeederMaterial,         { duration: 3, opacity: 0 }, 0)
      .to(parameters.wormhole,           { duration: 3, speed: 0.00025 }, 0)*/

    wormholeTimeline
      .to(starsSpeederMaterial, { duration: 3.5, opacity: .3 }, 0)
      .to(wireframeStarsSpeederMaterial, { duration: 3.5, ease: 'expo.out', opacity: .3 }, 0)
      .to(auraSpeederMaterial, { duration: 3.5, ease: 'expo.out', opacity: 1 }, 0)
      .to(window.wormhole, { duration: 3.5, ease: 'expo.out', speed: .00002500 }, 0)

    wormholeTimeline
      .to(clusterSpeederMaterial, { duration: 3, opacity: 1 }, 2)
    
    wormholeTimeline
      .to(auraSpeederMaterial, { duration: 1, opacity: 0 }, 3.5)
      .to(window.wormhole, { duration: 3, speed: .00002000 }, 3.5)

    wormholeTimeline
      .to(nebulaSpeederMaterial, { duration: 3, opacity: .5 }, 6.5)
      .to(clusterSpeederMaterial, { duration: 3, opacity: 0 }, 6.5)
      .to(auraSpeederMaterial, { duration: 3, opacity: 0.4 }, 6.5)
      .to(window.wormhole, { duration: 3, speed: .00001800 }, 6.5)

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
