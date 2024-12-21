import { useProgress } from '@react-three/drei'
import React, { useEffect } from 'react'
import gsap from 'gsap';

function LoadingScreen() {
  const { progress } = useProgress();
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const ctx = gsap.context(() => {

      const timeline = gsap.timeline({
        defaults: { duration: 1, ease: "power3.inOut" },
      });
      const timelineText1 = gsap.timeline({
        defaults: { duration: 1, ease: "power3.inOut" }
      })
      const timelineText2 = gsap.timeline({
        defaults: { duration: 1, ease: "power3.inOut" }
      })
      const timelineText3 = gsap.timeline({
        defaults: { duration: 1, ease: "power3.inOut" }
      })
      gsap.set(".loader-text-container", {
        scale: 0.2
      })

      gsap.set('.tc1', {
        y: "33dvh"
      })
      gsap.set('.tc2', {
        y: 0,
      })
      gsap.set('.tc3', {
        y: "-33dvh"
      })
      timelineText1.to('.tc1', {
        y: 0,
        duration: 1,
        delay: 6,
      })
        .to(".tc1", {
          x: "-100dvw"
        })

      timelineText2
        .to(".tc2", {
          x: "100dvw",
          delay : 7,
        })

      timelineText3.to('.tc3', {
        y: 0,
        duration: 1,
        delay: 6,
      })
        .to('.tc3', {
          x: "-200dvw",
        })

      timeline
        .fromTo(
          ".loader-text-container",
          { opacity: 0 },
          {
            opacity: 1,
            delay: 2,
          }
        )
        .to(".loader-text-container", {
          scale: 1,
          duration: 1.5,
          delay: 2,
        });
    });

    return () => ctx.revert();
  }, []);

  return (

    <div
      className="z-30 absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-[transparent] loader-text-container pointer-events-none "
      style={{ color: "var(--accent)" }}
    >
      <div className='w-full h-full bg-[transparent] flex flex-col justify-between items-center druk-text-heavy'>
        <div className="flex justify-center items-center w-screen h-screen text-[25vw] sm:text[20dvw] md:text-[20dvw] leading-none overflow-hidden text-center text-cover tc1 bg-black">
          AATHI ESWAR
        </div>
        <div className="flex justify-center items-center w-screen h-screen text-[25vw] sm:text[20dvw] md:text-[20dvw] leading-none overflow-hidden text-center bg-black tc2 z-10">
          AATHI ESWAR
        </div>
        <div className="flex justify-center items-center w-screen h-screen text-[25vw] sm:text[20dvw] md:text-[20dvw] leading-none overflow-hidden text-center text-cover tc3 bg-black">
          AATHI ESWAR
        </div>
      </div>
    </div>

  );
};

export default LoadingScreen
