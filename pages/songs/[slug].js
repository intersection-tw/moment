import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import GlobalStyles from '../../components/GlobalStyles';
import MdxStyle from '../../components/MdxStyle';
import styled from 'styled-components';

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

const root = process.cwd()

export default function BlogPost({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource)
  return (
    <>
      <GlobalStyles />
      <MdxStyle>
        <h1>{frontMatter.title}</h1>
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
