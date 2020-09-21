const fs = require('fs');
const path = require('path');

const root = process.cwd();
const contentRoot = path.join(root, 'songs');
const songs = fs.readdirSync(contentRoot);

(async () => {
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${songs
          .map((song) => {
            const path = song
              .replace('.mdx', '');
            return `
              <url>
                <loc>${`https://moment.intersection.tw${path}`}</loc>
              </url>
            `;
          })
          .join('')}
    </urlset>
  `;

  fs.writeFileSync('public/sitemap.xml');
})();
