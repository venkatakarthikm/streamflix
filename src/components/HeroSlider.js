import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "./HeroSlider.css";

// Featured movies data
const featuredMovies = [
  {
    title: "Spider-Man: No Way Home",
    mobileImage:
      "https://wallpapercave.com/wp/wp10363322.jpg",
    desktopImage:
      "https://wallpapers.com/images/featured/spider-man-no-way-home-pictures-l3ztimmzaeeqfgir.jpg",
    link: "https://drive.google.com/file/d/1QurD9Fm0wlVsFi64wTlfv3xERMz1qt3a/preview",
    cast: {
      hero: "Tom Holland",
      heroine: "Zendaya",
      director: "Jon Watts",
    },
    genre: "Comedy",
    category: "Telugu Dubbed",
  },
  {
    title: "Guntur Kaaram",
    mobileImage:
      "https://moviegalleri.net/wp-content/gallery/guntur-kaaram-hd-images/Guntur-Kaaram-Movie-HD-Images-26a6be6.jpg",
    desktopImage:
      "https://pbs.twimg.com/media/GDVX12rXUAA2Ruy?format=jpg&name=large",
    link: "https://drive.google.com/file/d/18K3Hs24z1ZyWPKZkf8SFoO0AmdKEqzDr/preview",
    cast: { hero: "Mahesh Babu", heroine: "Sreeleela", director: "Trivikram" },
    genre: "Drama",
  },
  {
    title: "Premalu",
    mobileImage: "https://wallpapercave.com/wp/wp13862970.jpg",
    desktopImage: "https://wallpapercave.com/wp/wp13863069.jpg",
    link: "https://drive.google.com/file/d/1t1lHWN2-Xdi39CBSIMs8S-qpE5DM3ED1/preview",
    cast: {
      hero: "Naslen K. Gafoor",
      heroine: "Mamitha Baiju",
      director: "Girish A. D",
    },
    genre: "Comedy,Romance",
  },
  {
    title: "Salaar",
    mobileImage: "https://wallpapercave.com/wp/wp14191250.jpg",
    desktopImage:
      "https://moviegalleri.net/wp-content/gallery/salaar-hd-images/prabhas-salaar-hd-images-0db2d86.jpg",
    link: "https://drive.google.com/file/d/1TBa7hQp_6GknwX9GnYTEdDnBLk8gb6oA/preview",
    cast: {
      hero: "Prabhas",
      heroine: "Shruti Haasan",
      director: "Prashanth Neel",
    },
    genre: "Action",
  },
  {
    "title": "Animal",
    "mobileImage": "https://wallpaperaccess.com/full/12247311.jpg",
    "desktopImage": "https://wallpaperaccess.com/full/12247474.jpg",
    "link": "https://drive.google.com/file/d/1ci0aK-SPW-lSMGK-RqqwV3ITW0T9gZn4/preview",
    "cast": {
        "hero": "Ranbir Kapoor",
        "heroine": "Rashmika Mandanna",
        "director": "Sandeep reddy vanga"
    },
    "genre": "Action, Fantasy"
},
];

const HeroSlider = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      autoplay={{ delay: 5000 }}
      loop={true}
      className="hero-slider"
    >
      {featuredMovies.map((movie) => (
        <SwiperSlide key={movie.title}>
          <div className="hero-slide">
            <img
              src={isMobile ? movie.mobileImage : movie.desktopImage}
              alt={movie.title}
              className="hero-image"
            />
            <div className="hero-content">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="movie-title"
              >
                {movie.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="movie-genre"
              >
                {movie.genre}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="movie-cast"
              >
                <p>
                  Starring: {movie.cast.hero}{" "}
                  {movie.cast.heroine && `& ${movie.cast.heroine}`}
                </p>
                <p>Director: {movie.cast.director}</p>
              </motion.div>
              <div className="hero-buttons">
                <Link to={`/watch/${movie.title}`} className="play-button">
                  <Play />
                  Play Now
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
