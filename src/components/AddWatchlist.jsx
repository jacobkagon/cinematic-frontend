import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import movieIdState from "../recoil/movieId";

const token = localStorage.getItem("token");

const AddWatchlist = ({ movieId, title, poster }) => {
  const [backendMovieId, handleBackendMovieId] = useRecoilState(movieIdState);

  useEffect(() => {
    const data = {};
    data.title = title;
    data.poster = poster;
    data.movie_id = movieId;

    fetch("http://localhost:3000/api/v1/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        poster: poster,
        movie_id: movieId,
      }),
    })
      .then((resp) => resp.json())
      .then((dataArr) => findMovie());
  }, []);

  const findMovie = () => {
    if (movieId !== 0) {
      fetch(`http://localhost:3000/api/v1/find_movie/${movieId}`)
        .then((resp) => resp.json())
        .then((data) => handleBackendMovieId(data.id));
    }
addToWatchlist()
  };

  const addToWatchlist = () => {
    // const watchData = {};
    // watchData.user_id = localStorage.getItem("user_id");
    // watchData.movie_id = backendMovieId;

   fetch("http://localhost:3000/api/v1/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
        movie_id: backendMovieId,
      }),
    })
      
      .catch((error) => console.log(error))
  };

  return <div></div>;
};

export default AddWatchlist;
