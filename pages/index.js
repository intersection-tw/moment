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

import { LayoutSection } from '../components/LayoutSection';
import Footer from '../components/Footer';

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
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-size: 3.2rem;
  font-weight: 500;
`;

const TitleDescription = styled.h2`
  margin: 0;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.xvi}%);
  font-size: 1.4rem;
  font-weight: 400;
`;

const SongsIndex = styled(LayoutSection)`
  padding: 0 16px;
  font-family: ${familyDefault};
`;

const ArtistName = styled.h2`
  margin: 0 0 6px;
  color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.vii}%);
  font-weight: 400;
`;

const SongsList = styled.ul`
  margin: 0 0 16px;
  padding: 0;

  :last-of-type {
    margin: 0;
  }
`;

const SongItem = styled.li`
  margin-bottom: 12px;
  list-style: none;
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
  const artists = [...new Set(postData.map(data => { return data.frontMatter.artist}))];

  return (
    <>
      <Seo title="看電影看劇時，聽到喜歡的音樂 - Moment"
           description="讓電影、日美劇致敬的經典歌曲歌詞"
           published="2020-09-21"
           modified="2020-09-22"
           artist={process.env.NEXT_PUBLIC_AUTHOR}
      />
      <GlobalStyles />
      <IndexBody />
      <IndexTitleGroup>
        <Title>The Moment</Title>
        <TitleDescription>看電影看劇時，聽到喜歡的音樂</TitleDescription>
      </IndexTitleGroup>
      <SongsIndex>
        {
          artists.map(artist => {
            const songsofArtist = postData.filter(song => {
              return song.frontMatter.artist === artist
            })
            
            const songs = songsofArtist.map(s => {
              return(
                <SongItem key={s.slug}>
                  <Link href="/songs/[slug]" as={`/songs/${s.slug}`} passHref>
                    <Song>
                      <SongName>{s.frontMatter.title}</SongName>
                      <Year>{s.frontMatter.year}</Year>
                    </Song>
                  </Link>
                </SongItem>
              );
            });

            return(
              <>
                <ArtistName>{artist}</ArtistName>
                <SongsList>
                  {songs}
                </SongsList>
              </>
            );
          })
        }
      </SongsIndex>
      <Footer />
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
