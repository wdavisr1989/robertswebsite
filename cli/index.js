#!/usr/bin/env node

const { spawn } = require('child_process');
const readline = require('readline');

// ANSI color codes
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	red: '\x1b[31m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	magenta: '\x1b[35m',
	cyan: '\x1b[36m',
	white: '\x1b[37m',
};

// Helper functions
const log = {
	info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
	success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
	error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
	warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
	title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
	section: (msg) => console.log(`${colors.bright}${msg}${colors.reset}`),
};

// Command definitions
const commands = {
	dev: {
		description: '🚀 Start development server',
		command: 'yarn',
		args: ['dev:vite'],
		background: true,
	},
	cms: {
		description: '📝 Start CMS local backend',
		command: 'yarn',
		args: ['dev:cms'],
		background: true,
	},
	'dev:full': {
		description: '🎯 Start dev server + CMS backend',
		custom: async () => {
			log.info('Starting full development environment...');
			
			// Start CMS proxy server
			await runCommand('yarn', ['dev:cms'], true);
			await sleep(2000);
			
			// Start Vite dev server
			await runCommand('yarn', ['dev:vite'], true);
			await sleep(3000);
			
			// Open both in browser
			log.info('Opening development servers in browser...');
			const openCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
			
			if (process.platform === 'win32') {
				await runCommand('cmd', ['/c', 'start', 'http://localhost:3000'], false);
				await sleep(500);
				await runCommand('cmd', ['/c', 'start', 'http://localhost:3000/admin.html'], false);
			} else {
				await runCommand(openCmd, ['http://localhost:3000'], false);
				await sleep(500);
				await runCommand(openCmd, ['http://localhost:3000/admin.html'], false);
			}
			
			log.success('Full development environment ready!');
			log.info('Dev Server: http://localhost:3000');
			log.info('CMS Admin: http://localhost:3000/admin.html');
			log.info('CMS Proxy: http://localhost:8081 (API only)');
			log.info('Press Ctrl+C to stop all servers');
		},
	},
	build: {
		description: '🏗️  Build for production',
		command: 'yarn',
		args: ['build:vite'],
	},
	preview: {
		description: '👀 Preview production build',
		command: 'yarn',
		args: ['preview'],
		background: true,
	},
	test: {
		description: '🧪 Run tests',
		command: 'yarn',
		args: ['test'],
	},
	'test:watch': {
		description: '🔄 Run tests in watch mode',
		command: 'yarn',
		args: ['test:watch'],
		background: true,
	},
	'test:coverage': {
		description: '📊 Run tests with coverage',
		command: 'yarn',
		args: ['test:coverage'],
	},
	lint: {
		description: '🔍 Lint code',
		command: 'yarn',
		args: ['lint'],
	},
	'lint:fix': {
		description: '🔧 Lint and fix code',
		command: 'yarn',
		args: ['lint:fix'],
	},
	format: {
		description: '✨ Format code with Prettier',
		command: 'yarn',
		args: ['format'],
	},
	'format:check': {
		description: '💅 Check code formatting',
		command: 'yarn',
		args: ['format:check'],
	},
	analyze: {
		description: '📦 Analyze bundle size',
		command: 'yarn',
		args: ['build:analyze'],
	},
	deploy: {
		description: '🚀 Deploy to Netlify (production)',
		command: 'yarn',
		args: ['deploy:netlify'],
	},
	'deploy:preview': {
		description: '🔍 Deploy preview to Netlify',
		command: 'yarn',
		args: ['deploy:preview'],
	},
	install: {
		description: '📦 Install dependencies',
		command: 'yarn',
		args: ['install'],
	},
	clean: {
		description: '🧹 Clean build artifacts',
		custom: async () => {
			log.info('Cleaning build artifacts...');
			if (process.platform === 'win32') {
				await runCommand('powershell', [
					'-Command',
					'Remove-Item -Recurse -Force build, dist, node_modules/.cache -ErrorAction SilentlyContinue',
				]);
			} else {
				await runCommand('rm', ['-rf', 'build', 'dist', 'node_modules/.cache']);
			}
			log.success('Build artifacts cleaned');
		},
	},
	'clean:install': {
		description: '🔄 Clean install dependencies',
		custom: async () => {
			log.info('Removing node_modules...');
			if (process.platform === 'win32') {
				await runCommand('powershell', [
					'-Command',
					'Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue',
				]);
			} else {
				await runCommand('rm', ['-rf', 'node_modules']);
			}
			log.info('Installing dependencies...');
			await runCommand('yarn', ['install']);
			log.success('Dependencies reinstalled');
		},
	},
	'open:cms': {
		description: '🌐 Open CMS admin in browser',
		custom: async () => {
			const url = 'http://localhost:3000/admin.html';
			log.info(`Opening ${url}...`);
			const cmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
			if (process.platform === 'win32') {
				await runCommand('cmd', ['/c', 'start', url]);
			} else {
				await runCommand(cmd, [url]);
			}
		},
	},
	'open:local': {
		description: '🌐 Open localhost in browser',
		custom: async () => {
			const url = 'http://localhost:3000';
			log.info(`Opening ${url}...`);
			if (process.platform === 'win32') {
				await runCommand('cmd', ['/c', 'start', url]);
			} else {
				const cmd = process.platform === 'darwin' ? 'open' : 'xdg-open';
				await runCommand(cmd, [url]);
			}
		},
	},
	status: {
		description: '📊 Show git status',
		command: 'git',
		args: ['status'],
	},
	'git:push': {
		description: '⬆️  Git push current branch',
		command: 'git',
		args: ['push'],
	},
	'git:pull': {
		description: '⬇️  Git pull current branch',
		command: 'git',
		args: ['pull'],
	},
	help: {
		description: '❓ Show this help message',
		custom: showHelp,
	},
};

