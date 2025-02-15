import React from 'react';
import { Play, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './MovieCard.css';

interface MovieCardProps {
  movie: any;
  type?: 'movie' | 'series';
}

const MovieCard = ({ movie, type = 'movie' }: MovieCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Check if the movie is already in favorites
  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((m: any) => m.title === movie.title));
  }, [movie.title]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((m: any) => m.title !== movie.title);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const linkPath = type === 'series' ? `/series/${movie.title}` : `/watch/${movie.title}`;

  return (
    <motion.div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={isHovered ? movie.hoverPoster : movie.poster}
        alt={movie.title}
        className="movie-poster"
      />

      {isHovered && (
        <div className="movie-overlay">
          <Link to={linkPath} className="play-now">
            <Play />
          </Link>
          <button className="favorite-button" onClick={toggleFavorite}>
            <Heart fill={isFavorite ? 'red' : 'none'} color={isFavorite ? 'red' : 'white'} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MovieCard;
