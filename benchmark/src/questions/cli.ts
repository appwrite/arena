import type { Question } from "../types";

export const cliQuestions: Question[] = [
	{
		id: "cli-1",
		category: "cli",
		type: "mcq",
		question: "How do you install the Appwrite CLI using npm?",
		choices: [
			"npm install -g appwrite-cli",
			"npm install appwrite",
			"npm install -g @appwrite/cli",
			"npx appwrite-cli install",
		],
		correctAnswer: "A",
	},
	{
		id: "cli-2",
		category: "cli",
		type: "mcq",
		question:
			"What is the standard workflow for deploying resources with the CLI?",
		choices: [
			"create → build → deploy",
			"setup → configure → upload",
			"init → modify → push",
			"new → edit → publish",
		],
		correctAnswer: "C",
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
			"appwrite.config.json",
		],
		correctAnswer: "D",
	},
	{
		id: "cli-5",
		category: "cli",
		type: "mcq",
		question:
			"Which flag makes CLI commands non-interactive for CI/CD?",
		choices: ["--yes", "--ci", "--force", "--non-interactive"],
		correctAnswer: "C",
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
			"Describe the complete workflow for creating, configuring, and deploying an Appwrite Function using the CLI. Include key configuration options in appwrite.config.json.",
		correctAnswer:
			"Run appwrite init function to scaffold, choose runtime and template, configure appwrite.config.json with function settings (name, runtime, execute permissions, variables, schedule, etc.), develop locally with appwrite run function, then deploy with appwrite push functions.",
		rubric:
			"Must mention: 1) appwrite init function to scaffold, 2) Runtime selection, 3) appwrite.config.json configuration options, 4) Local development with appwrite run function, 5) Deployment with appwrite push functions",
	},
	{
		id: "cli-11",
		category: "cli",
		type: "mcq",
		question: "What command initializes the CLI with your Appwrite project and creates appwrite.config.json?",
		choices: [
			"appwrite init project",
			"appwrite setup",
			"appwrite config project",
			"appwrite login --project",
		],
		correctAnswer: "A",
	},
	{
		id: "cli-12",
		category: "cli",
		type: "mcq",
		question: "How do you deploy database collections to Appwrite using the CLI?",
		choices: [
			"appwrite deploy collections",
			"appwrite sync collections",
			"appwrite upload collections",
			"appwrite push collections",
		],
		correctAnswer: "D",
	},
	{
		id: "cli-13",
		category: "cli",
		type: "mcq",
		question: "How do you allow the CLI to connect to a server with a self-signed SSL certificate?",
		choices: [
			"appwrite --insecure",
			"appwrite ssl skip",
			"appwrite client --selfSigned true",
			"Set NODE_TLS_REJECT_UNAUTHORIZED=0",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-14",
		category: "cli",
		type: "mcq",
		question: "What does the appwrite.config.json file represent?",
		choices: [
			"Only function configurations",
			"User credentials only",
			"Project context: functions, collections, and other resources the CLI tracks for deployment",
			"Environment variables for the project",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-15",
		category: "cli",
		type: "mcq",
		question: "How can you fetch existing collections from your project into the CLI?",
		choices: [
			"appwrite init collection",
			"appwrite sync",
			"appwrite fetch collections",
			"appwrite pull collections",
		],
		correctAnswer: "A",
	},
	{
		id: "cli-16",
		category: "cli",
		type: "mcq",
		question: "Which CLI command lists users in the project?",
		choices: [
			"appwrite account list",
			"appwrite list users",
			"appwrite users --list",
			"appwrite users list",
		],
		correctAnswer: "D",
	},
	{
		id: "cli-17",
		category: "cli",
		type: "mcq",
		question: "To create a document via CLI, which command do you use?",
		choices: [
			"appwrite databases create-document",
			"appwrite databases add document",
			"appwrite documents create",
			"appwrite db insert",
		],
		correctAnswer: "A",
	},
	{
		id: "cli-18",
		category: "cli",
		type: "mcq",
		question: "What does the appwrite push command do?",
		choices: [
			"Pushes code to a Git repository",
			"Uploads environment variables only",
			"Deploys tracked resources (e.g. functions, collections) from appwrite.config.json to your Appwrite project",
			"Syncs local config with the server and overwrites server state",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-19",
		category: "cli",
		type: "mcq",
		question: "How do you get help for a specific service (e.g. users) in the CLI?",
		choices: [
			"appwrite help users",
			"appwrite --help users",
			"appwrite docs users",
			"appwrite users or appwrite users --help",
		],
		correctAnswer: "D",
	},
	{
		id: "cli-20",
		category: "cli",
		type: "free-form",
		question:
			"When creating a document with the CLI, how must the data and permissions arguments be passed? Give an example.",
		correctAnswer:
			"The data must be a valid JSON string with keys and values in double quotes. Permissions like read and write are passed as arrays with space-separated values, e.g. --data '{\"name\": \"John\"}' --permissions 'read(\"any\")' 'read(\"team:abc\")'.",
		rubric:
			"Must mention: 1) data as JSON string with double quotes, 2) permissions as array (space-separated in CLI), 3) Example or correct syntax for databases create-document",
	},
	{
		id: "cli-21",
		category: "cli",
		type: "mcq",
		question:
			"What happens if an Appwrite project contains an appwrite.json file but no appwrite.config.json?",
		choices: [
			"The CLI throws an error and requires appwrite.config.json",
			"The CLI falls back to appwrite.json for legacy backwards compatibility",
			"The CLI ignores it and uses default settings",
			"The CLI automatically migrates appwrite.json to appwrite.config.json",
		],
		correctAnswer: "B",
	},
	{
		id: "cli-22",
		category: "cli",
		type: "mcq",
		question:
			"What does the appwrite types command do?",
		choices: [
		  "Generates typed models for your Appwrite project's collections and attributes",
			"Lists all data types supported by Appwrite databases",
			"Converts documents between different data formats",
			"Validates the types defined in appwrite.config.json",
		],
		correctAnswer: "A",
	},
	{
		id: "cli-23",
		category: "cli",
		type: "mcq",
		question:
			"What does the --strict flag do in the appwrite types command?",
		choices: [
			"Enforces type-safe null checks in generated code",
			"Throws errors for missing or invalid collection attributes",
			"Automatically converts field names to follow language conventions",
			"Disables generation of optional fields",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-24",
		category: "cli",
		type: "mcq",
		question:
			"A function works locally but fails after pushing because environment variables are missing. What flag was likely missing from the push command?",
		choices: [
			"--env",
			"--with-variables",
			"--include-env",
			"--push-variables",
		],
		correctAnswer: "B",
	},
	{
		id: "cli-25",
		category: "cli",
		type: "mcq",
		question:
			"When defining an attribute in appwrite.config.json, what happens if 'type' is 'string' or 'varchar' but 'size' is not defined?",
		choices: [
			"The attribute is created with a default size of 255",
			"The attribute is created as an unlimited text field",
			"The CLI automatically calculates the size based on sample data",
			"The CLI throws a validation error because 'size' is required for string/varchar types",
		],
		correctAnswer: "D",
	},
	{
		id: "cli-26",
		category: "cli",
		type: "mcq",
		question:
			"In appwrite.config.json, when defining an attribute with 'required' set to true, what must the 'default' property be set to?",
		choices: [
			"The default can be any value matching the type",
			"The default must be set to an empty string or 0",
			"The default must be null",
			"The default property is optional and can be omitted",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-27",
		category: "cli",
		type: "mcq",
		question:
			"What does the 'appwrite generate' command do?",
		choices: [
			"Generates a new Appwrite project from a template",
			"Creates boilerplate code for functions and collections",
			"Generates a type-safe SDK from your Appwrite project configuration",
			"Generates API documentation for your project",
		],
		correctAnswer: "C",
	},
	{
		id: "cli-28",
		category: "cli",
		type: "mcq",
		question:
			"What's the key difference between `appwrite run function` and `appwrite push function`?",
		choices: [
		  "`run` executes locally with Docker emulation, `push` deploys to Appwrite cloud",
			"`run` deploys to staging, `push` deploys to production",
			"`run` is for testing, `push` is for CI/CD pipelines only",
			"`run` requires internet connection, `push` works offline",
		],
		correctAnswer: "A",
	},
];
