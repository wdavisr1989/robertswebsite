# CustomFades Website - Project Structure

## 📁 Directory Overview

```
robertswebsite/
├── 📄 Configuration Files
│   ├── package.json              # Project dependencies & scripts
│   ├── vite.config.js            # Vite build configuration
│   ├── preact.config.js          # Preact CLI configuration
│   ├── netlify.toml              # Netlify deployment settings
│   ├── .eslintrc.json            # ESLint rules
│   ├── .prettierrc               # Prettier formatting rules
│   └── robertswebsite.code-workspace  # VS Code workspace config
│
├── 📝 Content (Netlify CMS)
│   ├── content/
│   │   ├── blog/                 # Blog posts (markdown)
│   │   │   ├── how-to-share-a-screenshot-of-the-page.md
│   │   │   ├── visiting-goa.md
│   │   │   └── wanderlust.md
│   │   └── images/               # Image content
│   │       ├── cyclist.md
│   │       └── lighthouse.md
│
├── 🎨 Source Code
│   └── src/
│       ├── index.js              # App entry point
│       ├── template.html         # HTML template
│       ├── manifest.json         # PWA manifest
│       │
│       ├── assets/               # Static assets
│       │   ├── icons/            # Icon files
│       │   ├── hero-clippers.webp
│       │   ├── robert-davis-profile.jpg
│       │   ├── client-01.jpg → client-10.jpg
│       │   ├── logo-white-arch.svg
│       │   ├── logo-black.svg
│       │   └── service-*.svg
│       │
│       ├── components/           # Reusable components
│       │   ├── app.js            # Main app component
│       │   ├── header/
│       │   │   ├── index.js      # Navigation header
│       │   │   └── style.module.css
│       │   └── Modal/
│       │       ├── index.js      # Modal component
│       │       └── style.module.css
│       │
│       ├── routes/               # Page routes
│       │   ├── home/
│       │   │   ├── index.js      # Homepage
│       │   │   └── style.module.css
│       │   ├── blogs/
│       │   │   ├── index.js      # Blog listing
│       │   │   └── style.module.css
│       │   ├── blog/
│       │   │   ├── index.js      # Single blog post
│       │   │   ├── formatted-code-block.js
│       │   │   └── style.css
│       │   ├── contact/
│       │   │   ├── index.js      # Contact page
│       │   │   └── style.css
│       │   ├── contact-success/
│       │   │   ├── index.js      # Contact success
│       │   │   └── style.css
│       │   └── notfound/
│       │       ├── index.js      # 404 page
│       │       └── style.css
│       │
│       ├── style/
│       │   └── index.css         # Global styles & design system
│       │
│       ├── static/               # Static files (copied to build)
│       │   ├── admin.html        # Netlify CMS admin UI
│       │   ├── config.yml        # CMS configuration
│       │   └── preview.css       # CMS preview styles
│       │
│       └── crawler/
│           └── index.js          # Web crawler utility
│
├── 🧪 Tests
│   └── tests/
│       ├── header.test.js        # Header component tests
│       └── __mocks__/
│           ├── browserMocks.js
│           └── fileMocks.js
│
├── 🏗️ Build Output
│   └── build/                    # Production build (gitignored)
│       ├── index.html
│       ├── assets/
│       │   ├── css/
│       │   ├── js/
│       │   └── images/
│       └── ...
│
└── 📚 Documentation
    ├── README.md                 # Project overview
    ├── LOCAL_DEVELOPMENT.md      # Local CMS setup guide
    └── PROJECT_STRUCTURE.md      # This file
```

## 🗂️ Key Directories Explained

