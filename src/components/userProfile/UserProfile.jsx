import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Header from './Header'
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Rating} from '@material-ui/lab'


const token = localStorage.getItem('token')

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

  const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageText: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageText: 'Image Text',
    },
  ];

 const UserProfile = () => {
  const currentUser = localStorage.getItem('user_id')
    const classes = useStyles();
    let { user_id } = useParams();
    const [userData, handleUserData] = useState([])
    const [isOpen, handleisOpen] = useState(false)
    const [reviews, handleReviews] = useState([])
    useEffect(() => {
        handleisOpen(true)
    });

    useEffect(() => {
      fetch(`http://localhost:3000/api/v1/users/${currentUser}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(resp => resp.json())
      .then(data => handleReviews([data.reviews]))

    }, [])




    return (
        <div>
         <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      <Header userId={user_id} currentUser={currentUser}/>
       
        <main>
          <Grid container spacing={4}>
            
            
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            
            
          </Grid>
        </main>
      </Container>

    </React.Fragment>
         
        </div>
    );
}

export default UserProfile
