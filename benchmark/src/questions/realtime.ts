import type { Question } from "../types";

export const realtimeQuestions: Question[] = [
	{
		id: "rt-1",
		category: "realtime",
		type: "mcq",
		question: "What protocol does Appwrite Realtime use?",
		choices: [
			"WebSocket",
			"HTTP Long Polling",
			"Server-Sent Events (SSE)",
			"gRPC streaming",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-2",
		category: "realtime",
		type: "mcq",
		question:
			"Which method subscribes to realtime events in the Web SDK?",
		choices: [
			"client.realtime(channels)",
			"client.on(event, handler)",
			"realtime.subscribe(channels, callback)",
			"client.listen(channels)",
		],
		correctAnswer: "C",
	},
	{
		id: "rt-3",
		category: "realtime",
		type: "mcq",
		question:
			"What happens when you subscribe to a new channel on an existing connection?",
		choices: [
			"The active subscription is updated with the new channel",
			"An error is thrown because only one subscription is allowed",
			"Connection is always recreated (old closed, new opened)",
			"A separate parallel connection is opened",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-4",
		category: "realtime",
		type: "mcq",
		question: "Which of these is a valid Realtime channel?",
		choices: [
			"tablesdb.[DB_ID].tables.[TABLE_ID].rows",
			"realtime.documents.[DOCUMENT_ID]",
			"subscribe.tablesdb.tables",
			"events.tablesdb.rows.create",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-5",
		category: "realtime",
		type: "mcq",
		question:
			"What does the Realtime response payload contain for a row event?",
		choices: [
			"Only the row $id and the event type",
			"A reference URL to fetch the row",
			"The row data including $id, $createdAt, $updatedAt, and custom fields",
			"Only the fields that changed",
		],
		correctAnswer: "C",
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
			"An authentication event is fired on the existing subscription",
			"Subscription must be recreated to receive events for the authenticated user",
			"The server rejects the authentication until the subscription is closed",
		],
		correctAnswer: "C",
	},
	{
		id: "rt-8",
		category: "realtime",
		type: "mcq",
		question:
			"How do you unsubscribe from a Realtime channel in the Web SDK?",
		choices: [
			"Call `unsubscribe()` on the subscription returned by `realtime.subscribe()`",
			"client.unsubscribe(channel)",
			"client.realtime.close()",
			"subscription.remove()",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-9",
		category: "realtime",
		type: "free-form",
		question:
			"Write code using the Appwrite Web SDK to subscribe to realtime table row changes and file uploads simultaneously, handling each event type differently.",
		correctAnswer:
			"Use realtime.subscribe() with an array of channels for both TablesDB rows and storage files, then check the event string in the callback to differentiate between row and file events and handle them accordingly.",
		rubric:
			"Must mention: 1) Realtime + realtime.subscribe() with array of channels, 2) Channel for rows (tablesdb.[ID].tables.[ID].rows or Channel.tablesdb(...).table(...).row()), 3) Channel for files (buckets.[ID].files or Channel.bucket(...).file()), 4) Event type checking in callback, 5) Different handling logic per event type",
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
	{
		id: "rt-11",
		category: "realtime",
		type: "mcq",
		question: "What does realtime.subscribe(channels, callback) return?",
		choices: [
			"A subscription object that can unsubscribe from those channels",
			"A promise that resolves when the first event is received",
			"The subscription ID",
			"Nothing (undefined)",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-12",
		category: "realtime",
		type: "mcq",
		question: "What does the Realtime event payload contain?",
		choices: [
			"Only the event name",
			"Only the changed fields",
			"events (array), channels (array), timestamp, and payload (e.g. row or file data)",
			"A URL to fetch the resource",
		],
		correctAnswer: "C",
	},
	{
		id: "rt-13",
		category: "realtime",
		type: "mcq",
		question: "Which channel format subscribes to row changes in a table?",
		choices: [
			"tablesdb.[databaseId].tables.[tableId].rows",
			"tables.[tableId].rows",
			"rows.[tableId]",
			"realtime.tables.[tableId]",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-14",
		category: "realtime",
		type: "mcq",
		question: "How does the client authenticate to Realtime?",
		choices: [
			"API key in the query string",
			"Bearer token in a header",
			"Session/cookies sent during the WebSocket handshake",
			"Realtime does not support authentication",
		],
		correctAnswer: "C",
	},
	{
		id: "rt-15",
		category: "realtime",
		type: "mcq",
		question: "What event types can you receive for a rows channel?",
		choices: [
			"create, update, delete, and optionally other events depending on the resource",
			"Only create and delete",
			"Only update",
			"custom events only",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-16",
		category: "realtime",
		type: "mcq",
		question: "When you subscribe to a new channel on an existing Realtime connection, what happens?",
		choices: [
			"The active subscription is updated with the new channel",
			"An error is thrown",
			"The connection is always recreated: the old socket is closed and a new one is opened with all channels",
			"A separate connection is opened for the new channel",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-17",
		category: "realtime",
		type: "mcq",
		question: "Which channel format is used to subscribe to file changes in a bucket?",
		choices: [
			"buckets.[bucketId].files",
			"storage.[bucketId].files",
			"files.[bucketId]",
			"realtime.buckets.[bucketId].files",
		],
		correctAnswer: "A",
	},
	{
		id: "rt-18",
		category: "realtime",
		type: "mcq",
		question: "Does the Realtime payload include the full row when a row is updated?",
		choices: [
			"No, only the row ID",
			"Only the fields that changed",
			"Yes, the payload includes the full row (e.g. $id, $createdAt, $updatedAt and columns)",
			"Only a version number",
		],
		correctAnswer: "C",
	},
	{
		id: "rt-19",
		category: "realtime",
		type: "mcq",
		question: "If a user logs in after already having a Realtime subscription, will they receive events for resources they can now access?",
		choices: [
			"Yes, the subscription automatically updates",
			"The server pushes an auth event and then updates",
			"The subscription must be recreated to apply the new user's permissions",
			"Realtime does not respect permissions",
		],
		correctAnswer: "C",
	},
	{
		id: "rt-20",
		category: "realtime",
		type: "free-form",
		question:
			"Write a single realtime.subscribe() call that listens to both a TablesDB table's rows and a storage bucket's files. What are the exact channel strings?",
		correctAnswer:
			"realtime.subscribe([ 'tablesdb.[databaseId].tables.[tableId].rows', 'buckets.[bucketId].files' ], callback). The channel strings are tablesdb.[databaseId].tables.[tableId].rows and buckets.[bucketId].files.",
		rubric:
			"Must include: 1) realtime.subscribe with array of channels, 2) Correct rows channel format (tablesdb...tables...rows), 3) Correct files channel format (buckets...files), 4) Callback",
	},
];
