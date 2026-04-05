import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/common/PageWrapper";

export default function About() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="h-[calc(100vh-90px)] px-8 md:px-16 lg:px-24 py-8 flex flex-col justify-center overflow-hidden -mt-20">
        
        {/* Title */}
        <div className="mb-6 -mt-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
            About{" "}
            <span className="italic font-serif bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
              PhishGuard
            </span>
          </h1>

          <p className="mt-3 text-base md:text-lg text-gray-900/90 max-w-2xl leading-relaxed">
            PhishGuard is a smart web-based security tool designed to detect and prevent phishing attacks.
            It allows users to analyze suspicious URLs in real-time using machine learning.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-5">
          
          {/* Card 1 */}
          <div className="
            relative group p-5 rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/30
            shadow-[0_8px_32px_rgba(0,0,0,0.2)]
            transition-all duration-300
            hover:-translate-y-3 hover:scale-105 hover:shadow-2xl
          ">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent opacity-40 pointer-events-none"></div>

            <h2 className="text-lg font-semibold mb-1 flex items-center gap-2 z-10 relative text-gray-950">
              ⚙️ <span className="group-hover:text-red-500 transition">How It Works</span>
            </h2>
            <p className="text-gray-900/80 text-sm z-10 relative">
              ML models analyze URLs and detect phishing patterns.
            </p>
          </div>

          {/* Card 2 */}
          <div className="
            relative group p-5 rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/30
            shadow-[0_8px_32px_rgba(0,0,0,0.2)]
            transition-all duration-300
            hover:-translate-y-3 hover:scale-105 hover:shadow-2xl
          ">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent opacity-40 pointer-events-none"></div>

            <h2 className="text-lg font-semibold mb-1 flex items-center gap-2 z-10 relative text-gray-950">
              🚀 <span className="group-hover:text-orange-500 transition">Features</span>
            </h2>
            <ul className="text-gray-900/80 text-sm space-y-1 z-10 relative">
              <li>• Real-time scan</li>
              <li>• ML detection</li>
              <li>• Fast results</li>
            </ul>
          </div>

          {/* Card 3 - LINK TO STACK */}
          <div 
            onClick={() => navigate('/stack')}
            className="
            relative group p-5 rounded-2xl cursor-pointer
            bg-white/5 backdrop-blur-xl
            border border-white/30
            shadow-[0_8px_32px_rgba(0,0,0,0.2)]
            transition-all duration-300
            hover:-translate-y-3 hover:scale-105 hover:shadow-2xl
          ">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent opacity-40 pointer-events-none"></div>

            <h2 className="text-lg font-semibold mb-1 flex items-center justify-between z-10 relative text-gray-950 w-full">
              <span className="flex items-center gap-2">
                🧠 <span className="group-hover:text-purple-500 transition">Tech Stack</span>
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-purple-500 font-bold">→</span >
            </h2>
            <p className="text-gray-900/80 text-sm z-10 relative">
              Python, React, FastAPI, Scikit-learn, Pandas & more.
            </p>
            <span className="text-[10px] text-gray-500 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity z-10 relative">
              Click to view full stack
            </span>
          </div>

          {/* Card 4 */}
          <div className="
            relative group p-5 rounded-2xl
            bg-white/5 backdrop-blur-xl
            border border-white/30
            shadow-[0_8px_32px_rgba(0,0,0,0.2)]
            transition-all duration-300
            hover:-translate-y-3 hover:scale-105 hover:shadow-2xl
          ">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent opacity-40 pointer-events-none"></div>

            <h2 className="text-lg font-semibold mb-1 flex items-center gap-2 z-10 relative text-gray-950">
              🌍 <span className="group-hover:text-green-500 transition">Vision</span>
            </h2>
            <p className="text-gray-900/80 text-sm z-10 relative">
              Make the internet safer from phishing threats.
            </p>
          </div>

        </div>

      </div>
    </PageWrapper>
  );
}