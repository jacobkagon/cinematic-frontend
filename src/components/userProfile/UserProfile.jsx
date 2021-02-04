import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Header from './Header'
import Paper from "@material-ui/core/Paper";



const token = localStorage.getItem('token')


 const UserProfile = () => {
  
  const currentUser = localStorage.getItem('user_id')
   
    let { user_id } = useParams();
 
    return (
        <Paper>
        <div>
        <Header userId={user_id} currentUser={currentUser}/>
        </div>
       </Paper>
    );
}

export default UserProfile
