import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";
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
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  h3: {
    align: "center",
  },
}));

const FriendsReviews = ({ handleFriendsReviews }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [reviews, handleReviews] = useState([]);
  const [addLikes, handleAddLike] = useState(false);
  const [addReview, handleAddReview] = useState(false);

  const handleClose = () => {
    setOpen(false);
    handleFriendsReviews(false);
  };

  const addLike = (review) => {
    let like = null;
    if (addLikes === false) {
      like = review.likes + 1;
      handleAddLike(true);
    } else {
      like = review.likes - 1;
      handleAddLike(false);
    }
    const data = {};
    data.body = review.body;
    data.rating = review.rating;
    data.movie_id = review.movie.id;
    data.user_id = review.user.id;
    data.likes = like;
    if (review !== null) {
      fetch(
        `https://cinematic-backend.herokuapp.com/api/v1/review/${review.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify(data),
        }
      ).then((resp) => resp.json());
      // .then((data) => console.log(data));
      handleAddReview(true);
    }
  };

  useEffect(() => {
    fetch("https://cinematic-backend.herokuapp.com/api/v1/followee_reviews", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => handleReviews(data));
      handleAddReview(false)
  }, [addReview]);

  const body = (
    <List className={classes.paper}>
      <Typography
        color="textPrimary"
        variant="h5"
        align="center"
        id="simple-modal-title"
      >
        {reviews !== [] ? " Friends' Reviews" : "No Reviews"}
      </Typography>
      {reviews.map((review) => (
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

                  <Typography color="textPrimary" variant="h6">
                    {review.movie.title}
                  </Typography>
                  <Typography color="textPrimary">
                    {review.user.username}
                  </Typography>
                  <Typography>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                    ></Rating>
                  </Typography>
                  <Typography color="textPrimary">{review.body}</Typography>
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
      ))}
      <Divider variant="inset" component="li" />
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
};

export default FriendsReviews;
