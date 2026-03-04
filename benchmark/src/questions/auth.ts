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
			"account.createEmailPasswordSession()",
			"account.login()",
			"auth.signIn()",
			"account.create()",
		],
		correctAnswer: "A",
	},
	{
		id: "auth-3",
		category: "auth",
		type: "mcq",
		question: "How does Appwrite handle OAuth2 authentication?",
		choices: [
			"It only supports OAuth2 through custom functions",
			"OAuth2 requires a separate plugin installation",
			"It provides built-in OAuth2 support with createOAuth2Session() for 40+ providers",
			"It uses JWT tokens exclusively",
		],
		correctAnswer: "C",
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
			"To create separate billing accounts",
			"To manage deployment environments",
			"To group users and manage role-based access to resources",
		],
		correctAnswer: "D",
	},
	{
		id: "auth-6",
		category: "auth",
		type: "mcq",
		question:
			"How can you enable Multi-Factor Authentication (MFA) in Appwrite?",
		choices: [
			"Through the account.createMfaChallenge() and account.updateMFA() methods",
			"MFA is always enabled by default",
			"By installing a third-party MFA plugin",
			"MFA is not supported in Appwrite",
		],
		correctAnswer: "A",
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
			"Users in a specific team",
			"Any user who has an active session (authenticated users)",
			"Users with verified email addresses only",
		],
		correctAnswer: "C",
	},
	{
		id: "auth-9",
		category: "auth",
		type: "mcq",
		question: "How do you authenticate server-side requests in Appwrite?",
		choices: [
			"Using user session tokens only",
			"Using OAuth2 tokens",
			"Server-side requests don't need authentication",
			"Using an API key with setKey() on the server SDK client",
		],
		correctAnswer: "D",
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
	{
		id: "auth-11",
		category: "auth",
		type: "mcq",
		question: "How do you implement password recovery (forgot password) in Appwrite?",
		choices: [
			"account.resetPassword(email)",
			"Only through the Console",
			"account.createRecovery(email, url) to send the email, then account.updateRecovery(userId, secret, password, passwordAgain) when the user submits the new password",
			"account.sendPasswordReset(email)",
		],
		correctAnswer: "C",
	},
	{
		id: "auth-12",
		category: "auth",
		type: "mcq",
		question: "How long is the password recovery link sent by createRecovery valid?",
		choices: [
			"1 hour",
			"15 minutes",
			"24 hours",
			"Until used",
		],
		correctAnswer: "A",
	},
	{
		id: "auth-13",
		category: "auth",
		type: "mcq",
		question: "What is the default maximum number of sessions per user in an Appwrite project?",
		choices: [
			"1",
			"5",
			"10",
			"Unlimited",
		],
		correctAnswer: "C",
	},
	{
		id: "auth-14",
		category: "auth",
		type: "mcq",
		question: "Which method deletes all sessions for the current user?",
		choices: [
			"account.logout()",
			"account.deleteAllSessions()",
			"account.deleteSession() with no arguments",
			"account.deleteSessions()",
		],
		correctAnswer: "D",
	},
	{
		id: "auth-15",
		category: "auth",
		type: "mcq",
		question: "What does Role.team(teamId) represent in Appwrite permissions?",
		choices: [
			"Only users who are members of the specified team",
			"Any user who is in any team",
			"Team administrators only",
			"The team resource itself",
		],
		correctAnswer: "A",
	},
	{
		id: "auth-16",
		category: "auth",
		type: "mcq",
		question: "Can you create anonymous (guest) sessions in Appwrite?",
		choices: [
			"No, anonymous sessions are not supported",
			"Only with a special API key",
			"Yes, using account.createAnonymousSession()",
			"Only in development mode",
		],
		correctAnswer: "C",
	},
	{
		id: "auth-17",
		category: "auth",
		type: "mcq",
		question: "When using createRecovery, what requirement applies to the redirect URL?",
		choices: [
			"It must be HTTPS only",
			"It can be any URL",
			"It must match the app's origin exactly",
			"It must be from a domain you added in the project's platforms in the Console",
		],
		correctAnswer: "D",
	},
	{
		id: "auth-18",
		category: "auth",
		type: "mcq",
		question: "Which MFA factor types does Appwrite support?",
		choices: [
			"TOTP, phone (SMS), and email",
			"TOTP only",
			"TOTP and hardware keys only",
			"Email only",
		],
		correctAnswer: "A",
	},
	{
		id: "auth-19",
		category: "auth",
		type: "mcq",
		question: "How do you add a user to a team using the client SDK?",
		choices: [
			"teams.addMember(teamId, userId)",
			"account.joinTeam(teamId)",
			"teams.createMembership(teamId, roles, email or userId, etc.)",
			"users.assignTeam(userId, teamId)",
		],
		correctAnswer: "C",
	},
	{
		id: "auth-20",
		category: "auth",
		type: "free-form",
		question:
			"Explain the difference between account.deleteSession(sessionId) and account.deleteSessions(). When would you use each?",
		correctAnswer:
			"deleteSession(sessionId) removes a single session by ID (e.g. logout on current device). deleteSessions() removes all sessions for the current user (e.g. logout everywhere). Use deleteSession for single-device logout; use deleteSessions for security when user wants to sign out of all devices.",
		rubric:
			"Must mention: 1) deleteSession removes one session by ID, 2) deleteSessions removes all sessions for the user, 3) Use case for each (e.g. logout one device vs logout everywhere)",
	},
];
