# 🚀 Cross-Platform AI Agent & Skill Sync Engine

A tool-agnostic configuration pipeline that manages your AI coding personas (`agents`) and automated utility capabilities (`skills`) across multiple projects and platforms.

---

## What This Does

Different AI coding tools expect configuration files in different locations:

| Tool | Expected Location |
|------|-------------------|
| **OpenCode** | `.opencode/` |
| **Claude Code** | `.claude/` |
| **Standard** | `.agents/` |

This repository acts as a **single source of truth** that syncs your agents and skills to whatever tool each project uses. No broken symlinks, no cross-platform issues.

---

## Quick Start

### 1. Add to Your Project

```bash
git submodule add https://github.com/ritesh-jain/agentic-toolkit.git scripts/agentic-toolkit
```

### 2. Create Config File

Create `agentic-toolkit.json` in your project root:

```json
{
  "targets": ["opencode"]
}
```

### 3. Add npm Scripts

Add to your `package.json`:

```json
"scripts": {
  "agentic-toolkit": "npx ./scripts/agentic-toolkit agentic-toolkit --config ./agentic-toolkit.json",
  "agent:sync": "npm run agentic-toolkit",
  "agent:save": "npm run agentic-toolkit -- --save"
}
```

### 4. Run Sync

```bash
npm run agent:sync
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run agent:sync` | Sync agents/skills from submodule to target directory |
| `npm run agent:save` | Save changes FROM target directory BACK to submodule |

---

## Configuration

### `agentic-toolkit.json`

| Field | Description |
|-------|-------------|
| `targets` | Array of target platforms: `opencode`, `claude`, or `agents` |

### Example Configurations

Sync to OpenCode only:
```json
{
  "targets": ["opencode"]
}
```

Sync to both OpenCode and Claude:
```json
{
  "targets": ["opencode", "claude"]
}
```

Sync to all platforms:
```json
{
  "targets": ["opencode", "claude", "agents"]
}
```

### Auto-Discovery

If `agentic-toolkit.json` is missing, the engine auto-detects:
- `opencode.json` → targets `.opencode/`
- `claude.json` or `.clauderc` → targets `.claude/`
- Otherwise → targets `.agents/`

### Custom Config Path

```bash
npm run agentic-toolkit -- --config ./my-custom-config.json
```

---

## Repository Structure

```
scripts/agentic-toolkit/
├── package.json         # CLI binary definition
├── start.js             # Sync engine
├── AGENTS.md            # Instructions for AI models
├── README.md            # This file
├── agents/              # Agent definitions
│   └── Agent.md.sample  # Template for new agents
└── skills/              # Skill definitions
    └── SKILL.md.sample  # Template for new skills
```

---

## Creating New Agents

1. Copy the template:
   ```bash
   cp agents/Agent.md.sample agents/MyAgent.md
   ```

2. Edit the new file with your agent's configuration

3. Run sync:
   ```bash
   npm run agent:sync
   ```

### Agent Description Format

Every agent description MUST be a free-flowing paragraph that includes:
- What this agent does (its core capability)
- When to call this agent (trigger conditions)
- What NOT to use it for (exclusions)
- What it returns (for subagents, omit for primary agents)

---

## Creating New Skills

1. Create a directory for the skill:
   ```bash
   mkdir -p skills/my-skill
   ```

2. Copy the template:
   ```bash
   cp skills/SKILL.md.sample skills/my-skill/SKILL.md
   ```

3. Edit the new file with your skill's configuration

4. Run sync:
   ```bash
   npm run agent:sync
   ```

### Skill File Structure

Skills must be placed in a directory with `SKILL.md` as the entrypoint:

```
skills/
└── my-skill/
    ├── SKILL.md           # Main instructions (required)
    ├── template.md        # Optional template
    ├── examples/
    │   └── sample.md      # Optional examples
    └── scripts/
        └── helper.sh      # Optional scripts
```

### Skill Description Format

Every skill description MUST be a free-flowing paragraph that includes:
- What this skill does (its purpose)
- When to invoke it (trigger conditions)
- What NOT to use it for (exclusions)
- What it returns (output structure)

---

## Gitignore

Add these to your project's `.gitignore`:

```gitignore
# AI Agent Toolkit - Generated directories
.opencode/
.claude/
.agents/
```

---

## Platform Compatibility

This toolkit works with both Claude and OpenCode. Agent files use a superset of both platforms' configuration options:

| Feature | Claude | OpenCode |
|---------|--------|----------|
| Tool control | `tools` field | `permission` field |
| Model selection | `model` aliases | `provider/model-id` |
| Permission modes | `permissionMode` | `permission` object |
| Turn limits | `maxTurns` | `steps` |
| Memory | `memory` field | Not supported |
| MCP servers | `mcpServers` field | Not in agents |

For detailed field documentation, see `agents/Agent.md.sample`.

---

## Troubleshooting

### Sync not working

1. Verify `agentic-toolkit.json` exists in project root
2. Check that the submodule is initialized: `git submodule update --init`
3. Run with verbose output: `npx ./scripts/agentic-toolkit agentic-toolkit --config ./agentic-toolkit.json`

### Changes not persisting

Use `--save` to sync changes back to the submodule:

```bash
npm run agent:save
```

### Wrong target directory

Check your `agentic-toolkit.json` `targets` value, or let auto-discovery work by removing the config file.
