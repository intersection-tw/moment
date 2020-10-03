const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const root = process.cwd();
// const artistsRoot = path.join(root, 'artists');
// const artists = fs.readdirSync(artistsRoot);
const songsRoot = path.join(root, 'songs');
const songs = fs.readdirSync(songsRoot);

// ${artists
//   .map((artist) => {
//     const path = artist
//       .replace('.mdx', '');
//     return `
//       <url>
//         <loc>${`https://moment.intersection.tw/artists/${path}`}</loc>
//       </url>`
//     ;
//   })
//   .join('')
// }

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://moment.intersection.tw</loc>
        </url>
        ${songs
          .map((song) => {
            const path = song
              .replace('.mdx', '');
            return `
              <url>
                <loc>${`https://moment.intersection.tw/songs/${path}`}</loc>
              </url>`
            ;
          })
          .join('')
        }
    </urlset>
  `;

  const sitemapFormatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  fs.writeFileSync('public/sitemap.xml', sitemapFormatted);
})();
