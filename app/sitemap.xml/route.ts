import { siteData } from "@/src/components/About/AboutData";
import { supportedLocales } from "@/src/i18n/config";

export function GET() {
  const baseUrl = siteData.url.replace(/\/$/, "");
  const now = new Date().toISOString();

  const paths = [
    "/tools",
    "/sentence-case",
    "/lowercase",
    "/uppercase",
    "/title-case",
    "/camel-case",
    "/edit/text-trim",
    "/edit/remove-spaces",
    "/edit/find-replace",
    "/generate/quotes",
    "/generate/lorem-ipsum",
    "/generate/passwords",
  ];

  const urls = supportedLocales
    .flatMap((locale) => paths.map((p) => `/${locale}${p}`))
    .map(
      (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
