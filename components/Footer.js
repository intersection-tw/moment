import { getFontDefinitionFromNetwork } from 'next/dist/next-server/server/font-utils';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { dawn, midnight } from '../styles/color';
import { familyDefault } from '../styles/font';

import { LayoutSection } from './Section';

const FooterContainer = styled.footer`
  grid-area: footer;
  margin: 0;
  padding: ${props => props.hasPadding ? '32px 16px' : '32px 0'};
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xi}%);
  font-family: ${familyDefault};
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

const Tail = styled.span`
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

const Contact = styled.a`
  display: inline-block;
  margin-left: 16px;
  padding: 0 12px;
  color: hsl(${dawn.h}, ${dawn.s}%, ${dawn.l}%);
  text-decoration: none;

  :active,
  :focus,
  :hover {
    text-decoration: underline;
  }
`;

function Footer(props) {
  return(
    <FooterContainer hasPadding={props.hasPadding}>
      <Name>
        <MomentLogo src="/favicon/favicon-32x32.png" alt="The Moment" />&nbsp;
        Moment 是練習作品
      </Name>
      <Description>此網站上所有歌詞與電影、影劇的智慧財產權皆屬於原作者。</Description>
      <Tail>
        <MapTaiwan src="/images/taiwan.png" alt="" />臺灣製造
        <Link href="/contact" passHref>
          <Contact>聯絡</Contact>
        </Link>
      </Tail>
    </FooterContainer>
  );
}

export default Footer;
