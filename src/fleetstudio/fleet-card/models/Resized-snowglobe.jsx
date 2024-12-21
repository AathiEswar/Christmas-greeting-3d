import React, { useRef, useState, useMemo, useLayoutEffect, useEffect } from 'react'
import { MeshTransmissionMaterial, useGLTF, useTexture } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { easing } from 'maath'
import { useInsideContext } from '../context/InsideContext'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)

export default function ScaledSnowGlobe(props) {
  const { nodes, materials } = useGLTF('/glb/resized-snowglobe.gltf')
  const { inside } = useInsideContext();
  const snowGlobeRef = useRef()
  const snowGlobeRef2 = useRef()
  const internalWorldRef = useRef()
  const [insideMesh, setInsideMesh] = useState(false)

  const texture = useTexture('/assets/svg/christmas3.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 1);

  const { camera } = useThree()
  const cameraPosition = camera.position
  const ray = new THREE.Ray(new THREE.Vector2(0, 0), cameraPosition)
  const raycaster = new THREE.Raycaster()

  function useGsapContext(scope) {
    const ctx = useMemo(() => gsap.context(() => { }, scope), [scope])
    return ctx
  }

  const ctx = useGsapContext(snowGlobeRef)

  useGSAP(() => {
    gsap.to(camera.position, {
      z: inside ? 0.1 : 3,
      x: inside ? 0 : 3,
      ease: 'power3.inOut',
      duration: 1
    })
    return () => ctx.revert()
  }, [inside])



  useFrame((state, delta) => {
    checkIntersection(snowGlobeRef.current, delta)
    snowGlobeRef2.current.rotation.y += 0.01
  })

  const checkIntersection = (object, delta) => {
    raycaster.set(cameraPosition, ray.direction)

    const intersections = raycaster.intersectObject(object)

    if (intersections.length > 0) {
      setInsideMesh(false)
    } else {
      setInsideMesh(true)
    }
    easing.damp(internalWorldRef.current.material.color, intersections.length > 0 ? 'grey' : 'white', 0.25, delta)
  }

  useEffect(() => {
    if (!insideMesh) {
      snowGlobeRef2.current.visible = false
      snowGlobeRef.current.visible = false
      internalWorldRef.current.visible = true
      camera.fov = 95
      camera.updateProjectionMatrix()
    } else {
      camera.fov = 65
      camera.updateProjectionMatrix()
      snowGlobeRef2.current.visible = true
      snowGlobeRef.current.visible = true
      internalWorldRef.current.visible = false
    }
  }, [insideMesh])

  return (
    <group {...props} dispose={null} position={[0, -1, 0]}>
      <mesh ref={snowGlobeRef} geometry={nodes.build_scenebuild_sceneSnow_Scene_Snow_Globe___Default1_0.geometry} material={materials.PaletteMaterial001} scale={0.08} >
        <MeshTransmissionMaterial
          thickness={0.9}
          anisotropicBlur={0.8}
          ior={1.8}
          metalness={0.3}
        />
      </mesh>
      <mesh ref={internalWorldRef} position={[0, 0, 0]}>
        <sphereGeometry args={[12.5, 24, 24]} />
        <meshStandardMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh ref={snowGlobeRef2} geometry={nodes.build_scenebuild_sceneSnow_Scene_blinn1_0.geometry} material={materials.PaletteMaterial002} scale={0.08} >
        <meshPhysicalMaterial metalness={0.2} roughness={0.2} color={'white'} envMapIntensity={2} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/glb/resized-snowglobe.gltf')
