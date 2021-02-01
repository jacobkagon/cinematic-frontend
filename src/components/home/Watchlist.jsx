import { responsiveFontSizes } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import watchlistIdState from "../../recoil/watchlist";
import { useRecoilState } from "recoil";
import { borders } from "@material-ui/system";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import Link from '@material-ui/core/Link';

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
    height: 300,
  },
  gridListTile: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: 900,
    height: 320,
    display: "flex",
    borderRadius: '20%'
  },

  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const Watchlist = () => {
  const classes = useStyles();
  const [film, setFilm] = useState([]);
  const [watchlistId, setWatchlistId] = useRecoilState(watchlistIdState);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    fetch(`https://cinematic-backend.herokuapp.com/user_watchlist/${userId}`, {
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
            <h4 align="center">My List</h4>

            <GridList className={classes.gridList} cols={4.5}>
              {film.map((movie, id) => (
                <GridListTile key={id} style={{ height: "300px" }}>
                  <img
                    src={URL_IMG + IMG_SIZE_LARGE + movie.movie.poster}
                    alt={movie.title}
                  />
                  <GridListTileBar
                    title={movie.movie.title}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                    actionIcon={
                      <Link href={"/movie/" + movie.movie.movie_id}>
                        <IconButton
                          aria-label={`info about ${movie.title}`}
                          className={classes.icon}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Link>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </span>
        ) : null}
      </div>
    </span>
  );
};

export default Watchlist;
