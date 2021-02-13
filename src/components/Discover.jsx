import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Link from "@material-ui/core/Link";
import MovieDetails from "./MovieDetails";

import { URL_IMG, IMG_SIZE_LARGE, API_KEY } from "../const";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },

  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: 960,
    height: 300,
  },

  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Discover({ movieId }) {
  const classes = useStyles();

  const [movies, handleMovie] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations${API_KEY}&language=en-US&page=1`
    )
      .then((resp) => resp.json())
      .then((data) => handleMovie(data.results));
  }, []);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4.5}>
     
        {movies.map((movie) => (
          <GridListTile key={movie.id} style={{ height: "300px" }}>
          <Link href={"/movie/" + movie.id}>
            <img
              src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path}
              alt={movie.title}
            />
            <GridListTileBar
              title={movie.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
      
            />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
