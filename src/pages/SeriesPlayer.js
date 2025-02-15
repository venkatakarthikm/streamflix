import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { series } from '../data/series';
import './SeriesPlayer.css';

const SeriesPlayer = () => {
  const { title, season: seasonParam, episode: episodeParam } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentShow = series.find((s) => s.title === title);
    if (currentShow) {
      setShow(currentShow);

      const firstAvailableSeason = currentShow.seasons.find((s) => s.episodes.length > 0);

      if (seasonParam && episodeParam) {
        const season = parseInt(seasonParam);
        setSelectedSeason(season);

        const seasonData = currentShow.seasons.find((s) => s.season === season);
        if (seasonData) {
          const episode = seasonData.episodes.find((e) => e.episodeTitle === episodeParam);
          setSelectedEpisode(episode || seasonData.episodes[0]);
        }
      } else if (firstAvailableSeason) {
        setSelectedSeason(firstAvailableSeason.season);
        setSelectedEpisode(firstAvailableSeason.episodes[0]);
        navigate(`/series/${title}/${firstAvailableSeason.season}/${firstAvailableSeason.episodes[0].episodeTitle}`);
      }
    }
  }, [title, seasonParam, episodeParam, navigate]);

  const handleSeasonChange = (season) => {
    const seasonData = show?.seasons.find((s) => s.season === season);
    if (seasonData && seasonData.episodes.length > 0) {
      setSelectedSeason(season);
      setSelectedEpisode(seasonData.episodes[0]);
      navigate(`/series/${title}/${season}/${seasonData.episodes[0].episodeTitle}`);
    }
  };

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    navigate(`/series/${title}/${selectedSeason}/${episode.episodeTitle}`);
  };

  if (!show || !selectedEpisode) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="series-player-page">
      <div className="video-container">
        <iframe
          src={selectedEpisode.link}
          title={`${show.title} - ${selectedEpisode.episodeTitle}`}
          allowFullScreen
        ></iframe>
      </div>

      <div className="series-info">
        <div className="series-header">
          <div className="series-title-section">
            <h1>{show.title}</h1>
            <p className="genre">{show.genre}</p>
          </div>
          <div className="season-selector">
            <select value={selectedSeason} onChange={(e) => handleSeasonChange(parseInt(e.target.value))}>
              {show.seasons
                .filter((season) => season.episodes.length > 0)
                .map((season) => (
                  <option key={season.season} value={season.season}>
                    Season {season.season}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="episodes-list">
          {show.seasons
            .find((s) => s.season === selectedSeason)
            ?.episodes.map((episode, index) => (
              <div
                key={episode.episodeTitle}
                className={`episode-item ${selectedEpisode.episodeTitle === episode.episodeTitle ? 'active' : ''}`}
                onClick={() => handleEpisodeSelect(episode)}
              >
                <div className="episode-number">{index + 1}</div>
                <div className="episode-details">
                  <h3>{episode.episodeTitle}</h3>
                  {episode.cast.guest && <p className="guest-stars">Guest: {episode.cast.guest}</p>}
                  {episode.cast.hero && !episode.cast.guest && <p className="guest-stars">Starring: {episode.cast.hero}</p>}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesPlayer;