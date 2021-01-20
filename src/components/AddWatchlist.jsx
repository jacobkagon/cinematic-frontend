import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import movieIdState from "../recoil/movieId";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");

const AddWatchlist = ({ movieId }) => {
  const [backendMovieId, handleBackendMovieId] = useRecoilState(movieIdState);
  const [watchlistId, handleWatchlistId] = useState([]);
  const [userWatch, handleUserWatch] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/find_movie/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {handleWatchlistId(data.watchlists)
        handleBackendMovieId(data.id)});
  }, []);

  const removeFromWatchlist = () => {
     watchlistId.map(data => handleUserWatch([...userWatch, data.user_id]))

  
      console.log("hi") 
  
  //  if (watchlistId !== 0) {
  //   fetch(`http://localhost:3000/api/v1/watchlist/${watchlist_id}`, {
  //     method: 'DELETE',
  //     headers: {Authorization: `Bearer ${token}`}
  //   })
  // }
  }

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
        user_id: userId,
        movie_id: backendMovieId,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))

      .catch((error) => console.log(error));
  };

  return <div>{backendMovieId !== 0 ? removeFromWatchlist() : null}</div>;
};

export default AddWatchlist;
