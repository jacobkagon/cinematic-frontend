import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));



const FollowingModal = ({ handleFollowingModal, followees }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
   handleFollowingModal(false)
  };

  const body = (
    <List className={classes.paper}>
      <Typography color='textPrimary'variant='h5' id="simple-modal-title">Following</Typography>
     
        {followees.map((followee) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.orange}>{followee.username[0]}</Avatar>
            </ListItemAvatar>

            <Link color="inherit" href={`/${followee.username}/${followee.id}`}>
              <Typography color='textPrimary'  >{followee.username}</Typography>
            </Link>
          </ListItem>
        ))}
       <Divider variant="inset" component="li"/>
    </List>
  );
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{body}</Fade>
      </Modal>
    </div>
  );
};

export default FollowingModal;
