# Appwrite Sites

## Overview

Appwrite Sites is a web hosting and deployment service that enables you to deploy static and dynamic websites directly within the Appwrite platform. It supports popular frameworks and provides automatic SSL, custom domains, and Git-based deployments.

## Supported Site Types

- **Static sites**: Plain HTML/CSS/JS, or built with static site generators
- **Dynamic sites**: Server-rendered applications using frameworks like Next.js, Nuxt, SvelteKit, Astro, Remix, Angular, and more

## Creating a Site

Sites can be created through:
1. **Appwrite Console**: Create and configure through the web interface
2. **CLI**: `appwrite deploy site`
3. **API**: Programmatic site creation

## Deployment Methods

### Git Integration
Connect a GitHub or GitLab repository for automatic deployments:
- Automatic deployments on push to the configured branch
- Preview deployments for pull requests
- Branch-based deployment configuration

### CLI Deployment
```bash
# Deploy a site
appwrite deploy site
```

### Manual Upload
Upload built files directly through the Console.

## Build Configuration

### Key Settings
- **Framework**: Auto-detected or manually set (Next.js, Nuxt, Astro, SvelteKit, etc.)
- **Build command**: Command to build the site (e.g., `npm run build`)
- **Output directory**: Directory containing the built output (e.g., `dist`, `build`, `.next`, `.output`)
- **Install command**: Command to install dependencies (e.g., `npm install`)
- **Root directory**: Subdirectory containing the site source (for monorepos)

### Framework Presets
Appwrite Sites auto-detects frameworks and sets appropriate defaults:

| Framework | Build Command | Output Directory |
|-----------|--------------|------------------|
| Next.js | `npm run build` | `.next` |
| Nuxt | `npm run build` | `.output` |
| Astro | `npm run build` | `dist` |
| SvelteKit | `npm run build` | `build` |
| Vite/React | `npm run build` | `dist` |
| Angular | `npm run build` | `dist` |

## Environment Variables

Environment variables can be set for both the build process and runtime:
- Configured in the Console or via API
- Available during the build step and at runtime for dynamic sites
- Useful for API keys, database IDs, and other configuration

## Custom Domains

- Add custom domains through the Console
- Configure a CNAME record pointing to your Appwrite site
- SSL/TLS certificates are automatically provisioned and renewed via Let's Encrypt
- Multiple domains can point to the same site

## Deployment Lifecycle

1. **Source**: Code pushed to Git repo or uploaded manually
2. **Install**: Dependencies installed (e.g., `npm install`)
3. **Build**: Site built using configured build command
4. **Deploy**: Built output deployed and served
5. **Active**: Site is live and serving traffic

## Rollbacks

Previous deployments are retained, allowing you to roll back to a previous version if needed through the Console.
