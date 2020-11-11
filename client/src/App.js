import React, { lazy, useState, Suspense } from 'react';
import styled from 'styled-components/macro';
import { GlobalStyle } from './style';
import { spotifyToken } from './spotify';
import useDarkMode from 'use-dark-mode';
import './App.css';

//Pages
const HomePage = lazy(() => import('./pages/home/HomePage'));
const LoginPage = lazy(() => import('./pages/login/LoginPage'));

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const App = () => {
  const darkMode = useDarkMode(false);
  const [token] = useState(spotifyToken);

  return (
    <AppContainer>
      <GlobalStyle />
      <Suspense fallback={<div />}>
        {token ? (
          <HomePage {...{ darkMode }} />
        ) : (
          <LoginPage {...{ darkMode }} />
        )}
      </Suspense>
    </AppContainer>
  );
};
export default App;
