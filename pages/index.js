import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../components/Seo';
import GlobalStyles from '../components/GlobalStyles';

import { shade, dawn, midnight} from '../styles/color';
import { familyDefault } from '../styles/font';

import { Year } from '../components/meta/Year';

const root = process.cwd();

const IndexBody = createGlobalStyle`
  body {
    background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.i}%);
  }
`;

const IndexTitleGroup = styled.hgroup`
  margin: 0 16px 16px;
  padding-top: 16px;
  font-family: ${familyDefault};
`;

const Title = styled.h1`
  margin: 0 0 4px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xvi}%);
  font-size: 3.2rem;
`;

const TitleDescription = styled.h2`
  margin: 0;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-size: 1.4rem;
  font-weight: 400;
`;

const Section = styled.section`
  margin-bottom: 32px;
  padding: 0 16px;
  font-family: ${familyDefault};
`;

const ArtistName = styled.h2`
  margin: 0 0 12px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
`;

const SongsList = styled.ul`
  margin: 0;
  padding: 0;
`;

const SongItem = styled.li`
  margin-bottom: 12px;
`;

const Song = styled.a`
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

export default function IndexPage({ postData }) {
  return (
    <>
      <Seo title="Moment"
           description="看電影看劇時，聽到喜歡的音樂"
           published=""
           modified=""
           artist={process.env.NEXT_PUBLIC_AUTHOR}
      />
      <GlobalStyles />
      <IndexBody />
      <IndexTitleGroup>
        <Title>The Moment</Title>
        <TitleDescription>看電影看劇時，聽到喜歡的音樂</TitleDescription>
      </IndexTitleGroup>
      <Section>
        <SongsList>
          { postData.map(data =>
            <SongItem key={data.slug}>
              <Link href="/songs/[slug]" as={`/songs/${data.slug}`} passHref>
                <Song>
                  <SongName>{data.frontMatter.title}</SongName>
                  <Year>{data.frontMatter.year}</Year>
                </Song>
              </Link>
            </SongItem>
          ) }
        </SongsList>
      </Section>
    </>
  )
}

export async function getStaticProps() {
  const contentRoot = path.join(root, 'songs');
  const postData = fs.readdirSync(contentRoot).map((p) => {
    const content = fs.readFileSync(path.join(contentRoot, p), 'utf8');
    return {
      slug: p.replace(/\.mdx/, ''),
      content,
      frontMatter: matter(content).data,
    }
  })
  return { props: { postData } }
};
