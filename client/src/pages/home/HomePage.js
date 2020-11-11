import React, { lazy } from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components/macro';
import { Theme, media } from '../../style';

const Navbar = lazy(() => import('../../components/navbar/Navbar'));
const User = lazy(() => import('../../components/user/User'));
const ScrollToTop = lazy(() => import('../../components/scroll/ScrollToTop'));
const RecentlyPlayed = lazy(() =>
  import('../../components/recentlyPlayed/RecentlyPlayed')
);
const TopArtists = lazy(() => import('../../components/topArtists/TopArtists'));
const TopTracks = lazy(() => import('../../components/topTracks/TopTracks'));
const Playlists = lazy(() => import('../../components/playlists/Playlists'));
const Playlist = lazy(() => import('../../components/playlists/Playlist'));
const Recommendations = lazy(() =>
  import('../../components/recommendations/Recommendations')
);
const Track = lazy(() => import('../../components/track/Track'));
const Artist = lazy(() => import('../../components/artist/Artist'));
const SearchArtist = lazy(() => import('../../components/artist/SearchArtist'));

const SiteWrapper = styled.div`
  padding-left: ${Theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

const HomePage = ({ darkMode }) => {
  return (
    <React.Fragment>
      <SiteWrapper>
        <Navbar {...{ darkMode }} />
        <Router primary={false}>
          <ScrollToTop path='/'>
            <User path='/' />
            <RecentlyPlayed path='recent' />
            <TopArtists path='artists' />
            <TopTracks path='tracks' />
            <SearchArtist path='/search/artist' />
            <Playlists path='playlists' />
            <Playlist path='playlists/:playlistId' />
            <Recommendations path='recommendations/:playlistId' />
            <Track path='track/:trackId' />
            <Artist path='/artist/:artistId' />
          </ScrollToTop>
        </Router>
      </SiteWrapper>
    </React.Fragment>
  );
};

export default HomePage;
