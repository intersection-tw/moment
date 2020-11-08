import styled from 'styled-components';

import { midnight } from '../../styles/color';
import { familyDefault } from '../../styles/font';

const ArtistName = styled.h2`
  display: inline-block;
  margin: 0 0 6px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-family: ${familyDefault};
  font-weight: 400;
`;

export { ArtistName };
