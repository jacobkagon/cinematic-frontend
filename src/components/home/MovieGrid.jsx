import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";

import GridListTileBar from "@material-ui/core/GridListTileBar";
import InfoIcon from "@material-ui/icons/Info";

import Link from "@material-ui/core/Link";

import { URL_IMG, IMG_SIZE_LARGE } from "../../const";

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
    width: 900,
    height: 320,
  },
  gridListTile: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: 900,
    height: 320,
    display: "flex",
    borderRadius: "20%",
  },

  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function MovieGrid({ movies }) {
  const classes = useStyles();
  const [movieShow, handleMovieShow] = React.useState(false);

  const body = "hello";

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={4.5}>
        {movies.map((movie, id) => (
          <GridListTile key={id} style={{ height: "300px" }}>
            <Link href={"/movie/" + movie.id}>
              <img
                src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path}
                alt={movie.title}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
