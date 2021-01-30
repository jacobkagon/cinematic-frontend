import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Alert from "@material-ui/lab/Alert";
import userData from "../recoil/userState";
import { useRecoilState } from "recoil";
import loggedInState from "../recoil/login";
import MovieIdState from "../recoil/movieId";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddReviewModal({
  open,
  closeModal,
  title,
  poster,
  movieId,

  // handleAddReview
}) {
  const classes = useStyles();
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");
  const [backendMovieId, handleBackendMovieId] = useRecoilState(MovieIdState);
  const [hover, setHover] = React.useState(-1);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  useEffect(() => {
    const data = {};
    data.title = title;
    data.poster = poster;
    data.movie_id = movieId;

    fetch("http://localhost:3000/api/v1/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        poster: poster,
        movie_id: movieId,
      }),
    })
      .then((resp) => resp.json())
      .then((dataArr) => findMovie());
  }, []);

  const findMovie = () => {
    if (movieId !== 0) {
      fetch(`http://localhost:3000/api/v1/find_movie/${movieId}`)
        .then((resp) => resp.json())
        .then((data) => handleBackendMovieId(data.id));
    }
  };

  const handleClose = () => {
    closeModal(false);
  };

  const handleSubmit = (event) => {
    const movieData = {};
    movieData.movie_id = backendMovieId;
    movieData.user_id = localStorage.getItem("user_id");
    movieData.rating = rating;
    movieData.likes = 0;
    movieData.body = text;

    event.preventDefault();
    if (text !== "") {
      fetch("http://localhost:3000/api/v1/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
    document.getElementsByTagName("form")[0].reset();
    setRating(1);
    // handleAddReview(true)
   window.location.reload()
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">{title}</h2>
      {handleSubmit && text === "" ? (
        <Alert severity="warning">Review is empty</Alert>
      ) : null}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Rating
          style={{ width: 200 }}
          name="simple-controlled"
          precision={1}
          defaultValue={1}
          value={rating}
          onChange={(event, newRating) => {
            setRating(newRating);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={3}
          placeholder=""
          onChange={(event) => setText(event.target.value)}
        />
        <Button type="submit" color="textPrimary" className={classes.submit}>
          Submit
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{body}</Fade>
      </Modal>
      {/* {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>} */}
    </div>
  );
}
