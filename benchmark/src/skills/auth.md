# Appwrite Auth

## Overview

Appwrite Auth provides user authentication, registration, and session management. It supports multiple authentication methods including email/password, OAuth2, phone/SMS, magic URLs, and anonymous sessions.

## Creating Accounts

### Email/Password Registration

```javascript
import { Client, Account, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('PROJECT_ID');

const account = new Account(client);

// Create account
const user = await account.create(
  ID.unique(),          // userId
  'user@example.com',   // email
  'password123',        // password
  'John Doe'            // name (optional)
);
```

### Creating Sessions (Login)

```javascript
// Email/password login
const session = await account.createEmailPasswordSession(
  'user@example.com',
  'password123'
);

// Anonymous session
const anonSession = await account.createAnonymousSession();
```

## OAuth2 Authentication

Appwrite supports 40+ OAuth2 providers including Google, GitHub, Apple, Facebook, Microsoft, and more.

```javascript
// Redirect to OAuth provider
account.createOAuth2Session(
  OAuthProvider.Google,           // provider
  'https://example.com/success',  // success redirect
  'https://example.com/failure'   // failure redirect
);
```

## Session Management

- Users can have up to **10 active sessions** simultaneously
- Sessions are stored as HTTP-only cookies
- Sessions have configurable expiry periods

```javascript
// Get current user
const user = await account.get();

// List all sessions
const sessions = await account.listSessions();

// Delete current session (logout)
await account.deleteSession('current');

// Delete all sessions
await account.deleteSessions();

// Delete specific session
await account.deleteSession('SESSION_ID');
```

## Multi-Factor Authentication (MFA)

```javascript
// Enable MFA for current user
await account.updateMFA(true);

// Create MFA challenge
const challenge = await account.createMfaChallenge(
  AuthenticationFactor.Totp
);

// Verify MFA challenge
await account.updateMfaChallenge(challenge.$id, 'OTP_CODE');

// List MFA factors
const factors = await account.listMfaFactors();
```

## Teams

Teams allow grouping users with role-based access:

```javascript
import { Teams, ID } from 'appwrite';

const teams = new Teams(client);

// Create team
const team = await teams.create(ID.unique(), 'Engineering');

// Add member with roles
await teams.createMembership(
  team.$id,
  ['developer'],          // roles
  'member@example.com'    // email
);

// List team members
const members = await teams.listMemberships(team.$id);
```

## User Labels

Labels allow categorizing users for permission targeting:

```javascript
// Server-side only
import { Users } from 'node-appwrite';
const users = new Users(client);

// Add label to user
await users.updateLabels('USER_ID', ['premium', 'beta']);
```

Use in permissions: `Role.label('premium')`

## Server-Side Authentication

```javascript
import { Client, Users } from 'node-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('PROJECT_ID')
  .setKey('API_KEY');  // API key with users scope

const users = new Users(client);

// List all users
const userList = await users.list();

// Create user (server-side)
const newUser = await users.create(
  ID.unique(), 'user@example.com', undefined, 'password123', 'User Name'
);

// Delete user
await users.delete('USER_ID');
```

## Email Verification

```javascript
// Send verification email
await account.createVerification('https://example.com/verify');

// Complete verification (after user clicks link)
await account.updateVerification('USER_ID', 'SECRET');
```

## Password Recovery

```javascript
// Send recovery email
await account.createRecovery(
  'user@example.com',
  'https://example.com/recovery'
);

// Complete recovery
await account.updateRecovery(
  'USER_ID', 'SECRET', 'new-password'
);
```

## JWT Tokens

Generate JWT tokens for server-side verification:

```javascript
// Client-side: create JWT
const jwt = await account.createJWT();

// Server-side: verify by setting JWT on client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('PROJECT_ID')
  .setJWT(jwt.jwt);
```
