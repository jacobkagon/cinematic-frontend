import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Header from './Header'


const token = localStorage.getItem('token')


 const UserProfile = () => {
  
  const currentUser = localStorage.getItem('user_id')
   
    let { user_id } = useParams();
 
    return (
        <div>
        <Header userId={user_id} currentUser={currentUser}/>
        </div>
    );
}

export default UserProfile
