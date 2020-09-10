import Head from 'next/head';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import GlobalStyles from '../../components/GlobalStyles';
import MdxStyle from '../../components/MdxStyle';
import styled, { createGlobalStyle } from 'styled-components';

import { dawn, midnight } from '../../styles/color';
import { familyDefault } from '../../styles/font';

import Section from '../../components/Section';
import { Year } from '../../components/meta/Year';

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

const root = process.cwd()

export default function BlogPost({ mdxSource, frontMatter }) {
  const components = { Section }

  const content = hydrate(mdxSource, { components })
  console.log((frontMatter.movies).split(', '));
  return (
    <>
      <Head>
        <title>{frontMatter.title} ({frontMatter.year})</title>
      </Head>
      <GlobalStyles />
      <SongBody />
      <MdxStyle>
        <Meta>
          <MetaTitle>
            {frontMatter.title}
            <Year>{frontMatter.year}</Year>
          </MetaTitle>
          <MetaArtist>{frontMatter.artist}</MetaArtist>
        </Meta>
        <Article>
          {content}
        </Article>
      </MdxStyle>
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
  const { data, content } = matter(source)
  const mdxSource = await renderToString(content)
  return { props: { mdxSource, frontMatter: data } }
}
