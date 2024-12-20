import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { useInsideContext } from '../../context/InsideContext';
function GreetingCard(props) {
	const cardRef = useRef(null)
	const { inside } = useInsideContext();
	useEffect(() => {
		const timeOut = setTimeout(() => {
			gsap.to(cardRef.current, {
				duration: 0.5,
				opacity: (inside ? 1 : 0),
				ease: "power2.out",
			});
		}, 500)

		return () => clearTimeout(timeOut);
	}, [inside]);
	return (
		<div ref={cardRef}  style={{ pointerEvents: "none" }}
			className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white opacity-0
			text-[60px] sm:text-[100px] md:text-[120px]	lg:text-[150px] font-bold text-center font-["Dancing"] christmas-text`}>
			HAPPY HOLIDAYS
		</div>
	)
}

export default GreetingCard
