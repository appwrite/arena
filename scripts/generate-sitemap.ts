/**
 * Generates sitemap.xml for SEO. Run as part of prebuild.
 */
const SITE_URL = "https://arena.appwrite.io";

const resultsPath = new URL("../src/data/results-with-skills.json", import.meta.url);
const outPath = new URL("../public/sitemap.xml", import.meta.url);

const data = await Bun.file(resultsPath.pathname).json();
const models = data.models as { modelId: string }[];
const modelIds = models.map((m) => m.modelId);

const urls = [
	{ loc: SITE_URL, changefreq: "weekly", priority: "1.0" },
	...modelIds.map((id) => ({
		loc: `${SITE_URL}/model/${encodeURIComponent(id)}`,
		changefreq: "weekly" as const,
		priority: "0.8",
	})),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) =>
			`  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>
`;

function escapeXml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

await Bun.write(outPath.pathname, xml.trimEnd() + "\n");
console.log(`Generated sitemap.xml with ${urls.length} URLs`);
