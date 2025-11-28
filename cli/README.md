# CustomFades CLI

A custom command-line interface for managing the CustomFades website project.

## 🚀 Quick Start

### Installation (One-Time Setup)
```bash
yarn cf:link
```

This creates a global `customfades` command available anywhere in your terminal.

### Interactive Mode
```bash
# Global command (after linking)
customfades

# Or using npm/yarn
npm run cf
yarn cf
```

This launches an interactive shell where you can run multiple commands:
```
cf> dev
cf> open:local
cf> help
cf> exit
```

### Direct Command
```bash
# Global command (recommended)
customfades dev
customfades build
customfades deploy

# Or using npm/yarn
npm run cf dev
yarn cf dev
```

## 📋 Available Commands

### 🚀 Development
- `dev` - Start development server (Vite on port 3000)
- `cms` - Start CMS local backend (port 8081)
- `dev:full` - Start both dev server + CMS backend
- `preview` - Preview production build

### 🏗️ Building
- `build` - Build for production
- `analyze` - Analyze bundle size

### 🧪 Testing
- `test` - Run all tests
- `test:watch` - Run tests in watch mode
- `test:coverage` - Run tests with coverage report

### 🔍 Code Quality
- `lint` - Check code for linting errors
- `lint:fix` - Auto-fix linting errors
- `format` - Format code with Prettier
- `format:check` - Check if code is formatted

### 🚀 Deployment
- `deploy` - Deploy to Netlify (production)
- `deploy:preview` - Deploy preview to Netlify

### 🛠️ Utilities
- `install` - Install dependencies
- `clean` - Clean build artifacts
- `clean:install` - Remove node_modules and reinstall
- `open:cms` - Open CMS admin in browser
- `open:local` - Open localhost in browser

### 📂 Git
- `status` - Show git status
- `git:push` - Push current branch
- `git:pull` - Pull current branch

### ❓ Help
- `help` - Show all available commands

## 💡 Examples

### Start full development environment
```bash
# Using global command
customfades dev:full

# Or using npm/yarn
yarn cf dev:full
```

This will:
1. Start CMS backend on port 8081
2. Start dev server on port 3000
3. Run both in background

### Lint and format code
```bash
customfades lint:fix
customfades format
```

### Build and analyze
```bash
customfades build
customfades analyze
```

### Clean and rebuild
```bash
customfades clean
customfades build
```

### Complete fresh install
```bash
customfades clean:install
```

## 🎨 Features

### Color-coded Output
- 🔵 Info messages in blue
- ✅ Success messages in green
- ⚠️ Warnings in yellow
- ❌ Errors in red

### Interactive Shell
- Tab completion-ready
- Command history
- Easy navigation between commands
- Type `exit` or press `Ctrl+C` to quit

### Background Processes
Some commands (like `dev`, `cms`) run in background and keep terminal active.
Press `Ctrl+C` to stop background processes.

## 🔧 Customization

Edit `cli/index.js` to add your own commands:

```javascript
commands.mycommand = {
  description: '📝 My custom command',
  command: 'yarn',
  args: ['my:script'],
};
```

Or create custom functions:

```javascript
commands.mycommand = {
  description: '📝 My custom command',
  custom: async () => {
    log.info('Running custom logic...');
    // Your code here
    log.success('Done!');
  },
};
```

## 🚨 Troubleshooting

### Command not found
Make sure you've installed dependencies:
```bash
yarn install
```

### Port already in use
Kill processes on ports 3000 or 8081:
```powershell
# PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Permission denied
On Unix systems, you may need to make the CLI executable:
```bash
chmod +x cli/index.js
```

## 📝 Notes

- All commands are project-specific and only work within this repository
- The CLI wraps existing package.json scripts for convenience
- Background processes will continue running until you stop them with Ctrl+C
- Interactive mode is great for running multiple commands without retyping `yarn cf`
