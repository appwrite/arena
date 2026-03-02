import type { Question } from "../types";

export const fundamentalQuestions: Question[] = [
	{
		id: "fund-1",
		category: "fundamental",
		type: "mcq",
		question: "What type of platform is Appwrite?",
		choices: [
			"A frontend JavaScript framework",
			"An open-source backend-as-a-service (BaaS) platform",
			"A cloud hosting provider",
			"A database management system",
		],
		correctAnswer: "B",
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
			"To authenticate server-side requests with specific scope permissions",
			"To configure DNS settings",
			"To manage SSL certificates",
		],
		correctAnswer: "B",
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
			"As a native OS application",
			"Using Docker containers",
			"As a browser extension",
			"Through npm global install",
		],
		correctAnswer: "B",
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
			"An isolated container for your application's backend services and resources",
			"A Git repository connection",
			"A deployment environment",
		],
		correctAnswer: "B",
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
];
