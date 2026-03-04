import type { Question } from "../types";

export const storageQuestions: Question[] = [
	{
		id: "stor-1",
		category: "storage",
		type: "mcq",
		question: 'What is a "bucket" in Appwrite Storage?',
		choices: [
			"A container for organizing and managing file uploads with shared permissions and settings",
			"A type of database collection",
			"A caching layer for static assets",
			"A backup storage location",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-2",
		category: "storage",
		type: "mcq",
		question: "How do you upload a file to Appwrite Storage?",
		choices: [
			"storage.createFile(bucketId, fileId, file)",
			"storage.upload()",
			"storage.putObject()",
			"files.create()",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-3",
		category: "storage",
		type: "free-form",
		question:
			"Write code using the Appwrite Web SDK to create a bucket, upload a file, and get a preview URL for an image file. Include permission configuration.",
		correctAnswer:
			"Storage service provides createBucket() for bucket management, createFile() for uploads, and getFilePreview() for image transformations. Buckets support file size limits, allowed extensions, and permission configuration.",
		rubric:
			"Must include: 1) Storage service instantiation, 2) Bucket creation with permissions, 3) storage.createFile() with bucket ID, file ID, and File object, 4) storage.getFilePreview() for image preview, 5) Correct imports",
	},
	{
		id: "stor-4",
		category: "storage",
		type: "mcq",
		question:
			"Which Appwrite Storage method provides image manipulation like resizing and cropping?",
		choices: [
			"storage.getFilePreview()",
			"storage.transformImage()",
			"storage.processImage()",
			"storage.getFileView()",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-5",
		category: "storage",
		type: "mcq",
		question:
			"What parameters does getFilePreview() support for image transformation?",
		choices: [
			"Only width and height",
			"Only format conversion",
			"Width, height, gravity, quality, border, border-radius, opacity, rotation, background, and output format",
			"CSS filter strings",
		],
		correctAnswer: "C",
	},
	{
		id: "stor-6",
		category: "storage",
		type: "mcq",
		question: "How are file permissions handled in Appwrite Storage?",
		choices: [
			"Files can have individual permissions, or inherit from the bucket depending on fileSecurity setting",
			"All files in a bucket share the same permissions",
			"Permissions are only at the project level",
			"Files are always public",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-7",
		category: "storage",
		type: "mcq",
		question: "What is the method to download a file from Appwrite Storage?",
		choices: [
			"storage.downloadFile()",
			"storage.fetchFile()",
			"storage.getFileDownload(bucketId, fileId)",
			"storage.read()",
		],
		correctAnswer: "C",
	},
	{
		id: "stor-8",
		category: "storage",
		type: "mcq",
		question:
			"Which bucket setting restricts the types of files that can be uploaded?",
		choices: [
			"allowedFileExtensions",
			"fileFilter",
			"mimeTypes",
			"uploadRestrictions",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-9",
		category: "storage",
		type: "free-form",
		question:
			"Explain the difference between storage.getFileView(), storage.getFileDownload(), and storage.getFilePreview(). When would you use each?",
		correctAnswer:
			"getFileView() serves files inline for browser display. getFileDownload() triggers a download. getFilePreview() provides image transformation capabilities (resize, crop, format conversion). Only preview supports manipulation parameters.",
		rubric:
			"Must explain: 1) getFileView() for inline/browser display, 2) getFileDownload() for triggering downloads, 3) getFilePreview() for image transformations, 4) When to use each one",
	},
	{
		id: "stor-10",
		category: "storage",
		type: "mcq",
		question:
			"What is the maximumFileSize parameter in Appwrite bucket configuration?",
		choices: [
			"The total storage limit for the bucket",
			"The maximum number of files",
			"The maximum size in bytes for individual file uploads in the bucket",
			"The maximum image dimensions",
		],
		correctAnswer: "C",
	},
	{
		id: "stor-11",
		category: "storage",
		type: "mcq",
		question: "What does the fileSecurity bucket setting control?",
		choices: [
			"Whether files can have their own permissions (true) or inherit only from the bucket (false)",
			"Whether files are encrypted at rest",
			"Whether the bucket is public",
			"Maximum file size",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-12",
		category: "storage",
		type: "mcq",
		question: "What are the required parameters for storage.createFile() in the Web SDK?",
		choices: [
			"bucketId, fileId, and file",
			"bucketId and file only",
			"bucketId and file; fileId is optional",
			"file and permissions only",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-13",
		category: "storage",
		type: "mcq",
		question: "For large file uploads, how does Appwrite Storage support resumable or chunked uploads?",
		choices: [
			"It does not; all uploads must be in one request",
			"Only via the CLI",
			"Using the Content-Range header to send chunks (e.g. max 5MB per chunk); first request creates the file, subsequent requests use x-appwrite-id",
			"Only for files over 100MB",
		],
		correctAnswer: "C",
	},
	{
		id: "stor-14",
		category: "storage",
		type: "mcq",
		question: "Which method returns a URL suitable for displaying an image in the browser with optional resize/crop?",
		choices: [
			"storage.getFileDownload()",
			"storage.getFilePreview()",
			"storage.getFileUrl()",
			"storage.getFileView() for inline; getFilePreview() for image transformations",
		],
		correctAnswer: "D",
	},
	{
		id: "stor-15",
		category: "storage",
		type: "mcq",
		question: "What does allowedFileExtensions on a bucket do?",
		choices: [
			"Restricts which file extensions can be uploaded (e.g. ['png', 'jpg'])",
			"Limits total number of files",
			"Sets the default extension for unnamed files",
			"Lists extensions that are blocked",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-16",
		category: "storage",
		type: "mcq",
		question: "Can you pass permissions when creating a file?",
		choices: [
			"Yes, as an optional parameter to createFile (e.g. permissions array)",
			"No, files always use bucket permissions",
			"Only via the Console",
			"Only for image files",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-17",
		category: "storage",
		type: "mcq",
		question: "What is maximumFileSize in bucket configuration?",
		choices: [
			"Total storage quota for the bucket in bytes",
			"Maximum number of files in the bucket",
			"Maximum size in bytes for a single file upload",
			"Maximum image dimensions in pixels",
		],
		correctAnswer: "C",
	},
	{
		id: "stor-18",
		category: "storage",
		type: "mcq",
		question: "What is the difference between getFileView and getFileDownload?",
		choices: [
			"getFileView serves the file for inline display (e.g. in browser); getFileDownload triggers a file download",
			"There is no difference",
			"getFileView is for images only",
			"getFileDownload returns a URL; getFileView returns the file bytes",
		],
		correctAnswer: "A",
	},
	{
		id: "stor-19",
		category: "storage",
		type: "mcq",
		question: "How do you list files in a bucket with the SDK?",
		choices: [
			"storage.list()",
			"storage.getFiles(bucketId)",
			"storage.listFiles(bucketId, queries?, search?)",
			"bucket.files.list()",
		],
		correctAnswer: "C",
	},
	{
		id: "stor-20",
		category: "storage",
		type: "free-form",
		question:
			"When should you use getFilePreview instead of getFileView for an image? What does getFilePreview support?",
		correctAnswer:
			"Use getFilePreview when you need image transformation (resize, crop, quality, format, border, opacity, rotation, etc.). getFileView just serves the original file inline. getFilePreview supports width, height, gravity, quality, border, border-radius, opacity, rotation, background, and output format.",
		rubric:
			"Must mention: 1) getFilePreview for image transformations vs getFileView for original, 2) At least 2 transformation options (e.g. width, height, quality, format)",
	},
];
