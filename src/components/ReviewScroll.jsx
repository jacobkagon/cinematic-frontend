import React, { useEffect, useState } from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import UserProfile from "./userProfile/UserProfile";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple, red } from "@material-ui/core/colors";
import { useRecoilState } from "recoil";
import MovieIdState from "../recoil/movieId";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Card from "@material-ui/core/Card";

const token = localStorage.getItem("token");

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
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  modal: {
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",

    display: "grid",

    overflow: "scroll",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  h3: {
    align: "center",
  },
  strong: {
    fontWeight: theme.typography.fontWeightBold
  }
}));

export default function ReviewScroll({ movieId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [movieReviews, handleMovieReviews] = useState([]);
  const [addReview, handleAddReview] = useState(false);
  const [sort, handleSort] = useState("review date");

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    // error i'm getting is movieReviews is not a function.
    //You must create a ternary to prevent data from going to state.

    fetch(`http://localhost:3000/api/v1/movie_review/${movieId}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((resp) => resp.json())
      .then((data) => {
        handleMovieReviews(data);
      });
    handleAddReview(false);
  }, []);

  const addLike = (review) => {
    const data = {};
    data.body = review.body;
    data.rating = review.rating;
    data.movie_id = review.movie.id;
    data.user_id = review.user.id;
    data.likes = review.likes + 1;
    if (review !== null) {
      fetch(`http://localhost:3000/api/v1/review/${review.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(data),
      }).then((resp) => resp.json());
      // .then((data) => console.log(data));
      handleAddReview(true);
    }
  };

  const compare = (a, b) => {
    return a > b ? -1 : a < b ? 1 : 0;
  };

  const filterReviews = () => {
    let sortedReviews = movieReviews;
    if (sort === "review date") {
      sortedReviews = sortedReviews.sort((reviewA, reviewB) =>
        compare(reviewA.created_at, reviewB.created_at)
      );
    } else if (sort === "Rating") {
      sortedReviews = sortedReviews.sort((reviewA, reviewB) =>
        compare(reviewA.rating, reviewB.rating)
      );
    } else {
      sortedReviews = sortedReviews.sort((reviewA, reviewB) =>
        compare(reviewA.likes, reviewB.likes)
      );
    }
    return sortedReviews;
  };

  const body = (
    <List className={classes.paper}>
      <Typography
        color="textPrimary"
        variant="h5"
        align="center"
        id="simple-modal-title"
      ></Typography>
      <div>
        <strong >Sort by:</strong>
        <label>
          <input
          
            type="radio"
            value="Rating"
            name="Sort"
            onChange={() => handleSort("Rating")}
          />
          Rating
        </label>
        <label>

          <input
            type="radio"
            value="Helpfullness"
            name="Sort"
            onChange={() => handleSort("Helpfullness")}
          />

         Helpfullness
        </label>
        {movieReviews.length !== 0
          ? filterReviews().map((review) => (
              <Card>
                <ListItem key={review.id} alignItems="flex-start">
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        ></Typography>
                        <Link
                          color="inherit"
                          href={`/${review.user.username}/${review.user.id}`}
                        >
                          <Typography color="textPrimary">
                            {review.user.username}
                          </Typography>
                        </Link>
                        <Typography>
                          <Rating
                            name="read-only"
                            value={review.rating}
                            readOnly
                          ></Rating>
                        </Typography>
                        <Typography color="textPrimary">
                          {review.body}
                        </Typography>
                        <Typography color="textPrimary">
                          {new Date(review.created_at).toDateString()}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <div style={{ margin: "6px" }}>
                    {review.likes}
                    {""}
                  </div>
                  <ThumbUpIcon onClick={() => addLike(review)} />
                </ListItem>
              </Card>
            ))
          : null}

        <Divider variant="inset" component="li" />
      </div>
    </List>
  );

  const deleteReview = (event) => {
    fetch(`http://localhost:3000/api/v1/reviews/${event}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    //handleAddReview(true)
  };

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
    </div>
  );
}
