import React from 'react';
import { series } from '../data/series';
import MovieCard from '../components/MovieCard';
import './Series.css';

const Series = () => {
  return (
    <div className="series-page">
      <h1 className="page-title">TV Series</h1>
      <div className="series-grid">
        {series.map(show => (
          <MovieCard key={show.title} movie={show} type="series" />
        ))}
      </div>
    </div>
  );
};

export default Series;