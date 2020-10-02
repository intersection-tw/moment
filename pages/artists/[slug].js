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

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbItemLink } from '../../components/Breadcrumb';
import { TitleGroup, Title, TitleDescription } from '../../components/Titles';
import { ArtistName } from '../../components/meta/ArtistName';
import Footer from '../../components/Footer';

const ArtistBody = createGlobalStyle`
  body {
    background-color: hsl(${midnight.h}, ${midnight.s}%, ${midnight.l.i}%);
  }
`;

const root = process.cwd()

export default function ArtistTemplate({ frontMatter }) {
  const router = useRouter();
  const artistTitle = `電視影劇裡出現過的 ${frontMatter.fullname} 歌曲`

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
      <Breadcrumb>
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
      </Breadcrumb>
      <TitleGroup>
        <Title>{frontMatter.fullname}</Title>
        <TitleDescription>{artistTitle}</TitleDescription>
      </TitleGroup>
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
  const source = fs.readFileSync(
    path.join(root, 'artists', `${params.slug}.mdx`),
    'utf8'
  )

  const { data, content } = matter(source);
  const mdxSource = await renderToString(content);

  return { props: { mdxSource, frontMatter: data } }
}
