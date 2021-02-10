import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

import { deepOrange } from "@material-ui/core/colors";

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
import Container from "@material-ui/core/Container";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");
let likez;

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
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function ReviewScroll({ handleModal, movieId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [movieReviews, handleMovieReviews] = useState([]);
  const [addReview, handleAddReview] = useState(false);
  const [sort, handleSort] = useState("review date");
  const [addLikes, handleAddLike] = useState(false);
  let [likeCount, setLikeCount] = useState(0);

  const handleClose = () => {
    setOpen(false);
    handleModal(false);
  };

  useEffect(() => {
    // error i'm getting is movieReviews is not a function.
    //You must create a ternary to prevent data from going to state.

    fetch(
      `https://cinematic-backend.herokuapp.com/api/v1/movie_review/${movieId}`,
      {
        Authorization: `Bearer ${token}`,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        handleMovieReviews(data);
      });
    handleAddReview(false);
  }, [addReview]);

  const addLike = (review) => {
    let userLikes;
    
      review.likes.map((like) => {
        if (like.user_id !== userId) {
          userLikes = true;
        } else {
          userLikes = false;
        }
      });
    

    if (userLikes === true || review.likes.length >= 0) {
      const data = {};
      data.user_id = userId;
      data.review_id = review.id;
      if (review !== null) {
        fetch("https://cinematic-backend.herokuapp.com/api/v1/like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((data) => console.log(data));
        handleAddReview(true);
      }
    } else {
      console.log("you've already liked this");
    }
  };

  const compare = (a, b) => {
    return a > b ? -1 : a < b ? 1 : 0;
  };

  const filterReviews = () => {
    let sortedReviews = movieReviews;
    if (sort === "Review Date") {
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
        {movieReviews.length !== 0 ? (
          <div>
            <Typography align="center" color="textPrimary" variant="h5">
              Reviews
            </Typography>
            <Container align="center">
              <label>Sort By:</label>
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
              <label>
                <input
                  type="radio"
                  value="Review Date"
                  name="Sort"
                  onChange={() => handleSort("Review Date")}
                />
                Review Date
              </label>
            </Container>
            {filterReviews().map((review) => (
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
                    {review.likes.length}

                    {""}
                  </div>

                  {review.likes.map((like) => {
                    like.user_id !== userId ? (likez = true) : (likez = false);
                  })}

                  {likez === true || review.likes.length === 0 ? (
                    <ThumbUpIcon onClick={() => addLike(review)} />
                  ) : (
                    <ThumbUpIcon color="primary" />
                  )}
                </ListItem>
              </Card>
            ))}

            <Divider variant="inset" component="li" />
          </div>
        ) : (
          <Typography variant="h5" color="textPrimary">
            No Reviews
          </Typography>
        )}
      </div>
    </List>
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
    </div>
  );
}
