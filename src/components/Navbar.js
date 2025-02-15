import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { series } from '../data/series';
import { movies } from '../data/movies';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const searchInSeries = series.flatMap(show => {
      const seasonEpisodes = show.seasons.flatMap(season =>
        season.episodes.map(episode => ({
          title: `${show.title} - ${episode.episodeTitle}`,
          type: 'series',
          link: `/series/${show.title}/${season.season}/${episode.episodeTitle}`
        }))
      );
      return [
        { title: show.title, type: 'series', link: `/series/${show.title}` },
        ...seasonEpisodes
      ];
    });

    const searchInMovies = movies.map(movie => ({
      title: movie.title,
      type: 'movie',
      link: `/watch/${movie.title}`
    }));

    const allResults = [...searchInSeries, ...searchInMovies];

    const filteredResults = allResults.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleResultClick = (link) => {
    navigate(link);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          StreamFlix
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/">Movies</Link>
          <Link to="/series">Series</Link>
          <Link to="/favorites">My List</Link>
        </div>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search movies & series..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Search className="search-icon" />
          
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleResultClick(result.link)}
                >
                  <span>{result.title}</span>
                  <span className="result-type">{result.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;