import React, { useState } from "react";
import PageWrapper from "../components/common/PageWrapper";

const stackData = [
  { 
    category: "Language", 
    name: "Python", 
    icon: "https://cdn.simpleicons.org/python",
    description: "The backbone of the backend. Used to write the FastAPI server, process the URL strings, and run the Scikit-learn machine learning pipelines."
  },
  { 
    category: "Frontend", 
    name: "React", 
    icon: "https://cdn.simpleicons.org/react",
    description: "Powers the entire user interface. Used to create reusable components, manage state for the URL scanner, and handle the interactive flippable result cards."
  },
  { 
    category: "Frontend", 
    name: "Tailwind CSS", 
    icon: "https://cdn.simpleicons.org/tailwindcss",
    description: "Handles all the styling. It makes the glassmorphism effects, responsive grid layouts, and smooth hover animations possible without writing custom CSS files."
  },
  { 
    category: "Backend", 
    name: "FastAPI", 
    icon: "https://cdn.simpleicons.org/fastapi",
    description: "Serves as the high-speed backend API. It bridges the React frontend with the Machine Learning engine, receiving URLs and returning the calculated risk scores."
  },
  { 
    category: "Backend", 
    name: "Uvicorn", 
    icon: "https://cdn.simpleicons.org/gunicorn",
    description: "The lightning-fast ASGI web server that runs the FastAPI application asynchronously, ensuring the API can handle multiple scan requests efficiently."
  },
  { 
    category: "ML & Data", 
    name: "Scikit-learn", 
    icon: "https://cdn.simpleicons.org/scikitlearn",
    description: "Provides the core machine learning framework. Used to train, test, and evaluate the classification models against the UCI phishing dataset."
  },
  { 
    category: "ML & Data", 
    name: "Pandas", 
    icon: "https://cdn.simpleicons.org/pandas",
    description: "The data manipulation powerhouse. Used to load the CSV datasets, build the feature matrices, and structure the data for the Random Forest model."
  },
  { 
    category: "ML & Data", 
    name: "Random Forest", 
    icon: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
    description: "The specific ensemble learning algorithm we chose. It builds multiple decision trees to predict whether a URL is a safe link or a phishing threat based on 9 extracted features."
  }
];

export default function Stack() {
  const [selectedTech, setSelectedTech] = useState(null);

  // Close modal if user clicks outside the content
  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      setSelectedTech(null);
    }
  };

  return (
    <PageWrapper>
      {/* Inline styles for the float-up animation */}
      <style>{`
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-float-up {
          animation: floatUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <section className="min-h-[calc(100vh-90px)] flex flex-col justify-center px-6 py-12 overflow-hidden -mt-10 font-[NeueHelvetica]">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-bold mb-3 tracking-tight text-gray-950">
            Tech <span className="italic font-serif">Stack</span>
          </h2>
          <p className="text-gray-800 mb-12 text-lg">
            The complete engine powering PhishGuard
          </p>

          {/* 4-Column Grid for 8 items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 justify-center">
            {stackData.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedTech(item)}
                className="
                relative rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer
                bg-white/10 backdrop-blur-xl
                border border-white/40
                shadow-[0_8px_32px_rgba(0,0,0,0.15)]
                transition-all duration-300
                hover:-translate-y-3 hover:scale-105 hover:shadow-2xl group
                "
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/40 to-transparent opacity-40 pointer-events-none"></div>
                
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-14 h-14 mb-4 z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                />
                
                <h3 className="text-lg font-semibold z-10 text-gray-900">{item.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-600 mt-1 z-10">{item.category}</p>
                
                {/* Subtle hint that it's clickable */}
                <span className="text-[10px] text-gray-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  Click to learn more
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal / Float Up Sub Page */}
      {selectedTech && (
        <div 
          id="modal-backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white/20 backdrop-blur-md transition-all duration-300"
        >
          {/* Modal Content */}
          <div className="relative bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl p-8 max-w-md w-full animate-float-up text-center flex flex-col items-center">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedTech(null)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-gray-600 transition-colors"
            >
              ✕
            </button>

            {/* Icon & Title */}
            <div className="w-20 h-20 bg-white/50 rounded-2xl flex items-center justify-center mb-5 shadow-inner border border-white/40">
              <img src={selectedTech.icon} alt={selectedTech.name} className="w-12 h-12" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-950 mb-1">{selectedTech.name}</h3>
            <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-semibold uppercase tracking-widest text-gray-600 mb-6 border border-black/5">
              {selectedTech.category}
            </span>

            {/* Description */}
            <p className="text-gray-800 leading-relaxed text-lg">
              {selectedTech.description}
            </p>

            <button 
              onClick={() => setSelectedTech(null)}
              className="mt-8 px-8 py-3 bg-black text-white rounded-full font-medium hover:scale-105 transition-transform"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}