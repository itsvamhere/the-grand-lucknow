import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const tokenPath = path.join(os.homedir(), '.gemini', 'config', 'plugins', 'github', '.token');
if (!fs.existsSync(tokenPath)) {
  console.error('No github token found at ~/.gemini/config/plugins/github/.token');
  process.exit(1);
}

const token = fs.readFileSync(tokenPath, 'utf8').trim();
if (!token) {
  console.error('GitHub token is empty');
  process.exit(1);
}

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

try {
  // Push quietly without printing url or token to console
  const remoteUrl = `https://${token}@github.com/itsvamhere/the-grand-lucknow.git`;
  execSync(`git push ${remoteUrl} main:main`, {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe']
  });
  console.log('Successfully pushed latest commits to https://github.com/itsvamhere/the-grand-lucknow on branch main!');
} catch (err) {
  // Sanitize any error output to ensure token is never logged
  const safeMsg = (err.stderr ? err.stderr.toString() : err.message).replaceAll(token, '[REDACTED]');
  console.error('Push error:', safeMsg);
  process.exit(1);
}
