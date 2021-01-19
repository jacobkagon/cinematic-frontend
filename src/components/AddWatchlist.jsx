import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import movieIdState from "../recoil/movieId";

const token = localStorage.getItem("token");

const AddWatchlist = ({ movieId }) => {
  const [backendMovieId, handleBackendMovieId] = useRecoilState(movieIdState);


  useEffect(() => {
    
       fetch(`http://localhost:3000/api/v1/find_movie/${movieId}`, {
           headers: {Authorization: `Bearer ${token}`},
       })
        .then((resp) => resp.json())
        .then((data) => handleBackendMovieId(data.id));
  })

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
    .then(resp => resp.json())
    .then(data => console.log(data))
      
      .catch((error) => console.log(error))
  };

  return (
  <div>
{backendMovieId !== 0 ? addToWatchlist() : null}
  </div>);
};

export default AddWatchlist;
