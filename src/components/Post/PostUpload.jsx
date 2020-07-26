import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from '@material-ui/core';

// Prograss Bar
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

// Camera Icon+Input
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

// DB
import firebase from 'firebase';
import { storage, db } from '../../config/firebase';

// Style
import '../../style/PostUpload.css';

function LinearProgressWithLabel(props) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='textSecondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

const PostUpload = ({ user }) => {
  const classes = useStyles();

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePostUpload = () => {
    if (image === null) return;
    // Upload to firebase storage
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setShowProgress(true);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Post The Image Inside The DataBase
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: user.displayName
            });
            setProgress(0);
            setCaption('');
            setImage(null);
            setShowProgress(false);
          });
      }
    );
  };

  return (
    <div className='postupload'>
      {showProgress ? (
        <div className={classes.root}>
          <LinearProgressWithLabel value={progress} />
        </div>
      ) : (
        <>
          <div className='postupload__header'>
            <Input
              type='text'
              placeholder='Enter a Caption ...'
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            />
            <div className='postupload__body'>
              <input
                type='file'
                id='icon-button-file'
                onChange={handleChange}
              />
              <label htmlFor='icon-button-file'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Button
                onClick={handlePostUpload}
                variant='outlined'
                color='primary'
              >
                Upload
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostUpload);
