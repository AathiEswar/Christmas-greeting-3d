import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function SnowGlobeJSX(props) {
  const { nodes, materials } = useGLTF('/src/glb/snowglobe-transformed.glb')
  const {viewport} = useThree();
  return (
    <group {...props} dispose={null} scale={viewport.width/60}>
      <mesh geometry={nodes.build_scenebuild_sceneSnow_Scene_Snow_Globe___Default1_0.geometry} material={materials.PaletteMaterial001} />
      <mesh geometry={nodes.build_scenebuild_sceneSnow_Scene_blinn1_0.geometry} material={materials.PaletteMaterial002} />
    </group>
  )
}

useGLTF.preload('/src/glb/snowglobe-transformed.glb')
