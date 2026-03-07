import type { Question } from "../types";
import { authQuestions } from "./auth";
import { cliQuestions } from "./cli";
import { databasesQuestions } from "./databases";
import { functionsQuestions } from "./functions";
import { foundationQuestions } from "./foundation";
import { messagingQuestions } from "./messaging";
import { realtimeQuestions } from "./realtime";
import { sitesQuestions } from "./sites";
import { storageQuestions } from "./storage";

export const allQuestions: Question[] = [
	...foundationQuestions,
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
	foundationQuestions,
	authQuestions,
	databasesQuestions,
	functionsQuestions,
	storageQuestions,
	sitesQuestions,
	messagingQuestions,
	realtimeQuestions,
	cliQuestions,
};
