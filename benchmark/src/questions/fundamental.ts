import type { Question } from "../types";

export const fundamentalQuestions: Question[] = [
	{
		id: "fund-1",
		category: "fundamental",
		type: "mcq",
		question: "What type of platform is Appwrite?",
		choices: [
			"An open-source backend-as-a-service (BaaS) platform",
			"A frontend JavaScript framework",
			"A cloud hosting provider",
			"A database management system",
		],
		correctAnswer: "A",
	},
	{
		id: "fund-2",
		category: "fundamental",
		type: "mcq",
		question: "Which of the following is NOT one of Appwrite's core services?",
		choices: ["Auth", "Databases", "Container Orchestration", "Storage"],
		correctAnswer: "C",
	},
	{
		id: "fund-3",
		category: "fundamental",
		type: "mcq",
		question: "What API protocols does Appwrite support?",
		choices: ["REST only", "GraphQL only", "REST and GraphQL", "gRPC and REST"],
		correctAnswer: "C",
	},
	{
		id: "fund-4",
		category: "fundamental",
		type: "mcq",
		question: "What is the purpose of an Appwrite API key?",
		choices: [
			"To encrypt database documents",
			"To configure DNS settings",
			"To authenticate server-side requests with specific scope permissions",
			"To manage SSL certificates",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-5",
		category: "fundamental",
		type: "mcq",
		question: "Which Appwrite feature enables real-time data synchronization?",
		choices: [
			"Webhooks",
			"Server Functions",
			"Realtime API via WebSocket subscriptions",
			"Scheduled Tasks",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-6",
		category: "fundamental",
		type: "free-form",
		question:
			"Explain the difference between client-side and server-side SDKs in Appwrite. When would you use each?",
		correctAnswer:
			"Client SDKs are designed for frontend applications where end users interact directly. They require active sessions for authentication. Server SDKs are for backend applications and use API keys with configurable scopes, allowing operations that bypass collection-level permissions.",
		rubric:
			"Must mention: 1) Client SDKs for frontend/user-facing apps, 2) Server SDKs use API keys, 3) Server SDKs can bypass permissions, 4) Client SDKs require user sessions",
	},
	{
		id: "fund-7",
		category: "fundamental",
		type: "mcq",
		question: "How is Appwrite typically deployed?",
		choices: [
			"Using Docker containers",
			"As a native OS application",
			"As a browser extension",
			"Through npm global install",
		],
		correctAnswer: "A",
	},
	{
		id: "fund-8",
		category: "fundamental",
		type: "free-form",
		question:
			"Describe how Appwrite's permission model works. What are the different permission types available?",
		correctAnswer:
			"Appwrite uses a flexible permission system where each resource (document, file, etc.) has its own permission list. Permissions use Permission.read/create/update/delete with roles like Role.any(), Role.guests(), Role.users(), Role.user(id), Role.team(id), Role.member(id), Role.label(label).",
		rubric:
			"Must mention: 1) Permission types (read, create, update, delete), 2) At least 3 role types, 3) That permissions are set on resources",
	},
	{
		id: "fund-9",
		category: "fundamental",
		type: "mcq",
		question: 'What is a "project" in Appwrite?',
		choices: [
			"A single database collection",
			"A Git repository connection",
			"An isolated container for your application's backend services and resources",
			"A deployment environment",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-10",
		category: "fundamental",
		type: "mcq",
		question:
			"Which of the following is a valid way to subscribe to Appwrite Realtime events?",
		choices: [
			"HTTP long polling",
			"Server-Sent Events (SSE)",
			"WebSocket subscription using client.subscribe()",
			"GraphQL subscriptions",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-11",
		category: "fundamental",
		type: "mcq",
		question: "What is required when initializing the Appwrite client in a frontend app?",
		choices: [
			"Only the API key",
			"Project ID only",
			"Endpoint, Project ID, and a secret key",
			"Endpoint and Project ID at minimum",
		],
		correctAnswer: "D",
	},
	{
		id: "fund-12",
		category: "fundamental",
		type: "mcq",
		question: "How do Webhooks differ from Realtime in Appwrite?",
		choices: [
			"Realtime uses WebSockets for live client updates; Webhooks are HTTP callbacks to your server when events occur",
			"They are the same feature with different names",
			"Webhooks are for client-side only",
			"Realtime is server-to-server only",
		],
		correctAnswer: "A",
	},
	{
		id: "fund-13",
		category: "fundamental",
		type: "mcq",
		question: "What are API key scopes in Appwrite?",
		choices: [
			"Geographic regions for the key",
			"Rate limit tiers",
			"Permissions that limit what the API key can access (e.g. databases.read, users.write)",
			"Encryption levels",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-14",
		category: "fundamental",
		type: "mcq",
		question: "Which role allows access to any user (including unauthenticated)?",
		choices: [
			"Role.any()",
			"Role.users()",
			"Role.guests()",
			"Role.public()",
		],
		correctAnswer: "A",
	},
	{
		id: "fund-15",
		category: "fundamental",
		type: "mcq",
		question: "How is Appwrite typically run in production?",
		choices: [
			"As a single PHP script",
			"Only on Appwrite Cloud",
			"Using Docker containers (e.g. docker compose)",
			"As a serverless deployment",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-16",
		category: "fundamental",
		type: "mcq",
		question: "What does Role.guests() represent?",
		choices: [
			"Users who have not verified their email",
			"Users in a guest team",
			"Unauthenticated users (no session)",
			"Anonymous session users only",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-17",
		category: "fundamental",
		type: "mcq",
		question: "Can you use both REST and GraphQL in the same Appwrite project?",
		choices: [
			"Yes, Appwrite supports both REST and GraphQL APIs for the same data",
			"No, you must choose one",
			"Only if you use separate projects",
			"GraphQL is only for the Console",
		],
		correctAnswer: "A",
	},
	{
		id: "fund-18",
		category: "fundamental",
		type: "mcq",
		question: "Which permission type allows creating a new resource?",
		choices: [
			"Permission.read()",
			"Permission.write()",
			"Permission.create()",
			"Permission.insert()",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-19",
		category: "fundamental",
		type: "mcq",
		question: "What is the purpose of adding a platform (e.g. Web app) to an Appwrite project?",
		choices: [
			"To enable billing for that platform",
			"To install a plugin",
			"To register allowed origins/hosts for auth redirects and API access",
			"To assign a subdomain",
		],
		correctAnswer: "C",
	},
	{
		id: "fund-20",
		category: "fundamental",
		type: "free-form",
		question:
			"Name at least three Appwrite services (product areas) and what each is used for.",
		correctAnswer:
			"Examples: Auth (users, sessions, OAuth, MFA, teams), Databases (collections, documents, queries, relationships), Storage (buckets, files, previews), Functions (serverless execution), Realtime (WebSocket subscriptions), Messaging (email, SMS, push), Sites (static/dynamic hosting), GraphQL (query API).",
		rubric:
			"Must name at least 3 services with correct purpose. Accept Auth, Databases, Storage, Functions, Realtime, Messaging, Sites, GraphQL, CLI, etc. with accurate descriptions.",
	},
];
