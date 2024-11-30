"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [roast, setRoast] = useState("Prepare to get buried...");
  const [level, setLevel] = useState(1);

  // Reference for the text container
  const roastRef = useRef(null);

  const generateRoast = () => {
    gsap.to(roastRef.current, {
      opacity: 0,
      scale: 1,
      onComplete: () => {
        // Update the roast text
        if (level === 1) {
          setRoast("Your mom is so fat, that Dora couldn't explore her.");
          setLevel(2);
        } else if (level === 2) {
          setRoast("Bro you can't even count.");
          setLevel(3);
        } else if (level === 3) {
          setRoast("Mak kau hijau");
          setLevel(1);
        }

        // Reset scale and stop shaking
        gsap.to(roastRef.current, { scale: 1.5, opacity: 1, duration: 0.3 });

        let tl = gsap.timeline();

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
  };

  // Ensure initial setup
  useEffect(() => {
    gsap.fromTo(
      roastRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-3xl mb-4">Roast Me 🔥🔥🔥</h1>
        <div ref={roastRef} className="rounded bg-red-600 px-10 py-3">
          <h2>{roast}</h2>
        </div>
        <button
          onClick={generateRoast}
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Give me something
        </button>
      </div>
    </div>
  );
}
