import React, { lazy } from 'react';
import styled from 'styled-components/macro';
import { Theme, mixins, Main } from '../../style';
import { IconSpotify } from '../../components/icons';
const { colors, fontSizes } = Theme;

const Footer = lazy(() => import('../../components/track/Track'));

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://spotify-profile.herokuapp.com/login';

const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: ${fontSizes.xxl};
    color: ${colors.white};
  }
  h2 {
    font-size: ${fontSizes.l};
    color: ${colors.blue};
  }
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.offGreen};
  }
`;

const Logo = styled.div`
  color: ${colors.green};
  margin-bottom: 10px;
  width: 125px;
  height: 125px;
  transition: ${Theme.transition};
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
  svg {
    width: 125px;
  }
`;

const LoginPage = () => {
  return (
    <React.Fragment>
      <Login>
        <Logo>
          <IconSpotify />
        </Logo>
        <h1>🚀 Spotify Stats 🚀</h1>
        <h2>Access Spotify Profile</h2>
        <LoginButton href={LOGIN_URI}>Log in to Spotify</LoginButton>
      </Login>
      <Footer />
    </React.Fragment>
  );
};

export default LoginPage;
