import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../lib/site";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
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
		],
		scripts: [{ src: "/theme-init.js" }],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
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
			<body className="flex min-h-screen flex-col font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(253,54,110,0.2)]">
				<Header />
				{children}
				<Footer />
				<Scripts />
			</body>
		</html>
	);
}
