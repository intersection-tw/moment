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

import { TitleGroup, Title, TitleDescription } from '../components/Titles';
import { Year } from '../components/meta/Year';
import { ArtistName } from '../components/meta/ArtistName';

import { LayoutSection } from '../components/Section';
import Footer from '../components/Footer';

const root = process.cwd();

const IndexBody = createGlobalStyle`
  body {
    background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.i}%);
  }
`;

const SongsIndex = styled(LayoutSection)`
  font-family: ${familyDefault};
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

export default function IndexPage({ artistData, postData }) {
  const artists = [...new Set(artistData.map(data => {
    return data.frontMatter.fullname
  }))];

  const indexLinksSchema = postData.map((data, index) => {
    return(
      {
        '@type': 'ListItem',
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_HOSTNAME}/songs/${data.slug}`
      }
    )
  });

  return (
    <>
      <Seo title="看電影看劇時，聽到喜歡的音樂 - Moment"
           description="讓電影、日美劇致敬的經典歌曲歌詞"
           published="2020-09-21"
           modified="2020-09-22"
           artist={process.env.NEXT_PUBLIC_AUTHOR}
      />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:
          JSON.stringify
          ({
            '@context': 'https://schema.org',
            "@type": "ItemList",
              "itemListElement":
              [
                indexLinksSchema
              ]
          })
        }}
        />
      </Head>
      <GlobalStyles />
      <IndexBody />
      <TitleGroup>
        <Title>The Moment</Title>
        <TitleDescription>看電影看劇時，聽到喜歡的音樂</TitleDescription>
      </TitleGroup>
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
  const artistsRoot = path.join(root, 'artists');
  const artistData = fs.readdirSync(artistsRoot).map((p) => {
    const content = fs.readFileSync(path.join(artistsRoot, p), 'utf8');
    return {
      slug: p.replace(/\.mdx/, ''),
      frontMatter: matter(content).data,
    }
  })

  const songsRoot = path.join(root, 'songs');
  const postData = fs.readdirSync(songsRoot).map((p) => {
    const content = fs.readFileSync(path.join(songsRoot, p), 'utf8');
    return {
      slug: p.replace(/\.mdx/, ''),
      content,
      frontMatter: matter(content).data,
    }
  })
  return { props: { artistData, postData } }
};
