import type { Question } from "../types";

export const functionsQuestions: Question[] = [
	{
		id: "func-1",
		category: "functions",
		type: "mcq",
		question: "Which runtimes does Appwrite Functions support?",
		choices: [
			"Node.js only",
			"Node.js, Python, PHP, Ruby, Dart, Deno, Swift, Kotlin, Java, Bun, and more",
			"Node.js and Python only",
			"Any Docker container",
		],
		correctAnswer: "B",
	},
	{
		id: "func-2",
		category: "functions",
		type: "mcq",
		question: "How are environment variables provided to Appwrite Functions?",
		choices: [
			"Through a .env file in the function directory",
			"Set in the Appwrite Console or API, accessible at runtime",
			"Hardcoded in the function code",
			"Through command-line arguments",
		],
		correctAnswer: "B",
	},
	{
		id: "func-3",
		category: "functions",
		type: "free-form",
		question:
			'Write an Appwrite Function in Node.js that receives a JSON body with a "name" field and returns a personalized greeting. Use the correct function signature and response format.',
		correctAnswer:
			"Appwrite Functions use export default async ({ req, res, log, error }) => {} signature. Request body is in req.body. Response uses res.json(), res.text(), res.empty(), or res.redirect().",
		rubric:
			"Must include: 1) Default export of async function, 2) Destructured context with req, res, log or error, 3) Parsing req.body, 4) Using res.json() for response, 5) Correct function signature pattern",
	},
	{
		id: "func-4",
		category: "functions",
		type: "mcq",
		question: "What are the ways to trigger an Appwrite Function execution?",
		choices: [
			"HTTP requests only",
			"HTTP requests, event triggers, scheduled (CRON), and manual execution via API/Console",
			"Only through the Appwrite Console",
			"Only through webhooks",
		],
		correctAnswer: "B",
	},
	{
		id: "func-5",
		category: "functions",
		type: "mcq",
		question:
			'What is the purpose of the "build command" in an Appwrite Function configuration?',
		choices: [
			"To compile the function to machine code",
			"To run commands during deployment to install dependencies and prepare the function",
			"To build the Appwrite server",
			"To create a Docker image",
		],
		correctAnswer: "B",
	},
	{
		id: "func-6",
		category: "functions",
		type: "mcq",
		question:
			"How can an Appwrite Function access other Appwrite services like Databases?",
		choices: [
			"Functions cannot access other Appwrite services",
			"By importing the Node.js SDK and using the function's API key or the APPWRITE_FUNCTION_API_ENDPOINT and APPWRITE_FUNCTION_PROJECT_ID environment variables",
			"Through REST API calls only with no SDK support",
			"By directly accessing the database filesystem",
		],
		correctAnswer: "B",
	},
	{
		id: "func-7",
		category: "functions",
		type: "free-form",
		question:
			"Explain how to deploy an Appwrite Function using the Appwrite CLI. What are the steps and key configuration options?",
		correctAnswer:
			"Appwrite CLI enables function deployment through init (appwrite init function) and deploy (appwrite deploy function) commands. Configuration is stored in appwrite.json including runtime, entrypoint, build commands, scopes, and schedule.",
		rubric:
			"Must mention: 1) CLI installation, 2) appwrite init or function initialization, 3) Configuration in appwrite.json, 4) appwrite deploy command, 5) Key options like runtime, entrypoint, build commands",
	},
	{
		id: "func-8",
		category: "functions",
		type: "mcq",
		question: "What context parameters does an Appwrite Function receive?",
		choices: [
			"request and response only",
			"req, res, log, and error",
			"event, context, and callback",
			"input, output, and logger",
		],
		correctAnswer: "B",
	},
	{
		id: "func-9",
		category: "functions",
		type: "mcq",
		question: "How do you schedule an Appwrite Function to run periodically?",
		choices: [
			"Using JavaScript setTimeout()",
			"Using a CRON expression in the function configuration",
			"Through an external scheduler service",
			"Scheduled execution is not supported",
		],
		correctAnswer: "B",
	},
	{
		id: "func-10",
		category: "functions",
		type: "mcq",
		question: "What response methods are available in Appwrite Functions?",
		choices: [
			"res.send() only",
			"res.json(), res.text(), res.empty(), res.redirect()",
			"res.write() and res.end()",
			"return JSON.stringify(data)",
		],
		correctAnswer: "B",
	},
	{
		id: "func-11",
		category: "functions",
		type: "mcq",
		question: "What are the possible statuses of an Appwrite Function execution?",
		choices: [
			"pending, running, done, error",
			"waiting, processing, completed, failed, and scheduled",
			"queued, active, success, failure",
			"created, started, finished, crashed",
		],
		correctAnswer: "B",
	},
	{
		id: "func-12",
		category: "functions",
		type: "mcq",
		question:
			"When you call the SDK's createExecution with async: true, what happens?",
		choices: [
			"The request fails because async is not supported",
			"The API returns immediately with execution status 'waiting'; the function runs in the background and you can poll Get Execution for updates",
			"The client must provide a webhook URL to receive the result",
			"The execution is queued but never runs",
		],
		correctAnswer: "B",
	},
	{
		id: "func-13",
		category: "functions",
		type: "mcq",
		question:
			"Can an Appwrite Function be triggered by an event from another function's execution (e.g. functions.*.executions.*.create)?",
		choices: [
			"Yes, function execution events are supported like any other event",
			"No; triggering a function on a function event (events starting with 'functions.') is not allowed",
			"Only in the Console, not via event configuration",
			"Yes, but only for completed executions",
		],
		correctAnswer: "B",
	},
	{
		id: "func-14",
		category: "functions",
		type: "mcq",
		question:
			"When can you successfully execute an Appwrite Function via the API?",
		choices: [
			"As soon as the function resource is created",
			"Only after the function has an active deployment whose build status is 'ready'",
			"After the first deployment is created, regardless of build status",
			"Only when the deployment status is 'building'",
		],
		correctAnswer: "B",
	},
	{
		id: "func-15",
		category: "functions",
		type: "mcq",
		question:
			"Besides functionId and data, what parameters does the createExecution API support?",
		choices: [
			"None",
			"async only",
			"async, path, method, headers, and scheduledAt (ISO 8601)",
			"path and method only",
		],
		correctAnswer: "C",
	},
	{
		id: "func-16",
		category: "functions",
		type: "mcq",
		question:
			"When passing custom headers to createExecution, what restriction applies?",
		choices: [
			"Headers are not allowed; only the request body is passed",
			"Header names cannot start with 'x-appwrite-'; they are reserved by Appwrite",
			"Only Content-Type is allowed",
			"There are no restrictions on header names",
		],
		correctAnswer: "B",
	},
	{
		id: "func-17",
		category: "functions",
		type: "mcq",
		question:
			"Which environment variable is set at runtime to indicate how the function was triggered (e.g. http, event, schedule)?",
		choices: [
			"APPWRITE_TRIGGER_TYPE",
			"APPWRITE_FUNCTION_TRIGGER",
			"APPWRITE_EXECUTION_SOURCE",
			"APPWRITE_FUNCTION_EVENT",
		],
		correctAnswer: "B",
	},
	{
		id: "func-18",
		category: "functions",
		type: "mcq",
		question: "What are the deployment build statuses for an Appwrite Function?",
		choices: [
			"pending, building, ready",
			"processing, building, ready, and canceled",
			"queued, in_progress, success, failed",
			"uploaded, compiling, deployed",
		],
		correctAnswer: "B",
	},
	{
		id: "func-19",
		category: "functions",
		type: "mcq",
		question:
			"Which API key or auth type can be used to trigger a function execution (createExecution)?",
		choices: [
			"Only Server API key",
			"Only Session (logged-in user)",
			"Server API key, Session, scoped API key (Key), or JWT",
			"Only JWT",
		],
		correctAnswer: "C",
	},
	{
		id: "func-20",
		category: "functions",
		type: "free-form",
		question:
			"Name at least three APPWRITE_FUNCTION_* environment variables that are available inside an Appwrite Function at runtime, and what each is used for.",
		correctAnswer:
			"Examples: APPWRITE_FUNCTION_ID (function ID), APPWRITE_FUNCTION_NAME, APPWRITE_FUNCTION_PROJECT_ID, APPWRITE_FUNCTION_API_ENDPOINT (for SDK), APPWRITE_FUNCTION_TRIGGER (http/event/schedule), APPWRITE_FUNCTION_EVENT (event name when event-triggered), APPWRITE_FUNCTION_JWT (user JWT when present), APPWRITE_FUNCTION_USER_ID, APPWRITE_FUNCTION_DATA / APPWRITE_FUNCTION_EVENT_DATA (body), APPWRITE_FUNCTION_DEPLOYMENT, APPWRITE_FUNCTION_RUNTIME_NAME, APPWRITE_FUNCTION_RUNTIME_VERSION, APPWRITE_FUNCTION_CPUS, APPWRITE_FUNCTION_MEMORY.",
		rubric:
			"Must name at least 3 APPWRITE_FUNCTION_* variables with correct purpose. Accept any subset of the documented runtime env vars (ID, name, project ID, API endpoint, trigger, event, JWT, user ID, data, deployment, runtime, resources).",
	},
];