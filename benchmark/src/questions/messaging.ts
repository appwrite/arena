import type { Question } from "../types";

export const messagingQuestions: Question[] = [
	{
		id: "msg-1",
		category: "messaging",
		type: "mcq",
		question: "What channels does Appwrite Messaging support?",
		choices: [
			"Email only",
			"Email, SMS, and Push Notifications",
			"Email and SMS only",
			"Push Notifications only",
		],
		correctAnswer: "B",
	},
	{
		id: "msg-2",
		category: "messaging",
		type: "mcq",
		question: 'What is a "provider" in Appwrite Messaging?',
		choices: [
			"An Appwrite hosting partner",
			"A third-party service integration (like Mailgun, Twilio, APNS, FCM) that handles message delivery",
			"A user role with messaging permissions",
			"A database collection for messages",
		],
		correctAnswer: "B",
	},
	{
		id: "msg-3",
		category: "messaging",
		type: "mcq",
		question: 'What is a "topic" in Appwrite Messaging?',
		choices: [
			"A message subject line",
			"A group that users can subscribe to for receiving targeted messages",
			"A message priority level",
			"A message template category",
		],
		correctAnswer: "B",
	},
	{
		id: "msg-4",
		category: "messaging",
		type: "free-form",
		question:
			"Explain how to set up push notifications with Appwrite Messaging. What providers are supported and how do you send a push notification to a topic?",
		correctAnswer:
			"To set up push notifications: 1) Configure a push provider in the Appwrite Console — supported providers include FCM (Firebase Cloud Messaging) for Android and web, and APNS (Apple Push Notification Service) for iOS. 2) Create a topic for targeting users. 3) Subscribe user targets to the topic. 4) Send a push notification using messaging.createPush() with the topic ID, title, body, and optional data payload. Server-side code: messaging.createPush(ID.unique(), title, body, [topicId], [], [], data). Users must register their device push tokens as targets.",
		rubric:
			"Must mention: 1) FCM and/or APNS providers, 2) Topic creation for targeting, 3) User subscription/targets, 4) messaging.createPush() method, 5) Device token registration",
		reference:
			"Appwrite Messaging supports FCM and APNS for push. Setup involves configuring providers, creating topics, subscribing user targets, then sending via messaging.createPush() with topic IDs.",
	},
	{
		id: "msg-5",
		category: "messaging",
		type: "mcq",
		question:
			"Which email providers can be configured with Appwrite Messaging?",
		choices: [
			"Only Appwrite's built-in SMTP",
			"Mailgun, SendGrid, SMTP, and other supported providers",
			"Gmail only",
			"Amazon SES only",
		],
		correctAnswer: "B",
	},
	{
		id: "msg-6",
		category: "messaging",
		type: "mcq",
		question: "How do you send an email using Appwrite Messaging?",
		choices: [
			"messaging.send()",
			"messaging.createEmail(messageId, subject, content, topics, users, targets)",
			"email.create()",
			"messaging.dispatch()",
		],
		correctAnswer: "B",
	},
	{
		id: "msg-7",
		category: "messaging",
		type: "mcq",
		question: 'What are "targets" in Appwrite Messaging?',
		choices: [
			"IP addresses for message routing",
			"Delivery endpoints for a user, such as email addresses, phone numbers, or push tokens",
			"Server endpoints for message processing",
			"Message templates",
		],
		correctAnswer: "B",
	},
	{
		id: "msg-8",
		category: "messaging",
		type: "mcq",
		question: "Which SMS providers does Appwrite Messaging support?",
		choices: [
			"Only built-in SMS",
			"Twilio, Vonage, Textmagic, and other supported providers",
			"Twilio only",
			"SMS is not supported",
		],
		correctAnswer: "B",
	},
	{
		id: "msg-9",
		category: "messaging",
		type: "free-form",
		question:
			"Describe how Appwrite Messaging handles message targeting. How can you send messages to specific users, topics, or individual targets?",
		correctAnswer:
			"Appwrite Messaging supports three targeting methods: 1) Topics — subscribe users to topics and send to all subscribers at once. Create a topic with messaging.createTopic(), subscribe targets with messaging.createSubscriber(). 2) Users — specify user IDs directly when creating a message, which sends to all targets of those users. 3) Targets — specify individual target IDs (specific email, phone, or push token) for precise delivery. When creating a message (createEmail, createSMS, createPush), you pass arrays for topics, users, and targets parameters. Messages can combine multiple targeting methods in a single send.",
		rubric:
			"Must mention: 1) Three targeting methods: topics, users, targets, 2) Topic subscription mechanism, 3) How messages are sent to each target type, 4) That targeting can be combined",
		reference:
			"Messages can target topics (group subscriptions), users (all targets of specified users), or individual targets (specific delivery endpoints). These can be combined in a single message creation call.",
	},
	{
		id: "msg-10",
		category: "messaging",
		type: "mcq",
		question: "Can Appwrite Messaging schedule messages for future delivery?",
		choices: [
			"No, messages are always sent immediately",
			"Yes, using the scheduledAt parameter when creating a message",
			"Only through custom Functions",
			"Only for email messages",
		],
		correctAnswer: "B",
	},
];
