# Appwrite Messaging

## Overview

Appwrite Messaging enables sending email, SMS, and push notifications to users through configurable third-party providers. It supports targeting via topics, users, or individual targets.

## Channels

- **Email**: Send HTML or plain text emails
- **SMS**: Send text messages
- **Push Notifications**: Send push notifications to mobile and web devices

## Providers

Providers are third-party services that handle actual message delivery:

### Email Providers
- Mailgun
- SendGrid
- SMTP (custom)

### SMS Providers
- Twilio
- Vonage
- Textmagic
- MSG91
- Telesign

### Push Notification Providers
- **FCM** (Firebase Cloud Messaging) — Android and web
- **APNS** (Apple Push Notification Service) — iOS and macOS

Configure providers in the Appwrite Console with their respective API credentials.

## Targeting

### Topics
Groups that users can subscribe to:

```javascript
import { Messaging, ID } from 'node-appwrite';

const messaging = new Messaging(client);

// Create topic
const topic = await messaging.createTopic(ID.unique(), 'News Updates');

// Subscribe a target to a topic
await messaging.createSubscriber(topic.$id, ID.unique(), 'TARGET_ID');

// List topic subscribers
const subscribers = await messaging.listSubscribers(topic.$id);
```

### Users
Target specific users by their user ID. Messages are sent to all of that user's targets (email, phone, push tokens).

### Targets
Individual delivery endpoints:
- Email addresses
- Phone numbers
- Push notification tokens (device tokens)

Users have targets automatically created when they register with an email or phone number. Push tokens must be registered explicitly.

## Sending Messages

### Email
```javascript
const email = await messaging.createEmail(
  ID.unique(),           // messageId
  'Welcome!',            // subject
  '<h1>Hello</h1>',     // content (HTML supported)
  ['TOPIC_ID'],          // topics (optional)
  ['USER_ID'],           // users (optional)
  ['TARGET_ID'],         // targets (optional)
  [],                    // cc
  [],                    // bcc
  [],                    // attachments
  false,                 // draft
  false,                 // html
  '2024-12-25T00:00:00' // scheduledAt (optional)
);
```

### SMS
```javascript
const sms = await messaging.createSms(
  ID.unique(),
  'Your verification code is 123456',
  ['TOPIC_ID'],   // topics
  ['USER_ID'],    // users
  ['TARGET_ID'],  // targets
  false,          // draft
  '2024-12-25T00:00:00' // scheduledAt
);
```

### Push Notification
```javascript
const push = await messaging.createPush(
  ID.unique(),
  'New Message',          // title
  'You have a new message', // body
  ['TOPIC_ID'],           // topics
  ['USER_ID'],            // users
  ['TARGET_ID'],          // targets
  { orderId: '123' },    // data (custom payload)
  'default',              // action
  'https://example.com/icon.png', // icon
  'default',              // sound
  '#ff0000',              // color
  'notification-tag',     // tag
  'badge-value',          // badge
  false,                  // draft
  '2024-12-25T00:00:00'  // scheduledAt
);
```

## Scheduled Messages

Messages can be scheduled for future delivery using the `scheduledAt` parameter:
- Pass an ISO 8601 datetime string
- Messages are queued and sent at the specified time
- Available for email, SMS, and push notifications

## Message Status

Messages have statuses tracking their delivery:
- **draft**: Created but not yet queued
- **scheduled**: Queued for future delivery
- **processing**: Currently being sent
- **sent**: Successfully delivered to the provider
- **failed**: Delivery failed

```javascript
// Get message status
const message = await messaging.getMessage('MESSAGE_ID');
console.log(message.status);

// List all messages
const messages = await messaging.listMessages();
```

## Registering Push Targets

```javascript
// Client-side: Register push target
const account = new Account(client);

await account.createPushTarget(
  ID.unique(),
  'FCM_TOKEN',      // device token from FCM/APNS
  'PROVIDER_ID'     // configured provider ID
);
```
