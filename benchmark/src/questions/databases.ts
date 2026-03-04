import type { Question } from "../types";

export const databasesQuestions: Question[] = [
	{
		id: "db-1",
		category: "databases",
		type: "mcq",
		question:
			"What is the hierarchy of data organization in Appwrite Databases?",
		choices: [
			"Database > Collection > Document",
			"Database > Table > Row",
			"Schema > Collection > Record",
			"Project > Database > Table",
		],
		correctAnswer: "A",
	},
	{
		id: "db-2",
		category: "databases",
		type: "mcq",
		question:
			"Which attribute types are supported in Appwrite database collections?",
		choices: [
			"String, Integer, Float only",
			"String, Number, Boolean only",
			"Any JSON type without schema validation",
			"String, Integer, Float, Boolean, DateTime, Email, URL, IP, Enum, Relationship",
		],
		correctAnswer: "D",
	},
	{
		id: "db-3",
		category: "databases",
		type: "free-form",
		question:
			'Write code using the Appwrite Web SDK to create a database, a collection with attributes, and insert a document. Use a "tasks" collection with title (string), completed (boolean), and dueDate (datetime) attributes.',
		correctAnswer:
			"Use Databases service to create database, collection with permissions, attributes (createStringAttribute, createBooleanAttribute, createDatetimeAttribute), then createDocument with the data object.",
		rubric:
			"Must include: 1) Client + Databases setup, 2) databases.create() for database, 3) databases.createCollection() with permissions, 4) Creating string, boolean, datetime attributes, 5) databases.createDocument() with data",
	},
	{
		id: "db-4",
		category: "databases",
		type: "mcq",
		question:
			"Which query method is used to filter documents where a field equals a specific value?",
		choices: [
			"Query.equal()",
			"Query.filter()",
			"Query.where()",
			"Query.match()",
		],
		correctAnswer: "A",
	},
	{
		id: "db-5",
		category: "databases",
		type: "mcq",
		question: "What are indexes used for in Appwrite databases?",
		choices: [
			"To encrypt document fields",
			"To create foreign key relationships",
			"To improve query performance on specific attributes",
			"To auto-generate unique IDs",
		],
		correctAnswer: "C",
	},
	{
		id: "db-6",
		category: "databases",
		type: "free-form",
		question:
			"Explain how to query documents in Appwrite using the Query class. Show examples of filtering, sorting, limiting, and pagination.",
		correctAnswer:
			"The Query class provides methods like equal(), greaterThan(), lessThan(), orderAsc(), orderDesc(), limit(), offset(), cursorAfter() that are passed as an array to databases.listDocuments().",
		rubric:
			"Must include: 1) Query.equal() for filtering, 2) Query.orderDesc() or orderAsc() for sorting, 3) Query.limit() and Query.offset() for pagination, 4) Passing queries array to listDocuments(), 5) At least one other query method",
	},
	{
		id: "db-7",
		category: "databases",
		type: "mcq",
		question:
			"What types of relationships does Appwrite support between collections?",
		choices: [
			"One-to-one, one-to-many, many-to-one, and many-to-many",
			"Only one-to-one",
			"Only foreign key references",
			"Relationships are not supported",
		],
		correctAnswer: "A",
	},
	{
		id: "db-8",
		category: "databases",
		type: "mcq",
		question: "How do permissions work on documents in Appwrite?",
		choices: [
			"Documents inherit permissions from the project only",
			"Permissions are set globally for all documents",
			"Each document can have its own permission list, or inherit from the collection",
			"Permissions are only managed through API keys",
		],
		correctAnswer: "C",
	},
	{
		id: "db-9",
		category: "databases",
		type: "mcq",
		question: "What is the correct method to update a document in Appwrite?",
		choices: [
			"databases.update()",
			"databases.patchDocument()",
			"databases.updateDocument(databaseId, collectionId, documentId, data)",
			"documents.update()",
		],
		correctAnswer: "C",
	},
	{
		id: "db-10",
		category: "databases",
		type: "mcq",
		question:
			"Which Query method performs a full-text search on a document attribute?",
		choices: [
			"Query.search()",
			"Query.contains()",
			"Query.fullText()",
			"Query.like()",
		],
		correctAnswer: "A",
	},
	{
		id: "db-11",
		category: "databases",
		type: "mcq",
		question: "How do transactions work in Appwrite Databases?",
		choices: [
			"Transactions are not supported",
			"Wrap operations in a single databases.transaction() call",
			"Create a transaction, pass the transactionId to document create/update/delete operations, then commit the transaction",
			"Use a special transaction collection",
		],
		correctAnswer: "C",
	},
	{
		id: "db-12",
		category: "databases",
		type: "mcq",
		question: "What are the possible statuses of a database transaction?",
		choices: [
			"pending, committing, committed, failed",
			"active, committed, rolled_back",
			"open, closed",
			"started, finished",
		],
		correctAnswer: "A",
	},
	{
		id: "db-13",
		category: "databases",
		type: "mcq",
		question: "Which Query method is used for cursor-based pagination (get next page after a document)?",
		choices: [
			"Query.cursorAfter(documentId) or Query.cursorBefore(documentId)",
			"Query.offset()",
			"Query.nextPage()",
			"Query.cursor()",
		],
		correctAnswer: "A",
	},
	{
		id: "db-14",
		category: "databases",
		type: "mcq",
		question: "How do you delete a document in Appwrite?",
		choices: [
			"databases.delete()",
			"documents.delete()",
			"databases.removeDocument()",
			"databases.deleteDocument(databaseId, collectionId, documentId)",
		],
		correctAnswer: "D",
	},
	{
		id: "db-15",
		category: "databases",
		type: "mcq",
		question: "When creating a document, can you set permissions on that document?",
		choices: [
			"Yes, pass a permissions array to createDocument",
			"No, documents always inherit collection permissions",
			"Only via the Console",
			"Only for the document creator",
		],
		correctAnswer: "A",
	},
	{
		id: "db-16",
		category: "databases",
		type: "mcq",
		question: "What is a relationship attribute in Appwrite?",
		choices: [
			"A link to an external API",
			"A special index type",
			"An attribute that references documents in the same or another collection (one-to-one, one-to-many, etc.)",
			"A computed field",
		],
		correctAnswer: "C",
	},
	{
		id: "db-17",
		category: "databases",
		type: "mcq",
		question: "Which Query method limits the number of documents returned?",
		choices: [
			"Query.take()",
			"Query.max()",
			"Query.limit(limit)",
			"Query.pageSize()",
		],
		correctAnswer: "C",
	},
	{
		id: "db-18",
		category: "databases",
		type: "mcq",
		question: "How do you sort documents by a field in descending order?",
		choices: [
			"Query.orderDesc('attributeId')",
			"Query.sort(field, 'desc')",
			"Query.descending('attributeId')",
			"Query.orderBy('attributeId', Query.DESC)",
		],
		correctAnswer: "A",
	},
	{
		id: "db-19",
		category: "databases",
		type: "mcq",
		question: "What happens if a transaction expires before it is committed?",
		choices: [
			"Operations are automatically rolled back and the transaction is deleted",
			"The transaction is committed automatically",
			"Staged operations fail with a transaction expired error; the transaction has a TTL",
			"Nothing; transactions do not expire",
		],
		correctAnswer: "C",
	},
	{
		id: "db-20",
		category: "databases",
		type: "free-form",
		question:
			"Explain how to use Query to filter documents where a numeric field is greater than 100 and return at most 20 results sorted by that field descending.",
		correctAnswer:
			"Use databases.listDocuments() with queries array: Query.greaterThan('attributeId', 100), Query.orderDesc('attributeId'), Query.limit(20). Pass these to the listDocuments queries parameter.",
		rubric:
			"Must include: 1) Query.greaterThan for the filter, 2) Query.orderDesc for sort, 3) Query.limit(20), 4) Passing queries to listDocuments()",
	},
	{
		id: "db-21",
		category: "databases",
		type: "mcq",
		question:
			"What are the minimum and maximum values for an integer attribute in Appwrite?",
		choices: [
			"-2147483648 to 2147483647 (32-bit signed integer)",
			"-9223372036854775808 to 9223372036854775807 (64-bit signed integer)",
			"0 to 18446744073709551615 (64-bit unsigned integer)",
			"-999999999999 to 999999999999 (12-digit limit)",
		],
		correctAnswer: "B",
	},
	{
		id: "db-22",
		category: "databases",
		type: "mcq",
		question:
			"Which of the following is NOT a valid string-based attribute type in Appwrite databases?",
		choices: [
			"varchar",
			"mediumtext",
			"tinytext",
			"longtext",
		],
		correctAnswer: "C",
	},
	{
		id: "db-23",
		category: "databases",
		type: "mcq",
		question:
			"Which of the following is NOT a valid format for a string attribute in Appwrite?",
		choices: [
		  "uuid",
			"email",
			"url",
			"enum",
		],
		correctAnswer: "A",
	},
];
