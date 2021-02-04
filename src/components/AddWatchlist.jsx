import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import movieIdState from "../recoil/movieId";
import Button from "@material-ui/core/Button";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");

const AddWatchlist = ({ movieId }) => {
  const [backendMovieId, handleBackendMovieId] = useRecoilState(movieIdState);

  const [isIn, isReallyIn] = useState(false);

  useEffect(() => {
    fetch(
      `https://cinematic-backend.herokuapp.com/api/v1/find_movie/${movieId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data !== null) {
          handleBackendMovieId(data.id);
        }
      });
  }, []);

  useEffect(async () => {
    let movies = [];
    await fetch(
      `https://cinematic-backend.herokuapp.com/api/v1/user_watchlist/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((resp) => resp.json())
      .then((data) => data.map((data) => movies.push(data.movie.id)));

    if (movies.includes(backendMovieId)) {
      isReallyIn(true);
    }
  });

  const removeFromWatchlist = async () => {
    await fetch(
      `https://cinematic-backend.herokuapp.com/api/v1/watchlist/${userId}/${backendMovieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  const addToWatchlist = async () => {
    await fetch("https://cinematic-backend.herokuapp.com/api/v1/watchlist", {
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

  return (
    <div>
      <br />
      {isIn === false ? (
        <Button variant="contained" onClick={() => addToWatchlist()}>
          Add to Watchlist
        </Button>
      ) : (
        <Button variant="contained" onClick={() => removeFromWatchlist()}>
          Remove from Watchlist
        </Button>
      )}
    </div>
  );
};

export default AddWatchlist;
