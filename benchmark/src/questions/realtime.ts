import type { Question } from "../types";

export const realtimeQuestions: Question[] = [
	{
		id: "rt-1",
		category: "realtime",
		type: "mcq",
		question: "What protocol does Appwrite Realtime use?",
		choices: [
			"HTTP Long Polling",
			"WebSocket",
			"Server-Sent Events (SSE)",
			"gRPC streaming",
		],
		correctAnswer: "B",
	},
	{
		id: "rt-2",
		category: "realtime",
		type: "mcq",
		question:
			"Which method subscribes to realtime events in the Web SDK?",
		choices: [
			"client.realtime(channels)",
			"client.subscribe(channels, callback)",
			"client.on(event, handler)",
			"client.listen(channels)",
		],
		correctAnswer: "B",
	},
	{
		id: "rt-3",
		category: "realtime",
		type: "mcq",
		question:
			"What happens when you subscribe to a new channel on an existing connection?",
		choices: [
			"The new channel is added to the existing connection",
			"An error is thrown because only one subscription is allowed",
			"Connection is recreated (old closed, new opened)",
			"A separate parallel connection is opened",
		],
		correctAnswer: "C",
	},
	{
		id: "rt-4",
		category: "realtime",
		type: "mcq",
		question: "Which of these is a valid Realtime channel?",
		choices: [
			"realtime.documents.[DOCUMENT_ID]",
			"databases.[DB_ID].collections.[COLL_ID].documents",
			"subscribe.databases.collections",
			"events.databases.documents.create",
		],
		correctAnswer: "B",
	},
	{
		id: "rt-5",
		category: "realtime",
		type: "mcq",
		question:
			"What does the Realtime response payload contain for a document event?",
		choices: [
			"Only the document $id and the event type",
			"The document data including $id, $createdAt, $updatedAt, and custom fields",
			"A reference URL to fetch the document",
			"Only the fields that changed",
		],
		correctAnswer: "B",
	},
	{
		id: "rt-6",
		category: "realtime",
		type: "mcq",
		question:
			"How is authentication handled for Realtime connections?",
		choices: [
			"Through an API key passed as a query parameter",
			"Through a separate authentication WebSocket",
			"Through cookies/session tokens passed during WebSocket handshake",
			"Authentication is not supported for Realtime",
		],
		correctAnswer: "C",
	},
	{
		id: "rt-7",
		category: "realtime",
		type: "mcq",
		question:
			"What happens if a user authenticates after creating a Realtime subscription?",
		choices: [
			"The subscription automatically updates with the new permissions",
			"Subscription must be recreated to receive events for the authenticated user",
			"An authentication event is fired on the existing subscription",
			"The server rejects the authentication until the subscription is closed",
		],
		correctAnswer: "B",
	},
	{
		id: "rt-8",
		category: "realtime",
		type: "mcq",
		question:
			"How do you unsubscribe from a Realtime channel in the Web SDK?",
		choices: [
			"client.unsubscribe(channel)",
			"Call the function returned by `client.subscribe()`",
			"client.realtime.close()",
			"subscription.remove()",
		],
		correctAnswer: "B",
	},
	{
		id: "rt-9",
		category: "realtime",
		type: "free-form",
		question:
			"Write code using the Appwrite Web SDK to subscribe to realtime document changes and file uploads simultaneously, handling each event type differently.",
		correctAnswer:
			"Use client.subscribe() with an array of channels for both databases documents and storage files, then check the event string in the callback to differentiate between document and file events and handle them accordingly.",
		rubric:
			"Must mention: 1) client.subscribe() with array of channels, 2) Channel for documents (databases.[ID].collections.[ID].documents), 3) Channel for files (buckets.[ID].files), 4) Event type checking in callback, 5) Different handling logic per event type",
	},
	{
		id: "rt-10",
		category: "realtime",
		type: "free-form",
		question:
			"Explain the differences between Appwrite Realtime and Webhooks. When would you use each?",
		correctAnswer:
			"Realtime uses WebSockets for client-side live updates (e.g., chat apps, live dashboards), while Webhooks are server-to-server HTTP callbacks triggered by events (e.g., sending notifications, syncing with external services). Use Realtime for instant UI updates and Webhooks for backend integrations.",
		rubric:
			"Must mention: 1) Realtime uses WebSockets for client-side, 2) Webhooks use HTTP callbacks server-to-server, 3) Realtime for live UI updates, 4) Webhooks for backend/external integrations, 5) At least one concrete use case for each",
	},
];
