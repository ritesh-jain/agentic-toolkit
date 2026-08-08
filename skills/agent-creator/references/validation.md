# Agent Validation Reference

Complete validation checklist for agent files.

---

## File Structure Validation

### File Name and Location

| Rule | Constraint |
|------|------------|
| File name | Must be `[AgentName].md` (case-sensitive) |
| Location | Must be inside `agents/` directory |
| Directory structure | Single file, no directory required |

**Valid structure:**
```
agents/
├── code-researcher.md    # ✓ Correct
├── docs-writer.md        # ✓ Correct
└── senior-dev.md         # ✓ Correct
```

**Invalid structure:**
```
agents/
├── Code-Researcher.md    # ✗ Wrong case
├── code_researcher.md    # ✗ Underscore not allowed
└── code-researcher/      # ✗ Directory not required
    └── agent.md          # ✗ Wrong file name
```

---

## Frontmatter Validation

### `name` Field (Required)

| Rule | Constraint |
|------|------------|
| Characters | Lowercase letters, numbers, hyphens only |
| Start | Cannot start with hyphen |
| End | Cannot end with hyphen |
| Consecutive | Cannot contain consecutive hyphens (`--`) |
| Match | Should match file name (without `.md` extension) |

**Valid examples:**
```yaml
name: code-researcher
name: docs-writer
name: senior-dev
```

**Invalid examples:**
```yaml
name: Code-Researcher    # uppercase not allowed
name: -code              # cannot start with hyphen
name: code-              # cannot end with hyphen
name: code--researcher   # consecutive hyphens not allowed
name: code_researcher    # underscore not allowed
```

### `description` Field (Required)

| Rule | Constraint |
|------|------------|
| Format | Free-flowing paragraph |
| Content | Must describe what it does AND when to call it |

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
description: Code analysis agent             # Missing "when to call"
```

### `model` Field (Required)

| Rule | Constraint |
|------|------------|
| Format | String |
| Values | Platform-specific |

**Valid examples:**
```yaml
model: inherit
model: sonnet
model: anthropic/claude-sonnet-4-20250514
```

**Invalid examples:**
```yaml
model: Claude            # Wrong format
model: gpt-4             # Not supported
```

### `color` Field (Optional)

| Rule | Constraint |
|------|------------|
| Format | String |
| Values | Platform-specific |

**Valid examples:**
```yaml
color: primary
color: blue
color: "#4CAF50"
```

**Invalid examples:**
```yaml
color: red-blue          # Not a valid color
color: 123456            # Not a color
```

---

## System Prompt Validation

### Structure

| Rule | Constraint |
|------|------------|
| Format | Markdown after frontmatter |
| Sections | Recommended but not required |

**Recommended sections:**
- Role/Persona
- Core Responsibilities
- Behavioral Guidelines
- Technical Domain
- Constraints
- Workflow
- Output Format

### Quality

| Rule | Constraint |
|------|------------|
| Clarity | Clear, actionable instructions |
| Specificity | Specific role and responsibilities |
| Constraints | Clear "NEVER" rules |
| Completeness | Covers edge cases |

**Good system prompt:**
```markdown
You are a code researcher. Your job is to explore codebases and provide
accurate information about code structure, patterns, and relationships.

Always cite file paths and line numbers when referencing code.
```

**Poor system prompt:**
```markdown
You are a helpful assistant. Do good work.
```

---

## Platform-Specific Validation

### OpenCode

| Rule | Constraint |
|------|------------|
| `name` | Required, must match file name |
| `description` | Required, free-flowing paragraph |
| `mode` | Optional, default: `all` |
| Other fields | Optional |

### Claude

| Rule | Constraint |
|------|------------|
| `name` | Required |
| `description` | Required |
| `model` | Required |
| `tools` | Optional, comma-separated |
| Other fields | Optional |

### Cross-Platform

| Rule | Constraint |
|------|------------|
| File format | Markdown with YAML frontmatter |
| File location | `agents/` directory |
| File name | `[AgentName].md` |

---

## Validation Checklist

Use this checklist to validate your agent:

### File Structure
- [ ] File is named `[AgentName].md`
- [ ] File is in `agents/` directory

### Frontmatter
- [ ] `name` contains only lowercase letters, numbers, hyphens
- [ ] `name` does not start or end with hyphen
- [ ] `name` does not contain consecutive hyphens
- [ ] `name` matches file name (without extension)
- [ ] `description` includes what, when, not-for, returns
- [ ] `model` is specified

### System Prompt
- [ ] Has clear role/persona definition
- [ ] Has core responsibilities listed
- [ ] Has behavioral guidelines
- [ ] Has constraints (NEVER rules)
- [ ] Has workflow or process
- [ ] Has output format

### Optional
- [ ] `color` field included if applicable
- [ ] `tools` field included if applicable (Claude)
- [ ] `permission` field included if applicable (OpenCode)
- [ ] `memory` field included if applicable (Claude)

---

## Platform-Specific Validation

### OpenCode

| Rule | Constraint |
|------|------------|
| `mode` | Must be `primary`, `subagent`, or `all` |
| `temperature` | Must be 0.0-1.0 |
| `steps` | Must be integer |
| `permission` | Must be object with valid keys |

### Claude

| Rule | Constraint |
|------|------------|
| `tools` | Must be comma-separated tool names |
| `permissionMode` | Must be valid mode |
| `maxTurns` | Must be integer |
| `memory` | Must be `user`, `project`, or `local` |

---

## Common Errors

### Missing Required Fields

```yaml
---
name: my-agent
---
```

**Error:** Missing `description` and `model` fields.

### Invalid Name Format

```yaml
---
name: My-Agent
description: ...
---
```

**Error:** Uppercase letters not allowed.

### Vague Description

```yaml
---
name: my-agent
description: Helps with stuff
---
```

**Error:** Description must include what, when, not-for, returns.

### Missing System Prompt

```yaml
---
name: my-agent
description: ...
model: inherit
---
```

**Error:** System prompt body is empty.
