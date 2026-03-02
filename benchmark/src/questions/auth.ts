import type { Question } from "../types";

export const authQuestions: Question[] = [
	{
		id: "auth-1",
		category: "auth",
		type: "mcq",
		question: "Which method creates a new email/password account in Appwrite?",
		choices: [
			"account.create()",
			"account.createEmailPasswordSession()",
			"auth.register()",
			"users.create()",
		],
		correctAnswer: "A",
	},
	{
		id: "auth-2",
		category: "auth",
		type: "mcq",
		question:
			"What is the correct method to create an email/password session (log in) using the Appwrite client SDK?",
		choices: [
			"account.create()",
			"account.createEmailPasswordSession()",
			"account.login()",
			"auth.signIn()",
		],
		correctAnswer: "B",
	},
	{
		id: "auth-3",
		category: "auth",
		type: "mcq",
		question: "How does Appwrite handle OAuth2 authentication?",
		choices: [
			"It only supports OAuth2 through custom functions",
			"It provides built-in OAuth2 support with createOAuth2Session() for 40+ providers",
			"OAuth2 requires a separate plugin installation",
			"It uses JWT tokens exclusively",
		],
		correctAnswer: "B",
	},
	{
		id: "auth-4",
		category: "auth",
		type: "free-form",
		question:
			"Write the code to implement email/password signup and login using the Appwrite Web SDK. Include setting up the client, creating an account, and creating a session.",
		correctAnswer:
			"The Appwrite Web SDK requires initializing a Client with endpoint and project ID, then creating an Account instance. Registration uses account.create(ID.unique(), email, password, name). Login uses account.createEmailPasswordSession(email, password).",
		rubric:
			"Must include: 1) Client initialization with setEndpoint and setProject, 2) Account service instantiation, 3) account.create() with ID.unique(), email, password, 4) account.createEmailPasswordSession(), 5) Correct imports from appwrite",
	},
	{
		id: "auth-5",
		category: "auth",
		type: "mcq",
		question: "What is the purpose of Teams in Appwrite Auth?",
		choices: [
			"To organize database collections",
			"To group users and manage role-based access to resources",
			"To create separate billing accounts",
			"To manage deployment environments",
		],
		correctAnswer: "B",
	},
	{
		id: "auth-6",
		category: "auth",
		type: "mcq",
		question:
			"How can you enable Multi-Factor Authentication (MFA) in Appwrite?",
		choices: [
			"MFA is always enabled by default",
			"Through the account.createMfaChallenge() and account.updateMFA() methods",
			"By installing a third-party MFA plugin",
			"MFA is not supported in Appwrite",
		],
		correctAnswer: "B",
	},
	{
		id: "auth-7",
		category: "auth",
		type: "free-form",
		question:
			"Explain how Appwrite sessions work. How are they created, managed, and deleted? What about session limits?",
		correctAnswer:
			"Sessions represent authenticated user connections. They are created during login, stored as HTTP-only cookies, limited to 10 per user, and can be managed via account.listSessions(), account.deleteSession(), and account.deleteSessions().",
		rubric:
			"Must mention: 1) Sessions created on authentication, 2) Session tokens/cookies, 3) Session limit (10), 4) Methods to list/delete sessions, 5) Session expiry",
	},
	{
		id: "auth-8",
		category: "auth",
		type: "mcq",
		question:
			"What does Role.users() represent in Appwrite's permission system?",
		choices: [
			"Only admin users",
			"Any user who has an active session (authenticated users)",
			"Users in a specific team",
			"Users with verified email addresses only",
		],
		correctAnswer: "B",
	},
	{
		id: "auth-9",
		category: "auth",
		type: "mcq",
		question: "How do you authenticate server-side requests in Appwrite?",
		choices: [
			"Using user session tokens only",
			"Using an API key with setKey() on the server SDK client",
			"Using OAuth2 tokens",
			"Server-side requests don't need authentication",
		],
		correctAnswer: "B",
	},
	{
		id: "auth-10",
		category: "auth",
		type: "mcq",
		question:
			"Which method is used to get the currently logged-in user in Appwrite?",
		choices: [
			"account.get()",
			"users.getCurrent()",
			"auth.currentUser()",
			"account.getSession()",
		],
		correctAnswer: "A",
	},
];
