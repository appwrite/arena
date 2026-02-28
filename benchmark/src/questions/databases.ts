import type { Question } from '../types'

export const databasesQuestions: Question[] = [
  {
    id: 'db-1',
    category: 'databases',
    type: 'mcq',
    question: 'What is the hierarchy of data organization in Appwrite Databases?',
    choices: [
      'Database > Table > Row',
      'Database > Collection > Document',
      'Schema > Collection > Record',
      'Project > Database > Table',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'db-2',
    category: 'databases',
    type: 'mcq',
    question: 'Which attribute types are supported in Appwrite database collections?',
    choices: [
      'String, Integer, Float only',
      'String, Integer, Float, Boolean, DateTime, Email, URL, IP, Enum, Relationship',
      'String, Number, Boolean only',
      'Any JSON type without schema validation',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'db-3',
    category: 'databases',
    type: 'free-form',
    question: 'Write code using the Appwrite Web SDK to create a database, a collection with attributes, and insert a document. Use a "tasks" collection with title (string), completed (boolean), and dueDate (datetime) attributes.',
    correctAnswer: `import { Client, Databases, ID, Permission, Role } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('PROJECT_ID');

const databases = new Databases(client);

// Create database
const db = await databases.create(ID.unique(), 'MyApp');

// Create collection
const collection = await databases.createCollection(db.$id, ID.unique(), 'Tasks', [
  Permission.read(Role.users()),
  Permission.create(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
]);

// Create attributes
await databases.createStringAttribute(db.$id, collection.$id, 'title', 255, true);
await databases.createBooleanAttribute(db.$id, collection.$id, 'completed', true, false);
await databases.createDatetimeAttribute(db.$id, collection.$id, 'dueDate', false);

// Create document
const doc = await databases.createDocument(db.$id, collection.$id, ID.unique(), {
  title: 'My Task',
  completed: false,
  dueDate: '2024-12-31T00:00:00.000Z',
});`,
    rubric: 'Must include: 1) Client + Databases setup, 2) databases.create() for database, 3) databases.createCollection() with permissions, 4) Creating string, boolean, datetime attributes, 5) databases.createDocument() with data',
    reference: 'Use Databases service to create database, collection with permissions, attributes (createStringAttribute, createBooleanAttribute, createDatetimeAttribute), then createDocument with the data object.',
  },
  {
    id: 'db-4',
    category: 'databases',
    type: 'mcq',
    question: 'Which query method is used to filter documents where a field equals a specific value?',
    choices: [
      'Query.filter()',
      'Query.equal()',
      'Query.where()',
      'Query.match()',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'db-5',
    category: 'databases',
    type: 'mcq',
    question: 'What are indexes used for in Appwrite databases?',
    choices: [
      'To encrypt document fields',
      'To improve query performance on specific attributes',
      'To create foreign key relationships',
      'To auto-generate unique IDs',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'db-6',
    category: 'databases',
    type: 'free-form',
    question: 'Explain how to query documents in Appwrite using the Query class. Show examples of filtering, sorting, limiting, and pagination.',
    correctAnswer: `Use the Query class to build queries passed to databases.listDocuments():

import { Query } from 'appwrite';

// Filter by equality
await databases.listDocuments(dbId, collId, [
  Query.equal('status', 'active'),
]);

// Multiple filters (AND)
await databases.listDocuments(dbId, collId, [
  Query.equal('status', 'active'),
  Query.greaterThan('price', 10),
]);

// Sorting
await databases.listDocuments(dbId, collId, [
  Query.orderDesc('createdAt'),
]);

// Pagination with limit and offset
await databases.listDocuments(dbId, collId, [
  Query.limit(25),
  Query.offset(50),
]);

// Cursor-based pagination
await databases.listDocuments(dbId, collId, [
  Query.cursorAfter('lastDocumentId'),
  Query.limit(25),
]);`,
    rubric: 'Must include: 1) Query.equal() for filtering, 2) Query.orderDesc() or orderAsc() for sorting, 3) Query.limit() and Query.offset() for pagination, 4) Passing queries array to listDocuments(), 5) At least one other query method',
    reference: 'The Query class provides methods like equal(), greaterThan(), lessThan(), orderAsc(), orderDesc(), limit(), offset(), cursorAfter() that are passed as an array to databases.listDocuments().',
  },
  {
    id: 'db-7',
    category: 'databases',
    type: 'mcq',
    question: 'What types of relationships does Appwrite support between collections?',
    choices: [
      'Only one-to-one',
      'One-to-one, one-to-many, many-to-one, and many-to-many',
      'Only foreign key references',
      'Relationships are not supported',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'db-8',
    category: 'databases',
    type: 'mcq',
    question: 'How do permissions work on documents in Appwrite?',
    choices: [
      'Documents inherit permissions from the project only',
      'Each document can have its own permission list, or inherit from the collection',
      'Permissions are set globally for all documents',
      'Permissions are only managed through API keys',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'db-9',
    category: 'databases',
    type: 'mcq',
    question: 'What is the correct method to update a document in Appwrite?',
    choices: [
      'databases.update()',
      'databases.updateDocument(databaseId, collectionId, documentId, data)',
      'databases.patchDocument()',
      'documents.update()',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'db-10',
    category: 'databases',
    type: 'mcq',
    question: 'Which Query method performs a full-text search on a document attribute?',
    choices: [
      'Query.contains()',
      'Query.search()',
      'Query.fullText()',
      'Query.like()',
    ],
    correctAnswer: 'B',
  },
]
