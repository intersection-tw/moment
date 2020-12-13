import styled from 'styled-components';
import { shade, midnight } from '../styles/color';

const Speak = styled.div`
  display: block;
  width: max-content;
  margin: 0 0 2px -4px;
  padding: 0 4px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-size: 1.4rem;
  line-height: ${(28 / 14)};
  background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.iii}%);
  border-radius: 8px;
`;

export { Speak };
