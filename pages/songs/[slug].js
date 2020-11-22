import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import GlobalStyles from '../../components/GlobalStyles';
import MdxStyle from '../../components/MdxStyle';
import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../../components/Seo';

import { shade, dawn, midnight } from '../../styles/color';
import { familyDefault } from '../../styles/font';

import { isMobile } from '../../utils/isMobile';
import { LayoutSection, LyricSection } from '../../components/Section';
import { ResponsiveLayout } from '../../components/ResponsiveLayout';
import { Year } from '../../components/meta/Year';

import { BreadcrumbList, BreadcrumbItem, BreadcrumbItemLink } from '../../components/Breadcrumb';
import { Paragraph } from '../../components/MdxStyle';
import Footer from '../../components/Footer';

const SongTemplateBody = createGlobalStyle`
  body {
    background-color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.i}%);
  }
`;

const SongLayout = styled(ResponsiveLayout)`
  @media screen and (min-width: 768px) {
    grid-template-areas:
      "header lyric"
      ". lyric"
      ". heard"
      ". player"
      "footer footer";
    column-gap: 16px;
  }
`;

const SongHeader = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 -16px;
  padding: 0 16px 8px;
  backdrop-filter: blur(20px);

  @media screen and (min-width: 768px) {
    grid-area: header;
    margin: 0 0 8px;
    padding: 0;
    background-color: unset;
    backdrop-filter: unset;
  }
`;

const BreadcrumbNav = styled.nav`
  margin-bottom: 8px;
`;

const Meta = styled.section`
  font-family: ${familyDefault};
`;

const MetaTitle = styled.h1`
  margin: 0;
  color: hsl(${dawn.h}, ${dawn.s}%, ${dawn.l}%);
  font-size: 2.8rem;
  font-weight: 500;
  line-height: ${36 / 28};
`;

const MetaArtist = styled.div`
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-size: 1.6rem;
  font-weight: 500;
  line-height: ${24 / 16};
`;

const Player = styled(LayoutSection)`
  grid-area: player;
  font-size: 0;
`;

const PlayerLink = styled.a`
  display: inline-block;
  padding: 3px 12px;
  border: 2px solid #1ED760;
  border-radius: 8px;

  :active,
  :hover,
  :focus {
    position: relative;

    ::after {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: '收聽';
      color: hsl(${shade.h}, ${shade.s}%, ${shade.l.iii}%);
      font-size: 1.6rem;
      line-height: ${(30 / 16)};
      text-align: center;
      background-color: #1ED760;
    }
  }
`;

const PlayerLinkImage = styled.img`
  width: 80px;
  height: 24px;
`;

const Article = styled.article`
  grid-area: lyric;
  padding: 8px 0 0;

  @media screen and (min-width: 768px) {
    padding: 64px 0 0;
  }
`;

const Heard = styled(LayoutSection)`
  grid-area: heard;
`;

const HeardTitle = styled.div`
  margin: 0 0 8px;
  padding: 8px 0 0;
  font-family: ${familyDefault};
`;

const HeardTitleLayout = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const HeardTitleIcon = styled.div`
  flex: 0 0 48px;
  margin-right: 8px;
  color: hsl(${shade.h}, ${shade.s}%, ${shade.l.x}%);
  font-size: 2.4rem;
  line-height: ${(48 / 24)};
  text-align: center;
  background-color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.iii}%);
`;

const HeardTitleName = styled.h2`
  flex: 1 1 100%;
  margin: 0;
  color: hsl(${shade.h}, ${shade.s}%, ${shade.l.x}%);
  font-size: 2rem;
  line-height: ${( 32 / 20 )};
  font-weight: 500;

  @media screen and (min-width: 768px) {
    padding: 8px 0;
  }
`;

const HeardTitleTail = styled.span`
  display: inline-block;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-size: 1.4rem;
`;

const HeardList = styled.ul`
  margin: 0 -16px;
  padding: 0 16px;
  font-family: ${familyDefault};
`;

const HeardItem = styled.li`
  margin: 0;
  padding: 0;
  color: hsl(${shade.h}, ${shade.s}%, ${shade.l.x}%);
  font-size: 1.4rem;
  line-height: ${32 / 14};
  list-style: none;
`;

const root = process.cwd();
const components = { LyricSection, Paragraph };

export default function SongTemplate({ artistData, mdxSource, frontMatter }) {
  const router = useRouter();

  const content = hydrate(mdxSource, { components })

  const songTitle = `${frontMatter.title} 歌詞 (${frontMatter.artist})`;
  const songDescription = `${frontMatter.year} 年發行，出現在 ${frontMatter.heard}。`;

  const heardListData = frontMatter.heard.split('、').map((video, index) => {
    return (
      <HeardItem key={index}>{video}</HeardItem>
    )
  });

  return (
    <>
      <Seo title={songTitle}
           songName={frontMatter.title}
           slug={router.query.slug}
           description={songDescription}
           published={frontMatter.published}
           modified={frontMatter.modified}
           hasBreadcrumb
           artist={frontMatter.artist}
           artistSlug={frontMatter.artistSlug}
      />
      <GlobalStyles />
      <SongTemplateBody />
      <SongLayout>
        <SongHeader>
          <BreadcrumbNav>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/" passHref>
                  <BreadcrumbItemLink>Moment 首頁 &gt;</BreadcrumbItemLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                🤘&nbsp;
                <Link href={`/artists/${frontMatter.artistSlug}`} passHref>
                  <BreadcrumbItemLink>{frontMatter.artist}</BreadcrumbItemLink>
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbNav>
          <Meta>
            <MetaTitle>
              {frontMatter.title}&nbsp;<Year>{frontMatter.year}</Year>
            </MetaTitle>
          </Meta>
        </SongHeader>
        <Article>
          <MdxStyle>
            {content}
          </MdxStyle>
        </Article>
        <Heard>
          <HeardTitle>
            <HeardTitleLayout>
              <HeardTitleIcon>♪</HeardTitleIcon>
              <HeardTitleName>{frontMatter.title}</HeardTitleName>
            </HeardTitleLayout>
            <HeardTitleTail>出現在</HeardTitleTail>
          </HeardTitle>
          <HeardList>
            {heardListData}
          </HeardList>
        </Heard>
        <Player>
          <Link href={`https://open.spotify.com/track/${frontMatter.spotify}`} passHref>
            <PlayerLink rel="noopener nofollow">
              <PlayerLinkImage src="/images/spotify.png" alt="在 Spotify 收聽" />
            </PlayerLink>
          </Link>
        </Player>
        <Footer />
      </SongLayout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: fs
    .readdirSync(path.join(root, 'songs'))
    .map((p) => ({ params: { slug: p.replace(/\.mdx/, '') } })),
  }
}

export async function getStaticProps({ params }) {
  const artistsRoot = path.join(root, 'artists');
  const artistData = fs.readdirSync(artistsRoot).map((p) => {
    const content = fs.readFileSync(path.join(artistsRoot, p), 'utf8');
    return {
      slug: p.replace(/\.mdx/, '')
    }
  })

  const songSource = fs.readFileSync(
    path.join(root, 'songs', `${params.slug}.mdx`),
    'utf8'
  );

  const { data, content } = matter(songSource);
  const mdxSource = await renderToString(content, { components });

  return { props: { artistData, mdxSource, frontMatter: data } }
}
