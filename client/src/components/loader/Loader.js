import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { Theme, mixins } from '../../style';
const { colors } = Theme;

const Container = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  height: 90vh;
`;

const Dance = keyframes`
  from {
    height: 10px;
  }
  to {
    height: 100%;
  }
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Bar = styled.div`
  width: 10px;
  height: 5px;
  margin: 0 2px;
`;

const Loader = () => {
  return (
    <React.Fragment>
      <Container>
        <Bars>
          <Bar delay='250ms' />
          <Bar delay='715ms' />
          <Bar delay='475ms' />
          <Bar delay='25ms' />
          <Bar delay='190ms' />
        </Bars>
      </Container>
    </React.Fragment>
  );
};

export default Loader;
