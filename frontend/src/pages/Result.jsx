import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/common/PageWrapper';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // States to track which cards are flipped
  const [flipRisk, setFlipRisk] = useState(false);
  const [flipConfidence, setFlipConfidence] = useState(false);

  const { url, scanData } = location.state || {};

  if (!scanData) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-bold mb-4">No scan data found</h2>
          <button
            onClick={() => navigate('/scan')}
            className="bg-black text-white px-6 py-2 rounded-full"
          >
            Go back to Scanner
          </button>
        </div>
      </PageWrapper>
    );
  }

  const next = () => setStep((s) => (s + 1) % 3);
  const prev = () => setStep((s) => (s - 1 + 3) % 3);

  const riskLabel = scanData.label || "unknown";
  const riskScore = parseInt(scanData.score || 0);
  const confidence = parseInt(scanData.confidence || 0);

  const getRiskColor = () => {
    if (riskLabel === "phishing") return "#ef4444";
    if (riskLabel === "suspicious") return "#facc15";
    return "#22c55e";
  };

  const explanation =
    scanData.explanation ||
    (riskLabel === "phishing"
      ? "This URL shows strong phishing indicators and is unsafe."
      : riskLabel === "suspicious"
      ? "This URL has some suspicious characteristics. Proceed with caution."
      : "This URL appears safe with no major phishing indicators detected.");

  return (
    <PageWrapper>
      <div className="h-[calc(100vh-90px)] flex flex-col items-center justify-center -mt-10 font-[NeueHelvetica]">

        {/* Heading */}
        <h1 className="text-6xl italic font-serif mb-2 text-gray-950">Scrutinized.</h1>
        <p className="text-2xl mb-8 text-gray-800">
          Your link was scanned.
        </p>

        {/* Slider */}
        <div className="flex items-center gap-8">

          <button
            onClick={prev}
            className="bg-black text-white w-10 h-10 rounded-full hover:scale-110 transition flex items-center justify-center"
          >
            ←
          </button>

          {/* Expanded width to fit the 3 larger cards */}
          <div className="overflow-hidden w-[850px] p-4">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${step * 100}%)` }}
            >

              {/* Slide 1: Main Metrics */}
              <div className="flex gap-8 min-w-full justify-center items-center">
                
                {/* 1. Risk Label (Static) */}
                <GlassCard>
                  <Ring
                    value={100}
                    text={riskLabel}
                    customColor={getRiskColor()}
                  />
                  <p className="mt-4 text-sm text-gray-800 font-medium">Risk Label</p>
                </GlassCard>

                {/* 2. Risk Score (Flippable) */}
                <FlipCard
                  isFlipped={flipRisk}
                  onClick={() => setFlipRisk(!flipRisk)}
                  frontContent={
                    <>
                      <Ring
                        value={riskScore}
                        text={`${riskScore}/100`}
                        customColor={riskScore > 50 ? "#ef4444" : (riskScore > 20 ? "#facc15" : "#22c55e")}
                      />
                      <p className="mt-4 text-sm text-gray-800 font-medium">Risk Score</p>
                      <span className="text-[10px] text-gray-500 mt-1 opacity-70">(Click to flip)</span>
                    </>
                  }
                  backContent={
                    <>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Risk Score</h3>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        The literal probability (0-100) calculated by our ML model that this specific link is malicious.
                      </p>
                      <span className="text-[10px] text-gray-500 mt-4 opacity-70">(Click to flip back)</span>
                    </>
                  }
                />

                {/* 3. Confidence Score (Flippable) */}
                <FlipCard
                  isFlipped={flipConfidence}
                  onClick={() => setFlipConfidence(!flipConfidence)}
                  frontContent={
                    <>
                      <Ring
                        value={confidence}
                        text={`${confidence}%`}
                        customColor="#3b82f6"
                      />
                      <p className="mt-4 text-sm text-gray-800 font-medium">Confidence</p>
                      <span className="text-[10px] text-gray-500 mt-1 opacity-70">(Click to flip)</span>
                    </>
                  }
                  backContent={
                    <>
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">Confidence</h3>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        How certain the AI is about the assigned Risk Label. Higher is better.
                      </p>
                      <span className="text-[10px] text-gray-500 mt-4 opacity-70">(Click to flip back)</span>
                    </>
                  }
                />

              </div>

              {/* Slide 2: Feature Breakdown */}
              <div className="flex gap-10 min-w-full justify-center items-center">
                {/* HTTPS */}
                <GlassCard>
                  <Ring
                    value={100}
                    text={url?.startsWith("https") ? "Yes" : "No"}
                    customColor={url?.startsWith("https") ? "#22c55e" : "#facc15"}
                  />
                  <p className="mt-4 text-sm text-gray-800 font-medium">HTTPS</p>
                </GlassCard>

                {/* Domain Age */}
                <GlassCard>
                  <Ring
                    value={scanData.domain_age === "New" ? 30 : (scanData.domain_age === "Established" ? 100 : 60)}
                    text={scanData.domain_age || "N/A"}
                    customColor={scanData.domain_age === "New" ? "#ef4444" : (scanData.domain_age === "Established" ? "#22c55e" : "#facc15")}
                  />
                  <p className="mt-4 text-sm text-gray-800 font-medium">Domain Age</p>
                </GlassCard>
              </div>

              {/* Slide 3: Detailed Analysis */}
              <div className="flex min-w-full justify-center items-center">
                <GlassCard>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-300/50 pb-2 w-full text-center">
                    Detailed Analysis
                  </h3>
                  <p className="text-gray-800 text-center leading-relaxed max-w-sm mt-2">
                    {explanation}
                  </p>
                </GlassCard>
              </div>

            </div>
          </div>

          <button
            onClick={next}
            className="bg-black text-white w-10 h-10 rounded-full hover:scale-110 transition flex items-center justify-center"
          >
            →
          </button>

        </div>

        {/* Progress */}
        <div className="w-64 h-2 bg-white/30 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/scan')}
          className="mt-6 text-gray-600 hover:text-black font-medium transition"
        >
          Another link?
        </button>

      </div>
    </PageWrapper>
  );
};

export default Result;

// ==========================================
// CUSTOM COMPONENTS FOR UI
// ==========================================

const GlassCard = ({ children }) => (
  <div className="
    relative rounded-3xl w-56 h-64 flex flex-col items-center justify-center p-4
    bg-white/10 backdrop-blur-xl border border-white/40
    shadow-[0_8px_32px_rgba(0,0,0,0.15)]
    transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
  ">
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/40 to-transparent opacity-40 pointer-events-none"></div>
    {children}
  </div>
);

const FlipCard = ({ isFlipped, onClick, frontContent, backContent }) => (
  <div 
    className="relative w-56 h-64 cursor-pointer perspective-[1000px] group"
    onClick={onClick}
  >
    <div 
      className="w-full h-full transition-transform duration-700 ease-in-out"
      style={{ 
        transformStyle: 'preserve-3d', 
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' 
      }}
    >
      {/* Front of Card */}
      <div 
        className="absolute inset-0 w-full h-full rounded-3xl flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/40 to-transparent opacity-40 pointer-events-none"></div>
        {frontContent}
      </div>

      {/* Back of Card */}
      <div 
        className="absolute inset-0 w-full h-full rounded-3xl flex flex-col items-center justify-center p-6 bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.15)] text-center transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/40 to-transparent opacity-40 pointer-events-none"></div>
        {backContent}
      </div>
    </div>
  </div>
);

const Ring = ({ value, text, customColor }) => {
  const radius = 60; 
  const stroke = 8;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height="150" width="150">
        <circle
          stroke="rgba(255,255,255,0.3)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="75"
          cy="75"
        />
        <circle
          stroke={customColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="75"
          cy="75"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="absolute text-sm font-semibold text-gray-900 capitalize text-center px-2 max-w-[120px] break-words">
        {text}
      </span>
    </div>
  );
};