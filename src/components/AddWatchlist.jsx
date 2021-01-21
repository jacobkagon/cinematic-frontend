import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import movieIdState from "../recoil/movieId";
import Button from "@material-ui/core/Button";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");

const AddWatchlist = ({ handleIsIn, isInWatchlist, movieId }) => {
  const [backendMovieId, handleBackendMovieId] = useRecoilState(movieIdState);
  const [watchlist, handleWatchlist] = useState(0);
  const [isIn, isReallyIn] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/find_movie/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // if (data.watchlists !== null) {
        //   console.log(data)
        //   data.watchlists.map((newData) =>
        //    console.log(newData.movie_id)
        //   // (newData.movie_id === data.id)  && data.user_id === userId ? isReallyIn(true) : isReallyIn(false)
        //   );
        // } else {
        //   isReallyIn(false);
        // }
        handleBackendMovieId(data.id);
      });
  }, []);

  useEffect(async () => {
    let movies = []
    await fetch(`http://localhost:3000/api/v1/user_watchlist/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) =>(data.map(data => movies.push(data.movie.id))));
      movies.includes(backendMovieId) ? isReallyIn(true) : isReallyIn(false)
  }, []);

  const removeFromWatchlist = async () => {
    await fetch(
      `http://localhost:3000/api/v1/watchlist/${userId}/${backendMovieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  const addToWatchlist = async () => {
    await fetch("http://localhost:3000/api/v1/watchlist", {
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
