import styled from 'styled-components';

import { midnight } from '../../styles/color';

const ArtistName = styled.h2`
  display: inline-block;
  margin: 0 0 6px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-weight: 400;
`;

export { ArtistName };
