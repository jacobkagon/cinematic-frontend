import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Rating} from '@material-ui/lab'
import Link from '@material-ui/core/Link'

const token = localStorage.getItem('token')

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function FolloweeReviews() {
  const [followeeReviews, handleReviews] = useState([])
  const classes = useStyles();

  useEffect(() => {
      fetch('http://localhost:3000/api/v1/followee_reviews', {
          method: 'GET',
          headers: {Authorization: `Bearer ${token}`}
      }).then(resp => resp.json())
      .then(data => handleReviews(data))
  }, []);

  return (
    <List className={classes.root}>
    {followeeReviews.map(review => (
      <ListItem key={review.id} alignItems="flex-start">
        <ListItemAvatar>
        <Link color="inherit" href={`/${review.user.username}/${review.user.id}`}>
          <Avatar alt={review.user.username[0]} src="/static/images/avatar/1.jpg" />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={review.movie.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {review.user.username}
              </Typography>
             : {review.body}
             <Typography>
             <Rating name="read-only" value={review.rating} readOnly></Rating>
             </Typography>
             <Typography>{review.created_at.split("-").splice(0, 1)}</Typography>


            </React.Fragment>
          }
        />
      </ListItem>
     
    ))}
    <Divider variant="inset" component="li" />
    </List>
  );
}
