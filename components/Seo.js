import React from 'react';
import Head from 'next/head'

function Seo({slug, title, description, published, modified, artist}) {
  const canonical = `${process.env.NEXT_PUBLIC_HOSTNAME}${slug || ''}`;
  const ogCover = slug || 'index';

  const publishedTime = new Date(published).toISOString();
  const modifiedTime = new Date(modified).toISOString();

  return(
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
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
          '@graph':
          [{
            '@type': 'WebPage',
            url: canonical,
            name: title,
            datePublished: publishedTime,
            dateModified: modifiedTime,
            author: {
              '@type': 'Person',
              name: artist
            }
          }]
        })
      }}
      />
    </Head>
  )
};

export default Seo;
