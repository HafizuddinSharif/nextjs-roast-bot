"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import roastData from "../../assets/roast.json";

const Roast = () => {
  const { name }: { name: string } = useParams();

  const getRoastList = roastData.roasts.find((e) => e.name === name)?.roast;

  const [roast, setRoast] = useState("");
  const [level, setLevel] = useState(1);
  const [pre, setPre] = useState(getRoastList.light.pre);

  // Reference for the text container
  const roastRef = useRef(null);
  const preRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  const generateRoast = () => {
    const main = gsap.timeline();
    main.to(roastRef.current, {
      opacity: 0,
      scale: 1,
      onComplete: () => {
        // Update the roast text
        if (level === 1) {
          setRoast(getRoastList.light.roast);
          setLevel(2);
          // setTimeout(() => setPre(getRoastList.medium.pre), 2000);
        } else if (level === 2) {
          setRoast(getRoastList.medium.roast);
          setLevel(3);
          // setTimeout(() => setPre(getRoastList.burnt.pre), 2000);
        } else if (level === 3) {
          setRoast(getRoastList.burnt.roast);
          setLevel(1);
          // setTimeout(() => setPre(""), 2000);
        }

        // Reset scale and stop shaking
        gsap.to(roastRef.current, { scale: 1.5, opacity: 1, duration: 0.3 });

        const tl = gsap.timeline();

        let spin = 0;

        while (spin < 6) {
          if (spin % 2 == 0) {
            tl.to(roastRef.current, {
              rotation: 5,
              duration: 0.1,
            });
          } else {
            tl.to(roastRef.current, {
              rotation: -5,
              duration: 0.1,
            });
          }
          spin++;
        }

        tl.to(roastRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
        });
      },
    });

    main.to(preRef.current, {
      opacity: 0,
      delay: 2,
      onComplete: () => {
        // Update the roast text
        if (level === 1) {
          setPre(getRoastList.medium.pre);
        } else if (level === 2) {
          setPre(getRoastList.burnt.pre);
        } else if (level === 3) {
          setPre("");
        }
      },
    });
    main.to(preRef.current, { opacity: 1 });
  };

  // Ensure initial setup
  useEffect(() => {
    gsap.set(roastRef.current, { opacity: 0 });
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 1 }
    );
    tl.fromTo(
      preRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5 }
    );
    tl.fromTo(
      buttonRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center text-white">
      <div className="text-center w-full mx-12">
        <h1 ref={titleRef} className="text-3xl mb-4 font-bold">
          😇 Compliments for {name} 😇
        </h1>
        <div ref={preRef} className="text-white text-lg h-10 mb-10">
          <h2>{pre}</h2>
        </div>
        <div
          ref={roastRef}
          className="rounded text-xl bg-red-600 px-10 py-3 h-18"
        >
          <h2>{roast}</h2>
        </div>
        <button
          ref={buttonRef}
          onClick={generateRoast}
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Click me
        </button>
      </div>
    </div>
  );
};

export default Roast;
