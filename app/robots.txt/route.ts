import { siteData } from "@/src/components/About/AboutData";

export function GET() {
  const baseUrl = siteData.url.replace(/\/$/, "");
  const body = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

