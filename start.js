#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path Resolution
const PARENT_PROJECT_ROOT = process.cwd();
const SUBMODULE_DIR = __dirname;
const DEFAULT_CONFIG_NAME = 'agentic-toolkit.json';
const TOOL_MAP = {
  'opencode': '.opencode',
  'claude': '.claude',
  'standard-agents': '.agents'
};

// Configuration Resolution
function loadConfig(configPath) {
  const parentConfigPath = configPath || path.join(PARENT_PROJECT_ROOT, DEFAULT_CONFIG_NAME);
  let config = { targets: ['standard-agents'] };

  if (fs.existsSync(parentConfigPath)) {
    const parentConfig = JSON.parse(fs.readFileSync(parentConfigPath, 'utf8'));
    
    if (parentConfig.targets && Array.isArray(parentConfig.targets)) {
      config = parentConfig;
    }
  } else {
    // Fallback Discovery
    if (fs.existsSync(path.join(PARENT_PROJECT_ROOT, 'opencode.json'))) {
      config.targets = ['opencode'];
    } else if (fs.existsSync(path.join(PARENT_PROJECT_ROOT, 'claude.json')) || fs.existsSync(path.join(PARENT_PROJECT_ROOT, '.clauderc'))) {
      config.targets = ['claude'];
    }
  }

  return config;
}

// Sync to Target Directory
function syncToTarget(target) {
  const targetDir = path.join(PARENT_PROJECT_ROOT, TOOL_MAP[target] || TOOL_MAP['standard-agents']);

  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  fs.mkdirSync(path.join(targetDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'skills'), { recursive: true });

  const submoduleAgents = path.join(SUBMODULE_DIR, 'agents');
  const submoduleSkills = path.join(SUBMODULE_DIR, 'skills');

  if (fs.existsSync(submoduleAgents)) {
    fs.cpSync(submoduleAgents, path.join(targetDir, 'agents'), { recursive: true });
  }

  if (fs.existsSync(submoduleSkills)) {
    fs.cpSync(submoduleSkills, path.join(targetDir, 'skills'), { recursive: true });
  }

  return targetDir;
}

// Sync from Target Directory (Reverse)
function saveFromTarget(target) {
  const targetDir = path.join(PARENT_PROJECT_ROOT, TOOL_MAP[target] || TOOL_MAP['standard-agents']);

  if (!fs.existsSync(targetDir)) {
    console.log(`  Skipping ${target} - directory not found`);
    return 0;
  }

  const scanDirs = ['agents', 'skills'];
  let copied = 0;

  for (const dir of scanDirs) {
    const source = path.join(targetDir, dir);
    const destination = path.join(SUBMODULE_DIR, dir);

    if (!fs.existsSync(source)) continue;

    fs.cpSync(source, destination, { recursive: true });
    copied++;
  }

  return copied;
}

// Main Execution
const args = process.argv.slice(2);

// Parse --config flag
const configIndex = args.indexOf('--config');
const customConfigPath = configIndex !== -1 ? args[configIndex + 1] : null;

const isSave = args.includes('--save');
const config = loadConfig(customConfigPath);
const targets = config.targets || ['standard-agents'];

console.log(`\nAgentic Toolkit - ${isSave ? 'Saving' : 'Syncing'} to ${targets.length} target(s)\n`);

if (isSave) {
  // Reverse sync: save from targets back to submodule
  for (const target of targets) {
    const dir = TOOL_MAP[target] || TOOL_MAP['standard-agents'];
    console.log(`  Saving from ${dir}...`);
    const count = saveFromTarget(target);
    if (count > 0) {
      console.log(`    Saved ${count} director${count === 1 ? 'y' : 'ies'}`);
    }
  }
} else {
  // Forward sync: sync from submodule to targets
  for (const target of targets) {
    const dir = TOOL_MAP[target] || TOOL_MAP['standard-agents'];
    console.log(`  Syncing to ${dir}...`);
    syncToTarget(target);
    console.log(`    Done`);
  }
}

console.log('\nDone.\n');
