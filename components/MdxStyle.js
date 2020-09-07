import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';

import { familyDefault } from '../styles/font';

const Paragraph = styled.p`
  margin: 0 0 4px;
  font-family: ${ familyDefault };
  font-size: 1.6rem;
  font-weight: 400;
  line-height: ${ 28 / 16};
`;

function MdxStyle({ children }) {
  return(
    <MDXProvider
      components={{
        p: (props) => <Paragraph {...props} />
    }}>
      {children}
    </MDXProvider>
  )
};

export default MdxStyle;
