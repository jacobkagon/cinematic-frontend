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

import { URL_IMG, IMG_SIZE_LARGE, API_KEY } from "../../const";

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

const Popular = () => {
  const classes = useStyles();
  const [film, setFilm] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    fetch(`https://api.themoviedb.org/3/movie/now_playing${API_KEY}&language=en-US&page=1`)
      .then((resp) => resp.json())
      .then((data) => setFilm(data.results));
  }, []);

  return (
      
    <div className={classes.root}>
  
    {film? 
      
        
      
      <GridList className={classes.gridList} cols={4.5}>
    
        {film.map((movie, id) => (
          <GridListTile key={id} style={{ height: "300px" }}>
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
              actionIcon={
                <Link to={"/movie/" + movie.id}>
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

export default Popular;