import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';

import { shade, dawn, midnight} from '../styles/color';
import { familyDefault } from '../styles/font';

import { Year } from '../components/meta/Year';

const root = process.cwd()

const IndexBody = createGlobalStyle`
  body {
    background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.i}%);
  }
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

const Song = styled.li`
  margin-bottom: 12px;
`;

const SongName = styled.a`
  display: inline-block;
  padding: 4px 0;
  color: hsl(${dawn.h}, ${dawn.s}%, ${dawn.l}%);
  font-size: 2rem;
  line-height: ${ 30 / 20 };
  text-decoration: none;
`;

export default function IndexPage({ postData }) {
  return (
    <>
      <GlobalStyles />
      <IndexBody />
      <h1>Moment</h1>
      <Section>
        <SongsList>
          { postData.map(data =>
            <Song key={data.slug}>
              <Link href="/songs/[slug]" as={`/songs/${data.slug}`} passHref>
                  <SongName>{data.frontMatter.title}
                    <Year>{data.frontMatter.year}</Year>
                  </SongName>
              </Link>
            </Song>
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
