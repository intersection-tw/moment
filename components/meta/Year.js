import styled from 'styled-components';

import { midnight } from '../../styles/color';

const Year = styled.span`
  display: inline-block;
  margin-left: 8px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xi}%);
  font-size: 1.4rem;
  font-weight: 300;
`;

export { Year };
