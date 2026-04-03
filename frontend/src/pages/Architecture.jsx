import React from "react";
import PageWrapper from "../components/common/PageWrapper";
const architectureData = [
  {
    icon: "🔗",
    title: "URL Input",
    description:
      "Users submit suspicious links which are preprocessed and validated before analysis.",
  },
  {
    icon: "🛡️",
    title: "Security Layer",
    description:
      "Initial filtering checks for known malicious domains and blacklist validation.",
  },
  {
    icon: "🧠",
    title: "ML Detection",
    description:
      "Machine learning models analyze patterns to detect phishing behavior in URLs.",
  },
];

export default function Architecture() {
  return (
    <PageWrapper><section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Architecture</h2>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
          How PhishGuard processes and protects you from malicious links.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {architectureData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-6">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </PageWrapper>
    
  );
}
