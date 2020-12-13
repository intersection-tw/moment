import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';

import { familyDefault } from '../styles/font';

import { LyricSection } from './Section';
import { Speak } from './Indicator';

const Paragraph = styled.p`
  margin: 0 0 10px;
  font-family: ${ familyDefault };
  font-size: 1.8rem;
  font-weight: 400;
  line-height: ${ 24 / 18};
`;

function MdxStyle({ children }) {
  return(
    <MDXProvider
      components={{
        p: (props) => <Paragraph {...props} />,
        LyricSection: (props) => <LyricSection {...props} />,
        Speak: (props) => <Speak {...props} />
    }}>
      {children}
    </MDXProvider>
  )
};

export { Paragraph };

export default MdxStyle;
