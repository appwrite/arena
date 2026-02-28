import type { Question } from "../types";

export const sitesQuestions: Question[] = [
	{
		id: "sites-1",
		category: "sites",
		type: "mcq",
		question: "What is Appwrite Sites?",
		choices: [
			"A DNS management service",
			"A web hosting and deployment service for static and dynamic sites within Appwrite",
			"A site analytics platform",
			"A content management system",
		],
		correctAnswer: "B",
	},
	{
		id: "sites-2",
		category: "sites",
		type: "mcq",
		question: "Which types of sites can Appwrite Sites deploy?",
		choices: [
			"Only static HTML sites",
			"Static sites and dynamic sites using supported frameworks like Next.js, Nuxt, SvelteKit, Astro, etc.",
			"Only WordPress sites",
			"Only single-page applications",
		],
		correctAnswer: "B",
	},
	{
		id: "sites-3",
		category: "sites",
		type: "mcq",
		question: "How do you connect a custom domain to an Appwrite Site?",
		choices: [
			"Through DNS A record pointing to Appwrite's IP",
			"By adding the domain in the Appwrite Console and configuring a CNAME record",
			"Through a reverse proxy configuration",
			"Custom domains are not supported",
		],
		correctAnswer: "B",
	},
	{
		id: "sites-4",
		category: "sites",
		type: "free-form",
		question:
			"Explain how to deploy a site to Appwrite Sites. What are the build configuration options and deployment methods?",
		correctAnswer:
			"Appwrite Sites can be deployed through: 1) Git integration — connect a GitHub/GitLab repository for automatic deployments on push, 2) CLI deployment using appwrite deploy site, 3) Manual upload through the Console. Build configuration includes: framework preset (auto-detected or manual), build command (e.g., npm run build), output directory (e.g., dist, .next, build), install command (e.g., npm install), root directory, and environment variables. Sites support branch-based deployments and preview deployments for pull requests.",
		rubric:
			"Must mention: 1) At least 2 deployment methods (Git, CLI, or manual), 2) Build command configuration, 3) Output directory setting, 4) Framework support/presets, 5) Environment variables",
		reference:
			"Appwrite Sites supports Git-based deployments, CLI deployments, and manual uploads. Configuration includes framework preset, build command, output directory, install command, root directory, and environment variables.",
	},
	{
		id: "sites-5",
		category: "sites",
		type: "mcq",
		question:
			"What happens when you push to a connected Git repository for an Appwrite Site?",
		choices: [
			"Nothing, you must manually trigger deployments",
			"A new deployment is automatically triggered, building and deploying the latest code",
			"Only a notification is sent",
			"The repository is cloned but not deployed",
		],
		correctAnswer: "B",
	},
	{
		id: "sites-6",
		category: "sites",
		type: "mcq",
		question:
			"Which of the following frameworks is supported by Appwrite Sites for dynamic rendering?",
		choices: ["Ruby on Rails", "Next.js", "Django", "Laravel"],
		correctAnswer: "B",
	},
	{
		id: "sites-7",
		category: "sites",
		type: "mcq",
		question: "How does Appwrite Sites handle SSL/TLS certificates?",
		choices: [
			"You must purchase and upload your own certificates",
			"SSL certificates are automatically provisioned and renewed for custom domains",
			"SSL is only available on paid plans",
			"SSL is not supported",
		],
		correctAnswer: "B",
	},
	{
		id: "sites-8",
		category: "sites",
		type: "mcq",
		question:
			'What is the purpose of the "output directory" in Appwrite Sites build configuration?',
		choices: [
			"The directory where logs are stored",
			"The directory containing the built/compiled output to be served (e.g., dist, build, .next)",
			"The directory for source code",
			"The directory for environment files",
		],
		correctAnswer: "B",
	},
	{
		id: "sites-9",
		category: "sites",
		type: "mcq",
		question: "Can Appwrite Sites be used with environment variables?",
		choices: [
			"No, environment variables are only for Functions",
			"Yes, environment variables can be set for the build process and runtime",
			"Only hardcoded values are supported",
			"Environment variables require a separate plugin",
		],
		correctAnswer: "B",
	},
	{
		id: "sites-10",
		category: "sites",
		type: "mcq",
		question: "How do you deploy an Appwrite Site using the CLI?",
		choices: [
			"appwrite upload site",
			"appwrite deploy site",
			"appwrite publish site",
			"appwrite sites create",
		],
		correctAnswer: "B",
	},
];
