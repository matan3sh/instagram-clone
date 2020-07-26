import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/Auth/actions';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Signin = ({ signIn }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    signIn(email, password);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup' onSubmit={onSubmit}>
            <center>
              <img
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='instagram-logo'
                className='app__headerImage'
              />
            </center>

            <Input
              placeholder='Email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit'>Sign In</Button>
          </form>
        </div>
      </Modal>
      <Button onClick={() => setOpen(true)}>Sign In</Button>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  signIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
