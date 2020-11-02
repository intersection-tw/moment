import styled from 'styled-components';

import { dawn } from '../styles/color';
import { familyDefault } from '../styles/font';

import { LayoutSection } from './Section';

const MomentIndex = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  max-width: 1080px;
  margin: 0 auto;
  padding: 0;
`;

const MomentIndexItem = styled.li`
  padding: 0 16px;
  list-style: none;


  @media screen and (min-width: 992px) {
    padding: 0;
  }
`;

const SongsOfArtistList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin: 0 0 16px;
  padding: 0;
  font-family: ${familyDefault};

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

export { MomentIndex, MomentIndexItem, SongsOfArtistList, SongItem, SongLink, SongName };
