import Logo from "./Logo";
import NavLinks from "./NavLinks";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4">
        
        <div className="flex justify-between items-center 
          bg-gradient-to-r from-[#3a2b2b] to-[#2b2b2b]
          rounded-full px-6 py-3
          shadow-[0_6px_25px_rgba(0,0,0,0.25)]">
          
          {/* Logo */}
          <div className="text-white font-semibold">
            <Logo />
          </div>

          {/* Nav */}
          <NavLinks />

        </div>

      </div>
    </nav>
  );
}