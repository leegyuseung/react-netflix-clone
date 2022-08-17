import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieModal from "./MovieModal";
import "./Row.css";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ title, id, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  // 모달을 위한 state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSelected, setModalSelected] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, []);

  // 영화 정보 axios를 통해 가져오기
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setModalSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={5}
        loop={true}
        navigation
        breakpoints={{
          1378: { slidesPerView: 6, slidesPerGroup: 6 },
          998: { slidesPerView: 5, slidesPerGroup: 5 },
          625: { slidesPerView: 4, slidesPerGroup: 4 },
          0: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>

      {modalOpen && (
        <MovieModal {...modalSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
};

export default Row;
