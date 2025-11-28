# Local Development with Netlify CMS

## Overview
This project uses Netlify CMS for content management. For local development, you can use the Netlify CMS proxy server to edit content without deploying to production.

## Setup

### 1. Install Dependencies
```bash
yarn install
```

This will install `netlify-cms-proxy-server` which allows local content editing.

### 2. Start the Local Backend
In one terminal, start the Netlify CMS proxy server:

```bash
yarn dev:cms
```

This starts a local server on port 8081 that watches your content files.

### 3. Start the Development Server
In another terminal, start Vite:

```bash
yarn dev:vite
```

This starts your site on http://localhost:3000

### 4. Access the CMS
Navigate to: **http://localhost:3000/admin.html**

With `local_backend: true` enabled in your config.yml, the CMS will:
- Connect to your local proxy server (port 8081)
- Read/write content directly to your local `content/` folder
- Automatically commit changes to git (optional)

## How It Works

### Local Backend Flow:
1. **CMS UI** (admin.html) → runs in browser at localhost:3000/admin.html
2. **Proxy Server** (port 8081) → watches content files, handles git operations
3. **Content Files** (content/blog/*.md) → edited directly on your filesystem
4. **Vite Dev Server** → hot reloads when content changes

### Benefits:
✅ Edit content without deploying to Netlify  
✅ See changes instantly with HMR  
✅ Test content workflows locally  
✅ Work offline  
✅ No authentication required  

## Alternative: Manual Content Editing

You can also edit markdown files directly:

```bash
# Edit any blog post
code content/blog/wanderlust.md

# Create new blog post
touch content/blog/new-post.md
```

The site will hot-reload automatically when you save changes.

## Content Structure

```
content/
├── blog/
│   ├── how-to-share-a-screenshot-of-the-page.md
│   ├── visiting-goa.md
│   └── wanderlust.md
└── images/
    ├── cyclist.md
    └── lighthouse.md
```

Each markdown file follows this frontmatter format:

```markdown
---
title: "Your Post Title"
date: 2025-11-24T10:00:00Z
subtitle: "Optional subtitle"
cover: "/assets/image.jpg"
tags: "barbershop, haircuts, style"
---

Your post content here...
```

## Troubleshooting

### Port 8081 Already in Use
```bash
# Find and kill the process
Get-Process -Id (Get-NetTCPConnection -LocalPort 8081).OwningProcess | Stop-Process
```

### CMS Not Connecting to Local Backend
1. Verify `local_backend: true` is in `src/static/config.yml`
2. Ensure proxy server is running on port 8081
3. Check browser console for connection errors
4. Clear browser cache and reload admin.html

### Changes Not Appearing
1. Check that proxy server is watching the correct directory
2. Verify content files are in `content/blog/`
3. Check file paths match `media_folder` in config.yml
4. Restart both dev servers

## Production vs Development

### Development (Local)
- Uses `netlify-cms-proxy-server`
- Edits files directly on filesystem
- No authentication needed
- `local_backend: true` enabled

### Production (Netlify)
- Uses `git-gateway` backend
- Commits changes via GitHub API
- Requires Netlify Identity authentication
- `local_backend` is ignored

## Scripts Reference

| Command | Description |
|---------|-------------|
| `yarn dev:vite` | Start Vite dev server (port 3000) |
| `yarn dev:cms` | Start Netlify CMS proxy (port 8081) |
| `yarn build:vite` | Build production site |
| `yarn preview` | Preview production build |

## Next Steps

1. **Customize CMS Collections**: Edit `src/static/config.yml` to add new content types
2. **Add Custom Widgets**: Install Netlify CMS widgets for enhanced editing
3. **Configure Git Workflows**: Set up automatic commits from CMS edits
4. **Add Media Library**: Configure Cloudinary or other media providers

## Resources

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [Local Backend Setup](https://www.netlifycms.org/docs/beta-features/#working-with-a-local-git-repository)
- [Configuration Options](https://www.netlifycms.org/docs/configuration-options/)
