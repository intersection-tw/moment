import styled from 'styled-components';

import { midnight} from '../styles/color';
import { familyDefault } from '../styles/font';

const TitleGroup = styled.hgroup`
  margin: 0 16px 16px;
  padding-top: 16px;
  font-family: ${familyDefault};
`;

const Title = styled.h1`
  margin: 0 0 4px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-size: 3.2rem;
  font-weight: 500;
`;

const TitleDescription = styled.h2`
  margin: 0;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xvi}%);
  font-size: 1.4rem;
  font-weight: 400;
`;

export { TitleGroup, Title, TitleDescription };
