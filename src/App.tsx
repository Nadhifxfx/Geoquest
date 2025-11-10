import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';
import Continent from './pages/Continent';
import Category from './pages/Category';
import Quiz from './pages/Quiz';
import { audioManager } from './utils/audioManager';

function App() {
  useEffect(() => {
    audioManager.init();
    return () => audioManager.cleanup();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/continent" element={<Continent />} />
        <Route path="/category/:continent" element={<Category />} />
        <Route path="/quiz/:continent/:category" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
