import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';

import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../../components/Seo';

const root = process.cwd()

export default function ArtistTemplate({ mdxSource, frontMatter }) {
  return(
    <>
      {frontMatter.fullname}
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

  const mdxSource = await renderToString(content)
  return { props: { mdxSource, frontMatter: data } }
}