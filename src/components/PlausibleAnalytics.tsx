"use client";

import { useEffect } from "react";
import { SITE_URL } from "../lib/site";

function getDomain(url: string): string {
	try {
		return new URL(url).hostname;
	} catch {
		return "arena.appwrite.network";
	}
}

export function PlausibleAnalytics() {
	useEffect(() => {
		if (typeof window === "undefined") return;
		void import("@plausible-analytics/tracker").then(({ init }) => {
			init({
				domain: getDomain(SITE_URL),
				autoCapturePageviews: true,
				hashBasedRouting: false,
				captureOnLocalhost: false,
			});
		});
	}, []);

	return null;
}
