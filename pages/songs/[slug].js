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
import { Year } from '../../components/meta/Year';

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbItemLink } from '../../components/Breadcrumb';
import { Paragraph } from '../../components/MdxStyle';
import Footer from '../../components/Footer';

const SongTemplateBody = createGlobalStyle`
  body {
    background-color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.i}%);
  }
`;

const ResponsiveLayout = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    padding-top: 24px;
  }

  @media screen and (min-width: 992px) {
    max-width: 960px;
    margin-right: auto;
    margin-left: auto;
  }

  @media screen and (min-width: 1200px) {
    padding-right:0;
    padding-left:0;
  }
`;

const Meta = styled.section`
  margin: 0 0 24px;
  padding: 0 16px;
  font-family: ${familyDefault};
`;

const MetaTitle = styled.h1`
  margin: 12px 0 0;
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
  padding: 0 16px;
`;

const HeardTitle = styled.h2`
  margin: 0 0 8px;
  padding: 8px 0 0;
  color: hsl(${shade.h}, ${shade.s}%, ${shade.l.x}%);
  font-size: 1.6rem;
`;

const HeardList = styled.ul`
  margin: 0;
  padding: 0 8px;
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

const root = process.cwd()

export default function SongTemplate({ artistData, mdxSource, frontMatter }) {
  const router = useRouter();

  const components = { LyricSection, Paragraph }

  const content = hydrate(mdxSource, { components })

  const songTitle = `${frontMatter.artist} 的 ${frontMatter.title} 歌詞`;
  const songDescription = `${frontMatter.year} 年發行，出現在 ${frontMatter.heard}。`;

  const heardListData = frontMatter.heard.split('、').map(video => {
    return (
      <HeardItem>{video}</HeardItem>
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
      <ResponsiveLayout>
        {
          isMobile() &&
          <>
            <Breadcrumb aria-label="Breadcrumb">
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
            </Breadcrumb>
            <Meta>
              <MetaTitle>
                {frontMatter.title}
              </MetaTitle>
              <Year>{frontMatter.year}</Year>
            </Meta>
          </>
        }
        {
          !isMobile() &&
          <Breadcrumb aria-label="Breadcrumb">
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
            <Meta>
              <MetaTitle>
                {frontMatter.title}
              </MetaTitle>
              <Year>{frontMatter.year}</Year>
            </Meta>
          </Breadcrumb>
        }
        <main>
          <Article>
            <MdxStyle>
              {content}
            </MdxStyle>
          </Article>
          <LayoutSection>
            <HeardTitle>{frontMatter.title} 出現在</HeardTitle>
            <HeardList>
              {heardListData}
            </HeardList>
          </LayoutSection>
        </main>
      </ResponsiveLayout>
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
  const mdxSource = await renderToString(content);

  return { props: { artistData, mdxSource, frontMatter: data } }
}
