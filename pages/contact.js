import React from 'react';
import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../components/Seo';
import GlobalStyles from '../components/GlobalStyles';

import { shade, dawn, midnight} from '../styles/color';

import { BreadcrumbList, BreadcrumbItem, BreadcrumbItemLink } from '../components/Breadcrumb';
import { TitleGroup, Title, TitleDescription } from '../components/Titles';

const ContactBody = createGlobalStyle`
  body {
    background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.i}%);
  }
`;

const ContactBreadcrumb = styled.nav`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;

  @media screen and (min-width: 768px) {
    max-width: 1080px;
    margin: 0 auto;
    position: unset;
  }
`;

const ContactLayout = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 16px;
`;

const MyWebsite = styled.section`
  padding: 16px 0 0;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xi}%);
`;

const MyWebsiteTitle = styled.h2`
  margin: 0 0 4px;
  font-size: 1.6rem;
  font-weight: 400;
`;

const MyWebsiteDescription = styled.p`
  margin: 0 0 16px;
  font-size: 1.2rem;
`;

const MyWebsiteLink = styled.a`
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-size: 1.6rem;
  text-decoration: none;
`;

const MyWebsiteLinkIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: bottom;
`;

export default function Contact() {
  return(
    <>
      <Seo title="聯絡 The Moment"
           description="YM 的個人連結，或直接留言。"
           published="2020-11-08"
           modified="2020-11-08"
      />
      <GlobalStyles />
      <ContactBody />
      <ContactBreadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" passHref>
              <BreadcrumbItemLink>Moment 首頁 &gt;</BreadcrumbItemLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="/contact" passHref>
              <BreadcrumbItemLink>💬 聯絡</BreadcrumbItemLink>
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </ContactBreadcrumb>
      <ContactLayout>
        <TitleGroup>
          <Title>聯絡</Title>
          <TitleDescription role="doc-subtitle">建議？問題？或您有致敬 60’s 到 80’s 流行音樂的作品</TitleDescription>
        </TitleGroup>
        <MyWebsite>
          <MyWebsiteTitle>
            Moment 是 YM 的練習作品
          </MyWebsiteTitle>
          <MyWebsiteDescription>所有歌詞與電影、影劇的智慧財產權皆屬於原作者。</MyWebsiteDescription>
          <Link href="https://ymcheung.tw" target="_blank" rel="noopener" passHref>
            <MyWebsiteLink>
              個人網站&nbsp;
              <MyWebsiteLinkIcon src="/images/externalLink.svg" alt="前往 YM 的個人網站" />
            </MyWebsiteLink>
          </Link>
        </MyWebsite>
      </ContactLayout>
    </>
  )
};
