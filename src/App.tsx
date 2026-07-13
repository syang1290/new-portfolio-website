import { Routes, Route } from "react-router-dom";
import { About } from "./components/About";
import { Resume } from "./components/Resume";
import { Work } from "./components/Work"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/about" element={<About />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/work" element={<Work />} /> 
    </Routes>
  );
}

export default App;