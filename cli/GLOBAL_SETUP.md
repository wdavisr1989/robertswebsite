# CustomFades CLI - Global Setup

## ✅ Setup Complete!

The `customfades` command is now globally available on your system.

## 🎯 Quick Test

```bash
customfades help
```

You should see the full list of available commands.

## 📍 Command Scope

The `customfades` command is **project-scoped** - it only works within this repository directory. This is because:

1. The CLI is symlinked globally via `npm link`
2. When you run `customfades`, it executes `cli/index.js` from **this project**
3. All commands run in the context of the current working directory
4. If you're outside the project, you'll get a "command not found" error OR it will run but fail to find project files

## 🚀 Usage Examples

### From Anywhere in Your Terminal

```bash
# Navigate to project first
cd C:\Users\IBlac\OneDrive\Desktop\MyProjects\robertswebsite

# Now use the global command
customfades dev
customfades build
customfades deploy
```

### Interactive Mode

```bash
customfades
```

Then run commands interactively:
```
cf> dev:full
cf> open:local
cf> test
cf> exit
```

## 🔄 Management Commands

### Unlink (Remove Global Command)
```bash
yarn cf:unlink
# or
npm unlink -g customfades-website
```

### Relink (After Pulling Updates)
```bash
yarn cf:link
```

## 💡 Aliases (Optional)

You can create shorter aliases in your PowerShell profile:

```powershell
# Open profile
notepad $PROFILE

# Add alias
Set-Alias cf customfades
```

Then you can use:
```bash
cf dev
cf build
```

## 🎨 Benefits of Global Command

✅ **Shorter syntax**: `customfades dev` vs `yarn cf dev`  
✅ **Consistent**: Same command everywhere  
✅ **Fast**: No npm/yarn overhead  
✅ **Convenient**: Type less, do more  

## 🔒 Security Note

The global symlink points to **this specific project directory**. If you:
- Move the project folder
- Delete the project
- Change the folder name

You'll need to **relink**:
```bash
cd /path/to/new/location
yarn cf:link
```

## 🆘 Troubleshooting

### Command Not Found
```bash
# Verify symlink exists
Get-Command customfades

# If missing, relink
yarn cf:link
```

### Wrong Project
If you have multiple projects with `customfades` CLI, the last linked one wins.

### Permission Issues
On some systems, you may need admin privileges:
```powershell
# Run PowerShell as Administrator
yarn cf:link
```

## 📋 Available Globally

After linking, these work from anywhere (when in project directory):

```bash
customfades dev          # Start development
customfades build        # Build production
customfades test         # Run tests
customfades deploy       # Deploy to Netlify
customfades help         # Show all commands
```

Happy coding! 🎉
