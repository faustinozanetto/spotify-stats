import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getArtistByInput, getTopArtistsLong } from '../../spotify';
import { catchErrors } from '../../utils';

import { IconInfo } from '../icons';
import Loader from '../loader/Loader';

import styled from 'styled-components/macro';
import { Theme, mixins, media, Main } from '../../style';
const { colors, fontSizes, spacing } = Theme;

const Header = styled.header`
  ${mixins.flexBetween};
  ${media.tablet`
    display: block;
  `};
  h2 {
    margin: 0;
  }
`;

const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;

const ArtistInput = styled.input``;

// const SearchButton = styled(Link)`
//   ${mixins.button};
//   text-align: center;
//   white-space: nowrap;
//   ${media.phablet`
//     padding: 11px 20px;
//     font-sizes: ${fontSizes.xs};
//   `};
// `;

const SearchButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 100%;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${Theme.transition};
  svg {
    width: 25px;
  }
`;

const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  ${media.tablet`
    width: 150px;
    height: 150px;
  `};
  ${media.phablet`
    width: 120px;
    height: 120px;
  `};
  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 200px;
    height: 200px;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
    ${media.phablet`
      width: 120px;
      height: 120px;
    `};
  }
`;

class SearchArtist extends Component {
  state = {
    searchedArtist: null,
  };

  // apiCalls = {
  //   searched: getArtistByInput(),
  // };

  // componentDidMount() {
  //   catchErrors(this.getData());
  // }

  // async getData() {
  //   const { data } = await getArtistByInput();
  //   this.setState({ searchedArtist: data });
  // }

  render() {
    const { searchedArtist } = this.state;

    return (
      <React.Fragment>
        <Main>
          <Header>
            <h2>Search an Artist</h2>
            <ArtistInput type='text' placeholder='Artist Name'></ArtistInput>
            <SearchButton>Search</SearchButton>
          </Header>
          <ArtistsContainer>
            {searchedArtist ? (
              searchedArtist.items.map(
                ({ id, external_urls, images, name }, index) => (
                  <Artist key={index}>
                    <ArtistArtwork to={`/artist/${id}`}>
                      {images.length && (
                        <img src={images[1].url} alt='Artist' />
                      )}
                    </ArtistArtwork>
                  </Artist>
                )
              )
            ) : (
              <Loader />
            )}
          </ArtistsContainer>
        </Main>
      </React.Fragment>
    );
  }
}

export default SearchArtist;
