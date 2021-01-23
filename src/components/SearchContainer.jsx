import React, {useEffect, useState} from 'react';
import SearchBar from "material-ui-search-bar";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { URL_IMG, IMG_SIZE_LARGE } from "../const";
import {Link} from 'react-router-dom'


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '90%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '100%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  const cards = [1,2, 3, 4 ,5]

const SearchContainer = () => {
    const classes = useStyles();
    const [input, handleInput] = useState("")
    const [movieData, handleMovieData] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=5a9cf113085e6d11351ca2f692a38bde&language=en-US&query=${input}&page=1&include_adult=false`)
        .then(resp => resp.json())
        .then(data => data.errors ? null : handleMovieData(data.results))
    }, [input]);
    return (
        <div>
        <SearchBar
    value={input}
    onChange={(newInput) => handleInput(newInput)}
    onRequestSearch={() => console.log("hello")}
  />
  { input !== "" && movieData !== undefined ?
  <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {movieData.map((movie, id) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <Link to={'/movie/'+movie.id}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={URL_IMG + IMG_SIZE_LARGE + movie.poster_path}
                    title={movie.title}
                  />
                  </Link>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4" component="h2">
                      {movie.title}
                    </Typography>
                   
                    
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> : null
  }
            
        </div>
    );
}

export default SearchContainer;