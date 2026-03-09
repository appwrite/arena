import { defineNitroConfig } from "nitro/config";

/**
 * CORS for summary/leaderboard JSON so appwrite.io (or any site) can fetch from the browser.
 */
export default defineNitroConfig({
	routeRules: {
	  "/api/sitemap.xml": { cors: true },
		"/api/summary/*.json": { cors: true },
	},
});
