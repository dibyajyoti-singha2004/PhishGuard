// NavLinks.jsx
import { Link } from "react-router-dom";

export default function NavLinks() {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Stack", path: "/architecture" },
    { name: "Architecture", path: "/architecture" },
  ];

  return (
    <ul className="flex gap-8 md:gap-12">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.path}
            className="relative text-sm font-semibold text-white/80 hover:text-white tracking-wide transition-colors duration-200 group"
            style={{ letterSpacing: "0.02em" }}
          >
            {link.name}

            {/* underline animation */}
            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}