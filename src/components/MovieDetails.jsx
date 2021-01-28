import { makeStyles } from "@material-ui/core/styles";

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
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Discover from "./Discover";
import { Rating } from "@material-ui/lab";


const token = localStorage.getItem("token");

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    height: 600,

    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      left: 500,
      paddingRight: 0,
    },
  },
}));

const MovieDetails = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [movieInfo, handleMovieInfo] = useState([]);
  const [modal, handleModal] = useState(false);
  const [allReviews, handleAllReviews] = useState(false);
  const [isInWatchlist, handleIsIn] = useState(false);

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
    <Paper>
    <div>
      {movieInfo !== [] ? createMovie() : null}
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(${
            URL_IMG + IMG_SIZE_LARGE + movieInfo.poster_path
          })`,
        }}
      >
        {modal ? (
          <AddReviewModal
            // handleAddReview={handleAddReview}
            open={modal}
            closeModal={handleModal}
            movieId={movieInfo.id}
          />
        ) : null}

        {allReviews ? <ReviewScroll movieId={movieInfo.id} /> : null}
        {
          <img
            style={{ display: "none" }}
            src={URL_IMG + IMG_SIZE_LARGE + movieInfo.poster_path}
            alt="movie"
          />
        }
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Button variant="contained" onClick={() => handleModal(true)}>
                Review
              </Button>
              {"  "}{" "}
              <Button
                variant="contained"
                onClick={() => handleAllReviews(true)}
              >
                See All Reviews
              </Button>
              {movieInfo.id ? (
                <AddWatchlist
                  isInWatchlist={isInWatchlist}
                  handleIsIn={handleIsIn}
                  movieId={movieInfo.id}
                />
              ) : null}
              <p />
              <Typography component="h1" variant="h3" color="inherit">
                {movieInfo.title}
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                {movieInfo.release_date
                  ? movieInfo.release_date.split("-")[0]
                  : null}
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                <Rating
                  value={movieInfo.vote_average / 2}
                  precision={0.5}
                  readOnly
                ></Rating>
              </Typography>
              <Typography variant="subtitle1" href="#">
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
                <p />
               <Typography fontWeight="fontWeightMedium">Runtime: {movieInfo.runtime} minutes</Typography>
                <p />
              </Typography>
              <Typography component="h1" variant="subtitle1" href="#">
                {movieInfo.overview}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>

      {movieInfo.id !== undefined ? (
        <Paper>
        <div>
        
          <h4 align="center">You May Also Like</h4>
          {/* <ReviewScroll movieId={movieInfo.id} reviewAdded={reviewAdded} />  */}
          <Discover movieId={movieInfo.id} />
         
        </div>
        </Paper>
      ) : null}
    </div>
    </Paper>
  );
};

export default MovieDetails;
