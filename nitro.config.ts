import { defineNitroConfig } from "nitro/config";

/**
 * CORS for summary/leaderboard JSON so appwrite.io (or any site) can fetch from the browser.
 */
export default defineNitroConfig({
	routeRules: {
		"/summary.json": { cors: true },
		"/leaderboard.json": { cors: true },
		"/leaderboard-with-skills.json": { cors: true },
		"/leaderboard-without-skills.json": { cors: true },
	},
});
