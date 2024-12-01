"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [creds, setCreds] = useState("");
  const login = () => {
    console.log("Clicked login");
    if (creds == "admin123") {
      router.push("/roast");
    }
  };
  const handleInputChange = ({ target }) => {
    setCreds(target.value);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-white">
      <div className="text-center grid grid-cols-1">
        <h1 className="text-3xl mb-4">Hi</h1>
        <input
          className="text-black py-2 text-center"
          type="text"
          value={creds}
          placeholder="username"
          onChange={handleInputChange}
        />
        <button
          onClick={login}
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Go
        </button>
      </div>
    </div>
  );
}
