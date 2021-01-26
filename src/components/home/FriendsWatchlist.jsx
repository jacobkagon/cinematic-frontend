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
    fetch(`http://localhost:3000/api/v1/followee_watchlist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => setFilm(data));
  }, []);

  return (
      
    <div className={classes.root}>
  
    {film !== [] ? 
        
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
                <Link to={"/movie/" + movie.movie.movie_id}>
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
      </GridList> : null
      }
    </div> 
    
  );
};

export default FriendsWatchlist;
