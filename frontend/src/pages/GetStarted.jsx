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
      const response = await fetch("https://phishguard-8ybg.onrender.com/api/scan", {
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
      alert("Failed to connect to backend server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full font-[NeueHelvetica]">
        
        <div className="text-center">

          {/* Heading */}
          <h2 className="text-6xl md:text-7xl font-medium mb-12 tracking-tight text-black leading-[100%]">
            <span
              className="italic font-normal"
              style={{ fontFamily: "EditorialNewItalic" }}
            >
              Paste
            </span>{" "}
            <span className="font-[NeueHelvetica]">
              - your link here.
            </span>
          </h2>

          {/* Input */}
          <div className="flex items-center bg-white/80 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] px-6 py-4 w-full max-w-[900px] mx-auto mb-10 border border-white/40 focus-within:border-black focus-within:shadow-2xl transition-all duration-300">
            
            <div className="bg-[#FF3B30] rounded-full h-8 w-8 flex items-center justify-center mr-3 shrink-0">
              <span className="text-white text-sm">→</span>
            </div>

            <input
              type="text"
              placeholder="Paste link here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleScan()}
              className="flex-1 outline-none text-xl bg-transparent placeholder-gray-500 text-gray-900"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleScan}
            disabled={isLoading}
            className="bg-black text-white px-14 py-4 rounded-full text-lg font-medium hover:scale-105 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-3 mx-auto"
          >
            {isLoading ? (
              "Scanning..."
            ) : (
              <>
                <span>Scrutinize</span>
                <span className="text-2xl">→</span>
              </>
            )}
          </button>

        </div>
      </div>
    </PageWrapper>
  );
}