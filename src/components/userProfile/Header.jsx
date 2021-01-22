import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const token = localStorage.getItem("token");


const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { userId, sections, title, currentUser} = props;
  const [userData, handleUserData] = useState([]);
  const [userFollowers, handleUserFollowers] = useState([]);
  const [isFollowing, handleIsFollowing] = useState(false)

  useEffect(() => {
    let followerIds = []
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        handleUserData(data);
        handleUserFollowers(data.followers);
        data.followers.map(follower => followerIds.push(follower.id))
        followerIds.includes(+currentUser) ? handleIsFollowing(true) : handleIsFollowing(false)
      });
  }, []);

  const followUser = () => {
    fetch(`http://localhost:3000/api/v1/friendships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        follower_id: currentUser,
        followee_id: userId,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
      window.location.reload()
  };

  const unfollowUser = () => {
    fetch(`http://localhost:3000/api/v1/friendships/${currentUser}/${userId}`, {
      method: 'DELETE',
      headers: {Authorization: `Bearer ${token}`}
    })
    handleIsFollowing("Follow")
    window.location.reload()
  }

  return (
    <React.Fragment>
    {userId != currentUser ? 

       isFollowing  ?
        <Button size="small" color='primary' onClick={() => unfollowUser() }>Following</Button> :
        <Button size="small" color='secondary' onClick={() => followUser() }>Follow</Button> 
      
      
     : null
    } 
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          
          noWrap
          className={classes.toolbarTitle}
        >
          {userData.username}
        </Typography>
        {userData.followers_count} Followers
      

      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      ></Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
