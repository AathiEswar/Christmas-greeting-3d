import React, { useEffect, useRef, Suspense, lazy } from 'react'
import './style.scss'
import gsap from 'gsap';
const FleetLogo = lazy(() =>
  import('../../../fleet-logo/FleetLogo')
)
import AnimatedSVG from '../svgAnime/AnimatedSvg';
import { useInsideContext } from '../../context/InsideContext';
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
      gsap.fromTo(".intro-screen", { background: '#0b090a' }, {
        scale: (window.innerWidth <= 625 ? 0.4 : 0.2),
        left: window.innerWidth / 2 - introScreenRect.width * (window.innerWidth <= 625 ? 0.5 : 0.1),
        top: window.innerHeight / 2 * -1 + introScreenRect.height * (window.innerWidth <= 625 ? -5 : 0.1),
        delay: 8,
        duration: 1.5,
        ease: "power3.inOut",
        background: "transparent"
      });
    }, introRef);

    return () => ctx.revert();

  }, []);
  return (
    <Suspense fallback={<div className='h-screen w-screen bg-black'></div>}>
      <div ref={introRef} className='h-full w-full z-0'>
        <div className={`intro-screen flex items-center justify-center `} >
          <div ref={introContRef} className={`intro-container`}>
            <FleetLogo />
          </div>
          <div className="loading-page">
            {/* <div className="name-container">
            <div className="logo-name">Welcome</div>
          </div> */}
            <AnimatedSVG />
          </div>
        </div>
      </div>
    </Suspense>

  )
}

export default IntroFS
