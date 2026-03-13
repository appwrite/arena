import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
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
	shellComponent: RootShell,
	component: RootLayout,
});

function RootShell({ children }: { children: React.ReactNode }) {
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
				{children}
				<Scripts />
			</body>
		</html>
	);
}

function RootLayout() {
	const stars = Route.useLoaderData();
	return (
		<>
			<Header stars={stars} />
			<Outlet />
			<Footer />
		</>
	);
}