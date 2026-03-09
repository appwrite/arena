import { createFileRoute } from "@tanstack/react-router";
import { fetchSitemap } from "../lib/sitemap";

export const Route = createFileRoute("/sitemap/xml")({
	server: {
		handlers: {
			GET: async () => {
				return fetchSitemap();
			},
		},
	},
});
