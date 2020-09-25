import styled from 'styled-components';
import { midnight } from '../styles/color';

const LayoutSection = styled.section`
  margin: 0 0 32px;
  padding: 0 16px;
`;

const LyricSection = styled.div`
  margin: 0 0 32px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xvi}%);
`;

export { LayoutSection, LyricSection };
