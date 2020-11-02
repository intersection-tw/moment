import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';

import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../../components/Seo';
import GlobalStyles from '../../components/GlobalStyles';

import { shade, dawn, midnight } from '../../styles/color';
import { familyDefault } from '../../styles/font';
import { isMobile } from '../../utils/isMobile';

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbItemLink } from '../../components/Breadcrumb';
import { TitleGroup, Title, TitleDescription } from '../../components/Titles';
import { ArtistName } from '../../components/meta/ArtistName';
import { Year } from '../../components/meta/Year';
import { SongsOfArtistList, SongItem, SongLink, SongName } from '../../components/SongsList';
import Footer from '../../components/Footer';

const ArtistBody = createGlobalStyle`
  body {
    background-color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.i}%);
  }
`;

const ArtistBreadcrumb = styled.nav`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;

  @media screen and (min-width: 768px) {
    max-width: 1080px;
    margin: 0 auto;
    position: unset;
  }
`;

const ArtistLayout = styled.section`
  max-width: 1080px;
  margin: 0 auto 32px;
  padding: 0 16px;
`;

const root = process.cwd()

export default function ArtistTemplate({ frontMatter, songData }) {
  const router = useRouter();
  const artistTitle = `出現在電視影劇裡的歌曲`

  const songsofArtist = songData.filter(song => {
    return song.frontMatter.artist === frontMatter.fullname
  })
  return(
    <>
      <Seo title={`${artistTitle} - Moment`}
           slug={router.query.slug}
           description=""
           published={frontMatter.published}
           modified={frontMatter.modified}
      />
      <GlobalStyles />
      <ArtistBody />
      <ArtistBreadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/" passHref>
              <BreadcrumbItemLink>Moment 首頁 &gt;</BreadcrumbItemLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem aria-label="Breadcrumb">
            <Link href={`/artists/${router.query.slug}`} passHref>
              <BreadcrumbItemLink aria-current="page">{frontMatter.fullname}</BreadcrumbItemLink>
            </Link>
          </BreadcrumbItem>
        </BreadcrumbList>
      </ArtistBreadcrumb>
      <ArtistLayout>
        <TitleGroup>
          <Title>{frontMatter.fullname}</Title>
          <TitleDescription role="doc-subtitle">{artistTitle}</TitleDescription>
        </TitleGroup>
        <SongsOfArtistList>
        {
          songsofArtist.map(s => {
            return(
              <SongItem key={s.slug}>
                <Link href={`/songs/${s.slug}`} passHref>
                  <SongLink>
                    <SongName>
                      {s.frontMatter.title}&nbsp;<Year>{s.frontMatter.year}</Year>
                    </SongName>
                  </SongLink>
                </Link>
              </SongItem>
            )
          })
        }
        </SongsOfArtistList>
      </ArtistLayout>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: fs
      .readdirSync(path.join(root, 'artists'))
      .map((p) => ({ params: { slug: p.replace(/\.mdx/, '') } })),
  }
}

export async function getStaticProps({ params }) {
  const artistSource = fs.readFileSync(
    path.join(root, 'artists', `${params.slug}.mdx`),
    'utf8'
  )

  const { data, content } = matter(artistSource);
  const mdxSource = await renderToString(content);

  const songsRoot = path.join(root, 'songs');
  const songData = fs.readdirSync(songsRoot).map((p) => {
    const content = fs.readFileSync(path.join(songsRoot, p), 'utf8');
    return {
      slug: p.replace(/\.mdx/, ''),
      content,
      frontMatter: matter(content).data,
    }
  })

  return { props: { mdxSource, frontMatter: data, songData } }
}
