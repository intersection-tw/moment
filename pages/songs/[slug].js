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

import { LayoutSection, LyricSection } from '../../components/Section';
import { Year } from '../../components/meta/Year';

import Footer from '../../components/Footer';

const SongBody = createGlobalStyle`
  body {
    background-color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.i}%);
  }
`;

const Article = styled.article`
  padding-right: 16px;
  padding-left: 16px;

  @media screen and (min-width: 768px) {
    margin-right: auto;
    margin-left: auto;
  }

  @media screen and (min-width: 992px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    padding-right:0;
    padding-left:0;
  }
`;

const Breadcrumb = styled.nav`
  margin-bottom: 16px;
  padding: 0 16px;
  background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.iii}%);
`;

const BreadcrumbList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  margin: 0;
  padding: 2px 0;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xi}%);
  font-family: ${familyDefault};
  font-size: 1.4rem;
  line-height: ${32 / 14};
  list-style: none;
`;

const BreadcrumbItemLink = styled.a`
  display: inline-block;
  margin-left: -8px;
  padding: 0 8px;
  color: inherit;
  text-decoration: none;
`;

const Meta = styled.section`
  margin: 0 0 24px;
  padding: 0 16px;
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

const HeardListTitle = styled.h2`
  margin: 0 0 8px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xvi}%);
  font-size: 1.8rem;
`;

const HeardList = styled.ul`
  padding: 0;
`;

const HeardItem = styled.li`
  margin: 0 0 8px;
  padding: 0;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xvi}%);
  font-size: 1.4rem;
  list-style: none;
`;

const root = process.cwd()

export default function BlogPost({ mdxSource, frontMatter }) {
  const router = useRouter();

  const components = { LyricSection }

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
      <Head>
        <title>{songTitle}</title>
      </Head>
      <Seo slug={router.query.slug}
           title={songTitle}
           description={songDescription}
           published={frontMatter.published}
           modified={frontMatter.modified}
           artist={frontMatter.artist}
      />
      <GlobalStyles />
      <SongBody />
      <MdxStyle>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/" passHref>
                <BreadcrumbItemLink>首頁 &gt;</BreadcrumbItemLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{frontMatter.artist}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Meta>
          <MetaTitle>
            {frontMatter.title}
          </MetaTitle>
          <Year>{frontMatter.year}</Year>
          <MetaArtist>{frontMatter.artist}</MetaArtist>
        </Meta>
        <Article>
          {content}
        </Article>
        <LayoutSection>
          <HeardListTitle>出現在</HeardListTitle>
          <HeardList>
            {heardListData}
          </HeardList>
        </LayoutSection>
      </MdxStyle>
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
  const source = fs.readFileSync(
    path.join(root, 'songs', `${params.slug}.mdx`),
    'utf8'
  )
  const { data, content } = matter(source);

  const mdxSource = await renderToString(content)
  return { props: { mdxSource, frontMatter: data } }
}
