import styled from 'styled-components';

import { midnight } from '../../styles/color';

const Year = styled.span`
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xi}%);
  font-size: 1.4rem;
  font-weight: 300;
  vertical-align: baseline;
`;

export { Year };
