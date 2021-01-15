import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));







export default function AddReviewModal({open, closeModal, title, poster, movieId}) {
  const classes = useStyles();



useEffect(() => {
   const data = {}
   data.title = title
   data.poster = poster
   data.movie_id = movieId
   
   
    fetch("http://localhost:3000/api/v1/movies", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: title,
            poster: poster,
            movie_id: movieId
        })
    }).then(resp => resp.json())
    .then(dataArr => console.log(dataArr))

}, [])

  const handleClose = () => {
    closeModal(false);
  };

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
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}