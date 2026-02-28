import type { Question } from '../types'

export const functionsQuestions: Question[] = [
  {
    id: 'func-1',
    category: 'functions',
    type: 'mcq',
    question: 'Which runtimes does Appwrite Functions support?',
    choices: [
      'Node.js only',
      'Node.js, Python, PHP, Ruby, Dart, Deno, Swift, Kotlin, Java, Bun, and more',
      'Node.js and Python only',
      'Any Docker container',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'func-2',
    category: 'functions',
    type: 'mcq',
    question: 'How are environment variables provided to Appwrite Functions?',
    choices: [
      'Through a .env file in the function directory',
      'Set in the Appwrite Console or API, accessible at runtime',
      'Hardcoded in the function code',
      'Through command-line arguments',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'func-3',
    category: 'functions',
    type: 'free-form',
    question: 'Write an Appwrite Function in Node.js that receives a JSON body with a "name" field and returns a personalized greeting. Use the correct function signature and response format.',
    correctAnswer: `export default async ({ req, res, log, error }) => {
  try {
    const body = JSON.parse(req.body || '{}');
    const name = body.name || 'World';

    log('Greeting user: ' + name);

    return res.json({
      success: true,
      message: \`Hello, \${name}! Welcome to Appwrite.\`,
    });
  } catch (err) {
    error('Function error: ' + err.message);
    return res.json({
      success: false,
      message: 'An error occurred',
    }, 400);
  }
};`,
    rubric: 'Must include: 1) Default export of async function, 2) Destructured context with req, res, log or error, 3) Parsing req.body, 4) Using res.json() for response, 5) Correct function signature pattern',
    reference: 'Appwrite Functions use export default async ({ req, res, log, error }) => {} signature. Request body is in req.body. Response uses res.json(), res.text(), res.empty(), or res.redirect().',
  },
  {
    id: 'func-4',
    category: 'functions',
    type: 'mcq',
    question: 'What are the ways to trigger an Appwrite Function execution?',
    choices: [
      'HTTP requests only',
      'HTTP requests, event triggers, scheduled (CRON), and manual execution via API/Console',
      'Only through the Appwrite Console',
      'Only through webhooks',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'func-5',
    category: 'functions',
    type: 'mcq',
    question: 'What is the purpose of the "build command" in an Appwrite Function configuration?',
    choices: [
      'To compile the function to machine code',
      'To run commands during deployment to install dependencies and prepare the function',
      'To build the Appwrite server',
      'To create a Docker image',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'func-6',
    category: 'functions',
    type: 'mcq',
    question: 'How can an Appwrite Function access other Appwrite services like Databases?',
    choices: [
      'Functions cannot access other Appwrite services',
      'By importing the Node.js SDK and using the function\'s API key or the APPWRITE_FUNCTION_API_ENDPOINT and APPWRITE_FUNCTION_PROJECT_ID environment variables',
      'Through REST API calls only with no SDK support',
      'By directly accessing the database filesystem',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'func-7',
    category: 'functions',
    type: 'free-form',
    question: 'Explain how to deploy an Appwrite Function using the Appwrite CLI. What are the steps and key configuration options?',
    correctAnswer: 'To deploy an Appwrite Function using the CLI: 1) Install the Appwrite CLI (npm install -g appwrite-cli), 2) Login with appwrite login, 3) Initialize with appwrite init function, 4) Configure appwrite.json with function settings (name, runtime, entrypoint, build commands, permissions, scopes, schedule), 5) Deploy with appwrite deploy function. Key configuration includes: runtime (e.g., node-18.0), entrypoint (e.g., src/main.js), build commands (e.g., npm install), environment variables, event triggers, and CRON schedule.',
    rubric: 'Must mention: 1) CLI installation, 2) appwrite init or function initialization, 3) Configuration in appwrite.json, 4) appwrite deploy command, 5) Key options like runtime, entrypoint, build commands',
    reference: 'Appwrite CLI enables function deployment through init (appwrite init function) and deploy (appwrite deploy function) commands. Configuration is stored in appwrite.json including runtime, entrypoint, build commands, scopes, and schedule.',
  },
  {
    id: 'func-8',
    category: 'functions',
    type: 'mcq',
    question: 'What context parameters does an Appwrite Function receive?',
    choices: [
      'request and response only',
      'req, res, log, and error',
      'event, context, and callback',
      'input, output, and logger',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'func-9',
    category: 'functions',
    type: 'mcq',
    question: 'How do you schedule an Appwrite Function to run periodically?',
    choices: [
      'Using JavaScript setTimeout()',
      'Using a CRON expression in the function configuration',
      'Through an external scheduler service',
      'Scheduled execution is not supported',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'func-10',
    category: 'functions',
    type: 'mcq',
    question: 'What response methods are available in Appwrite Functions?',
    choices: [
      'res.send() only',
      'res.json(), res.text(), res.empty(), res.redirect()',
      'res.write() and res.end()',
      'return JSON.stringify(data)',
    ],
    correctAnswer: 'B',
  },
]
