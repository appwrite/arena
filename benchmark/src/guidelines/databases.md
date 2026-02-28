# Appwrite Databases

## Overview

Appwrite Databases provides a structured data storage solution organized as Databases > Collections > Documents. It supports schema validation, indexing, queries, relationships, and real-time updates.

## Data Hierarchy

- **Database**: Top-level container. A project can have multiple databases.
- **Collection**: Similar to a table. Defines a schema with attributes.
- **Document**: A record in a collection. Must conform to the collection's schema.

## Creating Databases and Collections

```javascript
import { Client, Databases, ID, Permission, Role } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('PROJECT_ID');

const databases = new Databases(client);

// Create database (server-side)
const db = await databases.create(ID.unique(), 'MyDatabase');

// Create collection with permissions
const collection = await databases.createCollection(
  db.$id,
  ID.unique(),
  'Tasks',
  [
    Permission.read(Role.users()),
    Permission.create(Role.users()),
    Permission.update(Role.users()),
    Permission.delete(Role.users()),
  ]
);
```

## Attribute Types

```javascript
// String
await databases.createStringAttribute(dbId, collId, 'title', 255, true);

// Integer
await databases.createIntegerAttribute(dbId, collId, 'count', true, 0, 0, 1000);

// Float
await databases.createFloatAttribute(dbId, collId, 'price', true);

// Boolean
await databases.createBooleanAttribute(dbId, collId, 'active', true, false);

// DateTime
await databases.createDatetimeAttribute(dbId, collId, 'createdAt', false);

// Email
await databases.createEmailAttribute(dbId, collId, 'email', true);

// URL
await databases.createUrlAttribute(dbId, collId, 'website', false);

// IP
await databases.createIpAttribute(dbId, collId, 'ipAddress', false);

// Enum
await databases.createEnumAttribute(dbId, collId, 'status', ['active', 'inactive', 'pending'], true);

// Relationship
await databases.createRelationshipAttribute(
  dbId, collId, 'relatedCollectionId', 'oneToMany', true, 'fieldKey', 'twoWay', 'cascade'
);
```

## Documents (CRUD)

```javascript
// Create document
const doc = await databases.createDocument(
  dbId, collId, ID.unique(),
  { title: 'My Task', completed: false },
  [Permission.read(Role.users()), Permission.update(Role.user('userId'))]
);

// Get document
const doc = await databases.getDocument(dbId, collId, 'DOCUMENT_ID');

// Update document
const updated = await databases.updateDocument(
  dbId, collId, 'DOCUMENT_ID',
  { completed: true }
);

// Delete document
await databases.deleteDocument(dbId, collId, 'DOCUMENT_ID');

// List documents
const list = await databases.listDocuments(dbId, collId);
```

## Queries

The `Query` class provides methods for filtering, sorting, and paginating:

```javascript
import { Query } from 'appwrite';

// Equality
await databases.listDocuments(dbId, collId, [
  Query.equal('status', 'active'),
]);

// Comparison
Query.notEqual('status', 'deleted')
Query.greaterThan('price', 10)
Query.greaterThanEqual('price', 10)
Query.lessThan('price', 100)
Query.lessThanEqual('price', 100)
Query.between('price', 10, 100)

// String matching
Query.startsWith('name', 'John')
Query.endsWith('email', '@example.com')
Query.contains('tags', ['important'])
Query.search('content', 'search term')  // requires fulltext index

// Null checks
Query.isNull('deletedAt')
Query.isNotNull('assignee')

// Sorting
Query.orderAsc('createdAt')
Query.orderDesc('price')

// Pagination
Query.limit(25)
Query.offset(50)
Query.cursorAfter('LAST_DOC_ID')
Query.cursorBefore('FIRST_DOC_ID')

// Select specific attributes
Query.select(['title', 'status', 'price'])
```

## Indexes

Indexes improve query performance. Create them on attributes you frequently filter or sort by:

```javascript
// Key index (for equality and range queries)
await databases.createIndex(dbId, collId, 'idx_status', 'key', ['status']);

// Fulltext index (for search queries)
await databases.createIndex(dbId, collId, 'idx_content', 'fulltext', ['content']);

// Unique index
await databases.createIndex(dbId, collId, 'idx_email', 'unique', ['email']);
```

## Relationships

Appwrite supports four relationship types:
- **One-to-one**: A document relates to exactly one document in another collection
- **One-to-many**: A document relates to multiple documents in another collection
- **Many-to-one**: Multiple documents relate to one document in another collection
- **Many-to-many**: Multiple documents relate to multiple documents in another collection

## Permissions

- **Collection-level permissions**: Applied to all documents in the collection
- **Document-level permissions**: Individual permissions per document (when `documentSecurity` is enabled)
- When `documentSecurity` is enabled, a user needs permissions from either the collection OR the document to access it
