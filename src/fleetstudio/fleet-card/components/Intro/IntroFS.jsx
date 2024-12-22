import React, { useEffect, useRef } from 'react'
import './style.scss'
import gsap from 'gsap';
import { useInsideContext } from '../../context/InsideContext';
import LoadingScreen from '../loader/LoadingScreen';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP)
function IntroFS() {

  const { inside } = useInsideContext();

  const introRef = useRef();
  const introContRef = useRef();

  const paths = [
    "M1885 2958 l-200 -100 195 -99 c107 -54 202 -98 210 -98 16 -1 400 191 400 200 0 5 -391 199 -400 198 -3 0 -95 -45 -205 -101z",
    "M1430 2731 l-195 -99 205 -102 204 -102 204 103 203 104 -198 97 c-109 54 -205 97 -213 97 -8 0 -103 -44 -210 -98z",
    "M2331 2731 l-193 -97 206 -102 207 -102 202 101 202 101 -195 99 c-107 54 -204 98 -215 98 -11 0 -107 -44 -214 -98z",
    "M985 2508 l-200 -100 195 -99 c107 -54 200 -98 207 -98 15 -1 403 191 403 198 0 5 -375 191 -399 198 -3 1 -96 -43 -206 -99z",
    "M1893 2512 c-106 -53 -193 -100 -193 -104 0 -10 382 -198 401 -197 8 0 102 44 209 98 l195 99 -203 101 c-111 55 -205 101 -209 100 -5 0 -95 -44 -200 -97z",
    "M2795 2508 l-200 -101 203 -101 202 -101 202 101 203 101 -202 102 c-112 55 -204 101 -205 100 -2 0 -93 -45 -203 -101z",
    "M1430 2280 l-195 -98 208 -101 208 -101 202 101 202 101 -195 99 c-107 54 -204 98 -215 98 -11 0 -108 -44 -215 -99z",
    "M2345 2284 c-104 -53 -192 -98 -194 -100 -2 -1 87 -48 198 -103 l201 -101 202 101 203 101 -195 99 c-107 54 -202 98 -210 98 -8 1 -100 -42 -205 -95z",
    "M760 2137 l0 -222 205 -103 205 -102 0 228 0 228 -197 97 c-109 54 -201 97 -205 97 -5 0 -8 -100 -8 -223z",
    "M3223 2257 l-203 -102 0 -222 c0 -123 2 -223 5 -223 3 0 95 45 205 100 l200 100 0 225 c0 124 -1 225 -2 224 -2 0 -94 -46 -205 -102z",
    "M1895 2058 l-200 -101 203 -101 202 -101 202 101 203 101 -202 102 c-112 55 -204 101 -205 100 -2 0 -93 -45 -203 -101z",
    "M1210 1916 l0 -224 178 -87 c97 -49 189 -94 205 -102 l27 -14 0 226 0 225 -200 100 c-110 55 -202 100 -205 100 -3 0 -5 -101 -5 -224z",
    "M2768 2029 l-198 -99 0 -225 0 -225 205 102 205 103 0 222 c0 123 -3 223 -7 222 -5 0 -97 -45 -205 -100z",
    "M1670 1687 l0 -222 205 -103 205 -102 0 225 0 225 -200 100 c-110 55 -202 100 -205 100 -3 0 -5 -100 -5 -223z",
    "M2315 1812 l-190 -97 -3 -222 c-1 -146 1 -223 8 -223 5 0 98 44 205 97 l195 98 0 222 c0 172 -3 223 -12 223 -7 -1 -98 -44 -203 -98z",
    "M760 1637 l0 -222 205 -103 205 -102 0 225 0 225 -200 100 c-110 55 -202 100 -205 100 -3 0 -5 -100 -5 -223z",
    "M3218 1759 l-198 -99 0 -225 0 -225 205 102 205 103 0 222 c0 123 -3 223 -7 222 -5 0 -97 -45 -205 -100z",
    "M2773 1537 l-203 -102 0 -223 c0 -174 3 -223 13 -220 6 2 99 47 205 101 l192 97 0 225 c0 124 -1 225 -2 224 -2 0 -94 -46 -205 -102z",
    "M1210 1410 l0 -220 200 -100 c110 -55 202 -100 205 -100 3 0 5 101 5 225 l0 225 -196 95 c-108 52 -201 95 -205 95 -5 0 -9 -99 -9 -220z",
    "M1670 1185 l0 -225 200 -100 c110 -55 202 -100 205 -100 3 0 5 101 5 225 l0 225 -200 100 c-110 55 -202 100 -205 100 -3 0 -5 -101 -5 -225z",
    "M2318 1309 l-198 -99 0 -226 c0 -124 3 -223 8 -221 4 3 96 48 205 101 l197 100 0 222 c0 123 -3 223 -7 222 -5 0 -97 -45 -205 -100z",
    "M760 1137 l0 -222 205 -103 205 -102 0 225 0 225 -200 100 c-110 55 -202 100 -205 100 -3 0 -5 -100 -5 -223z",
    "M3218 1259 l-198 -99 0 -225 0 -225 205 102 205 103 0 222 c0 123 -3 223 -7 222 -5 0 -97 -45 -205 -100z",
    "M2773 1036 l-203 -101 0 -222 c0 -123 2 -223 4 -223 9 0 390 190 398 198 5 5 7 108 6 229 l-3 220 -202 -101z",
    "M1210 910 l0 -220 200 -100 c110 -55 202 -100 205 -100 3 0 5 100 5 223 l0 222 -195 98 c-107 53 -200 97 -205 97 -6 0 -10 -81 -10 -220z",
    "M1670 685 l0 -225 200 -100 c110 -55 202 -100 205 -100 3 0 5 101 5 225 l0 225 -200 100 c-110 55 -202 100 -205 100 -3 0 -5 -101 -5 -225z",
    "M2318 809 l-198 -99 0 -226 c0 -124 3 -223 8 -221 4 3 96 48 205 101 l197 96 0 225 c0 124 -3 225 -7 224 -5 0 -97 -45 -205 -100z",
  ];
  const directions = [
    { x: 500, y: 0 },
    { x: -500, y: 0 },
    { x: 0, y: 500 },
    { x: 0, y: -500 },
  ];


  useGSAP(() => {
    const timeOut = setTimeout(() => {
      gsap.to(introRef.current, {
        duration: 0.5,
        opacity: (inside ? 0 : 1),
        ease: "power2.out",
      });
    }, 500)

    return () => clearTimeout(timeOut);
  }, [inside]);

  useGSAP(() => {
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
        ".intro-container", {
        backgroundColor: 'transparent',
        delay: 8
      }
      )
    }, introRef);

    const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    gsap.set("#svg path", {
      opacity: 0,
      x: -500,
    });
    timeline
      .to(
        "#svg path",
        {
          opacity: 1,
          x: 10,
          stagger: 0.05,
          duration: 1,
        }
      )
      .to(
        "#svg path",
        {
          x: (index) => directions[index % directions.length].x,
          y: (index) => directions[index % directions.length].y,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
        },
        "+=0.5"
      );

    return () => {
      ctx.revert()
      timeline.kill();
    };

  }, []);
  return (
    <div ref={introRef} className='h-full w-full z-0' style={{ pointerEvents: "none" }}>
      <div className={`intro-screen flex items-center justify-center`} >
        <div className="loading-page z-40">
          <svg
            id="svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 450.000000 350.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform="translate(25.000000,343.000000) scale(0.100000,-0.100000)">
              {paths.map((d, index) => (
                <path
                  key={index}
                  d={d}
                  stroke="#419ccb"
                  fill="black"
                />
              ))}
            </g>
          </svg>
        </div>
        <div ref={introContRef} className={`intro-container bg-black`}>
          <LoadingScreen />
        </div>
      </div>
    </div>
  )
}

export default IntroFS
