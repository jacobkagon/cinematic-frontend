import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import { useParams } from "react-router-dom";
import { URL_IMG, IMG_SIZE_LARGE } from "../const";
import { Autocomplete } from "@material-ui/lab";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import AddReviewModal from "./AddReviewModal";
import ReviewScroll from "./ReviewScroll";
import AddWatchlist from "./AddWatchlist";

const token = localStorage.getItem("token");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    display: "auto",
    margin: "auto",
    width: 300,
    height: 400,
  },
}));

const MovieDetails = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [movieInfo, handleMovieInfo] = useState([]);
  const [modal, handleModal] = useState(false);
  const [watchlist, handleWatchlist] = useState(false);
  const [reviewAdded, handleAddReview] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5a9cf113085e6d11351ca2f692a38bde&language=en-US`
    )
      .then((resp) => resp.json())
      .then((data) => handleMovieInfo(data));
  }, []);

  const createMovie = () => {
    if (movieInfo !== " ") {
      fetch("http://localhost:3000/api/v1/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: movieInfo.title,
          poster: movieInfo.poster_path,
          movie_id: movieInfo.id,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <div className={classes.root}>
      {movieInfo !== [] ? createMovie() : null}
      {movieInfo.id !== undefined ? (
        <ReviewScroll movieId={movieInfo.id} reviewAdded={reviewAdded}/>
      ) : null}
      {watchlist ? <AddWatchlist movieId={movieInfo.id} /> : null}
      {modal ? (
        <AddReviewModal
          handleAddReview={handleAddReview}
          open={modal}
          closeModal={handleModal}
          movieId={movieInfo.id}
        />
      ) : null}
      <Grid container spacing={10}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src={URL_IMG + IMG_SIZE_LARGE + movieInfo.poster_path}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {movieInfo.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Hello World
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: 1030114
              </Typography>

              {movieInfo.genres
                ? movieInfo.genres.map((genre, id) => (
                    <Chip
                      key={id}
                      size="small"
                      label={genre.name}
                      color="primary"
                    />
                  ))
                : null}
              <Button variant="contained" onClick={() => handleModal(true)}>
                Add Review
              </Button>

              <Button variant="contained" onClick={() => handleWatchlist(true)}>
                Add to Watchlist
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1"></Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MovieDetails;
