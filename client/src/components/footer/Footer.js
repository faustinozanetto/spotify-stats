import React from 'react';
import styled from 'styled-components/macro';
import { theme, mixins } from '../../style';
const { colors } = theme;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

  h4 {
    color: ${colors.lightestGrey};
    font-weight: 500;
    padding-bottom: 0;
  }

  h5 {
    color: ${colors.lightestGrey};
    padding-top: 0;
    font-weight: 400;
  }
`;

const Footer = () => {
  return (
    <React.Fragment>
      <FooterContainer>
        <h4>Made by Retrosen with ❤</h4>
        <h5>2020</h5>
      </FooterContainer>
    </React.Fragment>
  );
};

export default Footer;
