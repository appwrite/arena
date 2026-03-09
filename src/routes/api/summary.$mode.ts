import { createFileRoute } from "@tanstack/react-router";
import { fetchLeaderboardSummary } from "../../lib/leaderboard-summary";

export const Route = createFileRoute("/api/summary/$mode")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const mode = params.mode;
				if (mode !== "with-skills" && mode !== "without-skills") {
					return new Response("Invalid mode", { status: 400 });
				}

				const payload = await fetchLeaderboardSummary({ data: mode });
				return new Response(JSON.stringify(payload), {
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						"Cache-Control": "public, max-age=3600",
					},
				});
			},
		},
	},
});