// Helper to run commands
function runCommand(cmd, args, background = false) {
	return new Promise((resolve, reject) => {
		const child = spawn(cmd, args, {
			stdio: background ? 'inherit' : 'inherit',
			shell: true,
		});

		if (background) {
			log.success(`Started ${cmd} ${args.join(' ')} in background`);
			log.info('Press Ctrl+C to stop');
			resolve();
		} else {
			child.on('close', (code) => {
				if (code === 0) {
					resolve();
				} else {
					reject(new Error(`Command failed with exit code ${code}`));
				}
			});

			child.on('error', (error) => {
				reject(error);
			});
		}
	});
}

// Helper to sleep
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Show help menu
function showHelp() {
	log.title('CustomFades CLI - Available Commands');

	log.section('🚀 Development');
	printCommand('dev', commands.dev.description);
	printCommand('cms', commands.cms.description);
	printCommand('dev:full', commands['dev:full'].description);
	printCommand('preview', commands.preview.description);

	log.section('\n🏗️  Building');
	printCommand('build', commands.build.description);
	printCommand('analyze', commands.analyze.description);

	log.section('\n🧪 Testing');
	printCommand('test', commands.test.description);
	printCommand('test:watch', commands['test:watch'].description);
	printCommand('test:coverage', commands['test:coverage'].description);

	log.section('\n🔍 Code Quality');
	printCommand('lint', commands.lint.description);
	printCommand('lint:fix', commands['lint:fix'].description);
	printCommand('format', commands.format.description);
	printCommand('format:check', commands['format:check'].description);

	log.section('\n🚀 Deployment');
	printCommand('deploy', commands.deploy.description);
	printCommand('deploy:preview', commands['deploy:preview'].description);

	log.section('\n🛠️  Utilities');
	printCommand('install', commands.install.description);
	printCommand('clean', commands.clean.description);
	printCommand('clean:install', commands['clean:install'].description);
	printCommand('open:cms', commands['open:cms'].description);
	printCommand('open:local', commands['open:local'].description);

	log.section('\n📂 Git');
	printCommand('status', commands.status.description);
	printCommand('git:push', commands['git:push'].description);
	printCommand('git:pull', commands['git:pull'].description);

	console.log(`\n${colors.dim}Usage: npm run cf <command>${colors.reset}`);
	console.log(`${colors.dim}   or: yarn cf <command>${colors.reset}\n`);
}

function printCommand(cmd, desc) {
	console.log(`  ${colors.cyan}${cmd.padEnd(18)}${colors.reset} ${desc}`);
}

// Interactive mode
async function interactiveMode() {
	log.title('CustomFades CLI - Interactive Mode');
	console.log(`${colors.dim}Type a command or 'help' for available commands${colors.reset}\n`);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: `${colors.cyan}cf>${colors.reset} `,
	});

	rl.prompt();

	rl.on('line', async (line) => {
		const input = line.trim();

		if (!input) {
			rl.prompt();
			return;
		}

		if (input === 'exit' || input === 'quit') {
			console.log('Goodbye! 👋');
			process.exit(0);
		}

		if (input === 'clear' || input === 'cls') {
			console.clear();
			rl.prompt();
			return;
		}

		await executeCommand(input);
		rl.prompt();
	});

	rl.on('close', () => {
		console.log('\nGoodbye! 👋');
		process.exit(0);
	});
}

// Execute command
async function executeCommand(cmdName) {
	const cmd = commands[cmdName];

	if (!cmd) {
		log.error(`Unknown command: ${cmdName}`);
		log.info('Run "help" to see available commands');
		return;
	}

	try {
		if (cmd.custom) {
			await cmd.custom();
		} else {
			await runCommand(cmd.command, cmd.args, cmd.background);
		}

		if (!cmd.background) {
			log.success('Command completed successfully');
		}
	} catch (error) {
		log.error(`Command failed: ${error.message}`);
	}
}

// Main execution
async function main() {
	const args = process.argv.slice(2);

	if (args.length === 0) {
		await interactiveMode();
	} else {
		const cmdName = args[0];
		await executeCommand(cmdName);
	}
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
	console.log('\n\nGoodbye! 👋');
	process.exit(0);
});

// Run
main().catch((error) => {
	log.error(error.message);
	process.exit(1);
});
