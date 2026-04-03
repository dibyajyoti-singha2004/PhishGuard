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
      // Send the URL to your FastAPI backend
      const response = await fetch("http://localhost:8000/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      if (!response.ok) throw new Error("Backend Error");

      // Receive the label, score, and explanation from ML Engine
      const data = await response.json();
      
      // Navigate to the Result page and pass the data along
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
      <div className="text-center">
        <h2 className="text-2xl mb-4">Paste your link</h2>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="px-4 py-2 rounded mb-4 w-80 text-black border border-gray-300" 
        />

        <br />

        <button
          onClick={handleScan}
          disabled={isLoading}
          className="bg-black text-white px-6 py-2 rounded-full disabled:opacity-50 transition-opacity"
        >
          {isLoading ? "Scanning..." : "Scan"}
        </button>
      </div>
    </PageWrapper>
  );
}
