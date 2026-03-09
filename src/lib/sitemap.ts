import { createServerFn } from "@tanstack/react-start";
import withSkillsData from "../data/results-with-skills.json";

const SITE_URL = "https://arena.appwrite.io";

function escapeXml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export const fetchSitemap = createServerFn().handler(async () => {
	const models = (withSkillsData as { models: { modelId: string }[] }).models;
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

	return new Response(xml.trimEnd() + "\n", {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=3600",
		},
	});
});
