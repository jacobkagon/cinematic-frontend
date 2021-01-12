import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";
import {Rating} from "@material-ui/lab"
import {Link} from "react-router-dom"
import MovieDetails from "./MovieDetails"
import {URL_IMG, IMG_SIZE_LARGE} from '../const'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 900,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  StarIcon: {
    fontSize: "small"
  },
}));

export default function MovieGrid({ movies }) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [movieShow, handleMovieShow] = React.useState(false)

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const body = "hello";

  const handleShowPage = () => {
      handleMovieShow(true)
      if(movieShow === true) {
          handleMovieShow(false)
      }
  }

  return (
    <div>
   {movieShow === true ? <MovieDetails/> : null}
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Trending</ListSubheader>
        </GridListTile>
        
        {movies.map((movie, id) => (
            
          <GridListTile key={id} style={{height: '400px'}}>
           
            <img
              src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path}
              alt={movie.title}
            />
            <GridListTileBar
              title={movie.title}
              subtitle={
                <span>
                 
                 <Rating name="half-rating-read" defaultValue={movie.vote_average / 2} precision={0.5} readOnly />
                </span>
              }
              actionIcon={
                <Link to={'/movie/'+movie.id}>
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
</div>
  );
}
