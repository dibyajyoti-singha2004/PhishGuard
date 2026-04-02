export default function PageWrapper({ children, fullScreen = false }) {
  return (
    <div
      className={`min-h-screen w-full relative ${
        fullScreen ? "flex items-center justify-center" : "pt-28 flex justify-center px-4"
      }`}
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `
          radial-gradient(ellipse 60% 70% at 0% 55%, #ff2200 0%, transparent 100%),
          radial-gradient(ellipse 80% 50% at 40% 100%, #ff6600 0%, transparent 100%),
          radial-gradient(ellipse 50% 40% at 100% 100%, #ffaa00 0%, transparent 100%)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 w-full max-w-[1200px]">
        {children}
      </div>
    </div>
  );
}