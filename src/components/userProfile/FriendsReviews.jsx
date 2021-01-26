import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import {Rating} from '@material-ui/lab'

const token = localStorage.getItem('token')

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
  
  const FriendsReviews = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [reviews, handleReviews] = useState([]);
  
    const handleClose = () => {
      setOpen(false);
     window.location.reload()
    };
  
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/followee_reviews', {
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        }).then(resp => resp.json())
        .then(data => handleReviews(data))
    }, []);
  
  
    const body = (
      <List className={classes.paper}>
        <h3 align="center" id="simple-modal-title">
          {reviews !== [] ? " Friends' Reviews" : "No Reviews"}
        </h3>
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
                  <h3>{review.movie.title}</h3>
                  <Typography>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                    ></Rating>
                  </Typography>
                  {review.body}
                  <Typography>
                    {review.created_at.split("-").splice(0, 1)}
                  </Typography>
                   
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
  
  export default FriendsReviews;
  