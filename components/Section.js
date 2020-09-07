import React from 'react';
import styled from 'styled-components';
import { midnight } from '../styles/color';

const SectionDiv = styled.div`
  margin: 0 0 24px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xvi}%);
`;

function Section({ children }) {
  return(
    <SectionDiv>
      {children}
    </SectionDiv>
  )
};

export default Section;
