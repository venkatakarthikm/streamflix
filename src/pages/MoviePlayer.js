import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { movies } from '../data/movies';
import './MoviePlayer.css';

const MoviePlayer = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [imdbData, setImdbData] = useState(null);

  useEffect(() => {
    const movieData = movies.find(m => m.title === title);
    setMovie(movieData);

    // Fetch IMDB data
    const fetchImdbData = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=da7d8e0c`);
        setImdbData(response.data);
      } catch (error) {
        console.error('Error fetching IMDB data:', error);
      }
    };

    fetchImdbData();
  }, [title]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-player-page">
      <div className="video-container">
        <iframe
          src={movie.link}
          title={movie.title}
          allowFullScreen
        ></iframe>
      </div>

      <div className="movie-info">
        <h1>{movie.title}</h1>
        <div className="movie-details">
          <p className="genre">{movie.genre}</p>
          <div className="cast">
            <p><strong>Director:</strong> {movie.cast.director}</p>
            <p><strong>Stars:</strong> {movie.cast.hero}, {movie.cast.heroine}</p>
          </div>
        </div>

        {imdbData && (
          <div className="imdb-info">
            <h2>IMDB Details</h2>
            <p><strong>Rating:</strong> {imdbData.imdbRating}</p>
            <p><strong>Plot:</strong> {imdbData.Plot}</p>
            <p><strong>Released:</strong> {imdbData.Released}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePlayer;
