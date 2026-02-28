# Appwrite Storage

## Overview

Appwrite Storage provides file management with support for uploads, downloads, image transformations, and fine-grained permissions. Files are organized into buckets.

## Buckets

Buckets are containers for files with shared configuration:

```javascript
import { Client, Storage, ID, Permission, Role } from 'node-appwrite';

const storage = new Storage(client);

// Create bucket
const bucket = await storage.createBucket(
  ID.unique(),
  'Profile Images',
  [
    Permission.read(Role.any()),       // Anyone can view
    Permission.create(Role.users()),   // Authenticated users can upload
    Permission.delete(Role.users()),   // Authenticated users can delete
  ],
  false,      // fileSecurity - per-file permissions
  true,       // enabled
  10000000,   // maximumFileSize (bytes) - 10MB
  ['image/png', 'image/jpeg', 'image/gif'],  // allowedFileExtensions
  'gzip',     // compression
  false,      // encryption
  false       // antivirus
);
```

### Bucket Settings
- **fileSecurity**: When enabled, individual files can have their own permissions
- **maximumFileSize**: Maximum upload size in bytes per file
- **allowedFileExtensions**: Array of allowed MIME types
- **compression**: File compression algorithm ('none', 'gzip', 'zstd')
- **encryption**: Enable/disable at-rest encryption
- **antivirus**: Enable/disable virus scanning on upload

## File Operations

### Upload

```javascript
// Client-side (Web SDK)
const file = await storage.createFile(
  'BUCKET_ID',
  ID.unique(),
  document.getElementById('fileInput').files[0],
  [Permission.read(Role.any())]  // optional per-file permissions
);
```

### Get File Metadata

```javascript
const file = await storage.getFile('BUCKET_ID', 'FILE_ID');
// Returns: $id, bucketId, name, signature, mimeType, sizeOriginal, etc.
```

### List Files

```javascript
const files = await storage.listFiles('BUCKET_ID', [
  Query.limit(25),
  Query.orderDesc('$createdAt'),
]);
```

### Delete File

```javascript
await storage.deleteFile('BUCKET_ID', 'FILE_ID');
```

## File Access Methods

### getFileView()
Returns file content for inline browser display (Content-Disposition: inline):
```javascript
const url = storage.getFileView('BUCKET_ID', 'FILE_ID');
// Use for displaying images in <img> tags, PDFs in iframes, etc.
```

### getFileDownload()
Returns file with download headers (Content-Disposition: attachment):
```javascript
const url = storage.getFileDownload('BUCKET_ID', 'FILE_ID');
// Triggers browser download dialog
```

### getFilePreview()
Returns transformed image with manipulation options:
```javascript
const url = storage.getFilePreview(
  'BUCKET_ID',
  'FILE_ID',
  400,        // width
  300,        // height
  'center',   // gravity (center, top-left, top, top-right, left, right, bottom-left, bottom, bottom-right)
  90,         // quality (0-100)
  5,          // borderWidth
  'ff0000',   // borderColor (hex)
  15,         // borderRadius
  1,          // opacity (0-1)
  0,          // rotation (-360 to 360)
  'ffffff',   // background (hex)
  'jpg'       // output format (jpg, png, gif, webp)
);
```

**Only works with image files.** Supported transformations:
- **Resize**: width and height parameters
- **Crop/Gravity**: Position-based cropping
- **Quality**: Compression quality for lossy formats
- **Border**: Width, color, and radius
- **Opacity**: Transparency level
- **Rotation**: Degree rotation
- **Background**: Fill color for transparent areas
- **Format conversion**: Convert between image formats

## Permissions

- **Bucket-level**: Default permissions for all files in the bucket
- **File-level**: Per-file permissions when `fileSecurity` is enabled on the bucket
- When `fileSecurity` is enabled, a user needs permissions from either the bucket OR the individual file

## Large File Uploads

For large files, Appwrite automatically handles chunked uploads. The Web SDK manages this transparently. Maximum file size depends on bucket configuration and server settings.
