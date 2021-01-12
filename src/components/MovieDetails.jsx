import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_LIST, API_KEY, LANG_EN } from "../const";

const MovieDetails = () => {
  let { id } = useParams();
  const [movieInfo, handleMovieInfo] = React.useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5a9cf113085e6d11351ca2f692a38bde&language=en-US`
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  });

  return <div>{id}</div>;
};

export default MovieDetails;
