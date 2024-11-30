"use client";
import { Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import roastData from "../assets/roast.json";

const MainRoast = () => {
  //   const roastData = JSON.parse(roastDataJson);
  const router = useRouter();

  const handleViewLink = (name: string) => {
    const url = `/roast/${encodeURIComponent(name)}`; // Construct the URL
    router.push(url); // Navigate to the constructed URL
  };

  const handleCopyLink = (name: string) => {
    const url = `${window.location.origin}/roast/${encodeURIComponent(name)}`;

    navigator.clipboard
      .writeText(url) // Copy to clipboard
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-3xl mb-4">😈 Roast someone 😈</h1>
        {/* list of links */}
        <div className="grid grid-cols-1 bg-white text-black p-2">
          {roastData.roasts.map((e, idx) => {
            return (
              <div key={idx} className="grid grid-cols-2">
                <div className="col-span-1 text-left">{e.name}</div>
                <div className="col-span-1 flex justify-end ">
                  <Copy
                    className="pr-1"
                    onClick={() => handleCopyLink(e.name)}
                  />
                  <Eye onClick={() => handleViewLink(e.name)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainRoast;
