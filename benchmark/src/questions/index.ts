import type { Question } from "../types";
import { authQuestions } from "./auth";
import { databasesQuestions } from "./databases";
import { functionsQuestions } from "./functions";
import { fundamentalQuestions } from "./fundamental";
import { messagingQuestions } from "./messaging";
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
];

export {
	fundamentalQuestions,
	authQuestions,
	databasesQuestions,
	functionsQuestions,
	storageQuestions,
	sitesQuestions,
	messagingQuestions,
};
