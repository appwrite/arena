import type { Question } from '../types'
import { fundamentalQuestions } from './fundamental'
import { authQuestions } from './auth'
import { databasesQuestions } from './databases'
import { functionsQuestions } from './functions'
import { storageQuestions } from './storage'
import { sitesQuestions } from './sites'
import { messagingQuestions } from './messaging'

export const allQuestions: Question[] = [
  ...fundamentalQuestions,
  ...authQuestions,
  ...databasesQuestions,
  ...functionsQuestions,
  ...storageQuestions,
  ...sitesQuestions,
  ...messagingQuestions,
]

export {
  fundamentalQuestions,
  authQuestions,
  databasesQuestions,
  functionsQuestions,
  storageQuestions,
  sitesQuestions,
  messagingQuestions,
}
