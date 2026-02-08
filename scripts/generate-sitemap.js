import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module 환경에서 __dirname 사용을 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://api.leetaesk.com/api/posts'; // 운영 API 주소
const SITE_URL = 'https://leetaesk.com';

const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/archive', changefreq: 'daily', priority: 0.8 },
  { path: '/about', changefreq: 'monthly', priority: 0.5 },
  { path: '/login', changefreq: 'monthly', priority: 0.3 },
];

async function generateSitemap() {
  console.log('Generating sitemap...');

  try {
    // 1. 게시글 데이터 가져오기 (fetch 사용)
    const response = await fetch(`${API_URL}?page=1&limit=1000`); // 충분히 많은 limit 설정
    const data = await response.json();

    if (!data.isSuccess || !data.result) {
      throw new Error('Failed to fetch posts');
    }

    const posts = data.result.posts;
    console.log(`Found ${posts.length} posts.`);

    // 2. XML 생성
    let uniqueUrls = new Set(); // 중복 URL 방지
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const buildDate = new Date().toISOString().split('T')[0];

    // 정적 라우트 추가
    staticRoutes.forEach((route) => {
      const url = `${SITE_URL}${route.path}`;
      if (!uniqueUrls.has(url)) {
        uniqueUrls.add(url);
        sitemap += `
  <url>
    <loc>${url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${buildDate}</lastmod>
  </url>`;
      }
    });

    // 동적(게시글) 라우트 추가
    posts.forEach((post) => {
      const url = `${SITE_URL}/posts/${post.id}`;
      if (!uniqueUrls.has(url)) {
        uniqueUrls.add(url);
        sitemap += `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${buildDate}</lastmod>
  </url>`;
      }
    });

    sitemap += `
</urlset>`;

    // 3. 파일 쓰기
    const publicDir = path.resolve(__dirname, '../public');
    const sitemapPath = path.join(publicDir, 'sitemap.xml');

    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log(`Sitemap generated at ${sitemapPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
