import React, { Component, lazy } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { getPlaylist, getAudioFeaturesForTracks } from '../../spotify';
import { catchErrors, formatWithCommas } from '../../utils';

import Loader from '../loader/Loader';
import TrackItem from '../trackItem/TrackItem';
import styled from 'styled-components/macro';
import { Theme, mixins, media, Main } from '../../style';

const FeatureChart = lazy(() => import('../../components/charts/FeatureChart'));

const { colors, fontSizes, spacing } = Theme;

const PlaylistContainer = styled.div`
  display: flex;
  ${media.tablet`
    display: block;
  `};
`;

const Left = styled.div`
  width: 30%;
  text-align: center;
  min-width: 200px;
  ${media.tablet`
    width: 100%;
    min-width: auto;
  `};
`;

const Right = styled.div`
  flex-grow: 1;
  margin-left: 50px;
  ${media.tablet`
    margin: 50px 0 0;
  `};
`;

const PlaylistCover = styled.div`
  ${mixins.coverShadow};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  ${media.tablet`
    display: none;
  `};
`;

const Name = styled.h3`
  font-weight: 700;
  font-size: ${fontSizes.xl};
  margin-top: 20px;
`;

const Description = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  padding: 5px;
  a {
    color: ${colors.white};
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;

const RecButton = styled(Link)`
  ${mixins.greenButton};
  margin-bottom: ${spacing.lg};
`;

const Owner = styled.a`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  cursor: pointer;
`;

const TotalTracks = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.white};
  /* padding: 5px; */
`;

const TotalFollowers = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.white};
  /* padding: 5px; */
`;

class Playlist extends Component {
  static propTypes = {
    playlistId: PropTypes.string,
  };

  state = {
    playlist: null,
    tracks: null,
    audioFeatures: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playlistId } = this.props;
    const { data } = await getPlaylist(playlistId);
    this.setState({ playlist: data });

    if (data) {
      const { playlist } = this.state;
      const { data } = await getAudioFeaturesForTracks(playlist.tracks.items);
      this.setState({ audioFeatures: data });
    }
  }

  render() {
    const { playlist, audioFeatures } = this.state;

    return (
      <React.Fragment>
        {playlist ? (
          <Main>
            <PlaylistContainer>
              <Left>
                {playlist.images.length && (
                  <PlaylistCover>
                    <img src={playlist.images[0].url} alt='Album Art' />
                  </PlaylistCover>
                )}
                <a
                  href={playlist.external_urls.spotify}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Name>{playlist.name}</Name>
                </a>
                <Owner
                  href={playlist.owner.external_urls.spotify}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  By {playlist.owner.display_name}
                </Owner>
                {playlist.description && (
                  <Description
                    dangerouslySetInnerHTML={{ __html: playlist.description }}
                  />
                )}
                <TotalTracks>
                  {formatWithCommas(playlist.tracks.total)} Tracks
                </TotalTracks>
                <TotalFollowers>
                  {formatWithCommas(playlist.followers.total)} Followers
                </TotalFollowers>
                <RecButton to={`/recommendations/${playlist.id}`}>
                  Get Recommendations
                </RecButton>
              </Left>
              <Right>
                <ul>
                  {playlist.tracks &&
                    playlist.tracks.items.map(({ track }, index) => (
                      <TrackItem track={track} key={index} />
                    ))}
                </ul>
              </Right>
            </PlaylistContainer>
          </Main>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default Playlist;
