import styled from 'styled-components';

import { dawn } from '../styles/color';
import { familyDefault } from '../styles/font';

import { LayoutSection } from './Section';

const MomentIndex = styled.ul`
  margin: 0;
  padding: 0;

  @media screen and (min-width: 992px) {
    padding: 16px 0;
  }
`;

const MomentIndexItem = styled.li`
  margin-bottom: 8px;
  padding: 0;
  list-style: none;

  @media screen and (min-width: 992px) {
    padding: 0;
  }
`;

const SongsOfArtistList = styled.ul`
  display: grid;
  grid-area: list;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  align-content: start;
  column-gap: 16px;
  margin: 0 0 16px;
  padding: 0;
  font-family: ${familyDefault};

  :last-of-type {
    margin: 0;
  }
`;

const SongItem = styled.li`
  margin-bottom: 12px;
  font-size: 0;
  list-style: none;
`;

const SongLink = styled.a`
  display: inline-block;
  padding: 0 0 4px;
  text-decoration: none;
`;

const SongName = styled.span`
  display: inline-block;
  color: hsl(${dawn.h}, ${dawn.s}%, ${dawn.l}%);
  font-size: 2rem;
  line-height: ${ 30 / 20 };
  vertical-align: baseline;
`;

export { MomentIndex, MomentIndexItem, SongsOfArtistList, SongItem, SongLink, SongName };
