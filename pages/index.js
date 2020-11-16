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

import { isMobile } from '../utils/isMobile';

import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { TitleGroup, Title, TitleDescription } from '../components/Titles';
import { Year } from '../components/meta/Year';
import { ArtistName } from '../components/meta/ArtistName';

import { LayoutSection } from '../components/Section';
import { MomentIndex, MomentIndexItem, SongsOfArtistList, SongItem, SongLink, SongName } from '../components/SongsList';
import Footer from '../components/Footer';

const root = process.cwd();

const IndexBody = createGlobalStyle`
  body {
    background-color: hsl(${shade.h}, ${shade.s}%, ${shade.l.i}%);
  }
`;

const IndexLayout = styled(ResponsiveLayout)`
  padding: 0 16px;

  @media screen and (min-width: 768px) {
    grid-template-areas:
      "header list"
      ". list"
      "footer footer";
    padding: 0;
  }
`;

export default function IndexPage({ artistData, songData }) {
  const artists = artistData.map(data => {
    return data.frontMatter.fullname
  });

  const indexLinksSchema = songData.map((data, index) => {
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
           modified="2020-11-15"
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
      <IndexLayout>
        <TitleGroup>
          <Title>The Moment</Title>
          <TitleDescription role="doc-subtitle">看電影看劇時，聽到喜歡的音樂</TitleDescription>
        </TitleGroup>
        <MomentIndex>
        {
          artists.map(artist => {
            const songsofArtist = songData.filter(song => {
              return song.frontMatter.artist === artist
            })
            
            const songs = songsofArtist.map(s => {
              return(
                <SongItem key={s.slug}>
                  <Link href="/songs/[slug]" as={`/songs/${s.slug}`} passHref>
                    <SongLink>
                      <SongName>
                        {s.frontMatter.title}&nbsp;
                        <Year>{s.frontMatter.year}</Year>
                      </SongName>
                    </SongLink>
                  </Link>
                </SongItem>
              );
            });

            return(
              <MomentIndexItem key={artist}>
                <ArtistName>{artist}</ArtistName>
                <SongsOfArtistList>
                  {songs}
                </SongsOfArtistList>
              </MomentIndexItem>
            );
          })
        }
        </MomentIndex>
        <Footer />
      </IndexLayout>
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
  const songData = fs.readdirSync(songsRoot).map((p) => {
    const content = fs.readFileSync(path.join(songsRoot, p), 'utf8');
    return {
      slug: p.replace(/\.mdx/, ''),
      content,
      frontMatter: matter(content).data,
    }
  })
  return { props: { artistData, songData } }
};
