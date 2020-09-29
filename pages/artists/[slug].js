

export default function ArtistTemplate({ mdxSource, frontMatter }) {
  return(

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
    path.join(root, 'songs', `${params.slug}.mdx`),
    'utf8'
  )
  const { data, content } = matter(source);

  const mdxSource = await renderToString(content)
  return { props: { mdxSource, frontMatter: data } }
}