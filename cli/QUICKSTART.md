# CustomFades CLI - Quick Reference

## ⚡ Setup (One-Time)

```bash
yarn cf:link            # Create global command
```

Now you can use `customfades` anywhere!

## 🎯 Most Used Commands

```bash
# Start coding
customfades dev:full        # Start everything (dev + CMS)

# Quick development
customfades dev             # Just dev server
customfades cms             # Just CMS backend

# Code quality
customfades lint:fix        # Fix linting issues
customfades format          # Format code

# Testing
customfades test            # Run tests
customfades test:watch      # Watch mode

# Building
customfades build           # Production build
customfades preview         # Preview build locally

# Deployment
customfades deploy          # Deploy to production
customfades deploy:preview  # Deploy preview

# Utilities
customfades open:local      # Open http://localhost:3000
customfades open:cms        # Open CMS admin
customfades clean           # Clean build files
```

## 🎮 Interactive Mode

```bash
# Using global command
customfades

# Or using yarn
yarn cf
```

Then type commands without any prefix:

```
cf> dev:full
cf> open:local
cf> lint:fix
cf> exit
```

## ⚡ Quick Workflows

### New Feature Development
```bash
customfades dev:full        # Start dev environment
customfades open:local      # Open in browser
# ... code ...
customfades lint:fix        # Fix issues
customfades test            # Run tests
customfades build           # Test production build
```

### Content Management
```bash
customfades dev:full        # Start both servers
customfades open:cms        # Open CMS
# ... edit content ...
```

### Pre-Deployment Checklist
```bash
customfades lint            # Check linting
customfades format:check    # Check formatting
customfades test            # Run tests
customfades build           # Build production
customfades preview         # Test locally
customfades deploy:preview  # Deploy preview
# Review preview, then:
customfades deploy          # Deploy production
```

### Troubleshooting
```bash
customfades clean           # Clear build cache
customfades clean:install   # Fresh install
customfades dev             # Restart dev server
```

## 🔧 Advanced Usage

### Chain Commands (Interactive Mode)
```
cf> lint:fix
cf> format
cf> test
cf> build
```

### Quick Git Workflow
```
cf> status
cf> git:push
```

### Development Loop
```
cf> dev:full
cf> open:local
# ... develop ...
cf> lint:fix
cf> format
cf> test
cf> build
```

## 📱 Mobile Development
```bash
yarn cf dev             # Start server
# Access from phone: http://YOUR_IP:3000
```

## 🎨 Content Creation
```bash
yarn cf cms             # Start CMS backend
yarn cf dev             # Start dev server (separate terminal)
yarn cf open:cms        # Open CMS
```

## 📊 Performance Analysis
```bash
yarn cf build           # Build first
yarn cf analyze         # Analyze bundle
```

## 🧹 Maintenance
```bash
yarn cf clean           # Clean build artifacts
yarn cf install         # Update dependencies
yarn cf test:coverage   # Check test coverage
```

## 💡 Tips

1. **Use interactive mode** for multiple commands: `yarn cf`
2. **Background commands** (dev, cms, preview) keep running - Ctrl+C to stop
3. **Tab autocomplete** works in interactive mode
4. **Arrow keys** navigate command history in interactive mode
5. **Type `help`** anytime to see all commands

## 🚀 One-Liners

```bash
# Fresh start
yarn cf clean:install && yarn cf dev:full

# Quick deploy
yarn cf build && yarn cf deploy

# Full QA check
yarn cf lint && yarn cf format:check && yarn cf test && yarn cf build

# Update and test
yarn cf install && yarn cf test && yarn cf dev
```

## 🎯 By Task

| Task | Command |
|------|---------|
| Start working | `yarn cf dev:full` |
| Edit content | `yarn cf cms` + `yarn cf open:cms` |
| Fix code issues | `yarn cf lint:fix` + `yarn cf format` |
| Test changes | `yarn cf test` |
| Build production | `yarn cf build` |
| Deploy | `yarn cf deploy` |
| Troubleshoot | `yarn cf clean` + `yarn cf dev` |

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+C` | Stop current command |
| `Ctrl+D` | Exit interactive mode |
| `↑` / `↓` | Navigate command history |
| `Tab` | Autocomplete (in some shells) |

Save this as your go-to reference! 📌
