# SKILL.md Frontmatter Reference

Complete reference for all frontmatter fields available in SKILL.md files.

---

## Specification Fields

These fields are part of the [Agent Skills specification](https://agentskills.io/specification) and are supported across multiple platforms.

### `name` (Required)

Skill identifier.

| Platform | Constraints |
|----------|-------------|
| **Specification** | Max 64 characters. Lowercase letters, numbers, and hyphens only. Must not start or end with a hyphen. Must not contain consecutive hyphens. Must match parent directory name. |
| **Claude** | Optional, defaults to directory name. |
| **OpenCode** | Required. Must match directory name. |

**Valid examples:**
```yaml
name: pdf-processing
name: data-analysis
name: code-review
```

**Invalid examples:**
```yaml
name: PDF-Processing  # uppercase not allowed
name: -pdf  # cannot start with hyphen
name: pdf--processing  # consecutive hyphens not allowed
```

### `description` (Required)

What the skill does and when to use it.

| Platform | Constraints |
|----------|-------------|
| **Specification** | Max 1024 characters. Non-empty. Describes what the skill does and when to use it. |
| **Claude** | Used to decide when to load automatically. Combined with `when_to_use` truncated at 1,536 characters. |
| **OpenCode** | Required. 1-1024 characters. |

**Description must include:**
1. What it does (core capability)
2. When to invoke (trigger conditions)
3. What NOT to use it for (exclusions)
4. What it returns (output structure)

**Good example:**
```yaml
description: >
  Create consistent releases and changelogs from merged PRs. Use when
  preparing a tagged release or generating release notes. Do not use for
  feature branch merges, hotfix deployments, or version bumps without
  release notes. Returns a structured release with version bump
  recommendation, changelog entries, and a ready-to-run gh release command.
```

**Poor example:**
```yaml
description: Helps with releases
```

### `license` (Optional)

License covering the skill.

| Platform | Constraints |
|----------|-------------|
| **Specification** | License name or reference to a bundled license file. |
| **Claude** | Accepted but not acted on. |
| **OpenCode** | Accepted but not acted on. |

**Example:**
```yaml
license: MIT
license: Apache-2.0
license: Proprietary. LICENSE.txt has complete terms
```

### `compatibility` (Optional)

Environment requirements for the skill.

| Platform | Constraints |
|----------|-------------|
| **Specification** | Max 500 characters. Indicates environment requirements (intended product, system packages, network access, etc.). |
| **Claude** | Accepted but not acted on. |
| **OpenCode** | Accepted but not acted on. |

**Examples:**
```yaml
compatibility: Designed for Claude Code (or similar products)
compatibility: Requires git, docker, jq, and access to the internet
compatibility: Requires Python 3.14+ and uv
```

Most skills do not need this field.

### `metadata` (Optional)

Free-form key-value data for additional metadata.

| Platform | Constraints |
|----------|-------------|
| **Specification** | Map from string keys to string values. |
| **Claude** | Must be a YAML map. |
| **OpenCode** | Must be string-to-string map. |

**Example:**
```yaml
metadata:
  author: example-org
  version: "1.0"
  audience: developers
  workflow: github
```

### `allowed-tools` (Optional)

Space-separated string of pre-approved tools the skill may use.

| Platform | Constraints |
|----------|-------------|
| **Specification** | Experimental. Support may vary between agent implementations. |
| **Claude** | Space or comma-separated, or YAML list. Grant clears on next message. |
| **OpenCode** | Not recognized (ignored). |

**Example:**
```yaml
allowed-tools: Read Grep Glob Bash
allowed-tools: Bash(git:*) Bash(jq:*) Read
```

---

## Claude-Specific Fields

These fields are only supported by Claude and will be ignored by other platforms.

### `when_to_use`

Additional context for when Claude should invoke the skill.

| Constraints |
|-------------|
| Optional. Appended to description in skill listing. Truncated at 1,536 characters combined with description. |

**Example:**
```yaml
when_to_use: >
  Use this when you are preparing a tagged release. Ask clarifying
  questions if the target versioning scheme is unclear.
```

### `argument-hint`

Hint shown during autocomplete to indicate expected arguments.

| Constraints |
|-------------|
| Optional. String. |

**Example:**
```yaml
argument-hint: "[issue-number]"
argument-hint: "[filename] [format]"
```

### `arguments`

Named positional arguments for `$name` substitution in skill content.

| Constraints |
|-------------|
| Optional. Space-separated string or YAML list. Names map to argument positions in order. |

**Example:**
```yaml
arguments:
  - issue
  - branch
```

This allows `$issue` and `$branch` placeholders in the skill content.

### `disable-model-invocation`

Prevent Claude from automatically loading this skill.

| Constraints |
|-------------|
| Optional. Boolean. Default: `false`. |

**Values:**
- `true` = Only user can invoke with `/skill-name`
- `false` = Both user and Claude can invoke

**Example:**
```yaml
disable-model-invocation: true
```

Use for workflows with side effects like `/deploy` or `/commit`.

### `user-invocable`

Hide from the `/` menu.

| Constraints |
|-------------|
| Optional. Boolean. Default: `true`. |

**Values:**
- `true` = User can invoke
- `false` = Only Claude can invoke (background knowledge)

**Example:**
```yaml
user-invocable: false
```

Use for background knowledge that isn't actionable as a command.

### `disallowed-tools`

Tools removed from Claude's available pool while this skill is active.

| Constraints |
|-------------|
| Optional. Space or comma-separated, or YAML list. Restriction clears on next message. |

**Example:**
```yaml
disallowed-tools: Write, Edit
```

### `model`

Model override for this skill.

| Constraints |
|-------------|
| Optional. Override applies for rest of current turn. |

**Values:**
- `sonnet` - Claude Sonnet
- `opus` - Claude Opus
- `haiku` - Claude Haiku
- `inherit` - Keep active model
- Full model ID (e.g., `claude-opus-5`)

**Example:**
```yaml
model: haiku
```

### `effort`

Effort level override.

| Constraints |
|-------------|
| Optional. Default: inherits from session. |

**Values:**
- `low`
- `medium`
- `high`
- `xhigh`
- `max`

Available levels depend on the model.

**Example:**
```yaml
effort: high
```

### `context`

Run in forked subagent context.

| Constraints |
|-------------|
| Optional. |

**Values:**
- `fork` = Run in separate subagent

**Example:**
```yaml
context: fork
```

### `agent`

Which subagent type to use when `context: fork` is set.

| Constraints |
|-------------|
| Optional. Only applies with `context: fork`. |

**Example:**
```yaml
agent: general
```

### `background`

Only applies with `context: fork`. Whether to run in background.

| Constraints |
|-------------|
| Optional. Only with `context: fork`. Default: `true`. |

**Values:**
- `true` = Run in background
- `false` = Wait for result

**Example:**
```yaml
background: true
```

### `hooks`

Lifecycle hooks scoped to this skill.

| Constraints |
|-------------|
| Optional. YAML object. |

**Example:**
```yaml
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "echo 'Running skill'"
```

### `paths`

Glob patterns that limit when this skill is activated.

| Constraints |
|-------------|
| Optional. Comma-separated string or YAML list. |

When set, Claude loads the skill automatically only when working with files matching the patterns.

**Example:**
```yaml
paths: "src/**/*.ts, lib/**/*.js"
```

### `shell`

Shell to use for inline commands (`` !`command` `` and ```` ```! ```` blocks).

| Constraints |
|-------------|
| Optional. |

**Values:**
- `bash` (default)
- `powershell`

**Example:**
```yaml
shell: bash
```

---

## Dynamic Context (Claude Only)

### Inline Shell Commands

Use `` !`command` `` to inject shell output into skill content. Claude runs the command and replaces the line with its output.

**Examples:**
```yaml
## Current State
!`git status --short`

## Files
!`ls -la src/`
```

### String Substitutions

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments passed when invoking the skill |
| `$0`, `$1`, `$2` | Specific arguments by index |
| `$name` | Named argument from `arguments` field |
| `${CLAUDE_SESSION_ID}` | Current session ID |
| `${CLAUDE_EFFORT}` | Current effort level |
| `${CLAUDE_SKILL_DIR}` | Directory containing this SKILL.md |
| `${CLAUDE_PROJECT_DIR}` | Project root directory |

**Examples:**
```yaml
## Session Log
Log to logs/${CLAUDE_SESSION_ID}.log:

$ARGUMENTS
```

```yaml
## Script Execution
Run `${CLAUDE_SKILL_DIR}/scripts/helper.sh` to process data.
```

---

## Invocation Control Matrix

| Frontmatter | You can invoke | Claude can invoke | When loaded into context |
|-------------|----------------|-------------------|--------------------------|
| (default) | Yes | Yes | Description always in context, full skill loads when invoked |
| `disable-model-invocation: true` | Yes | No | Description not in context, full skill loads when you invoke |
| `user-invocable: false` | No | Yes | Description always in context, full skill loads when invoked |

---

## OpenCode Notes

OpenCode only recognizes the specification fields:
- `name` (required)
- `description` (required)
- `license` (optional)
- `compatibility` (optional)
- `metadata` (optional)

All other fields (Claude-specific) are ignored by OpenCode.
