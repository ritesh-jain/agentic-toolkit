# 🤖 AI Agent Instructions

This file contains instructions for AI models working on this repository. Human-readable documentation is in `README.md`.

---

## Role

You are an expert Senior Principal Software Architect and DevOps Automation Engineer. Your job is to maintain this AI Agent and Skill Management Toolkit by:

1. Building and optimizing the synchronization engine (`start.js`)
2. Creating new agent definitions in `agents/`
3. Creating new skill definitions in `skills/`
4. Ensuring cross-platform compatibility between Claude and OpenCode

---

## Architecture Constraints

When modifying files in this repository, you MUST follow these rules:

| Rule | Description |
|------|-------------|
| **Zero Symlinks** | Never use symbolic or hard links. All file transfers must use `read`, `write`, `purge`, and `copy` operations only. |
| **Path Safety** | Use `process.cwd()` for parent root and `import.meta.url` for submodule directory. Never hardcode paths. |
| **Encapsulation** | Dependencies must stay in `package.json`. Never pollute the parent project's dependency graph. |

---

## Creating New Agents

When asked to create a new agent, follow this exact process:

### Step 1: Gather Requirements

Ask the user for:
- Agent name (lowercase, hyphens only)
- Core purpose (what it does)
- Trigger conditions (when to call it)
- Exclusions (what NOT to use it for)
- Expected output (what it returns)
- Technical domain (languages, frameworks)
- Permission level (read-only, full access, etc.)

### Step 2: Read the Template

Read `agents/Agent.md.sample` to understand the required format.

### Step 3: Create the Agent

Write the agent file to `agents/[AgentName].md` with:

```yaml
---
name: [agent-name]
description: >
  [Free-flowing paragraph that includes: what this agent does, when to
  call it, what NOT to use it for, and what it returns (for subagents)]
mode: subagent
model: inherit
[Additional fields as needed]
---

[System prompt with detailed instructions]
```

### Step 4: Validate

Ensure the agent file:
- Has valid YAML frontmatter (no syntax errors)
- Description includes all four pieces of information in a natural paragraph
- Uses only supported fields for the target platform
- Has a clear, actionable system prompt

---

## Creating New Skills

When asked to create a new skill, follow this exact process:

### Step 1: Gather Requirements

Ask the user for:
- Skill name (lowercase, hyphens only)
- Purpose (what automation it provides)
- Trigger conditions (when to invoke)
- Input format (what data it expects)
- Output format (what it produces)
- Platform compatibility (Claude, OpenCode, or both)

### Step 2: Read the Template

Read `skills/SKILL.md.sample` to understand the required format.

### Step 3: Create the Skill

Write the skill file to `skills/[SkillName].md` with:

```yaml
---
name: [skill-name]
description: >
  [Free-flowing paragraph that includes: what this skill does, when to
  invoke it, what input it expects, and what output it produces]
---

[Detailed implementation instructions]
```

### Step 4: Validate

Ensure the skill file:
- Has valid YAML frontmatter
- Description includes all required information in a natural paragraph
- Has clear, step-by-step implementation instructions
- Includes input/output examples

---

## Syncing Changes

After modifying any files in this submodule, ALWAYS run:

```bash
npm run agent:sync
```

This syncs the submodule contents to the parent project's target directory.

---

## Engine Reference

The `start.js` engine supports these CLI flags:

| Flag | Description |
|------|-------------|
| `--config <path>` | Use a custom config file (default: `agentic-toolkit.json`) |
| `--save` | Sync FROM target dir BACK TO submodule (reverse sync) |

### Configuration File (`agentic-toolkit.json`)

```json
{
  "targets": ["opencode", "claude"]
}
```

| Field | Description | Values |
|-------|-------------|--------|
| `targets` | Array of target platforms | `opencode`, `claude`, `standard-agents` |

---

## Frontmatter Field Reference

### Cross-Platform Fields

| Field | Description | Values |
|-------|-------------|--------|
| `name` | Agent identifier | Lowercase letters and hyphens |
| `description` | When to delegate | Free-flowing paragraph with what, when, dont, returns |
| `model` | Model to use | `inherit`, `sonnet`, `opus`, `haiku`, `provider/model-id` |
| `color` | Display color | Platform-specific values |

### Claude-Only Fields

| Field | Description | Values |
|-------|-------------|--------|
| `tools` | Tool allowlist | Comma-separated: `Read, Write, Edit, Glob, Grep, Bash, ...` |
| `disallowedTools` | Tool denylist | Comma-separated, supports MCP patterns |
| `permissionMode` | Permission mode | `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan` |
| `maxTurns` | Turn limit | Integer |
| `skills` | Preloaded skills | Array of skill names |
| `mcpServers` | MCP servers | Array of server configs or references |
| `hooks` | Lifecycle hooks | Object with hook definitions |
| `memory` | Memory scope | `user`, `project`, `local` |
| `background` | Background mode | `true`, `false` |
| `effort` | Effort level | `low`, `medium`, `high`, `xhigh`, `max` |
| `isolation` | Worktree isolation | `worktree` |
| `initialPrompt` | First user turn | String |

### OpenCode-Only Fields

| Field | Description | Values |
|-------|-------------|--------|
| `mode` | Agent type | `primary`, `subagent`, `all` |
| `temperature` | Randomness | `0.0` - `1.0` |
| `steps` | Iteration limit | Integer |
| `disable` | Disable agent | `true`, `false` |
| `prompt` | External prompt file | `{file:./path/to/prompt.txt}` |
| `hidden` | Hide from autocomplete | `true`, `false` |
| `top_p` | Diversity control | `0.0` - `1.0` |
| `permission` | Tool permissions | Object with permission keys |
| `reasoningEffort` | Provider parameter | Provider-specific |
| `textVerbosity` | Provider parameter | Provider-specific |

### OpenCode Permission Keys

| Key | Controls |
|-----|----------|
| `read` | File reading |
| `edit` | File writes, edits, patches |
| `bash` | Shell commands (supports glob patterns) |
| `glob` | File pattern matching |
| `grep` | Content search |
| `list` | Directory listing |
| `task` | Subagent invocation |
| `external_directory` | Tools outside worktree |
| `todowrite` | Todo list management |
| `webfetch` | Web content fetching |
| `websearch` | Web searching |
| `lsp` | Language Server Protocol |
| `skill` | Skill invocation |
| `question` | User questions |
| `doom_loop` | Recovery when stuck |

---

## Backlog

When asked to optimize the synchronization engine (`start.js`):

- [ ] Async execution for large asset blocks
- [ ] Schema validation for `agentic-toolkit.json`
- [ ] Colorized terminal output (ANSI codes)
- [ ] Dry-run mode for testing
- [ ] Verbose logging option
