import PageWrapper from '../components/common/PageWrapper';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); 

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col justify-between py-20 px-8 md:px-16 lg:px-24">
        
        {/* Top Section */}
        <div className="flex-1 flex items-center justify-center -mt-20">
          <h1 className="text-5xl md:text-7xl font-bold text-black tracking-tight text-center">
            Tired of <span className="italic font-serif font-medium">Phishing</span> links?
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="max-w-xl">
          <p className="text-xl md:text-2xl text-white mb-6 leading-tight font-medium">
            Scrutinize every malicious links,
            <br />
            By using <span>PhishGuard.</span>
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