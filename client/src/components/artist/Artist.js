import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatWithCommas, catchErrors } from '../../utils';
import {
  getArtist,
  followArtist,
  doesUserFollowArtist,
  getArtistTopTracks,
} from '../../spotify';
import Loader from '../loader/Loader';
import styled from 'styled-components/macro';
import { Theme, mixins, media, Main } from '../../style';

const { colors, fontSizes, spacing } = Theme;

const ArtistContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  height: 100%;
  text-align: center;
`;

const Artwork = styled.div`
  ${mixins.coverShadow};
  border-radius: 100%;
  img {
    object-fit: cover;
    border-radius: 100%;
    width: 300px;
    height: 300px;
    ${media.tablet`
      width: 200px;
      height: 200px;
    `};
  }
`;

const ArtistName = styled.a`
  font-size: 70px;
  font-weight: 700;
  margin-top: ${spacing.md};
  ${media.tablet`
    font-size: 7vw;
  `};
`;

const ArtistDescription = styled.p`
  font-size: 15px;
  display: flex;
  font-weight: 300;
  margin-top: ${spacing.sm};
  ${media.tablet`
    font-size: 7vw;
  `};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: ${spacing.md};
  text-align: center;
`;

const Stat = styled.div``;

const Number = styled.div`
  color: ${colors.blue};
  font-weight: 700;
  font-size: ${fontSizes.lg};
  text-transform: capitalize;
  ${media.tablet`
    font-size: ${fontSizes.md};
  `};
`;

const Genre = styled.div`
  font-size: ${fontSizes.md};
`;

const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;

const FollowButton = styled.button`
  ${mixins.greenButton};
  margin-top: 50px;
  padding: 12px 50px;
  background-color: ${(props) =>
    props.isFollowing ? 'transparent' : colors.green};
  border: 1px solid ${(props) => (props.isFollowing ? 'white' : 'transparent')};
  pointer-events: ${(props) => (props.isFollowing ? 'none' : 'auto')};
  cursor: ${(props) => (props.isFollowing ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.isFollowing ? 'transparent' : colors.offGreen};
  }
`;

class Artist extends Component {
  static propTypes = {
    artistId: PropTypes.string,
  };

  state = {
    artist: null,
    artistTopTracks: null,
    isFollowing: null,
  };

  componentDidMount() {
    catchErrors(this.getData());
    catchErrors(this.isFollowing());
  }

  async getData() {
    const { artistId } = this.props;
    const { data } = await getArtist(artistId);
    const { topTracks } = await getArtistTopTracks(artistId);
    this.setState({ artist: data });
    this.setState({ artistTopTracks: topTracks });
  }

  isFollowing = async () => {
    const { artistId } = this.props;
    const { data } = await doesUserFollowArtist(artistId);
    this.setState({ isFollowing: data[0] });
  };

  follow = async () => {
    const { artistId } = this.props;
    await followArtist(artistId);
    this.isFollowing();
  };

  render() {
    const { artist, artistTopTracks, isFollowing } = this.state;

    return (
      <React.Fragment>
        {artist ? (
          <ArtistContainer>
            <Artwork>
              <img src={artist.images[0].url} alt='Artist Artwork' />
            </Artwork>
            <div>
              <ArtistName
                href={artist.external_urls.spotify}
                target='_blank'
                rel='noopener noreferrer'
              >
                {artist.name}
              </ArtistName>
              <ArtistDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quam
                beatae, blanditiis alias omnis asperiores similique pariatur
                fugit, sed, iure eligendi saepe tempore? Recusandae fugiat
                molestias maiores ratione quis, eius nam quisquam atque pariatur
                officia, similique nemo minima dolorum. Quae eos possimus ea
                iusto dolorem illo adipisci dicta doloremque? Natus repudiandae,
                dicta numquam maxime similique, sint deserunt consequuntur,
                possimus eligendi quo quisquam? Deleniti obcaecati quasi
                aspernatur at hic nostrum iste quo nam reiciendis ut dolorem
                amet rem perferendis delectus repellendus asperiores praesentium
                laborum, nobis possimus, quaerat nesciunt? Sit id delectus vitae
                possimus veniam ipsum nisi, voluptatibus facilis perspiciatis
                omnis nulla.
              </ArtistDescription>
              <Stats>
                <Stat>
                  <Number>{formatWithCommas(artist.followers.total)}</Number>
                  <NumLabel>Followers</NumLabel>
                </Stat>
                {artist.genres && (
                  <Stat>
                    <Number>
                      {artist.genres.map((genre) => (
                        <Genre key={genre}>{genre}</Genre>
                      ))}
                    </Number>
                    <NumLabel>Genres</NumLabel>
                  </Stat>
                )}
                {artist.popularity && (
                  <Stat>
                    <Number>{artist.popularity}%</Number>
                    <NumLabel>Popularity</NumLabel>
                  </Stat>
                )}
              </Stats>
            </div>
            <FollowButton
              isFollowing={isFollowing}
              onClick={catchErrors(this.follow)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </FollowButton>
            {artistTopTracks ? (
              artistTopTracks.map((track, index) => <h1 key={index}>1</h1>)
            ) : (
              <Loader />
            )}
          </ArtistContainer>
        ) : (
          <Loader />
        )}
      </React.Fragment>
    );
  }
}

export default Artist;
