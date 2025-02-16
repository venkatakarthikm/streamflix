import React, { Suspense ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

const Home = React.lazy(() => import('./pages/Home'));
const MoviePlayer = React.lazy(() => import('./pages/MoviePlayer'));
const SeriesPlayer = React.lazy(() => import('./pages/SeriesPlayer'));
const Series = React.lazy(() => import('./pages/Series'));
const Favorites = React.lazy(() => import('./pages/Favorites'));

function App() {
  useEffect(() => {
    // Add scroll event handler
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    };

    // Prevent right-click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable key combinations for inspecting
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I')) || e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    handleScroll(); // Initial check to apply visible class to sections already in view

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:title" element={<MoviePlayer />} />
            <Route path="/series" element={<Series />} />
            <Route path="/series/:title" element={<SeriesPlayer />} />
            <Route path="/series/:title/:season/:episode" element={<SeriesPlayer />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;