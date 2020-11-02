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
import { ResponsiveLayout } from '../../components/ResonsiveLayout';
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
      ". heard";
  }
`;

const SongHeader = styled.header`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  padding: 0 0 8px 0;
  background-color: hsla(${shade.h}, ${shade.s}%, ${shade.l.iii}%, 0.8);
  backdrop-filter: blur(8px);

  @media screen and (min-width: 768px) {
    grid-area: header;
    top: 24px;
    background-color: unset;
    backdrop-filter: unset;
  }
`;

const Meta = styled.section`
  font-family: ${familyDefault};
`;

const MetaTitle = styled.h1`
  display: inline-block;
  margin: 0 16px;
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

const Article = styled.article`
  grid-area: lyric;
  padding: 16px 16px 0;

  @media screen and (min-width: 768px) {
    padding: 32px 16px 0;
  }
`;

const Heard = styled(LayoutSection)`
  grid-area: heard;
`;

const HeardTitle = styled.h2`
  margin: 0 0 8px;
  padding: 8px 0 0;
  font-family: ${familyDefault};
  color: hsl(${shade.h}, ${shade.s}%, ${shade.l.x}%);
  font-size: 1.6rem;
`;

const HeardList = styled.ul`
  margin: 0 -16px;
  padding: 0 16px;
  font-family: ${familyDefault};
  background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.x}%);
`;

const HeardItem = styled.li`
  margin: 0;
  padding: 0;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.iii}%);
  font-size: 1.4rem;
  line-height: ${32 / 14};
  list-style: none;
`;

const root = process.cwd();
const components = { LyricSection, Paragraph };

export default function SongTemplate({ artistData, mdxSource, frontMatter }) {
  const router = useRouter();

  const content = hydrate(mdxSource, { components })

  const songTitle = `${frontMatter.artist} 的 ${frontMatter.title} 歌詞`;
  const songDescription = `${frontMatter.year} 年發行，出現在 ${frontMatter.heard}。`;

  const heardListData = frontMatter.heard.split('、').map((video, index) => {
    return (
      <HeardItem key={index}>{video}</HeardItem>
    )
  });

  return (
    <>
      <Seo title={`${songTitle} - Moment`}
           slug={router.query.slug}
           description={songDescription}
           published={frontMatter.published}
           modified={frontMatter.modified}
      />
      <GlobalStyles />
      <SongTemplateBody />
      <SongLayout>
        <SongHeader>
          <nav>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/" passHref>
                  <BreadcrumbItemLink>Moment 首頁 &gt;</BreadcrumbItemLink>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href={`/artists/${frontMatter.artistSlug}`} passHref>
                  <BreadcrumbItemLink>{frontMatter.artist}</BreadcrumbItemLink>
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </nav>
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
          <HeardTitle>{frontMatter.title} 出現在</HeardTitle>
          <HeardList>
            {heardListData}
          </HeardList>
        </Heard>
      </SongLayout>
      <Footer />
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
      slug: p.replace(/\.mdx/, ''),
      frontMatter: matter(content).data,
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
