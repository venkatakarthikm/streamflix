import React from 'react';
import HeroSlider from '../components/HeroSlider';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';
import { series } from '../data/series';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <HeroSlider movies={movies} />
      
      <section className="content-section">
        <h2>Trending Movies</h2>
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>

        <h2>Popular Series</h2>
        <div className="movie-grid">
          {series.map(show => (
            <MovieCard key={show.title} movie={show} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;