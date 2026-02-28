import type { Question } from '../types'

export const storageQuestions: Question[] = [
  {
    id: 'stor-1',
    category: 'storage',
    type: 'mcq',
    question: 'What is a "bucket" in Appwrite Storage?',
    choices: [
      'A type of database collection',
      'A container for organizing and managing file uploads with shared permissions and settings',
      'A caching layer for static assets',
      'A backup storage location',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'stor-2',
    category: 'storage',
    type: 'mcq',
    question: 'How do you upload a file to Appwrite Storage?',
    choices: [
      'storage.upload()',
      'storage.createFile(bucketId, fileId, file)',
      'storage.putObject()',
      'files.create()',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'stor-3',
    category: 'storage',
    type: 'free-form',
    question: 'Write code using the Appwrite Web SDK to create a bucket, upload a file, and get a preview URL for an image file. Include permission configuration.',
    correctAnswer: `import { Client, Storage, ID, Permission, Role } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('PROJECT_ID');

const storage = new Storage(client);

// Create bucket (server-side)
const bucket = await storage.createBucket(
  ID.unique(),
  'Images',
  [
    Permission.read(Role.any()),
    Permission.create(Role.users()),
    Permission.delete(Role.users()),
  ],
  false, // fileSecurity
  true,  // enabled
  10000000, // maximumFileSize (10MB)
  ['image/png', 'image/jpeg', 'image/gif'], // allowedFileExtensions
);

// Upload file (client-side)
const file = await storage.createFile(
  bucket.$id,
  ID.unique(),
  document.getElementById('fileInput').files[0],
);

// Get preview URL
const preview = storage.getFilePreview(bucket.$id, file.$id, 400, 300);`,
    rubric: 'Must include: 1) Storage service instantiation, 2) Bucket creation with permissions, 3) storage.createFile() with bucket ID, file ID, and File object, 4) storage.getFilePreview() for image preview, 5) Correct imports',
    reference: 'Storage service provides createBucket() for bucket management, createFile() for uploads, and getFilePreview() for image transformations. Buckets support file size limits, allowed extensions, and permission configuration.',
  },
  {
    id: 'stor-4',
    category: 'storage',
    type: 'mcq',
    question: 'Which Appwrite Storage method provides image manipulation like resizing and cropping?',
    choices: [
      'storage.transformImage()',
      'storage.getFilePreview()',
      'storage.processImage()',
      'storage.getFileView()',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'stor-5',
    category: 'storage',
    type: 'mcq',
    question: 'What parameters does getFilePreview() support for image transformation?',
    choices: [
      'Only width and height',
      'Width, height, gravity, quality, border, border-radius, opacity, rotation, background, and output format',
      'Only format conversion',
      'CSS filter strings',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'stor-6',
    category: 'storage',
    type: 'mcq',
    question: 'How are file permissions handled in Appwrite Storage?',
    choices: [
      'All files in a bucket share the same permissions',
      'Files can have individual permissions, or inherit from the bucket depending on fileSecurity setting',
      'Permissions are only at the project level',
      'Files are always public',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'stor-7',
    category: 'storage',
    type: 'mcq',
    question: 'What is the method to download a file from Appwrite Storage?',
    choices: [
      'storage.downloadFile()',
      'storage.getFileDownload(bucketId, fileId)',
      'storage.fetchFile()',
      'storage.read()',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'stor-8',
    category: 'storage',
    type: 'mcq',
    question: 'Which bucket setting restricts the types of files that can be uploaded?',
    choices: [
      'fileFilter',
      'allowedFileExtensions',
      'mimeTypes',
      'uploadRestrictions',
    ],
    correctAnswer: 'B',
  },
  {
    id: 'stor-9',
    category: 'storage',
    type: 'free-form',
    question: 'Explain the difference between storage.getFileView(), storage.getFileDownload(), and storage.getFilePreview(). When would you use each?',
    correctAnswer: 'getFileView() returns a URL that displays the file in the browser (inline content disposition) — use for displaying files like images or PDFs directly. getFileDownload() returns a URL with a download content disposition — use when you want to trigger a file download. getFilePreview() returns a transformed image URL with options for width, height, quality, format etc. — use for generating thumbnails, responsive images, or image transformations. Only getFilePreview() supports image manipulation parameters.',
    rubric: 'Must explain: 1) getFileView() for inline/browser display, 2) getFileDownload() for triggering downloads, 3) getFilePreview() for image transformations, 4) When to use each one',
    reference: 'getFileView() serves files inline for browser display. getFileDownload() triggers a download. getFilePreview() provides image transformation capabilities (resize, crop, format conversion). Only preview supports manipulation parameters.',
  },
  {
    id: 'stor-10',
    category: 'storage',
    type: 'mcq',
    question: 'What is the maximumFileSize parameter in Appwrite bucket configuration?',
    choices: [
      'The total storage limit for the bucket',
      'The maximum size in bytes for individual file uploads in the bucket',
      'The maximum number of files',
      'The maximum image dimensions',
    ],
    correctAnswer: 'B',
  },
]
