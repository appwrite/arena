import type { Question } from "../types";

export const databasesQuestions: Question[] = [
	{
		id: "db-1",
		category: "databases",
		type: "mcq",
		question:
			"What is the hierarchy of data organization in the current Appwrite TablesDB API?",
		choices: [
			"Database > Collection > Document",
			"Database > Table > Row",
			"Schema > Collection > Record",
			"Project > Database > Table",
		],
		correctAnswer: "B",
	},
	{
		id: "db-2",
		category: "databases",
		type: "mcq",
		question:
			"Which column types are supported in Appwrite TablesDB tables?",
		choices: [
			"String, Integer, Float only",
			"String, Number, Boolean only",
			"Any JSON type without schema validation",
			"Varchar/Text, Integer, Float, Boolean, DateTime, Email, URL, IP, Enum, Relationship",
		],
		correctAnswer: "D",
	},
	{
		id: "db-3",
		category: "databases",
		type: "free-form",
		question:
			'Write code using the current Appwrite Web SDK TablesDB API to create a database, a table with columns, and insert a row. Use a "tasks" table with title (varchar), completed (boolean), and dueDate (datetime) columns.',
		correctAnswer:
			"Use the TablesDB service to create a database, create a tasks table with columns (varchar title, boolean completed, datetime dueDate), then createRow with the data object.",
		rubric:
			"Must include: 1) Client + TablesDB setup, 2) tablesDB.create() for database, 3) tablesDB.createTable() for the tasks table, 4) Creating varchar, boolean, and datetime columns, 5) tablesDB.createRow() with data",
	},
	{
		id: "db-4",
		category: "databases",
		type: "mcq",
		question:
			"Which query method is used to filter rows where a field equals a specific value?",
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
		question: "What are indexes used for in Appwrite database tables?",
		choices: [
			"To encrypt row fields",
			"To create foreign key relationships",
			"To improve query performance on specific columns",
			"To auto-generate unique IDs",
		],
		correctAnswer: "C",
	},
	{
		id: "db-6",
		category: "databases",
		type: "free-form",
		question:
			"Explain how to query rows in Appwrite TablesDB using the Query class. Show examples of filtering, sorting, limiting, and pagination.",
		correctAnswer:
			"The Query class provides methods like equal(), greaterThan(), lessThan(), orderAsc(), orderDesc(), limit(), offset(), cursorAfter() that are passed as an array to tablesDB.listRows().",
		rubric:
			"Must include: 1) Query.equal() for filtering, 2) Query.orderDesc() or orderAsc() for sorting, 3) Query.limit() and Query.offset() for pagination, 4) Passing queries array to listRows(), 5) At least one other query method",
	},
	{
		id: "db-7",
		category: "databases",
		type: "mcq",
		question:
			"What types of relationships does Appwrite support between tables?",
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
		question: "How do permissions work on rows in Appwrite?",
		choices: [
			"Rows inherit permissions from the project only",
			"Permissions are set globally for all rows",
			"Each row can have its own permission list, or inherit from the table",
			"Permissions are only managed through API keys",
		],
		correctAnswer: "C",
	},
	{
		id: "db-9",
		category: "databases",
		type: "mcq",
		question: "What is the correct method to update a row with the current TablesDB API?",
		choices: [
			"tablesDB.update()",
			"tablesDB.patchRow()",
			"tablesDB.updateRow({ databaseId, tableId, rowId, data })",
			"rows.update()",
		],
		correctAnswer: "C",
	},
	{
		id: "db-10",
		category: "databases",
		type: "mcq",
		question:
			"Which Query method performs a full-text search on a row column?",
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
		question: "How do transactions work in Appwrite TablesDB?",
		choices: [
			"Transactions are not supported",
			"Wrap operations in a single tablesDB.transaction() call",
			"Create a transaction, pass the transactionId to row create/update/delete operations, then commit the transaction",
			"Use a special transaction table",
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
			"pending, committing, committed, rolled_back, failed",
			"open, closed",
			"started, finished",
		],
		correctAnswer: "B",
	},
	{
		id: "db-13",
		category: "databases",
		type: "mcq",
		question: "Which Query method is used for cursor-based pagination (get next page after a row)?",
		choices: [
			"Query.cursorAfter(rowId) or Query.cursorBefore(rowId)",
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
		question: "How do you delete a row with the current TablesDB API?",
		choices: [
			"tablesDB.delete()",
			"rows.delete()",
			"tablesDB.removeRow()",
			"tablesDB.deleteRow({ databaseId, tableId, rowId })",
		],
		correctAnswer: "D",
	},
	{
		id: "db-15",
		category: "databases",
		type: "mcq",
		question: "When creating a row, can you set permissions on that row?",
		choices: [
			"Yes, pass a permissions array to createRow",
			"No, rows always inherit table permissions",
			"Only via the Console",
			"Only for the row creator",
		],
		correctAnswer: "A",
	},
	{
		id: "db-16",
		category: "databases",
		type: "mcq",
		question: "What is a relationship column in Appwrite?",
		choices: [
			"A link to an external API",
			"A special index type",
			"A column that references rows in the same or another table (one-to-one, one-to-many, etc.)",
			"A computed field",
		],
		correctAnswer: "C",
	},
	{
		id: "db-17",
		category: "databases",
		type: "mcq",
		question: "Which Query method limits the number of rows returned?",
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
		question: "How do you sort rows by a field in descending order?",
		choices: [
			"Query.orderDesc('columnId')",
			"Query.sort(field, 'desc')",
			"Query.descending('columnId')",
			"Query.orderBy('columnId', Query.DESC)",
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
			"Explain how to use Query to filter rows where a numeric field is greater than 100 and return at most 20 results sorted by that field descending.",
		correctAnswer:
			"Use tablesDB.listRows() with queries array: Query.greaterThan('columnId', 100), Query.orderDesc('columnId'), Query.limit(20). Pass these to the listRows queries parameter.",
		rubric:
			"Must include: 1) Query.greaterThan for the filter, 2) Query.orderDesc for sort, 3) Query.limit(20), 4) Passing queries to listRows()",
	},
	{
		id: "db-21",
		category: "databases",
		type: "mcq",
		question:
			"What are the minimum and maximum values for an integer column in Appwrite?",
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
			"Which of the following is NOT a valid string-based column type in Appwrite TablesDB?",
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
			"Which of the following is NOT a valid string-related column type in Appwrite TablesDB?",
		choices: [
			"email",
			"url",
			"enum",
			"uuid",
		],
		correctAnswer: "D",
	},
];
