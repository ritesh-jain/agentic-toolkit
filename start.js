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
  'agents': '.agents'
};

// Platform-specific field removal rules
// Master files are superset; sync strips incompatible fields per target
const STRIP_FIELDS = {
  'opencode': ['tools', 'disallowedTools', 'permissionMode', 'maxTurns', 'skills', 'mcpServers', 'hooks', 'memory', 'background', 'effort', 'isolation', 'initialPrompt'],
  'claude': ['permission', 'mode', 'temperature', 'steps', 'disable', 'prompt', 'hidden', 'top_p', 'reasoningEffort', 'textVerbosity']
};

// Transform agent frontmatter for target platform
function transformAgentContent(content, target) {
  const fieldsToStrip = STRIP_FIELDS[target];
  if (!fieldsToStrip || fieldsToStrip.length === 0) return content;

  // Match YAML frontmatter between --- delimiters
  const frontmatterRegex = /^(---\n)([\s\S]*?)(\n---)/;
  const match = content.match(frontmatterRegex);

  if (!match) return content;

  const [, opening, frontmatter, closing] = match;
  const lines = frontmatter.split('\n');
  const transformedLines = [];
  let skipBlock = false;
  let indent = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fieldMatch = line.match(/^(\s*)(\w[\w-]*):/);

    if (fieldMatch) {
      const currentIndent = fieldMatch[1].length;
      const fieldName = fieldMatch[2];

      // If we were skipping a block, check if we've exited it
      if (skipBlock) {
        if (currentIndent <= indent) {
          skipBlock = false;
        } else {
          continue; // Still inside the block we're skipping
        }
      }

      // Check if this field should be stripped
      if (fieldsToStrip.includes(fieldName)) {
        skipBlock = true;
        indent = currentIndent;
        continue;
      }
    } else if (skipBlock) {
      // Continuation of a block we're skipping (e.g., multi-line value)
      continue;
    }

    transformedLines.push(line);
  }

  const transformedFrontmatter = transformedLines.join('\n');
  return content.replace(frontmatterRegex, `${opening}${transformedFrontmatter}${closing}`);
}

// Configuration Resolution
function loadConfig(configPath) {
  const parentConfigPath = configPath || path.join(PARENT_PROJECT_ROOT, DEFAULT_CONFIG_NAME);
  let config = { targets: ['agents'] };

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
  const targetDir = path.join(PARENT_PROJECT_ROOT, TOOL_MAP[target]);

  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  fs.mkdirSync(path.join(targetDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'skills'), { recursive: true });

  const submoduleAgents = path.join(SUBMODULE_DIR, 'agents');
  const submoduleSkills = path.join(SUBMODULE_DIR, 'skills');

  // Sync agents with transformation
  if (fs.existsSync(submoduleAgents)) {
    const agentFiles = fs.readdirSync(submoduleAgents).filter(f => f.endsWith('.md'));
    for (const file of agentFiles) {
      const srcPath = path.join(submoduleAgents, file);
      const destPath = path.join(targetDir, 'agents', file);
      const content = fs.readFileSync(srcPath, 'utf8');
      const transformed = transformAgentContent(content, target);
      fs.writeFileSync(destPath, transformed);
    }
  }

  // Sync skills (no transformation needed)
  if (fs.existsSync(submoduleSkills)) {
    fs.cpSync(submoduleSkills, path.join(targetDir, 'skills'), { recursive: true });
  }

  return targetDir;
}

// Sync from Target Directory (Reverse)
function saveFromTarget(target) {
  const targetDir = path.join(PARENT_PROJECT_ROOT, TOOL_MAP[target]);

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
const targets = config.targets || ['agents'];

console.log(`\nAgentic Toolkit - ${isSave ? 'Saving' : 'Syncing'} to ${targets.length} target(s)\n`);

if (isSave) {
  // Reverse sync: save from targets back to submodule
  for (const target of targets) {
    const dir = TOOL_MAP[target];
    console.log(`  Saving from ${dir}...`);
    const count = saveFromTarget(target);
    if (count > 0) {
      console.log(`    Saved ${count} director${count === 1 ? 'y' : 'ies'}`);
    }
  }
} else {
  // Forward sync: sync from submodule to targets
  for (const target of targets) {
    const dir = TOOL_MAP[target];
    console.log(`  Syncing to ${dir}...`);
    syncToTarget(target);
    console.log(`    Done`);
  }
}

console.log('\nDone.\n');
