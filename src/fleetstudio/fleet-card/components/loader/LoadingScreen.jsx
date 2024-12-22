import React, { useEffect } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

function LoadingScreen() {

  useGSAP(() => {
    const ctx = gsap.context(() => {

      const timeLineDefaults = { duration: 1, ease: "power3.inOut" }

      const timeline = gsap.timeline({
        defaults: timeLineDefaults,
      });
      const timelineText1 = gsap.timeline({
        defaults: timeLineDefaults,
      })
      const timelineText2 = gsap.timeline({
        defaults: timeLineDefaults,
      })
      const timelineText3 = gsap.timeline({
        defaults: timeLineDefaults,
      })

      gsap.set(".loader-text-container", { scale: 0.2 })
      gsap.set('.tc1-text', { y: "33dvh" })
      gsap.set('.tc2', { y: 0, })
      gsap.set('.tc3-text', { y: "-33dvh" })


      timelineText1.to('.tc1-text', {
        y: 0,
        delay: 6,
      })
        .to(".tc1", {
          x: "-100dvw",
          delay: 0.5,
        })

      timelineText2
        .to(".tc2", {
          x: "100dvw",
          delay: 7.5,
        })

      timelineText3.to('.tc3-text', {
        y: 0,
        delay: 6,
      })
        .to('.tc3', {
          x: "-200dvw",
          delay: 0.5,
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
        <div className="z-10 flex justify-center items-center w-screen h-screen text-[25vw] sm:text[20dvw] md:text-[15dvw] leading-none text-center text-cover tc1 bg-black">
          <p className='tc1-text z-10 w-full h-full'>
            AATHI ESWAR
          </p>
        </div>
        <div className="z-0 flex justify-center items-center w-screen h-screen text-[25vw] sm:text[20dvw] md:text-[15dvw] leading-none  text-center bg-black tc2">
          <p className='z-0 tc2-text  w-full h-full'>
            AATHI ESWAR
          </p>
        </div>
        <div className="z-10 flex justify-center items-center w-screen h-screen text-[25vw] sm:text[20dvw] md:text-[15dvw] leading-none text-center text-cover tc3 bg-black">
          <p className='z-10 tc3-text  w-full h-full'>
            AATHI ESWAR
          </p>
        </div>
      </div>
    </div>

  );
};

export default LoadingScreen
