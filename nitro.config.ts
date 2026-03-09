import { defineNitroConfig } from "nitro/config";

/**
 * CORS for summary/leaderboard JSON so appwrite.io (or any site) can fetch from the browser.
 */
export default defineNitroConfig({
	routeRules: {
		"/summary-with-skills.json": { cors: true },
		"/summary-without-skills.json": { cors: true },
	},
});
