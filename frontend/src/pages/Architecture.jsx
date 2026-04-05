import React from "react";
import PageWrapper from "../components/common/PageWrapper";

const architectureData = [
  {
    icon: "🔗",
    title: "User Input",
    description: "User pastes suspicious URL",
  },
  {
    icon: "⚛️",
    title: "React + Tailwind",
    description: "Frontend validates & sends request",
  },
  {
    icon: "⚡",
    title: "FastAPI Backend",
    description: "Receives URL & triggers pipeline",
  },
  {
    icon: "🌐",
    title: "Feature Extraction",
    description: "tldextract + WHOIS domain data",
  },
  {
    icon: "🧠",
    title: "ML Model",
    description: "Random Forest predicts phishing",
  },
  {
    icon: "📊",
    title: "Result",
    description: "Risk score & explanation shown",
  },
];

export default function Architecture() {
  return (
    <PageWrapper>
      <section className="h-[calc(100vh-90px)] flex flex-col justify-center px-6 overflow-hidden -mt-8">
        
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            System <span className="italic font-serif">Architecture</span>
          </h2>

          <p className="text-gray-700 mb-12">
            How PhishGuard processes and protects links
          </p>

          {/* Flow */}
          <div className="flex flex-wrap items-center justify-center gap-y-8">
            
            {architectureData.map((item, index) => (
              <React.Fragment key={index}>
                
                {/* Glass Card */}
                <div
                  className="
                  relative w-[220px] p-5 rounded-2xl flex flex-col items-center text-center

                  bg-white/5 backdrop-blur-xl
                  border border-white/30
                  shadow-[0_8px_32px_rgba(0,0,0,0.2)]

                  transition-all duration-300
                  hover:-translate-y-3 hover:scale-105 hover:shadow-2xl
                  "
                >
                  {/* Light reflection */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/30 to-transparent opacity-40 pointer-events-none"></div>

                  {/* Border glow */}
                  <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"></div>

                  <div className="text-3xl mb-3 z-10 transition-transform duration-300 hover:scale-125">
                    {item.icon}
                  </div>

                  <h3 className="text-md font-semibold mb-2 z-10">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm z-10">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < architectureData.length - 1 && (
                  <div className="mx-4 text-3xl text-black/50 hover:text-orange-500 transition">
                    →
                  </div>
                )}

              </React.Fragment>
            ))}

          </div>

        </div>

      </section>
    </PageWrapper>
  );
}