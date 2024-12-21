import React, { lazy, Suspense, useEffect } from 'react'
import './style.scss'
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Environment, Loader } from '@react-three/drei';
import GreetingCard from './components/greetingsCard/GreetingCard';
import { useInsideContext } from './context/InsideContext';

import IntroFS from './components/Intro/IntroFS'
import ScaledSnowGlobe from './models/Resized-snowglobe'

function FleetCardMain() {
  const snowCount = 20;
  const { inside, setInside } = useInsideContext();

  return (

    <Suspense fallback={<div className='h-screen w-screen bg-[var(--accent)]'></div>}>
      <div className={`canvasContainer`} style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        {!inside && Array.from({ length: snowCount }).map((_, index) => (
          <div key={index} className="snowflake"></div>
        ))}
          <IntroFS />
        <Canvas
          className='!h-screen w-screen'
          style={{
            backgroundColor: "transparent",
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          camera={{
            fov: 75,
            position: [0, 0, 5],
            near: 0.1,
            far: 1000
          }}
        >
          <OrbitControls enableZoom={false} enablePan={false}
            maxPolarAngle={Math.PI / 2 * -1}
            minPolarAngle={Math.PI / 2}
          />
          <Environment preset='studio' />
          <Float
            speed={7}
            rotationIntensity={0}
            floatIntensity={1}
            floatingRange={[-0.15, 0.15]} >
            <ScaledSnowGlobe />
          </Float>
        </Canvas>
        <Loader/>
        <GreetingCard />
        <div className='w-full absolute bottom-0 flex justify-center z-50'>
          <button onClick={() => {
            setInside(!inside);
          }} className="button" type="button">
            {inside ? "Click to Move Out" : "Click Me for a Surprise"}
            <img className="button-hat" src="https://assets.codepen.io/4175254/santa-hat-test-9.png" alt="" />
          </button>
        </div>
      </div>
    </Suspense>
  )
}

export default FleetCardMain
