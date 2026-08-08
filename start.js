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

// Phase 1 & 2: Configuration Resolution
function loadConfig(configPath) {
  const parentConfigPath = configPath || path.join(PARENT_PROJECT_ROOT, DEFAULT_CONFIG_NAME);
  let config = { active_tool: 'standard-agents' };

  if (fs.existsSync(parentConfigPath)) {
    const parentConfig = JSON.parse(fs.readFileSync(parentConfigPath, 'utf8'));
    
    if (parentConfig.extends && fs.existsSync(path.join(PARENT_PROJECT_ROOT, parentConfig.extends))) {
      const baseConfig = JSON.parse(fs.readFileSync(path.join(PARENT_PROJECT_ROOT, parentConfig.extends), 'utf8'));
      config = { ...baseConfig, ...parentConfig, ...baseConfig.custom };
    } else {
      config = parentConfig;
    }
  } else {
    // Fallback Discovery
    if (fs.existsSync(path.join(PARENT_PROJECT_ROOT, 'opencode.json'))) {
      config.active_tool = 'opencode';
    } else if (fs.existsSync(path.join(PARENT_PROJECT_ROOT, 'claude.json')) || fs.existsSync(path.join(PARENT_PROJECT_ROOT, '.clauderc'))) {
      config.active_tool = 'claude';
    }
  }

  return config;
}

// Phase 4: State Purge & Execution Layer
function syncToTool(config) {
  const targetTool = TOOL_MAP[config.active_tool] || TOOL_MAP['standard-agents'];
  const targetDir = path.join(PARENT_PROJECT_ROOT, targetTool);

  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  fs.mkdirSync(path.join(targetDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'skills'), { recursive: true });

  // Bulk-copy from submodule
  const submoduleAgents = path.join(SUBMODULE_DIR, 'agents');
  const submoduleSkills = path.join(SUBMODULE_DIR, 'skills');

  if (fs.existsSync(submoduleAgents)) {
    fs.cpSync(submoduleAgents, path.join(targetDir, 'agents'), { recursive: true });
  }

  if (fs.existsSync(submoduleSkills)) {
    fs.cpSync(submoduleSkills, path.join(targetDir, 'skills'), { recursive: true });
  }

  console.log(`Synced toolkit to ${targetTool}`);
}

// Phase 5: State Inversion Flags
function saveFromTool(args, configPath) {
  const config = loadConfig(configPath);
  const targetTool = TOOL_MAP[config.active_tool] || TOOL_MAP['standard-agents'];
  const targetDir = path.join(PARENT_PROJECT_ROOT, targetTool);
  const submoduleDir = SUBMODULE_DIR;

  if (!fs.existsSync(targetDir)) {
    console.log(`No ${targetTool} directory found.`);
    return;
  }

  const scanDirs = ['agents', 'skills'];
  let copied = 0;

  for (const dir of scanDirs) {
    const source = path.join(targetDir, dir);
    const destination = path.join(submoduleDir, dir);

    if (!fs.existsSync(source)) continue;

    fs.cpSync(source, destination, { 
      recursive: true,
      filter: (src) => {
        if (args.includes('--saveIfNew')) {
          const destPath = path.join(destination, path.relative(source, src));
          return !fs.existsSync(destPath);
        }
        return true;
      }
    });
    copied++;
  }

  console.log(`Saved ${copied} directories from ${targetTool} back to toolkit.`);
}

// Main Execution
const args = process.argv.slice(2);

// Parse --config flag
const configIndex = args.indexOf('--config');
const customConfigPath = configIndex !== -1 ? args[configIndex + 1] : null;

// Filter out --config and its value from args
const filteredArgs = args.filter((arg, i) => {
  if (arg === '--config') return false;
  if (i === configIndex + 1 && customConfigPath) return false;
  return true;
});

if (filteredArgs.includes('--save') || filteredArgs.includes('--saveIfNew')) {
  saveFromTool(filteredArgs, customConfigPath);
} else {
  const config = loadConfig(customConfigPath);
  syncToTool(config);
}