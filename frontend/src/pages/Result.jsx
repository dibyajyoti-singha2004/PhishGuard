import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/common/PageWrapper';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the data passed over from GetStarted.jsx
  const { url, scanData } = location.state || {};

  // If someone tries to access /result directly without scanning a URL first
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

  // Helper to dynamically change text color based on danger level
  const getStatusColor = (label) => {
    if (label === 'safe') return 'text-green-600';
    if (label === 'suspicious') return 'text-yellow-500';
    return 'text-red-600';
  };

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto py-12 px-8 bg-white shadow-xl rounded-2xl mt-10 text-center">
        <h2 className="text-3xl font-bold mb-6 text-black">Scan Results</h2>

        {/* Display the Target URL */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg break-all">
          <span className="text-gray-500 text-sm block mb-1">Target URL:</span>
          <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
            {url}
          </a>
        </div>

        {/* Display the ML Classification */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-1 text-gray-700">Verdict:</h3>
          <p className={`text-4xl font-black uppercase ${getStatusColor(scanData.label)}`}>
            {scanData.label}
          </p>
          <p className="text-gray-500 mt-2">
            Confidence Score: <span className="font-bold text-black">{scanData.confidence}%</span>
          </p>
        </div>

        {/* Display the ML Explanation */}
        <div className="text-left bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h4 className="font-bold text-lg mb-2 text-black">Detailed Analysis:</h4>
          <p className="text-gray-700 leading-relaxed">{scanData.explanation}</p>
        </div>

        {/* Scan Another Button */}
        <button
          onClick={() => navigate('/scan')}
          className="bg-black text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all"
        >
          Scan Another URL
        </button>
      </div>
    </PageWrapper>
  );
};

export default Result;
