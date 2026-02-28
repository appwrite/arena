# Appwrite Fundamentals

## Overview

Appwrite is an open-source backend-as-a-service (BaaS) platform that provides developers with a set of APIs and tools to build applications. It can be self-hosted using Docker or used via Appwrite Cloud.

## Core Services

- **Auth** — User authentication and management
- **Databases** — Structured data storage with collections and documents
- **Storage** — File uploads and management with image transformations
- **Functions** — Serverless function execution in multiple runtimes
- **Messaging** — Email, SMS, and push notification delivery
- **Sites** — Web hosting and deployment
- **Realtime** — WebSocket-based real-time event subscriptions

## Architecture

- **Projects**: Top-level isolation unit. Each project contains its own users, databases, storage buckets, functions, and other resources.
- **API Keys**: Server-side authentication tokens with configurable scopes for accessing specific services.
- **SDKs**: Client-side (Web, Flutter, Apple, Android) and Server-side (Node.js, Python, PHP, Ruby, Dart, Kotlin, Swift, .NET).

## Client vs Server SDKs

**Client SDKs** (Web, Flutter, mobile):
- Used in frontend applications
- Require user sessions for authentication
- Respect document/resource permissions
- Cannot bypass permission checks

**Server SDKs** (Node.js, Python, etc.):
- Used in backend applications and scripts
- Authenticate using API keys via `client.setKey()`
- Can bypass resource permissions when using API keys
- Have access to admin-level operations (create users, manage collections, etc.)

## Setting Up the Client (Web SDK)

```javascript
import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID');

const account = new Account(client);
const databases = new Databases(client);
```

## Setting Up the Server (Node.js SDK)

```javascript
import { Client, Databases, Users } from 'node-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID')
  .setKey('YOUR_API_KEY');

const databases = new Databases(client);
const users = new Users(client);
```

## Permission Model

Appwrite uses a role-based permission system applied to individual resources (documents, files, functions, etc.).

**Permission types:**
- `Permission.read(role)` — Read access
- `Permission.create(role)` — Create access
- `Permission.update(role)` — Update access
- `Permission.delete(role)` — Delete access

**Role types:**
- `Role.any()` — Anyone (authenticated or not)
- `Role.guests()` — Non-authenticated users
- `Role.users()` — Any authenticated user
- `Role.user(userId)` — Specific user
- `Role.team(teamId)` — Members of a specific team
- `Role.team(teamId, role)` — Team members with a specific role
- `Role.member(membershipId)` — Specific team membership
- `Role.label(label)` — Users with a specific label

## API Protocols

- **REST API**: Primary API interface, available at `/v1/` endpoints
- **GraphQL API**: Alternative query interface at `/v1/graphql`
- **Realtime**: WebSocket connections at `wss://cloud.appwrite.io/v1/realtime`

## Realtime

Subscribe to changes using WebSocket:

```javascript
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('YOUR_PROJECT_ID');

// Subscribe to document changes
const unsubscribe = client.subscribe(
  'databases.DB_ID.collections.COLL_ID.documents',
  (response) => {
    console.log(response.events);
    console.log(response.payload);
  }
);

// Unsubscribe when done
unsubscribe();
```

## Deployment

Appwrite is deployed using Docker:

```bash
docker run -it --rm \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
  --entrypoint="install" \
  appwrite/appwrite:latest
```

Or use Appwrite Cloud at cloud.appwrite.io for a managed experience.

## Rate Limits

Appwrite enforces rate limits per endpoint to prevent abuse. Default limits vary by endpoint and can be configured in self-hosted installations. Cloud plans have predefined limits based on the pricing tier.
