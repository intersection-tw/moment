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

  @media screen and (min-width: 992px) {
    max-width: 1080px;
    margin: 0 auto;
  }
`;

const MomentLogo = styled.img`
  width: 16px;
  height: 16px;
`;

const Name = styled.h2`
  display: flex;
  font-size: 1.6rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

const Made = styled.span`
  font-size: 1.2rem;
`;

const MapTaiwan = styled.img`
  width: 16px;
  height: 20px;
  margin-right: 8px;
  margin-left: -2px;
  vertical-align: text-bottom;
  object-fit: cover;
`;

function Footer() {
  return(
    <FooterContainer as="footer">
      <Name>
        <MomentLogo src="/favicon/favicon-32x32.png" alt="The Moment" />&nbsp;
        Moment 是練習作品
      </Name>
      <Description>此網站上所有歌詞與電影、影劇的智慧財產權皆屬於原作者。</Description>
      <Made>
        <MapTaiwan src="/images/taiwan.png" alt="" />臺灣製造
      </Made>
    </FooterContainer>
  );
}

export default Footer;
