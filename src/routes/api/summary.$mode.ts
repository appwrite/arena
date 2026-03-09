import { createFileRoute } from "@tanstack/react-router";
import { fetchLeaderboardSummaryResponse } from "../../lib/leaderboard-summary";

export const Route = createFileRoute("/api/summary/$mode")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				return fetchLeaderboardSummaryResponse({ data: params.mode });
			},
		},
	},
});
