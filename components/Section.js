import React from 'react';
import styled from 'styled-components';

const SectionDiv = styled.div`
  margin: 0 0 24px;
`;

function Section({ children }) {
  return(
    <SectionDiv>
      {children}
    </SectionDiv>
  )
};

export default Section;
