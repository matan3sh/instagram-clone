import React from 'react';
import Signup from '../Modal/Signup';
import { connect } from 'react-redux';
import { clearUser } from '../../store/Auth/actions';

import { Button } from '@material-ui/core';

const Header = ({ user, clearUser }) => {
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
  clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
