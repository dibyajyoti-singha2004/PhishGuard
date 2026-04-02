import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Architecture from "./pages/Architecture";
import GetStarted from "./pages/GetStarted";
import Result from "./pages/Result";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/scan" element={<GetStarted />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;