### `/src/routes/`
Each route is a page in your application:
- **home/** - Main landing page with hero, services, gallery, contact
- **blogs/** - Blog listing page
- **blog/** - Individual blog post view with syntax highlighting
- **contact/** - Contact form
- **contact-success/** - Form submission confirmation
- **notfound/** - 404 error page

### `/src/components/`
Reusable UI components:
- **header/** - Sticky navigation bar with icon links
- **Modal/** - Booking calendar modal overlay
- **app.js** - Root application component with router

### `/src/style/`
Global styling and design system:
- **index.css** - CSS custom properties, resets, global styles
  - Colors: `--primary`, `--background`, `--surface`
  - Typography: Font families and scales
  - Spacing: Consistent spacing variables
  - Shadows: Box shadow utilities

### `/content/`
Content managed by Netlify CMS:
- **blog/** - Markdown blog posts with frontmatter
- **images/** - Image metadata and descriptions

### `/src/static/`
Files copied directly to build output:
- **admin.html** - CMS admin interface
- **config.yml** - CMS collection definitions
- **preview.css** - CMS preview styling

## 🎯 Component Architecture

### Styling Approach
- **CSS Modules** - Scoped component styles (`*.module.css`)
- **Global Styles** - Design tokens in `/src/style/index.css`
- **Mobile-First** - Responsive breakpoints with media queries

### Routing
- **Preact Router** - Client-side routing
- **Code Splitting** - Lazy-loaded routes for performance
- **Deep Linking** - Direct URL access to all pages

### State Management
- **Component State** - Local state with hooks (`useState`, `useEffect`)
- **Props** - Data passed between components
- **No Global State** - Simple enough without Redux/Context

## 📦 Build Artifacts

### Development Build
```
yarn dev:vite
```
- Source maps enabled
- Hot module replacement (HMR)
- Unminified code
- Development warnings

### Production Build
```
yarn build:vite
```
- Minified & optimized
- Code splitting
- Image optimization
- Legacy browser support
- Output: `/build/` directory

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, metadata |
| `vite.config.js` | Build tool configuration |
| `netlify.toml` | Deployment & redirect rules |
| `.eslintrc.json` | Code linting rules |
| `.prettierrc` | Code formatting rules |
| `tsconfig.json` | TypeScript configuration |
| `.gitignore` | Git excluded files |
| `.editorconfig` | Editor consistency settings |

## 🎨 Design System

### Colors (CustomFades Brand)
```css
--primary: #BFBB50        /* Gold */
--background: #231F20     /* Dark gray/black */
--surface: #FFFFFF        /* White */
--accent: #3da7f8         /* Blue */
```

### Typography
```css
--font-primary: 'Poppins'        /* Body text */
--font-display: 'Playfair Display' /* Headings */
--font-brand: 'Courgette'        /* Logo */
```

### Breakpoints
```css
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

## 🚀 Common Tasks

### Start Development
```bash
yarn dev:vite              # Start Vite dev server
yarn dev:cms               # Start CMS backend (separate terminal)
```

### Build & Deploy
```bash
yarn build:vite            # Production build
yarn preview               # Preview production build
yarn deploy:netlify        # Deploy to Netlify
```

### Code Quality
```bash
yarn lint                  # Check for errors
yarn lint:fix              # Auto-fix errors
yarn format                # Format all files
yarn test                  # Run tests
yarn test:coverage         # Test with coverage
```

### Analysis
```bash
yarn build:analyze         # Bundle size analysis
```

## 📝 Content Management

### Local Development
1. Start CMS backend: `yarn dev:cms`
2. Start dev server: `yarn dev:vite`
3. Open: `http://localhost:3000/admin.html`

### Production (Netlify)
1. Deploy to Netlify
2. Enable Netlify Identity
3. Invite users
4. Access: `https://yoursite.com/admin.html`

## 🔗 Important URLs

| Environment | URL |
|-------------|-----|
| Local Dev | http://localhost:3000 |
| Local CMS | http://localhost:3000/admin.html |
| CMS Backend | http://localhost:8081 (proxy) |
| Production | https://customfades.netlify.app |

## 🛠️ VS Code Workspace Features

### Tasks Available (Ctrl+Shift+B)
- 🚀 Dev: Start Development Server
- 📝 CMS: Start Local Backend
- 🏗️ Build: Production Build
- 👀 Preview: Production Build
- 🧪 Test: Run All Tests
- 🔍 Lint: Check Code
- ✨ Format: Fix Formatting
- 🚀 Deploy: Netlify Production

### Launch Configurations (F5)
- 🌐 Launch Chrome: Development
- 📝 Launch CMS Admin
- 🧪 Debug Jest Tests

### Recommended Extensions
- Prettier - Code formatter
- ESLint - Linting
- GitLens - Git supercharged
- Markdown All in One
- Path Intellisense
- npm Intellisense

## 📊 Performance Metrics

### Target Metrics
- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Optimization Strategies
✅ Image optimization (WebP format)
✅ Code splitting by route
✅ CSS minification
✅ JavaScript minification
✅ Legacy browser polyfills
✅ Lazy loading images
✅ Font subsetting

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Find process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Clear Build Cache
```bash
yarn clean                 # Remove build artifacts
yarn clean:install         # Fresh dependency install
```

### Module Resolution Issues
```bash
Remove-Item node_modules -Recurse -Force
Remove-Item yarn.lock
yarn install
```

## 📚 Resources

- [Preact Documentation](https://preactjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Netlify CMS Docs](https://www.netlifycms.org/docs/)
- [CSS Modules](https://github.com/css-modules/css-modules)
