import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FollowerModal from "./FollowerModal";
import FollowingModal from "./FolloweesModal";
import UserWatchlist from "./UserWatchlist";
import SettingsIcon from "@material-ui/icons/Settings";
import UserReviews from "./UserReviews";
import FriendsReviews from "./FriendsReviews";

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
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { userId, currentUser } = props;
  const [userData, handleUserData] = useState([]);
  const [isFollowing, handleIsFollowing] = useState(false);
  const [followerModal, handleFollowerModal] = useState(false);
  const [followingModal, handleFollowingModal] = useState(false);
  const [userReviews, handleUserReviews] = useState(false);
  const [friendsReviews, handleFriendsReviews] = useState(false);

  useEffect(() => {
    let followerIds = [];
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        handleUserData(data);
        data.followers.map((follower) => followerIds.push(follower.id));
        followerIds.includes(+currentUser)
          ? handleIsFollowing(true)
          : handleIsFollowing(false);
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
    window.location.reload();
  };

  const unfollowUser = () => {
    fetch(`http://localhost:3000/api/v1/friendships/${currentUser}/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    handleIsFollowing("Follow");
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Paper
        className={classes.mainFeaturedPost}
        style={{ backgroundImage: null }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} src="" alt="" />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              {userId != currentUser ? (
                isFollowing ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => unfollowUser()}
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => followUser()}
                  >
                    Follow
                  </Button>
                )
              ) : null}

              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {userData.username}{" "}
                {/* {userId === currentUser ? <SettingsIcon /> : null} */}
              </Typography>

              <Typography variant="h5" color="inherit">
                <Link color="inherit" onClick={() => handleFollowerModal(true)}>
                  {userData.followers_count} Followers
                </Link>
              </Typography>

              <Typography variant="h5" color="inherit">
                <Link
                  color="inherit"
                  onClick={() => handleFollowingModal(true)}
                >
                  {userData.followee_count} Following
                </Link>
              </Typography>
              <Typography variant="h5" color="inherit">
                <Link color="inherit" onClick={() => handleUserReviews(true)}>
                  {currentUser === userId ? "Your Reviews" : "Reviews" }
                </Link>
              </Typography>
              {currentUser === userId ? (
                <Typography variant="h5" color="inherit">
                  <Link
                    color="inherit"
                    onClick={() => handleFriendsReviews(true)}
                  >
                    Friends Reviews
                  </Link>
                </Typography>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </Paper>
      {followerModal === true ? (
        <FollowerModal followers={userData.followers} />
      ) : null}
      {followingModal === true ? (
        <FollowingModal followees={userData.followees} />
      ) : null}
      {userReviews === true ? (
        <UserReviews
          currentUser={userId}
          userId={currentUser}
          reviews={userData.reviews}
        />
      ) : null}
      {friendsReviews === true ? <FriendsReviews /> : null}
      {userData.watchlists ? (
        <UserWatchlist userId={userId} watchlists={userData.watchlists} />
      ) : null}
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
