import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { deepOrange } from "@material-ui/core/colors";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import { Rating } from "@material-ui/lab";
import Link from "@material-ui/core/Link";
const token = localStorage.getItem("token");


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  modal: {
    alignItems: "center",
    justifyContent: "center",
   
    position:'absolute',
   
    display: 'grid',
    overflow:'scroll',

  },
}));

const UserReviews = ({ handleUserReviews,currentUser, userId }) => {
   let date = ""
  let newDate = ""
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [reviews, handleReviews] = useState([]);
  const [deleteReviews, handleDeleteReviews] = useState(false)

  const handleClose = () => {
    setOpen(false);
    handleUserReviews(false)
  };

  useEffect(() => {
    fetch(`https://cinematic-backend.herokuapp.com/api/v1/user_reviews/${currentUser}`)
      .then((resp) => resp.json())
      .then((data) => handleReviews(data));
  }, []);

  const deleteReview = (event) => {
    fetch(`https://cinematic-backend.herokuapp.com/api/v1/reviews/${event}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    handleDeleteReviews(true)
  };

  const body = (
    
    <List className={classes.paper}>
      <Typography
        variant="h5"
        color="textPrimary"
        align="center"
        id="simple-modal-title"
      >
        {reviews.length !== 0 ? "Reviews" : "No Reviews"}
      </Typography>
      {reviews.map((review) => (
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
                 <Link href={'/movie/'+review.movie.movie_id}>
                <Typography color="textPrimary" variant="h6">
                  {review.movie.title}
                </Typography>
                </Link>
                <Typography>
                  <Rating
                    name="read-only"
                    value={review.rating}
                    readOnly
                  ></Rating>
                </Typography>
                <Typography color='textPrimary'>
                {review.body}
                </Typography>
                <Typography color='textPrimary'>
                  {new Date(review.created_at).toDateString()}
                </Typography>
                {userId === currentUser ? (
                  <Typography
                    id={review.id}
                    onClick={(event) => deleteReview(event.currentTarget.id)}
                    color="secondary"
                  >
                    Delete
                  </Typography>
                ) : null}
              </React.Fragment>
            }
          />
        </ListItem>
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

export default UserReviews;
