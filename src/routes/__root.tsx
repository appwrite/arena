import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import JsonLd from "../components/JsonLd";
import { PlausibleAnalytics } from "../components/PlausibleAnalytics";
import { fetchGitHubStars } from "../lib/github-stars";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../lib/site";

import appCss from "../styles.css?url";

const WEBSITE_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Appwrite Arena",
	description: SITE_DESCRIPTION,
	url: SITE_URL,
} as const;

export const Route = createRootRoute({
	loader: () => fetchGitHubStars(),
	shouldReload: false,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: SITE_TITLE },
			{ name: "description", content: SITE_DESCRIPTION },

			// Open Graph
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: SITE_URL },
			{ property: "og:title", content: SITE_TITLE },
			{ property: "og:description", content: SITE_DESCRIPTION },
			{ property: "og:image", content: OG_IMAGE },
			{ property: "og:site_name", content: "Appwrite Arena" },

			// Twitter / X
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:url", content: SITE_URL },
			{ name: "twitter:title", content: SITE_TITLE },
			{ name: "twitter:description", content: SITE_DESCRIPTION },
			{ name: "twitter:image", content: OG_IMAGE },

			// Misc
			{ name: "theme-color", content: "#19191C" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "canonical", href: SITE_URL },
			{ rel: "manifest", href: "/manifest.json" },
		],
		scripts: [{ src: "/theme-init.js" }],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFoundPage,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const stars = Route.useLoaderData();
	return (
		<html
			lang="en"
			className="dark"
			data-theme="dark"
			style={{ colorScheme: "dark" }}
		>
			<head>
				<HeadContent />
			</head>
			<body className="flex min-h-screen flex-col font-sans antialiased wrap-anywhere selection:bg-[rgba(253,54,110,0.2)]">
				<JsonLd data={WEBSITE_JSON_LD} />
				<PlausibleAnalytics />
				<Header stars={stars} />
				{children}
				<Footer />
				<Scripts />
			</body>
		</html>
	);
}

function NotFoundPage() {
	return (
		<main className="flex flex-1 items-center px-4 py-24">
			<section className="arena-container max-w-3xl">
				<p className="mb-4 text-sm font-medium text-[var(--accent)]">404</p>
				<h1 className="mb-4 font-heading text-4xl text-[var(--text-primary)] leading-tight md:text-5xl">
					Page not found
				</h1>
				<p className="mb-8 max-w-xl text-base text-[var(--text-secondary)] leading-7">
					The benchmark result or page you requested does not exist.
				</p>
				<a
					href="/"
					className="inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white no-underline transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
				>
					Back to leaderboard
				</a>
			</section>
		</main>
	);
}
