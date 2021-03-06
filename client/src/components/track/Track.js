import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  formatDuration,
  getYear,
  parsePitchClass,
  catchErrors,
} from '../../utils';
import { getTrack, getTrackInfo } from '../../spotify';

import Loader from '../loader/Loader';
import FeatureChart from '../charts/FeatureChart';

import styled from 'styled-components/macro';
import { Theme, mixins, media, Main } from '../../style';
const { colors, fontSizes } = Theme;

const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;
  ${media.phablet`
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  `};
`;

const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 250px;
  margin-right: 40px;
  ${media.tablet`
    max-width: 200px;
  `};
  ${media.phablet`
    margin: 0 auto;
  `};
`;

const Info = styled.div`
  flex-grow: 1;
  ${media.phablet`
    text-align: center;
    margin-top: 30px;
  `};
`;

const PlayTrackButton = styled.a`
  ${mixins.greenButton};
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 5px;
  ${media.tablet`
    font-size: 30px;
  `};
`;

const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-weight: 700;
  text-align: left !important;
  ${media.tablet`
    font-size: 20px;
  `};
  ${media.phablet`
    text-align: center !important;
  `};
`;

const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
`;

const AlbumType = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
  text-transform: capitalize;
`;

const AudioFeatures = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
  border-top: 1px solid ${colors.grey};
  border-left: 1px solid ${colors.grey};
  ${media.thone`
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  `};
`;

const Feature = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
`;

const FeatureText = styled.h4`
  color: ${colors.lightestGrey};
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 0;
  ${media.tablet`
    font-size: 24px;
  `};
`;

const FeatureLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.xs};
  margin-bottom: 0;
`;

const DescriptionLink = styled.a`
  color: ${colors.lightestGrey};
  margin: 20px auto 0;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    color: ${colors.white};
    border-bottom: 1px solid ${colors.white};
  }
`;

class Track extends Component {
  static propTypes = {
    trackId: PropTypes.string,
  };

  state = {
    track: null,
    audioAnalysis: null,
    audioFeatures: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { trackId } = this.props;
    const { track, audioAnalysis, audioFeatures } = await getTrackInfo(trackId);
    this.setState({ track, audioAnalysis, audioFeatures });
  }

  render() {
    const { track, audioAnalysis, audioFeatures } = this.state;

    return (
      <React.Fragment>
        {track ? (
          <Main>
            <TrackContainer>
              <Artwork>
                <img src={track.album.images[0].url} alt='Album Artwork' />
              </Artwork>
              <Info>
                <Title>{track.name}</Title>
                <ArtistName>
                  {track.artists &&
                    track.artists.map(({ name, id }, index) => (
                      <a key={index} href={`/artist/${id}`}>
                        {name}
                        {track.artists.length > 0 &&
                        index === track.artists.length - 1
                          ? ''
                          : ','}
                        &nbsp;
                      </a>
                    ))}
                </ArtistName>
                <Album>
                  {' '}
                  {track.album.name} &middot;{' '}
                  {getYear(track.album.release_date)}
                </Album>
                <AlbumType>{track.album.album_type}</AlbumType>
                <PlayTrackButton
                  href={track.external_urls.spotify}
                  target='_blank'
                  el='noopener noreferrer'
                >
                  Play on Spotify
                </PlayTrackButton>
              </Info>
            </TrackContainer>
          </Main>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default Track;
