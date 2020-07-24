import React, { useEffect } from 'react';
import { auth } from '../../config/firebase';
import { connect } from 'react-redux';
import { clearUser, setUser } from '../../store/Auth/actions';

import Signup from '../Modal/Signup';

import { Button } from '@material-ui/core';

const Header = ({ user, clearUser, setUser }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser);
      else clearUser();
    });
    return () => {
      unsubscribe();
    };
  }, [user, clearUser, setUser]);

  return (
    <div className='app__header'>
      <img
        src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
        alt='instagram-logo'
        className='app__headerImage'
      />
      {user ? (
        <Button onClick={() => clearUser()}>Logout</Button>
      ) : (
        <div className='app__loginContainer'>
          <Signup />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  clearUser,
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
