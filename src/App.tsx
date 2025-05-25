import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import { AnimatePresence } from 'framer-motion';
import AnimatedCursor from './components/AnimatedCursor';

import './styles/global.css';
import './styles/animations.css';
import './styles/components.css';

// Wrapper component to access location
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedCursor />
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
