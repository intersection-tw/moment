import React from 'react';
import Head from 'next/head'

function Seo({slug, title, description, published, modified, artist, links}) {
  const canonical = `${process.env.NEXT_PUBLIC_HOSTNAME}${slug? `/songs/${slug}` : ''}`;
  const ogCover = slug || 'index';

  const publishedTime = new Date(published).toISOString();
  const modifiedTime = new Date(modified).toISOString();

  // const indexLinks = links.map(link => {

  // });

  return(
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" type="image/ico" sizes="16x16" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOSTNAME}/og/${ogCover}.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:
        JSON.stringify
        ({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          url: canonical,
          name: title,
          datePublished: publishedTime,
          dateModified: modifiedTime,
          publisher: {
            '@type': 'Organization',
            name: 'Intersection',
            url: 'https://intersection.tw',
            logo: {
              '@type': 'ImageObject',
              name: 'Intersection: 優化、插件、高清、視頻、反饋、交互設計：已經看膩這些中國網路媒體用語。',
              width: 400,
              height: 400,
              url: 'https://moment.intersection.tw/images/intersection.png'
            }
          }
        })
      }}
      />
    </Head>
  )
};

export default Seo;
