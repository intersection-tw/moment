import styled from 'styled-components';

import { dawn } from '../styles/color';
import { familyDefault } from '../styles/font';

import { LayoutSection } from './Section';

const MomentIndex = styled(LayoutSection)`
  font-family: ${familyDefault};

  @media screen and (min-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    max-width: 960px;
    margin: 0 auto;
  }
`;

const MomentIndexItem = styled.li`
  margin: 0;
  list-style: none;

  @media screen and (min-width: 992px) {
    flex: 0 0 50%;
  }
`;

const SongsList = styled.ul`
  margin: 0 0 16px;
  padding: 0;

  :last-of-type {
    margin: 0;
  }
`;

const SongItem = styled.li`
  margin-bottom: 12px;
  list-style: none;
`;

const SongLink = styled.a`
  display: inline-block;
  padding: 4px 0;
  text-decoration: none;
`;

const SongName = styled.span`
  display: inline-block;
  margin-right: 8px;
  color: hsl(${dawn.h}, ${dawn.s}%, ${dawn.l}%);
  font-size: 2rem;
  line-height: ${ 30 / 20 };
  vertical-align: baseline;
`;

export { MomentIndex, MomentIndexItem, SongsList, SongItem, SongLink, SongName };
