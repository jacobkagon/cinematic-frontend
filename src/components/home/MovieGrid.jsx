import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import { Rating } from "@material-ui/lab";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Link from '@material-ui/core/Link';
import MovieDetails from "../MovieDetails";

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

export default function MovieGrid({ movies }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [movieShow, handleMovieShow] = React.useState(false);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const body = "hello";

  const handleShowPage = () => {
    handleMovieShow(true);
    if (movieShow === true) {
      handleMovieShow(false);
    }
  };

  return (
    
    <div className={classes.root}>
    

      <GridList className={classes.gridList} cols={4.5}>
      
        {movies.map((movie) => (
          <GridListTile key={movie.id} style={{height: '300px'}}>

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
                <Link href={'/movie/'+movie.id}>
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
    </div>
  );
}
