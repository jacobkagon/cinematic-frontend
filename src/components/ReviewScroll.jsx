import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
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
  const [movieReviews, handleMovieReviews] = useState([1, 2, 3]);

  useEffect(() => {
    //   error i'm getting is movieReviews is not a function. 
    //You must create a ternary to prevent data from going to state.
    
    fetch(`http://localhost:3000/api/v1/movie_review/${movieId}`)
      .then((resp) => resp.json())
      .then((data) => handleMovieReviews(data)); 
  }, []);

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {movieReviews !== ""
          ? movieReviews.map((review, id) => (
              <GridListTile key={id}>
                <p>{review.body}</p>
                <GridListTileBar
                  //   title={review.user.username}
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
              </GridListTile>
            ))
          : null}
      </GridList>
    </div>
  );
}
