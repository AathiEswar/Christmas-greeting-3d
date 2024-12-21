import React, { useEffect, useRef, Suspense, lazy } from 'react'
import './style.scss'
import gsap from 'gsap';
const FleetLogo = lazy(() =>
  import('../../../fleet-logo/FleetLogo')
)
import AnimatedSVG from '../svgAnime/AnimatedSvg';
import { useInsideContext } from '../../context/InsideContext';
import LoadingScreen from '../loader/LoadingScreen';
function IntroFS(props) {

  const { inside } = useInsideContext();

  const introRef = useRef();
  const introContRef = useRef();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      gsap.to(introRef.current, {
        duration: 0.5,
        opacity: (inside ? 0 : 1),
        ease: "power2.out",
      });
    }, 500)

    return () => clearTimeout(timeOut);
  }, [inside]);

  useEffect(() => {
    const introScreenRect = introContRef.current.getBoundingClientRect();

    let ctx = gsap.context(() => {
      gsap.to(
        ".loading-page",
        {
          opacity: 0,
          display: "none",
          duration: 2.5,
          delay: 11,
        }
      );
      gsap.to(
        ".intro-container",{
          backgroundColor : 'transparent',
          delay : 7
        }
      )
    }, introRef);

    return () => ctx.revert();

  }, []);
  return (
    <Suspense fallback={<div className='h-screen w-screen'></div>}>
      <div ref={introRef} className='h-full w-full z-0' style={{pointerEvents : "none"}}>
      <div className={`intro-screen flex items-center justify-center`} >
          <div className="loading-page z-40">
            {/* <div className="name-container">
            <div className="logo-name">Welcome</div>
          </div> */}
            <AnimatedSVG />
          </div>
          <div ref={introContRef} className={`intro-container bg-black`}>
            {/* <FleetLogo /> */}
            <LoadingScreen/>
          </div>
        </div>
      </div>
    </Suspense>

  )
}

export default IntroFS
