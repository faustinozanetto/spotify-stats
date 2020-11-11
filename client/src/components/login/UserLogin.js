import React from 'react';
import { accessUrl } from '../spotify/Spotify';

const UserLogin = () => {
  return (
    <React.Fragment>
      <img
        src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png'
        alt=''
      />
      <a href={accessUrl}>LOGIN WITH SPOTIFY</a>
    </React.Fragment>
  );
};

export default UserLogin;
