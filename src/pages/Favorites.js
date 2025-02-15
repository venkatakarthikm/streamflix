import React from 'react';
import MovieCard from '../components/MovieCard';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = React.useState([]);

  // Load favorites from local storage
  React.useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites-page">
      <h1 className="page-title">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorites added yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;