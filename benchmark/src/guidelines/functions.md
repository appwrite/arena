# Appwrite Functions

## Overview

Appwrite Functions allow you to run server-side code in a serverless environment. Functions support multiple runtimes and can be triggered by HTTP requests, events, schedules (CRON), or manual execution.

## Supported Runtimes

Node.js, Bun, Python, PHP, Ruby, Dart, Deno, Swift, Kotlin, Java, C++, .NET, and more. Each runtime has specific versions available (e.g., node-18.0, node-21.0, python-3.12, bun-1.0).

## Function Signature

All Appwrite Functions use the same pattern — a default export of an async function:

```javascript
// Node.js / Bun
export default async ({ req, res, log, error }) => {
  // req: request object
  // res: response helpers
  // log: logging function
  // error: error logging function

  log('Function executed');

  return res.json({ message: 'Hello World' });
};
```

## Request Object (req)

```javascript
req.method      // HTTP method (GET, POST, etc.)
req.url         // Full request URL
req.path        // URL path
req.port        // Request port
req.host        // Request host
req.scheme      // http or https
req.query       // Query string parameters (object)
req.queryString // Raw query string
req.headers     // Request headers (object)
req.body        // Request body (string)
req.bodyRaw     // Raw request body
req.bodyJson    // Parsed JSON body (if applicable)
req.bodyText    // Body as text
req.bodyBinary  // Body as binary
```

## Response Methods (res)

```javascript
// JSON response
return res.json({ key: 'value' });

// Text response
return res.text('Hello World');

// HTML response
return res.text('<h1>Hello</h1>', 200, { 'content-type': 'text/html' });

// Empty response
return res.empty();

// Redirect
return res.redirect('https://example.com');

// Custom status code
return res.json({ error: 'Not found' }, 404);

// Custom headers
return res.json({ data: 'value' }, 200, {
  'X-Custom-Header': 'value',
});
```

## Environment Variables

Environment variables are configured in the Appwrite Console or via API:

```javascript
export default async ({ req, res, log, error }) => {
  const apiKey = process.env.EXTERNAL_API_KEY;
  const dbId = process.env.DATABASE_ID;

  // Appwrite provides these automatically:
  // APPWRITE_FUNCTION_API_ENDPOINT
  // APPWRITE_FUNCTION_PROJECT_ID
  // APPWRITE_FUNCTION_API_KEY (if function has an API key)

  return res.json({ configured: !!apiKey });
};
```

## Accessing Other Appwrite Services

```javascript
import { Client, Databases, ID } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  const databases = new Databases(client);

  const doc = await databases.createDocument(
    'dbId', 'collId', ID.unique(),
    { title: 'Created by function' }
  );

  return res.json(doc);
};
```

## Triggers

### HTTP Execution
Functions automatically get an HTTP endpoint. Any HTTP request to the function's URL triggers execution.

### Event Triggers
Configure functions to run on specific Appwrite events:
- `databases.*.collections.*.documents.*.create`
- `users.*.create`
- `storage.*.files.*.create`
- And many more

### Scheduled (CRON)
Set a CRON expression to run functions periodically:
- `*/15 * * * *` — Every 15 minutes
- `0 0 * * *` — Daily at midnight
- `0 9 * * 1` — Every Monday at 9 AM

### Manual Execution
Execute via the Console or API: `functions.createExecution(functionId)`

## Deployment

### CLI Deployment
```bash
# Initialize function
appwrite init function

# Deploy
appwrite deploy function
```

### Git Integration
Connect a Git repository for automatic deployments on push.

### Configuration (appwrite.json)
```json
{
  "functions": [
    {
      "name": "My Function",
      "runtime": "node-18.0",
      "entrypoint": "src/main.js",
      "commands": "npm install",
      "scopes": ["databases.read", "databases.write"],
      "schedule": "",
      "events": [],
      "timeout": 15
    }
  ]
}
```

## Build Commands

The `commands` field (or build commands) runs during deployment:
- `npm install` — Install Node.js dependencies
- `pip install -r requirements.txt` — Install Python dependencies
- `npm run build && npm prune --production` — Build and optimize
