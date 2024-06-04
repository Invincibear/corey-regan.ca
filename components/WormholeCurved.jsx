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
        speed: 0.00095, // speed controlled by gsap.timeline()

        wireframeStarsSpeeder: { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        auraSpeeder:           { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        nebulaSpeeder:         { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        starsSpeeder:          { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()
        clusterSpeeder:        { material: { opacity: 0 } }, // opacity controlled by gsap.timeline()

        tubeSegments: 420,
        tubeRadius:   50,
        tubeLength:   420,
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
      .to(starsSpeederMaterial,          { duration: 3.5, opacity: 0.3 },                       0)
      .to(wireframeStarsSpeederMaterial, { duration: 3.5, opacity: 0.2,     ease: 'expo.out' }, 0)
      .to(auraSpeederMaterial,           { duration: 3.5, opacity: 1,       ease: 'expo.out' }, 0)
      .to(window.wormhole,               { duration: 3.5, speed:   0.00085, ease: 'expo.out' }, 0)

    wormholeTimeline
      .to(clusterSpeederMaterial, { duration: 3, opacity: 1 }, 2)

    wormholeTimeline
      .to(auraSpeederMaterial, { duration: 1, opacity: 0.1    }, 3)
      .to(window.wormhole,     { duration: 3, speed:   0.0008 }, 3)

    wormholeTimeline
      .to(nebulaSpeederMaterial,  { duration: 3, opacity: 1      }, 6)
      .to(clusterSpeederMaterial, { duration: 3, opacity: 0      }, 6)
      .to(auraSpeederMaterial,    { duration: 3, opacity: 0.1    }, 6)
      .to(window.wormhole,        { duration: 3, speed:   0.0007 }, 6)

    wormholeTimeline
      .to(starsSpeederMaterial,          { duration: 3, opacity: 1       }, 10)
      .to(wireframeStarsSpeederMaterial, { duration: 3, opacity: 1       }, 10)
      .to(auraSpeederMaterial,           { duration: 3, opacity: 1       }, 10)
      .to(clusterSpeederMaterial,        { duration: 3, opacity: 1       }, 10)
      .to(nebulaSpeederMaterial,         { duration: 3, opacity: 1       }, 10)
      .to(window.wormhole,               { duration: 3, speed:   0.00065 }, 10)

    wormholeTimeline
      .to(starsSpeederMaterial,          { duration: 3, opacity: 0.3     }, 15)
      .to(wireframeStarsSpeederMaterial, { duration: 3, opacity: 0.2     }, 15)
      .to(auraSpeederMaterial,           { duration: 3, opacity: 1       }, 15)
      .to(clusterSpeederMaterial,        { duration: 3, opacity: 0       }, 15)
      .to(nebulaSpeederMaterial,         { duration: 3, opacity: 0       }, 15)
      .to(window.wormhole,               { duration: 3, speed:   0.00065 }, 15)

    wormholeTimeline
      .to(clusterSpeederMaterial, { duration: 3, opacity: 1 }, 17)

    wormholeTimeline
      .to(auraSpeederMaterial, { duration: 1, opacity: 0.1    }, 20)
      .to(window.wormhole,     { duration: 3, speed:   0.0007 }, 20)

    wormholeTimeline
      .to(nebulaSpeederMaterial,  { duration: 3, opacity: 1      }, 23)
      .to(clusterSpeederMaterial, { duration: 3, opacity: 0      }, 23)
      .to(auraSpeederMaterial,    { duration: 3, opacity: 0.1    }, 23)
      .to(window.wormhole,        { duration: 3, speed:   0.0006 }, 23)

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
