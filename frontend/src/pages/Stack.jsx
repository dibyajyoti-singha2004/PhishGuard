import React from "react";
import PageWrapper from "../components/common/PageWrapper";
const stackData = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Express", icon: "🚀" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Machine Learning", icon: "🤖" },
];

export default function Stack() {
  return (
    <PageWrapper><section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Tech Stack
        </h2>
        <p className="text-gray-600 mb-12">
          Technologies used to build PhishGuard.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {stackData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </PageWrapper>
    
  );
}