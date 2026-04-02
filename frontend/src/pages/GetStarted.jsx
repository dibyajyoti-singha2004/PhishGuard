import PageWrapper from "../components/common/PageWrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GetStarted() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleScan = () => {
    navigate("/result", { state: { url } });
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
          className="px-4 py-2 rounded mb-4 w-80"
        />

        <br />

        <button
          onClick={handleScan}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Scan
        </button>
      </div>
    </PageWrapper>
  );
}