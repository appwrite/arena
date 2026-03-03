import type { Question } from "../types";
import { authQuestions } from "./auth";
import { cliQuestions } from "./cli";
import { databasesQuestions } from "./databases";
import { functionsQuestions } from "./functions";
import { fundamentalQuestions } from "./fundamental";
import { messagingQuestions } from "./messaging";
import { realtimeQuestions } from "./realtime";
import { sitesQuestions } from "./sites";
import { storageQuestions } from "./storage";

export const allQuestions: Question[] = [
	...fundamentalQuestions,
	...authQuestions,
	...databasesQuestions,
	...functionsQuestions,
	...storageQuestions,
	...sitesQuestions,
	...messagingQuestions,
	...realtimeQuestions,
	...cliQuestions,
];

export {
	fundamentalQuestions,
	authQuestions,
	databasesQuestions,
	functionsQuestions,
	storageQuestions,
	sitesQuestions,
	messagingQuestions,
	realtimeQuestions,
	cliQuestions,
};
