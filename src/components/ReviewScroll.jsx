import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import deleteReview from "./deleteReview";
import {Link} from 'react-router-dom'
import UserProfile from './userProfile/UserProfile'
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors'


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
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ReviewScroll({ movieId }) {
  const classes = useStyles();
  const [movieReviews, handleMovieReviews] = useState("");

  useEffect(() => {
    //   error i'm getting is movieReviews is not a function.
    //You must create a ternary to prevent data from going to state.

    fetch(`http://localhost:3000/api/v1/movie_review/${movieId}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data === []) {
          console.log("no reviews");
        } else {
          handleMovieReviews(data)
        }
        } 
        
      )
  }, []);

  const filterReviews = (event) => {
    const newReviews = movieReviews.filter((review) => (
      review.id !== event
    ))
    handleMovieReviews([newReviews])
    // handleMovieReviews(newReviews)
  }

  const deleteReview = (event) => {
   fetch(`http://localhost:3000/api/v1/reviews/${event}`, {
   method: 'DELETE',
   headers: {Authorization: `Bearer ${token}`}
})
.then(filterReviews(event))

  }

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {movieReviews !== ""
          ? movieReviews.map((review, id) => (
              <GridListTile key={id}>
                <p>{review.body}</p>
{ review.user.id == localStorage.getItem('user_id') ?
                <Button color="secondary" value={review.id} onClick={(event) => deleteReview(event.currentTarget.value)}>
                  x
                </Button> : null

        }
               <Link to= {'/'+review.user.username+'/'+review.user.id}>
                <GridListTileBar
               
                  title=<Avatar className={classes.orange}>{review.user.username[0]}</Avatar>
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  
                  actionIcon={
                    <IconButton aria-label={`star ${review}`}>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                  }
                />
               </Link>
              </GridListTile>
            ))
          : null}
      </GridList>
    </div>
  );
}
