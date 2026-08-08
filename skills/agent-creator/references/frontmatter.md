# Agent Frontmatter Reference

Complete reference for all frontmatter fields available in agent files.

---

## Cross-Platform Fields

These fields are supported by both Claude and OpenCode.

### `name` (Required)

Agent identifier.

| Platform | Constraints |
|----------|-------------|
| **Claude** | Required. Lowercase letters and hyphens. |
| **OpenCode** | Required. Lowercase letters and hyphens. |

**Valid examples:**
```yaml
name: code-researcher
name: docs-writer
name: senior-dev
```

**Invalid examples:**
```yaml
name: Code-Researcher    # uppercase not allowed
name: code_researcher    # underscore not allowed
name: -code              # cannot start with hyphen
```

### `description` (Required)

What the agent does and when to call it.

| Platform | Constraints |
|----------|-------------|
| **Claude** | Free-flowing paragraph |
| **OpenCode** | Required. Free-flowing paragraph |

**Description must include:**
1. What this agent does (core capability)
2. When to call this agent (trigger conditions)
3. What NOT to use it for (exclusions)
4. What it returns (for subagents, omit for primary agents)

**Good example:**
```yaml
description: >
  Explores codebases and provides detailed analysis of code structure,
  patterns, and relationships. Call this agent when you need to understand
  code architecture, find specific implementations, trace function calls,
  or get summaries of code modules. Do not use for making code changes,
  writing new code, or executing shell commands that modify the filesystem.
  Returns structured analysis with file paths, line numbers, function names,
  and code relationships including dependency graphs and architecture notes.
```

**Poor examples:**
```yaml
description: Analyzes code                    # Missing context
description: Helps with code stuff           # Too vague
```

### `model` (Required)

Model to use for this agent.

| Platform | Values |
|----------|--------|
| **Claude** | `inherit`, `sonnet`, `opus`, `haiku`, `fable`, or full model ID |
| **OpenCode** | `inherit` or `provider/model-id` (e.g., `anthropic/claude-sonnet-4-20250514`) |

**Examples:**
```yaml
model: inherit           # Keep active model
model: sonnet            # Claude Sonnet
model: anthropic/claude-sonnet-4-20250514  # OpenCode format
```

### `color` (Optional)

Display color for the agent.

| Platform | Values |
|----------|--------|
| **Claude** | `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan` |
| **OpenCode** | Hex (`#FF5733`), `primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info` |

**Examples:**
```yaml
color: primary          # OpenCode
color: blue             # Claude
color: "#4CAF50"        # OpenCode hex
```

---

## Claude-Specific Fields

These fields are only supported by Claude and will be ignored by OpenCode.

### `tools`

Comma-separated tool allowlist.

| Constraint |
|------------|
| Optional. Comma-separated list of tool names. |

**Available tools:**
`Read`, `Write`, `Edit`, `Glob`, `Grep`, `Bash`, `PowerShell`, `WebFetch`, `WebSearch`, `TodoWrite`, `NotebookEdit`, `Agent`, `Skill`

**Example:**
```yaml
tools: Read, Glob, Grep, Bash
```

### `disallowedTools`

Comma-separated tool denylist.

| Constraint |
|------------|
| Optional. Applied before tools field. Supports MCP patterns. |

**Example:**
```yaml
disallowedTools: Write, Edit
disallowedTools: mcp__server, mcp__server__*, mcp__*
```

### `permissionMode`

Permission handling mode.

| Constraint |
|------------|
| Optional. Default: `default`. |

**Values:**
- `default` - Standard permission handling
- `acceptEdits` - Auto-accept file edits
- `auto` - Auto-accept all actions
- `dontAsk` - Never ask for permissions
- `bypassPermissions` - Skip all permission checks
- `plan` - Planning mode only

**Example:**
```yaml
permissionMode: plan
```

### `maxTurns`

Maximum agentic turns before stopping.

| Constraint |
|------------|
| Optional. Integer. |

**Example:**
```yaml
maxTurns: 20
```

### `skills`

Skills to preload into context at startup.

| Constraint |
|------------|
| Optional. Array of skill names. |

**Example:**
```yaml
skills:
  - research-patterns
  - web-scraping
```

### `mcpServers`

MCP servers available to this agent.

| Constraint |
|------------|
| Optional. Array of server configs or references. |

**Example:**
```yaml
mcpServers:
  - github
  - server-name:
      type: stdio
      command: npx
      args: ["-y", "@server/mcp"]
```

### `hooks`

Lifecycle hooks scoped to this agent.

| Constraint |
|------------|
| Optional. YAML object. |

**Example:**
```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "echo 'Executing bash command'"
```

### `memory`

Persistent memory scope for cross-session learning.

| Constraint |
|------------|
| Optional. |

**Values:**
- `user` - `~/.claude/agent-memory/<name>/`
- `project` - `.claude/agent-memory/<name>/`
- `local` - `.claude/agent-memory-local/<name>/`

**Example:**
```yaml
memory: project
```

### `background`

Run as background task.

| Constraint |
|------------|
| Optional. Boolean. |

**Values:**
- `true` - Always background
- `false` - Never background
- unset - Claude decides (default: background)

**Example:**
```yaml
background: false
```

### `effort`

