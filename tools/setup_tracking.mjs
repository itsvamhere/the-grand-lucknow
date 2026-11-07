import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const tokenPath = path.join(os.homedir(), '.gemini', 'config', 'plugins', 'github', '.token');
const token = fs.readFileSync(tokenPath, 'utf8').trim();
const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

try {
  const remoteUrl = `https://${token}@github.com/itsvamhere/the-grand-lucknow.git`;
  execSync(`git fetch ${remoteUrl} main:refs/remotes/origin/main`, {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe']
  });
  execSync(`git branch --set-upstream-to=origin/main main`, {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe']
  });
  console.log('Successfully configured origin/main tracking!');
} catch (err) {
  const safeMsg = (err.stderr ? err.stderr.toString() : err.message).replaceAll(token, '[REDACTED]');
  console.error('Tracking config error:', safeMsg);
}
