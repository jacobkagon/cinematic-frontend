import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";

import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import Link from "@material-ui/core/Link";

import { URL_IMG, IMG_SIZE_LARGE } from "../../const";

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
    width: 900,
    height: 320,
  },

  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const FriendsWatchlist = () => {
  const classes = useStyles();
  const [film, setFilm] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    fetch(`https://cinematic-backend.herokuapp.com/api/v1/followee_watchlist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => setFilm(data));
  }, []);

  return (
    <span>
      <div className={classes.root}>
        {film.length !== 0 ? (
          <span>
            {console.log(film)}
            <h4 align="center"> What Your Friends are Watching</h4>
            <GridList className={classes.gridList} cols={4.5}>
              {film.map((movie, id) => (
                <Link href={"/movie/" + movie.movie.movie_id}>
                  <GridListTile key={id} style={{ height: "300px" }}>
                    <img
                      src={URL_IMG + IMG_SIZE_LARGE + movie.movie.poster}
                      alt={movie.title}
                    />
                   
                  </GridListTile>
                </Link>
              ))}
            </GridList>
          </span>
        ) : null}
      </div>
    </span>
  );
};

export default FriendsWatchlist;