Effort level when agent is active.

| Constraint |
|------------|
| Optional. |

**Values:**
- `low`
- `medium`
- `high`
- `xhigh`
- `max`

**Example:**
```yaml
effort: high
```

### `isolation`

Run in temporary git worktree.

| Constraint |
|------------|
| Optional. |

**Values:**
- `worktree` - Isolated copy of repository

**Example:**
```yaml
isolation: worktree
```

### `initialPrompt`

Auto-submitted as first user turn when agent runs as main session agent.

| Constraint |
|------------|
| Optional. String. |

**Example:**
```yaml
initialPrompt: "Your first task"
```

---

## OpenCode-Specific Fields

These fields are only supported by OpenCode and will be ignored by Claude.

### `mode`

Agent type.

| Constraint |
|------------|
| Optional. Default: `all`. |

**Values:**
- `primary` - Main assistant, switchable with Tab
- `subagent` - Invoked by primary agents or @ mention
- `all` - Can be both

**Example:**
```yaml
mode: subagent
```

### `temperature`

Response randomness (0.0-1.0).

| Constraint |
|------------|
| Optional. |

**Values:**
- `0.0-0.2` - Focused, deterministic (code analysis)
- `0.3-0.5` - Balanced (general development)
- `0.6-1.0` - Creative (brainstorming)

**Example:**
```yaml
temperature: 0.2
```

### `steps`

Max agentic iterations before text-only response.

| Constraint |
|------------|
| Optional. Integer. |

**Example:**
```yaml
steps: 15
```

### `disable`

Disable this agent entirely.

| Constraint |
|------------|
| Optional. Boolean. |

**Example:**
```yaml
disable: false
```

### `prompt`

External prompt file path.

| Constraint |
|------------|
| Optional. Path is relative to config file location. |

**Example:**
```yaml
prompt: "{file:./prompts/agent.txt}"
```

### `hidden`

Hide from @ autocomplete menu.

| Constraint |
|------------|
| Optional. Boolean. Only applies to mode: subagent. |

**Example:**
```yaml
hidden: false
```

### `top_p`

Alternative to temperature for diversity control.

| Constraint |
|------------|
| Optional. Values: 0.0-1.0 (lower = more focused). |

**Example:**
```yaml
top_p: 0.9
```

### `permission`

Fine-grained tool permissions.

| Constraint |
|------------|
| Optional. Object with permission keys. |

**Keys:**
- `read` - File reading
- `edit` - File writes, edits, patches
- `bash` - Shell commands (supports glob patterns)
- `glob` - File pattern matching
- `grep` - Content search
- `list` - Directory listing
- `task` - Subagent invocation
- `external_directory` - Tools outside worktree
- `todowrite` - Todo list management
- `webfetch` - Web content fetching
- `websearch` - Web searching
- `lsp` - Language Server Protocol
- `skill` - Skill invocation
- `question` - User questions
- `doom_loop` - Recovery when stuck

**Values:**
- `allow` - Always allow
- `ask` - Ask for permission
- `deny` - Never allow
- Object with glob patterns

**Example:**
```yaml
permission:
  read: allow
  glob: allow
  grep: allow
  edit: deny
  bash:
    "*": ask
    "git status*": allow
    "git diff*": allow
    "git log*": allow
    "npm run*": allow
    "npx*": allow
    "node*": allow
    "cat*": allow
    "ls*": allow
    "grep*": allow
    "find*": allow
  task: allow
  external_directory: deny
  todowrite: allow
  webfetch: allow
  websearch: allow
  lsp: allow
  skill: allow
  question: allow
  doom_loop: allow
```

### `reasoningEffort`

Provider-specific parameter (e.g., OpenAI reasoning).

| Constraint |
|------------|
| Optional. |

**Example:**
```yaml
reasoningEffort: high
```

### `textVerbosity`

Provider-specific parameter.

| Constraint |
|------------|
| Optional. |

**Example:**
```yaml
textVerbosity: low
```

---

## Field Summary

### Cross-Platform (Use for Both)

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Agent identifier |
| `description` | Yes | What it does and when to call it |
| `model` | Yes | Model to use |
| `color` | No | Display color |

### Claude-Only

| Field | Required | Description |
|-------|----------|-------------|
| `tools` | No | Tool allowlist |
| `disallowedTools` | No | Tool denylist |
| `permissionMode` | No | Permission mode |
| `maxTurns` | No | Turn limit |
| `skills` | No | Preloaded skills |
| `mcpServers` | No | MCP servers |
| `hooks` | No | Lifecycle hooks |
| `memory` | No | Memory scope |
| `background` | No | Background mode |
| `effort` | No | Effort level |
| `isolation` | No | Worktree isolation |
| `initialPrompt` | No | First user turn |

### OpenCode-Only

| Field | Required | Description |
|-------|----------|-------------|
| `mode` | No | Agent type |
| `temperature` | No | Randomness |
| `steps` | No | Iteration limit |
| `disable` | No | Disable agent |
| `prompt` | No | External prompt file |
| `hidden` | No | Hide from autocomplete |
| `top_p` | No | Diversity control |
| `permission` | No | Tool permissions |
| `reasoningEffort` | No | Provider parameter |
| `textVerbosity` | No | Provider parameter |
