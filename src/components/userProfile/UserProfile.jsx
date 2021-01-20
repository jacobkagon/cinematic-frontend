import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Header from './Header'
import Container from '@material-ui/core/Container';


const token = localStorage.getItem('token')

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
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
    const classes = useStyles();
    let { user_id } = useParams();
    const [userData, handleUserData] = useState([])
    const [isOpen, handleisOpen] = useState(false)
    useEffect(() => {
        handleisOpen(true)
      }, );
    
    



    return (
        <div>
         <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      <Header userId={user_id}/>
       
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
