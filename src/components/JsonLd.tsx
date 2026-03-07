/**
 * Renders JSON-LD structured data for SEO. Place in body; search engines parse it.
 */
export default function JsonLd({ data }: { data: object }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
