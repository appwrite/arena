/**
 * Renders JSON-LD structured data for SEO. Place in body; search engines parse it.
 */
export default function JsonLd({ data }: { data: object }) {
	const json = JSON.stringify(data).replace(/<\//g, "<\\/");

	return <script type="application/ld+json">{json}</script>;
}
