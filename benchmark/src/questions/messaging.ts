import type { Question } from "../types";

export const messagingQuestions: Question[] = [
	{
		id: "msg-1",
		category: "messaging",
		type: "mcq",
		question: "What channels does Appwrite Messaging support?",
		choices: [
			"Email, SMS, and Push Notifications",
			"Email only",
			"Email and SMS only",
			"Push Notifications only",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-2",
		category: "messaging",
		type: "mcq",
		question: 'What is a "provider" in Appwrite Messaging?',
		choices: [
			"An Appwrite hosting partner",
			"A user role with messaging permissions",
			"A third-party service integration (like Mailgun, Twilio, APNS, FCM) that handles message delivery",
			"A database collection for messages",
		],
		correctAnswer: "C",
	},
	{
		id: "msg-3",
		category: "messaging",
		type: "mcq",
		question: 'What is a "topic" in Appwrite Messaging?',
		choices: [
			"A group that users can subscribe to for receiving targeted messages",
			"A message subject line",
			"A message priority level",
			"A message template category",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-4",
		category: "messaging",
		type: "free-form",
		question:
			"Explain how to set up push notifications with Appwrite Messaging. What providers are supported and how do you send a push notification to a topic?",
		correctAnswer:
			"Appwrite Messaging supports FCM and APNS for push. Setup involves configuring providers, creating topics, subscribing user targets, then sending via messaging.createPush() with topic IDs.",
		rubric:
			"Must mention: 1) FCM and/or APNS providers, 2) Topic creation for targeting, 3) User subscription/targets, 4) messaging.createPush() method, 5) Device token registration",
	},
	{
		id: "msg-5",
		category: "messaging",
		type: "mcq",
		question:
			"Which email providers can be configured with Appwrite Messaging?",
		choices: [
			"Only Appwrite's built-in SMTP",
			"Gmail only",
			"Mailgun, SendGrid, SMTP, and other supported providers",
			"Amazon SES only",
		],
		correctAnswer: "C",
	},
	{
		id: "msg-6",
		category: "messaging",
		type: "mcq",
		question: "How do you send an email using Appwrite Messaging?",
		choices: [
			"messaging.createEmail(messageId, subject, content, topics, users, targets)",
			"messaging.send()",
			"email.create()",
			"messaging.dispatch()",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-7",
		category: "messaging",
		type: "mcq",
		question: 'What are "targets" in Appwrite Messaging?',
		choices: [
			"IP addresses for message routing",
			"Server endpoints for message processing",
			"Delivery endpoints for a user, such as email addresses, phone numbers, or push tokens",
			"Message templates",
		],
		correctAnswer: "C",
	},
	{
		id: "msg-8",
		category: "messaging",
		type: "mcq",
		question: "Which SMS providers does Appwrite Messaging support?",
		choices: [
			"Twilio, Vonage, Textmagic, and other supported providers",
			"Only built-in SMS",
			"Twilio only",
			"SMS is not supported",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-9",
		category: "messaging",
		type: "free-form",
		question:
			"Describe how Appwrite Messaging handles message targeting. How can you send messages to specific users, topics, or individual targets?",
		correctAnswer:
			"Messages can target topics (group subscriptions), users (all targets of specified users), or individual targets (specific delivery endpoints). These can be combined in a single message creation call.",
		rubric:
			"Must mention: 1) Three targeting methods: topics, users, targets, 2) Topic subscription mechanism, 3) How messages are sent to each target type, 4) That targeting can be combined",
	},
	{
		id: "msg-10",
		category: "messaging",
		type: "mcq",
		question: "Can Appwrite Messaging schedule messages for future delivery?",
		choices: [
			"No, messages are always sent immediately",
			"Only through custom Functions",
			"Yes, using the scheduledAt parameter when creating a message",
			"Only for email messages",
		],
		correctAnswer: "C",
	},
	{
		id: "msg-11",
		category: "messaging",
		type: "mcq",
		question: "What parameter do you use to schedule a message for future delivery?",
		choices: [
			"scheduledAt",
			"delay",
			"sendAt",
			"schedule",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-12",
		category: "messaging",
		type: "mcq",
		question: "In Appwrite Messaging, how do topics and targets relate?",
		choices: [
			"Topics are the same as targets",
			"Targets are only for email",
			"Users subscribe to topics; targets are a user's delivery endpoints (email, phone, push token). You send to topics and/or users and/or targets.",
			"Topics replace the need for targets",
		],
		correctAnswer: "C",
	},
	{
		id: "msg-13",
		category: "messaging",
		type: "mcq",
		question: "Which push notification providers does Appwrite Messaging support?",
		choices: [
			"FCM (Firebase Cloud Messaging) and APNS (Apple Push Notification service)",
			"Only one custom provider",
			"Only FCM",
			"Only web push",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-14",
		category: "messaging",
		type: "mcq",
		question: "Where do you configure messaging providers (e.g. Mailgun, Twilio)?",
		choices: [
			"In each message send call",
			"In environment variables only",
			"In the Appwrite Console (or API): add and configure providers for the project",
			"Providers are built-in and need no configuration",
		],
		correctAnswer: "C",
	},
	{
		id: "msg-15",
		category: "messaging",
		type: "mcq",
		question: "What is a target in Appwrite Messaging?",
		choices: [
			"A delivery endpoint for a user (e.g. an email address, phone number, or push device token)",
			"A message template",
			"A user group",
			"A provider configuration",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-16",
		category: "messaging",
		type: "mcq",
		question: "Can you send one message to both topics and specific users in the same request?",
		choices: [
			"No, you must choose one targeting method",
			"Only for email",
			"Yes, targeting by topics, users, and targets can be combined in a single message",
			"Only in the Console",
		],
		correctAnswer: "C",
	},
	{
		id: "msg-17",
		category: "messaging",
		type: "mcq",
		question: "Which service do you use from the client or server SDK to send emails?",
		choices: [
			"Messaging service (e.g. messaging.createEmail)",
			"Email service",
			"Mail service",
			"Notifications service",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-18",
		category: "messaging",
		type: "mcq",
		question: "Who can subscribe a user to a topic for push notifications?",
		choices: [
			"Only the user from the client",
			"Only the Console",
			"The backend (with appropriate permissions) or the client; targets and topic subscriptions are managed via API",
			"Only server SDK with API key",
		],
		correctAnswer: "C",
	},
	{
		id: "msg-19",
		category: "messaging",
		type: "mcq",
		question: "What are message templates used for in Appwrite Messaging?",
		choices: [
			"Predefined content (e.g. subject, body) that can be used when sending messages; you reference them by message ID",
			"Only for email subject lines",
			"Only for SMS",
			"They are not supported",
		],
		correctAnswer: "A",
	},
	{
		id: "msg-20",
		category: "messaging",
		type: "free-form",
		question:
			"Describe the steps to send a push notification to all users subscribed to a topic. What must be configured first?",
		correctAnswer:
			"Configure a push provider (FCM and/or APNS) in the project. Create a topic. Users (or the app) register targets (device tokens) and subscribe those targets to the topic. Then call the API to create/send a push message targeting the topic (e.g. messaging.createPush with topic IDs).",
		rubric:
			"Must mention: 1) Provider configuration (FCM/APNS), 2) Topic creation, 3) User targets/subscriptions to the topic, 4) Sending push to the topic (e.g. createPush with topicIds)",
	},
];
