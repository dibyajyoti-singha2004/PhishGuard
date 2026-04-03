import PageWrapper from "../components/common/PageWrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GetStarted() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!url) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      if (!response.ok) throw new Error("Backend Error");

      const data = await response.json();
      navigate("/result", { state: { url: url, scanData: data } });
      
    } catch (error) {
      console.error("Error scanning URL:", error);
      alert("Failed to connect. Is your FastAPI backend running on port 8000?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      {/* REMOVED: bg-gradient, min-h-[80vh], and rounded corners.
         ADDED: h-[calc(100vh-80px)] to center content perfectly in the remaining screen space.
      */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-transparent">
        
        <div className="text-center">
          
          {/* Heading - Increased size and font weight to match Pic 1 */}
          <h2 className="text-7xl font-medium mb-12 tracking-tight text-black">
            <span className="italic font-serif">Paste</span> - your link here.
          </h2>

          {/* Input box - Pure white, high contrast, wider */}
          <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-xl px-6 py-4 w-full max-w-[900px] mx-auto mb-10 border border-white/40 focus-within:border-black focus-within:shadow-2xl transition-all duration-300">
            
            {/* The Red Arrow Icon from Pic 1 */}
            <div className="bg-[#FF3B30] rounded-full h-8 w-8 flex items-center justify-center mr-3 shrink-0">
  <span className="text-white text-sm font-normal leading-none">
    →
  </span>
</div>
            
            <input
              type="text"
              placeholder="Paste link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 outline-none text-xl text-black bg-transparent placeholder-gray-400"
            />
          </div>

          {/* Button - Large pill shape */}
          <button
  onClick={handleScan}
  disabled={isLoading}
  className="bg-black text-white px-14 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 mx-auto cursor-pointer"
>
  {isLoading ? (
    "Scanning..."
  ) : (
    <>
      <span>Scrutinize</span>
      <span className="text-3xl font-bold">→</span>
    </>
  )}
</button>
        </div>
      </div>
    </PageWrapper>
  );
}
