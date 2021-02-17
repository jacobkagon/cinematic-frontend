import React, { useEffect, useState } from "react";
import watchlistIdState from "../../recoil/watchlist";
import { useRecoilState } from "recoil";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import { URL_IMG, IMG_SIZE_LARGE } from "../../const";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: 75,
    height: 475,
  },
  paper: {
    display: "flex",
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

const UserWatchlist = ({ watchlists, userId }) => {
  const classes = useStyles();
  const [film, setFilm] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(
      `https://cinematic-backend.herokuapp.com/api/v1//user_watchlist/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((resp) => resp.json())
      .then((data) => setFilm(data));
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: "21" }} align="center">
        Watchlist
      </h3>

      <div className={classes.root}>
        <GridList className={classes.gridList} cols={4.5}>
        
          {film.map((movie, id) => (
            <GridListTile key={id} style={{ height: "300px" }}>
              <Link to={"/movie/" + movie.movie.movie_id}>
                <img
                  src={URL_IMG + IMG_SIZE_LARGE + movie.movie.poster}
                  alt={movie.title}
                />
              </Link>
            </GridListTile>
          ))}
          
        </GridList>
        
      </div>
    </div>
  );
};

export default UserWatchlist;
