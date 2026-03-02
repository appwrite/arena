import type { Question } from "../types";

export const cliQuestions: Question[] = [
	{
		id: "cli-1",
		category: "cli",
		type: "mcq",
		question: "How do you install the Appwrite CLI using npm?",
		choices: [
			"npm install appwrite",
			"npm install -g appwrite-cli",
			"npm install -g @appwrite/cli",
			"npx appwrite-cli install",
		],
		correctAnswer: "B",
	},
	{
		id: "cli-2",
		category: "cli",
		type: "mcq",
		question:
			"What is the standard workflow for deploying resources with the CLI?",
		choices: [
			"create → build → deploy",
			"init → modify → push",
			"setup → configure → upload",
			"new → edit → publish",
		],
		correctAnswer: "B",
	},
	{
		id: "cli-3",
		category: "cli",
		type: "mcq",
		question:
			"What command initializes a new Appwrite Function via the CLI?",
		choices: [
			"appwrite create function",
			"appwrite new function",
			"appwrite init function",
			"appwrite functions init",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-4",
		category: "cli",
		type: "mcq",
		question: "What configuration file does the Appwrite CLI use?",
		choices: [
			"appwrite.config.js",
			".appwriterc",
			"appwrite.yaml",
			"appwrite.json",
		],
		correctAnswer: "D",
	},
	{
		id: "cli-5",
		category: "cli",
		type: "mcq",
		question:
			"Which flag makes CLI commands non-interactive for CI/CD?",
		choices: ["--yes", "--force", "--ci", "--non-interactive"],
		correctAnswer: "B",
	},
	{
		id: "cli-6",
		category: "cli",
		type: "mcq",
		question: "What command deploys functions to Appwrite?",
		choices: [
			"appwrite deploy functions",
			"appwrite functions deploy",
			"appwrite push functions",
			"appwrite upload functions",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-7",
		category: "cli",
		type: "mcq",
		question: "How do you run functions locally for development?",
		choices: [
			"appwrite functions serve",
			"appwrite dev function",
			"appwrite run function",
			"appwrite local function",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-8",
		category: "cli",
		type: "mcq",
		question:
			"What command pulls existing remote resources into your local project?",
		choices: [
			"appwrite fetch",
			"appwrite sync",
			"appwrite download",
			"appwrite pull",
		],
		correctAnswer: "D",
	},
	{
		id: "cli-9",
		category: "cli",
		type: "free-form",
		question:
			"Explain how to set up a CI/CD pipeline using the Appwrite CLI. What commands and flags are needed for non-interactive deployment?",
		correctAnswer:
			"Set up API key authentication with environment variables, use appwrite login with --endpoint and --key flags, then run appwrite push with --force flag for non-interactive deployment. Configure these as CI/CD pipeline steps.",
		rubric:
			"Must mention: 1) API key or service account authentication, 2) --force flag for non-interactive mode, 3) appwrite push command, 4) Environment variable configuration, 5) Login/authentication step in the pipeline",
	},
	{
		id: "cli-10",
		category: "cli",
		type: "free-form",
		question:
			"Describe the complete workflow for creating, configuring, and deploying an Appwrite Function using the CLI. Include key configuration options in appwrite.json.",
		correctAnswer:
			"Run appwrite init function to scaffold, choose runtime and template, configure appwrite.json with function settings (name, runtime, execute permissions, variables, schedule, etc.), develop locally with appwrite run function, then deploy with appwrite push functions.",
		rubric:
			"Must mention: 1) appwrite init function to scaffold, 2) Runtime selection, 3) appwrite.json configuration options, 4) Local development with appwrite run function, 5) Deployment with appwrite push functions",
	},
];
