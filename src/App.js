import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

const Home = React.lazy(() => import('./pages/Home'));
const MoviePlayer = React.lazy(() => import('./pages/MoviePlayer'));
const SeriesPlayer = React.lazy(() => import('./pages/SeriesPlayer'));
const Series = React.lazy(() => import('./pages/Series'));
const Favorites = React.lazy(() => import('./pages/Favorites'));

function App() {
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