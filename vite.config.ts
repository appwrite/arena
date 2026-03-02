import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	ssr: {
		noExternal: ["@lobehub/icons"],
	},
	plugins: [
		devtools(),
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				autoSubfolderIndex: true,
				autoStaticPathsDiscovery: true,
				concurrency: 14,
				crawlLinks: true,
				retryCount: 2,
				retryDelay: 1000,
				maxRedirects: 5,
				failOnError: true,
			},
		}),
		viteReact(),
	],
});

export default config;
