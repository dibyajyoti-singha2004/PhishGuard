import PageWrapper from "../components/common/PageWrapper";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 font-[NeueHelvetica]">
        
        {/* Top Section */}
        <div className="flex items-center justify-center mb-16 -mt-10">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-center leading-[100%] -translate-y-2">
            Tired of{" "}
            <span
              className="italic font-normal"
              style={{ fontFamily: "EditorialNewItalic" }}
            >
              Phishing
            </span>{" "}
            links?
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="max-w-xl">
          <p className="text-xl md:text-2xl text-white mb-6 leading-tight font-medium">
            Scrutinize every malicious links,
            <br />
            By using <span className="font-semibold">PhishGuard.</span>
          </p>

          <button
            onClick={() => navigate("/scan")}
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-4 hover:opacity-90 transition-all w-fit"
          >
            <span className="pl-1">Get Started</span>
            <span className="text-xl">→</span>
          </button>
        </div>

      </div>
    </PageWrapper>
  );
};

export default HomePage;