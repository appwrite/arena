import { createServerFn } from "@tanstack/react-start";

export const fetchGitHubStars = createServerFn().handler(async () => {
	const res = await fetch("https://api.github.com/repos/appwrite/arena");
	const data = await res.json();
	return typeof data.stargazers_count === "number"
		? data.stargazers_count
		: 0;
});
