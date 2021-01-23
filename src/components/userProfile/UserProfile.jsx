import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(4),
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
      position: 'relative',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        paddingRight: 0,
      },
    },
  }));

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
        <Header userId={user_id} currentUser={currentUser}/>
        </div>
    );
}

export default UserProfile
