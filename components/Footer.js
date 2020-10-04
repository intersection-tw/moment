import { getFontDefinitionFromNetwork } from 'next/dist/next-server/server/font-utils';
import React from 'react';
import styled from 'styled-components';

import { midnight } from '../styles/color';
import { familyDefault } from '../styles/font';

import { LayoutSection } from './Section';

const FooterContainer = styled(LayoutSection)`
  padding-bottom: 32px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xi}%);
  font-family: ${familyDefault};
`;

const Name = styled.h2`
  font-size: 1.6rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

function Footer() {
  return(
    <FooterContainer as="footer">
      <Name>Moment 是練習作品</Name>
      <Description>此網站上所有歌詞與電影、影劇的智慧財產權皆屬於原作者。</Description>
    </FooterContainer>
  );
}

export default Footer;
