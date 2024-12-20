import React, { lazy, Suspense, useEffect } from 'react'
import './style.scss'
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Environment } from '@react-three/drei';
const IntroFS = lazy(() => import('./components/Intro/IntroFS'))
import GreetingCard from './components/greetingsCard/GreetingCard';
import { useInsideContext } from './context/InsideContext';
const ScaledSnowGlobe = lazy(() => import('./models/Resized-snowglobe'))

function FleetCardMain() {
  const snowCount = 20;
  const { inside, setInside } = useInsideContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInside(true)
    }, 10000);
    return () => clearTimeout(timeout)
  }, [])

  return (

    <Suspense fallback={<div className='h-screen w-screen bg-black'></div>}>
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
          // camera={{  position: [0, 0, 10] }}
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
            speed={5}
            rotationIntensity={0}
            floatIntensity={1}
            floatingRange={[-0.1, 0.1]} >
            <ScaledSnowGlobe />
          </Float>
        </Canvas>
        <div className='w-full absolute bottom-0 flex justify-center'>
          <button onClick={() => {
            setInside(!inside);
          }} className="button" type="button">
            {inside ? "Click to Move Out" : "Click Me for a Surprise"}
            <img className="button-hat" src="https://assets.codepen.io/4175254/santa-hat-test-9.png" alt="" />
          </button>
        </div>
        <GreetingCard />
      </div>
    </Suspense>
  )
}

export default FleetCardMain
