import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Wizard from './pages/Wizard';
import Processing from './pages/Processing';
import Results from './pages/Results';
import Learn from './pages/Learn';
import NotFound from './pages/NotFound';

function App() {
  const [activeAudioScript, setActiveAudioScript] = useState(null);
  const location = useLocation();

  return (
    <div className="relative flex flex-col min-h-screen text-ink">
      <a
        href="#main-content"
        className="absolute top-[-9999px] left-[-9999px] z-[60] px-4 py-2 bg-brand text-bone rounded-lg font-medium outline-none focus-visible:top-4 focus-visible:left-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand transition-all"
      >
        Skip to main content
      </a>

      <Navbar onListen={activeAudioScript} />

      <main
        id="main-content"
        className="grow focus:outline-none pt-20"
        tabIndex="-1"
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing setAudioScript={setActiveAudioScript} />} />
            <Route path="/diagnostics" element={<Wizard setAudioScript={setActiveAudioScript} />} />
            <Route path="/checking-status" element={<Processing setAudioScript={setActiveAudioScript} />} />
            <Route path="/results" element={<Results setAudioScript={setActiveAudioScript} />} />
            <Route path="/learn" element={<Learn setAudioScript={setActiveAudioScript} />} />
            <Route path="*" element={<NotFound setAudioScript={setActiveAudioScript} />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
